const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.route');
const noteRoutes = require('./routes/note.route');

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', noteRoutes);

// Validando Ruta
app.all('*', (req, res) => {
  return res.status(400).json({
    status: 'error',
    message: 'Error, route not found',
  });
});

module.exports = app;
