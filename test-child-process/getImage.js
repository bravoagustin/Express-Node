const {execFile} = require('child_process')

execFile(__dirname + '/file.bat', (error, stdout, stderr) => {
    if(error) {
        console.error(`error \n${error.message}`)
            return
        }
        if(stderr){
        console.log(`stderr: \n${stderr}`)
        return
        }
        if(stdout){
            console.log(`stdout: \n${stdout}`)
            return
            }
    }
)