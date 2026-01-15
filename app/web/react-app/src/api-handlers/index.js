import axios from 'axios';
import ExchangeApiHandler from './exchange-api-handler';
import AppConstants from '../constants';

// Configure axios instance for exchange service API
const axiosInstanceExchange = new axios.create({
  baseURL: AppConstants.API_BASE_URL_EXCHANGE_DOMAIN
});

/**
 * Factory function for API handlers
 * Initializes handlers for different blockchain services
 */
function ApiHandlers() {
  this.exchangeApiHandler = new ExchangeApiHandler({ axiosInstance: axiosInstanceExchange });
}

export default ApiHandlers;