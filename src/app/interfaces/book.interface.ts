// src/interfaces/book.interface.ts
import { Document, Types, Model } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

// Mongoose Document interface extended with IBook properties
export interface IBookDocument extends IBook, Document {
  _id: Types.ObjectId;
}

// Model interface with static method declaration
export interface IBookModel extends Model<IBookDocument> {
  updateAvailability(bookId: string): Promise<void>;
}
