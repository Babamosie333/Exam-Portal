require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const subjectRoutes = require('./src/routes/subjectRoutes');
const testRoutes = require('./src/routes/testRoutes');
const questionRoutes = require('./src/routes/questionRoutes');
const attemptRoutes = require('./src/routes/attemptRoutes');
const statsRoutes = require('./src/routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api', statsRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Connect DB first — do NOT start server if DB is unavailable
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 MCQ Test Platform running at http://localhost:${PORT}`);
      console.log(`🔐 Admin panel: http://localhost:${PORT}/admin/login.html`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed. Server will NOT start.');
    console.error('   Reason:', err.message);
    console.error('\n👉 Fix: Set a valid MONGODB_URI in your .env file.');
    console.error('   Example (MongoDB Atlas):');
    console.error('   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mcq_test_platform?retryWrites=true&w=majority\n');
    process.exit(1);
  });

module.exports = app;
