const slowFunction = () => {
    let count = 0
    while (count < 10000000000) {
        count ++
    }
    return count
}

process.on('message', message => {
    if(message == 'START'){
        console.log('El proceso secundario recibio el mensaje START')
        let result = slowFunction()
        let messsage = `{"Total count" : ${result}}`
        process.send(message)
    } 
    if(message == 'osooo') {
        console.log('el proceso recibio osoo')
        let messsage = `{"Total count" : 0}`
        process.send(message)
    }
})
