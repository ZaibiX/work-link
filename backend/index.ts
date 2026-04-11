import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.route.js';
import workerRouter from './src/routes/worker.route.js';
import authRouter from './src/routes/auth.route.js';
import passport from './src/config/passport.js';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin:["http://192.168.0.107:3000", "http://localhost:3000"],
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/user', userRouter);
app.use('/api/worker', workerRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ status: 'WorkLink API is running' });
});


app.listen(PORT, () => {
  console.log(` Backend ready at http://localhost:${PORT}`);
});