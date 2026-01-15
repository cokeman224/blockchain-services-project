import AxiosHttpAction from './axios-http-action';
import { v4 as uuidV4 } from 'uuid';

/**
 * API handler for blockchain exchange service endpoints
 * Provides methods for querying blockchain statistics, blocks, and transactions
 */
function ExchangeApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);

  this.getStatistics = async function() {
    return await httpAction.get({
      url: '/blockchain/v1/blocks/statistics',
      headers: {
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };

  this.getLatestMinedBlocksSummary = async function() {
    return await httpAction.get({
      url: '/blockchain/v1/blocks/mined-summary',
      headers: {
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };

  this.getPendingTransactionsFromMempool = async function() {
    return await httpAction.get({
      url: '/blockchain/v1/transactions/mempool',
      headers: {
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };

  this.getLatestMinedTransactionsFromMempool = async function() {
    return await httpAction.get({
      url: '/blockchain/v1/transactions/mempool/mined-transactions',
      headers: {
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };
}

export default ExchangeApiHandler;