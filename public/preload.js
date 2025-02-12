const { ipcRenderer } = require('electron')

// adapted from https://jaketrent.com/post/select-directory-in-electron
process.once('loaded', () => {
    window.addEventListener('message', evt => {
        switch (evt.data.type) {
            case 'select-dir':
                ipcRenderer.send('select-dir');
                break;
            case 'directory-tree':
                // handled in DirectoryPrinter.js
                break;
            default:
                console.error("Unknown message received from renderer");
        }
    })
});

ipcRenderer.on('directory-tree', (event, arg) => {
    window.postMessage({
        type: 'directory-tree',
        data: arg
    });
});