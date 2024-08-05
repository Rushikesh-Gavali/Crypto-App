const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI, PORT, POLLING_INTERVAL } = require('./config/config');
const priceRoutes = require('./routes/priceRoutes');
const cors = require('cors');
const { fetchPrices } = require('./controllers/priceController');
const logger = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/prices', priceRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  setInterval(fetchPrices, POLLING_INTERVAL);
});
