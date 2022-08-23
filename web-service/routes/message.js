const uuid = require('uuid')
const router = require('express').Router()

router.get('/', async (req, res) => {
    try{
        const messages = await req.context.models.messages.find()
        return res.send(messages)
    }
     catch(err) {
         res.send(response(500, 'internal server error'))
    }
})

router.get('/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId])
})

router.post('/', async (req, res) => {
    const message = await req.context.models.messages.create({
        text: req.body.text,
        user: req.context.me.id
    })
    return res.send(message)

    /*
    const id = uuid.v4()
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id
    }
    req.context.models.messages[id] = message
    return res.send(message)
    */
})

router.delete('/:messageId', async (req, res) => {
    const message = await req.context.models.messages.findById(
        req.params.messageId
    )
    if(message) {
        await message.remove()
    } 
    return res.send(message)


    /*
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages
    req.context.models.messages = otherMessages
    return res.send(message)
    */
})

module.exports = router