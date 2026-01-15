'use strict';

const ui = require('./ui');

/**
 * Initializes the settings tab with network configuration UI
 */
module.exports = function settingsTab() {
  const mainElement = document.getElementById('pills-settings');
  mainElement.innerHTML = ui();
};
