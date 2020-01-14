const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 200,
      width: 200,
  });

  let shadowWindow;
  mainWindow.on('will-resize', (event, desiredBounds) => {
    event.preventDefault();
    const currentBounds = mainWindow.getBounds();

    if(!shadowWindow) {
      shadowWindow = new BrowserWindow({
        ...currentBounds,
        y: currentBounds.y + 200
      });
      shadowWindow.loadURL('file://' + __dirname + '/index.html');
    }

    console.log({
      currentBounds,
      desiredBounds,
    });

    const newBounds = {
      x: currentBounds.x - (desiredBounds.width - currentBounds.width),
      width: desiredBounds.width + (desiredBounds.width - currentBounds.width),
    };

    shadowWindow.setBounds(newBounds);
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
