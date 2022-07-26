import {app,ipcMain} from 'electron'
import path from 'path'
export default (win)=>{
    win.webContents.session.on('will-download', (event, item, webContents) => {
        item.setSavePath(path.join(app.getPath('appData'), item.getFilename()))
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                win.webContents.send('downloadFilePath',path.join(app.getPath('appData'), item.getFilename()));
                console.log('Download successfully')
            } else {
                console.log(`Download failed: ${state}`)
            }
        })
    });

    ipcMain.handle("minimize", (event, data) => {
        win.minimize();
    });
}