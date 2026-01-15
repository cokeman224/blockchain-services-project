'use strict';

const { ipcRenderer, clipboard } = require('electron');

const Apis = require('../apis');

const homeTab = require('../renderer-process/tabs/home');
const walletTab = require('../renderer-process/tabs/wallet');
const settingsTab = require('../renderer-process/tabs/settings');

/**
 * Initializes the renderer process and sets up all application tabs
 * Runs when the DOM is fully loaded
 */
window.onload = async () => {
  const apis = Apis();
  await homeTab({ ipcRenderer, apis });
  walletTab({ ipcRenderer, clipboard });
  settingsTab();
};
