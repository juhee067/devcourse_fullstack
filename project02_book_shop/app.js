import express from 'express';
import cors from 'cors';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
import userRouter from './routes/users.js';
import bookRouter from './routes/books.js';
import categoryRouter from './routes/categorys.js';
import likeRouter from './routes/likes.js';
import cartRouter from './routes/carts.js';
import orderRouter from './routes/orders.js';

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter);
app.use('/likes', likeRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
