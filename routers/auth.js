const { Router } = require('express')
const { toJWT, toData } = require('../auth/jwt')

const User = require('../models').user

const router = new Router()

router.post("/", async (req, res, next) => {
try {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).send({
            message: "Please supply a valid email and password",
          });
    }
    res.send({
        jwt: toJWT({ userId: 1 }),
      });
} catch (e) {
    next(e)
}
})

module.exports = router
