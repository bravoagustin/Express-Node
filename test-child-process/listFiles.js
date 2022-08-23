const {exec} = require('child_process')

exec('dir /a', (error, stdout, stderr) => {
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
})
//procesos secundarios, recibe tres parametros