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

// List all allowed frontend URLs
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://task-manager-lyart-pi-26.vercel.app', // current Vercel frontend
  'https://task-manager-lfv7q1z9b-amar-kumars-projects-7055830c.vercel.app' // optional older deployment
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl
    // Allow localhost
    if (origin === 'http://localhost:3000') return callback(null, true);
    // Allow any Vercel deployment of your project
    if (/^https:\/\/task-manager-.*\.vercel\.app$/.test(origin)) return callback(null, true);
    
    return callback(new Error('CORS policy does not allow this origin'), false);
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);
app.use('/api/report', reportRouter);
app.use('/api/user', userRouter);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 7000;
connectDB()
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ...`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
