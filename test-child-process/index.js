const fs = require('fs').promises

async function readFile(filePath) {
    try{
        const data = await fs.readFile(filePath)
        console.log(data.toString())
    } catch {
        console.error(`Error al tratar de leer el archivo ${err.message}`)
    }
}

// readFile('test.txt')
//Asi creamos un archivo test csv
async function openFile() {
    try{
        const csvHeaders = 'nombre, cantidad, precio'
        await fs.writeFile('test.csv', csvHeaders)
    } catch {
        console.error(`Error al tratar de escribir el archivo ${err.message}`)
    }
}

// openFile()

async function addTestItem(name, quantity, price){
    try{
        const csvLine = `\n${name}, ${quantity}, ${price}`
        await fs.writeFile('test.csv', csvLine, {flag: 'a'})
    }catch{
        console.error(`Error al tratar de escribir el archivo ${err.message}`)
    }
}

//sobreescribe el archivo openFile test.csv

// (async function () {
//     await openFile()
//     await addTestItem('papas', '10', '200')
//     await addTestItem('huevos', '12', '100')
// })()

async function deleteFile(filePath){
    try{
        await fs.unlink(filePath)
        console.log(`${filePath} borrado`)
    }catch{
        console.error(`Error al tratar de escribir el archivo ${err.message}`)
    }
}

// deleteFile('test.csv')

async function moveFile(oldPath, newPath){
    try{
        await fs.rename(oldPath, newPath)
        console.log(`de ${oldPath} a ${newPath} `)
    }catch{
        console.error(`Error al tratar de mover el archivo ${err.message}`)
    }
}

// moveFile('test.txt', 'file-store/text-1.txt')