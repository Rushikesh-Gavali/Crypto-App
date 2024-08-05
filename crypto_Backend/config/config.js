require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3/simple/price',
  POLLING_INTERVAL: 10000,
  SYMBOLS: 'bitcoin,ethereum,cardano,solana,polkadot',
  PORT: process.env.PORT || 5000
};
