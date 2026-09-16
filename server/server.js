const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const contactRoutes = require('./routes/contactRoutes');
const brandRoutes = require('./routes/brandRoutes');
const franchiseRoutes = require('./routes/franchiseRoutes');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'PINCOF Café Group & Franchise API',
  });
});

// API Routes
app.use('/api/brands', brandRoutes);
app.use('/api/franchise', franchiseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('PINCOF Café Group & Franchise API is running smoothly.');
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`PINCOF Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = { app, server };
