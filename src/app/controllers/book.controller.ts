import express, { Router, Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes:Router = express.Router();

bookRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
});



bookRoutes.get('/', async (req: Request, res: Response) => {
  const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
  const query: any = {};
  if (filter) query.genre = filter;
  const sortOptions: any = {};
  sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;

  try {
    const books = await Book.find(query).sort(sortOptions).limit(Number(limit));
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to retrieve books', error });
  }
});



bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
  const {bookId}  = req.params;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        error: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid book ID', error });
  }
});


bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error });
  }
});

bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    try {
      const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Update failed', error });
    }
  });

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Delete failed', error });
  }
});

