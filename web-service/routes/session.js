const router = require('express').Router()

router.get('/', async (req, res) => {
    const user = await req.context.models.users
        .findById(req.context.me.id)
    return res.send(user)    
})

module.exports = router