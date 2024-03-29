const { app, BrowserWindow } = require('electron')
const path = require('path')
//const electronLocalshortcut = require('electron-localshortcut')

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  })

  win.removeMenu()

  win.loadFile('index.html')
  //win.removeMenu() // removes the ability to refresh the window
  win.webContents.openDevTools()
}



app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
