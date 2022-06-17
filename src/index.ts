import { app, BrowserWindow, session } from "electron";
import 'dotenv/config'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const createWindow = (): void => {
  const hiddenWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  hiddenWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [],
      },
    });
  });
};

app.on("ready", createWindow);
