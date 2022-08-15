import { app, ipcMain, nativeTheme } from "electron";
import path from "path";
import os from "os";

const { menubar } = require("menubar");
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

const mb = menubar({
  index: process.env.APP_URL,
  icon: path.resolve(__dirname, "icons/icon.png"),
  browserWindow: {
    width: 270,
    height: 170,
    minWidth: 270,
    minHeight: 170,
    maxWidth: 270,
    maxHeight: 270,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  },
});

mb.on("ready", () => {
  console.log("app is ready");
});

ipcMain.handle("quitApp", () => {
  app.quit();
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 270,
    height: 170,
    minWidth: 270,
    minHeight: 170,
    maxWidth: 270,
    maxHeight: 270,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
