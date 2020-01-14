const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {    
  mainWindow = new BrowserWindow({
      height: 200,
      width: 200,
  });
  mainWindow.on('will-resize', (event, desiredBounds) => {
    event.preventDefault();
    const currentBounds = mainWindow.getBounds();

    console.log({
      currentBounds,
      desiredBounds,
    });

    const newBounds = {
      x: currentBounds.x - (desiredBounds.width - currentBounds.width),
      width: desiredBounds.width + (desiredBounds.width - currentBounds.width),
    };

    setTimeout(() => mainWindow.setBounds(newBounds));
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
