module.exports = app => {
    const repositories = require("../controllers/repositories.controller")

    var router = require("express").Router()

    router.post("/", repositories.create)
    router.get("/", repositories.findAll)
    router.get("/published", repositories.findAllPublished)
    router.get("/:id", repositories.findOne)
    router.put("/:id", repositories.update)
    router.delete("/:id", repositories.delete)
    router.delete("/", repositories.deleteAll)

    app.use('/api/repositories', router)
}