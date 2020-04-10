import { app, BrowserWindow, Menu, Tray} from 'electron'
import path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

let appMenu = [{
    label: "应用",
    submenu: [
        { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
    ]
}
];


let tray = null;
function createWindow() {

    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        icon: path.join(__static, './icon/icon1.png')
    })
    if (process.platform === 'darwin') {
        app.dock.setIcon(`${path.join(__static, './icon/icon1.png')}`);
    }
    // Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));
    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', () => {

    createWindow();
    let iconPath = path.join(__static, './icon/icon1.png');
    tray = new Tray(iconPath);
    tray.setToolTip('meili host');
    Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));
    
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
