import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.route.js';
import workerRouter from './src/routes/worker.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/worker', workerRouter);

app.get('/', (req, res) => {
  res.json({ status: 'WorkLink API is running' });
});


app.listen(PORT, () => {
  console.log(` Backend ready at http://localhost:${PORT}`);
});