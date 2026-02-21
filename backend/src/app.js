const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const expertRoutes = require('./routes/expertRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || '').split(','),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
]
  .map((origin) => origin && origin.trim())
  .filter(Boolean);

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`CORS blocked for origin: ${origin}`));
};

app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/experts', expertRoutes);
app.use('/bookings', bookingRoutes);

app.use((_req, _res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
