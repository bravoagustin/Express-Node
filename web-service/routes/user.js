const router = require('express').Router()

router.get('/', async (req, res) => {
    try{
        const users = await req.context.models.users.find()
        return res.send(users)
    }
     catch(err) {
         res.send(response(500, 'internal server error'))
    }
})

router.get('/:userId', async (req, res) => {
    try{
        const user = await req.context.models.users.findById(req.params.userId)
         res.send(response(200, 'Accepted', user))
    }
     catch(err) {
         res.send(response(404, 'Not found'))
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await req.context.models.users.create({
            username: req.body.username
        })
        res.send(response(200, 'Accepted', user))
    } catch(err) {
        res.send(response(404, 'Not found'))
   }
})
//Modificar
router.put('/:userId', async (req, res) => {
    try{
        const user = await req.context.models.users.findById(req.params.userId)
        if(user){
            user.username = req.body.username
            await user.save()
        }
         res.send(response(200, 'Accepted', user))
    } catch(err) {
        res.send(response(404, 'Not found'))
   }
})

router.delete('/:userId',async (req, res) => {
    try {
        const user = await req.context.models.users.findById(req.params.userId)
    if(user) {
        await user.remove()
    } 
    return res.send(user)
    } catch(err){
        res.send(response(404, 'Not found'))
    }
})

module.exports = router

const response = (code = 200, message = 'Accepted', data = {}) => {
    return {
    StatusCode: code,
    message: message,
    data : data
    }
}