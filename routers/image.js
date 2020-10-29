const { Router } = require("express")
const router = new Router()

const Image = require("../models").images

router.get("/", (req, res) => {
    res.send(req.body)
})

router.post("/", async (req, res, next) => {
    try {
        const { title, url } = req.body
        if(!title || !url) {
            res.status(400).send("missing parameters")
        }
        const newImage = await Image.create({
            title,
            url
        })
        res.json(newImage)
    } catch (e) {
        next(e)
    }
})

module.exports = router