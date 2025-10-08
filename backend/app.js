require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/Database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const reportRouter = require('./routes/reportRouter');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);
app.use('/api/report', reportRouter);
app.use('/api/user', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT;
connectDB()
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Connection running on port ${PORT} ...`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB');
  });
