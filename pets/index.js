const { remote, ipcRenderer } = require('electron');

const win = remote.getCurrentWindow();
let biasX = 0;
let biasY = 0;

document.addEventListener('mousedown', function (e) {
    switch (e.button) {
        case 0:
            biasX = e.x;
            biasY = e.y;
            document.addEventListener('mousemove', moveEvent);
            break;
        case 2:
            ipcRenderer.send('createSuspensionMenu');
            break;
    };
});

document.addEventListener('mouseup', function (e) {
    biasX = 0;
    biasY = 0;
    document.removeEventListener('mousemove', moveEvent);
})

const moveEvent = function (e) {
    win.setPosition(e.screenX - biasX, e.screenY - biasY);
} 
