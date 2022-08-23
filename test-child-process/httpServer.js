const http = require('http')
const {fork} = require('child_process')
const host = 'localhost'
const port = 5000

const slowFunction = () => {
    let count = 0
    while (count < 10000000000) {
        count ++
    }
    return count
}

const requestListener = function(req, res) {
    if(req.url === '/total'){
        
        const child = fork(__dirname + "/getCount.js")
        child.on('message', message => {
            console.log('Retornando los resultados de /total')
            res.setHeader('Content-Type', 'aplication.json')
            res.writeHead(200)
            res.end(message)
        })
    
        child.send('osooo')

    } else if (req.url === '/sayhi'){
    
        console.log('retornando los resultados de /sayhi')
        res.setHeader('Content-Type', 'aplication.json')
        res.writeHead(200)
        res.end('{"message":"hola"}')
    
    }
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`El servidor se esta ejecutando en http://${host}:${port}`)
})

