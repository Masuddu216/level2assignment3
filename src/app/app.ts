import express, { Application, Request, Response } from 'express';
import { borrowRoutes } from './controllers/borrow.controller';
import { bookRoutes } from './controllers/book.controller';


const app: Application = express();
app.use(express.json());

app.use('/api/borrow', borrowRoutes); // ✅ Router object
app.use('/api/books', bookRoutes);   // ✅ Router object

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Library Management App");
});

export default app;
