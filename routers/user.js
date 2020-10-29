const { Router } = require("express")
const router = new Router()
const bcrypt = require('bcrypt')

const User = require("../models").user

router.get("/", (req, res) => {
    res.send(req.body)
})

router.post("/", async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body
        if(!email || !password || !fullName) {
            res.status(400).send("missing parameters")
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName
        })
        res.json(newUser)
    } catch (e) {
        next(e)
    }
})

module.exports = router