const axios = require('axios');
const Price = require('../models/priceModel');
const { successResponse, errorResponse } = require('../middlewares/responseHandlers');
const { COINGECKO_API_URL, SYMBOLS } = require('../config/config');
const logger = require('../utils/logger');

const fetchPrices = async () => {
  try {
    const symbolsArray = SYMBOLS.split(',');
    const promises = symbolsArray.map(symbol =>
      axios.get(COINGECKO_API_URL, {
        params: {
          ids: symbol,
          vs_currencies: 'usd'
        }
      })
    );

    const responses = await Promise.all(promises);
    responses.forEach(async (response, index) => {
      const symbol = symbolsArray[index];
      const priceData = response.data[symbol];
      if (priceData) {
        const newPrice = new Price({
          symbol,
          price: priceData.usd,
          timestamp: new Date()
        });

        await newPrice.save();
        logger.info(`Saved price data for ${symbol}`);
      }
    });
  } catch (error) {
    logger.error('Failed to fetch price data:', error);
  }
};

const getRecentPrices = async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return errorResponse(res, 'Symbol is required', 400);
  }

  try {
    const recentPrices = await Price.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);

    return successResponse(res, recentPrices);
  } catch (error) {
    return errorResponse(res, 'Failed to retrieve price data', 500);
  }
};

module.exports = { fetchPrices, getRecentPrices };
