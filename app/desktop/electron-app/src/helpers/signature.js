'use strict';

const crypto = require('crypto');

/**
 * Generates a cryptographic signature for a transaction using RSA-PSS
 * @param {Object} transaction - Transaction object to sign
 * @param {string} privateKey - Base64-encoded private key
 * @returns {string} Base64-encoded signature
 */
const getSignature = (transaction, privateKey) => {
  return crypto
    .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
      key: Buffer.from(privateKey, 'base64').toString('ascii'),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    })
    .toString('base64');
};

module.exports = { getSignature };
