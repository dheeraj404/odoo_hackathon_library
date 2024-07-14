import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/db.js';
import userRouter from './routes/userRouter.js';
import otpRouter from './routes/otpRouter.js';
import cors from 'cors';
import bookRouter from './routes/bookRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
connectToDb();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/otp', otpRouter);
app.use('/api/book', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to LMS Api services');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running 🚀 on port: ${PORT}`);
});

