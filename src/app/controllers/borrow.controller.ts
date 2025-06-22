// src/routes/borrow.routes.ts OR src/controllers/borrow.controller.ts
import express, {Router, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRoutes : Router = express.Router();

// POST /api/borrow
borrowRoutes.post("/", async (req:Request, res:Response)=> {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: book, quantity, dueDate',
        error: {},
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        error: {},
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: {},
      });
      
    }

    // Deduct copies and update availability via static method
    book.copies -= quantity;
    await Book.updateAvailability(book._id.toString());
    await book.save();

    const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

    return res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
});

// GET /api/borrow - Summary
borrowRoutes.get('/', async (req:Request, res:Response) =>{
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve summary',
      error,
    });
  }
});
