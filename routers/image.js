const { Router } = require("express")
const router = new Router()
const { toJWT, toData } = require('../auth/jwt')

const Image = require("../models").images

router.get("/auth/messy", async (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(" ");
    if (auth && auth[0] === "Bearer" && auth[1]) {
      try {
        const data = toData(auth[1]);
      } catch (e) {
        res.status(400).send("Invalid JWT token");
      }
      const allImages = await Image.findAll();
      res.json(allImages);
    } else {
      res.status(401).send({
        message: "Please supply some valid credentials",
      });
    }
  });

router.get("/", async (req, res, next) => {
    try {
        const updatedImages = await Image.findAll()
        res.send(updatedImages)
    } catch (e) {
        next(e)
    }
})

router.get("/", (req, res, next) => {
    const limit = Math.min(req.query.limit || 25, 500);
    const offset = req.query.offset || 0;
  
    Image.findAndCountAll({ limit, offset })
      .then((result) => res.send({ images: result.rows, total: result.count }))
      .catch((error) => next(error));
  });

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