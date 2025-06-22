import { model, Schema } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';
import { Book } from './book.model';
import { IBookDocument } from '../interfaces/book.interface';

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.pre('save', async function (next) {
  const borrow = this;
    const book = await Book.findById<IBookDocument>(borrow.book);


  if (!book) {
    return next(new Error('Book not found'));
  }

  if (book.copies < borrow.quantity) {
    return next(new Error('Not enough copies available'));
  }

  book.copies -= borrow.quantity;
  await book.save();

    await Book.updateAvailability(book._id.toString());
  next();
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
