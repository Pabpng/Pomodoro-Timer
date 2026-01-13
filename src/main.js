/* Imports Electron and Node Modules !

- "app" controls the Electron app lifecyle (ready, quit, activate).
- "BrowserWindow" Used to create the application window.
- "path" Node.js utility for safely handling file paths across operating systems.*/

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

/* Creating the main window Application!

- "function createWindow() is responsible for creating the app's main window." */

function createWindow (){

  /* Creating a BrowserWindow Instance!

  - Creates a new desktop Window.
  - Sets the window size.
  - Loads a preload script "preload.js" which runs before the webpage and allows safe communication between the renderer and Node.js. */

  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,
      contextIsolation:false
    }
  })

/* Loading the HTML file!

- Loads "index.html" into the window.
- This file becomes the rendered process (Your UI) */

  mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

/* Waiting for Electron to be ready!
- Electron must finish initializing before creating any windows.
- "whenReady() fires once is fully ready.
- "createWindow()" is called to open your main window. */

app.whenReady().then(() => {
  createWindow()

/*macOs-specific behavior: activate!
- On macOs, apps stay open even when all windows are closed.
- when the user clicks the app icon in the Dock: 1. "activate fires, 2. If no windows exist, a new one is created." */

  app.on('activate', function (){

    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/* Handling all windows closed!
- When all windows are closed: 1. On Windows/Linux -> The app quits. 2. On macOS (darwin) -> the app stays running. */

app.on('window-all-closed', function (){
  if(process.platform !== 'darwin') app.quit()
})

/* Why this code is important!

- prevents crashes from creating windows too early.
- Ensure cross-platform behavior feels "native".
- Match how real desktop apps behave on Windows, macOS, and Linux. */