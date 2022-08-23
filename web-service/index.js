const env = require('node-env-file')
env(__dirname + '/.env')
const express = require('express')
const cors = require('cors')
const models = require('./models').models
const connectDb = require('./models').connectDb
const routes = require('./routes')
const router = require('./routes/session')
const { Router } = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.users.findByLogin('nflanders')
    }
    next()
})
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

const eraseDatabase = true

connectDb().then(async () => {
    if(eraseDatabase) {
        await Promise.all([
            models.users.deleteMany({}),
            models.messages.deleteMany({})
        ])
        createData()    
    }
    app.listen(process.env.PORT, () => {
        console.log(`Servidor express ejecutándose en el puerto ${process.env.PORT}`)
    })
})

const createData = async () => {
    const user1 = new models.users({
        username: 'Homero Simpson.'
    })
    const user2 = new models.users({
        username: 'Ned Flanders.'
    })

    const message1 = new models.messages({
        text: '-Mmmmmm.... más rosquillas.',
        user: user1.id
    })

    const message2 = new models.messages({
        text: '-Hola vecinilloo.',
        user: user2.id
    })

    const message3 = new models.messages({
        text: '-Hola Todd, hola Rod.',
        user: user2.id
    })

    await user1.save()
    await user2.save()

    await message1.save()
    await message2.save()
    await message3.save()
}
