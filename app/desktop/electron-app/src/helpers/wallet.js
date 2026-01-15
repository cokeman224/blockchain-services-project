'use strict';

const crypto = require('crypto');

/**
 * Wallet utility for generating RSA key pairs and wallet addresses
 * Uses HMAC-SHA256 to derive wallet addresses from public keys
 */
module.exports = function Wallet() {
  /**
   * Generates a new RSA key pair and derives wallet address
   * Returns keys in base64 format for storage
   */
  this.createKeyPair = function () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    const address = crypto.createHmac('sha256', publicKey).digest('hex');
    const base64EncodedPublicKey = Buffer.from(publicKey, 'ascii').toString('base64');
    const base64EncodedPrivateKey = Buffer.from(privateKey, 'ascii').toString('base64');
    return { address, publicKey: base64EncodedPublicKey, privateKey: base64EncodedPrivateKey };
  };

  /**
   * Derives wallet address from a public key using HMAC-SHA256
   */
  this.createAddress = function ({ publicKey }) {
    return crypto.createHmac('sha256', publicKey).digest('hex');
  };
};
