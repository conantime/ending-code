const  {
    BrowserWindow,
    ipcMain,
    screen,
    Menu,
    shell,
    app,
    webContents,
    ipcRenderer,
} = require("electron");
const path = require("path");
const { argv } = require("process");

const winURL =
    process.env.NODE_ENV === "development"
        ? `http://localhost:3000/main_window#/suspension`
        : `file://${__dirname}/index.html`;
        

console.log(winURL)

var win = null;

app.on('ready', function() {
    createSuspensionWindow();  
});

ipcMain.on('showSuspensionWindow', () => {
    console.log(win)
    if (win) {
        win.showInactive();
    } else {
        createSuspensionWindow();
    }
 })

ipcMain.on('createSuspensionMenu', (e) => {
    const rigthM = Menu.buildFromTemplate([
        {
            label: '启动Chrome',
            click: () => {
                shell.openExternal("http://www.google.com")
            }
        }, {
            label: '启动todo',
        },
        {
            label: 'Exit',
            click: () => {
                app.quit();
            }
        }
    ]);
    rigthM.popup({})
})

const createSuspensionWindow = function () {
    console.log('ready to build')
    win = new BrowserWindow({
        width: 80,
        height: 80,
        type: "toolbar",
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        transparent: true,
        alwaysOnTop: true
    });

    const size = screen.getPrimaryDisplay().workAreaSize;
    const winSize = win.getSize();
    win.setPosition(size.width - winSize[0], 100);
    win.loadURL(winURL);

    win.once('ready-to-show', () => {
        win.show()
    });

    win.on('close', () => {
        win = null;
    });
}


const registerProtocol = function () {
    const PROTOCOL = 'myapp';

    const args = [];
    if (!app.isPackaged) {
        args.push(path.resolve(process.argv[1]));
    }

    args.push('--');
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, args);
}


// 监听不同系统的实例注册
// macOS
app.on('open-url', (event, urlStr) => {
    handleUrl(urlStr);
})

// windows
app.on('second-instance', (event, argv) => {
    if (process.platform === 'win32') {
        handleArgv(argv);
    }
})

const handleArgv = function (argv) {
    const prefix = `${PROTOCOL}:`;
    const offset = app.isPackaged ? 1 : 2;

    const url = argv.find((arg, i) => i >= offset && arg.startsWith(prefix));
    if (url) handleUrl(url);
}

let autoLoginData = null;

const handleUrl = function (urlStr) {
    const urlObject = new URL(urlStr);
    const { searchParams } = urlObject;
    let userId = searchParams.get('userid');
    let sectionId = searchParams.get('sectionid');
    console.log(userId);
    console.log(sectionId);

    autoLoginData = {
        'userid': userId,
        'sectionid': sectionId
    };

    console.info(autoLoginData);
}