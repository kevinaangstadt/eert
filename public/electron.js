'use strict';

const path = require('path');

const { app, dialog, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const eert = require('./eert.js');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // from https://jaketrent.com/post/select-directory-in-electron
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            sandbox: true
        }
    });
    
    mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    );
        
    // open dev tools
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};
    
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('select-dir', async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    console.log('directories selected', result.filePaths);
    if (result.filePaths !== undefined && result.filePaths.length === 1) {
        const tree = eert.constructTree(eert.traverseDirectory(result.filePaths[0]));
        event.reply('directory-tree', eert.renderTree(tree));
        //console.log(eert.renderTree(tree));
    }
});

