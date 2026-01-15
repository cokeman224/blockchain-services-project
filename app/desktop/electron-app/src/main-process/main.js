'use strict';

const { app, remote, BrowserWindow, shell, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const fileManagement = require('./file-management');
const applicationMenu = require('./application-menu');
const {
  IPC_EVENT_GET_USER_PREFERENCES,
  IPC_EVENT_USER_PREFERENCES
} = require('./constants/ipc-event-constants');

// Global reference to main window to prevent garbage collection
let mainWindow;
const isDevEnv = process.env.COINCOIN_ENV === 'dev';

const userDataLocation = (app || remote.app).getPath('userData');

/**
 * Creates and configures the main application window
 * Restores previous window position and size if available
 */
function createWindow() {
  const windowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 960
  });

  // Restrict window size in production, allow resizing in development
  const maxDimensions = !isDevEnv ? { maxWidth: 400, maxHeight: 960 } : {};

  mainWindow = new BrowserWindow({
    maximizable: !!isDevEnv,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 400,
    minHeight: 700,
    ...maxDimensions,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // for dev work
  isDevEnv && mainWindow.webContents.openDevTools();

  windowState.manage(mainWindow);

  mainWindow.loadFile(__dirname + '/../static/app.html');

  fileManagement(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open external links in default browser instead of navigating in-app
  mainWindow.webContents.on('will-navigate', function (event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Handle IPC request for user data location
  ipcMain.on(IPC_EVENT_GET_USER_PREFERENCES, event => {
    event.reply(IPC_EVENT_USER_PREFERENCES, { userDataLocation });
  });
}

app.whenReady().then(() => {
  applicationMenu();
  createWindow();
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', async () => {
  if (!mainWindow) {
    createWindow();
  }
});
