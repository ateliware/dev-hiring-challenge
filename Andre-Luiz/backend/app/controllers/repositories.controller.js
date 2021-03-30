const db = require('../models')
const Repository = db.repositories
const Op = db.Sequelize.Op

// Create and Save a new Repository
exports.create = (req, res) => {
    // validate request
    if (!req.body.language) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
        return
    }

    const repository = {
        git_id: req.body.git_id,
        name: req.body.name ? req.body.name : "",
        full_name: req.body.full_name ? req.body.full_name : "",
        language: req.body.language,
        avatar_url: req.body.avatar_url ? req.body.avatar_url : "",
        owner: req.body.owner ? req.body.owner : "",
        stargazers_count: req.body.stargazers_count ? req.body.stargazers_count : 0,
        forks: req.body.forks ? req.body.forks : 0,
        html_url: req.body.html_url ? req.body.html_url : "",
        description: req.body.description ? req.body.description : ""
    }

    Repository.create(repository)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while saving repository."
            })
        })
}

// Retrieve all Repositories from the database.
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Repository.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            })
        })
}

// Find a single Repository with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Repository.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            })
        })
}

// Update a Repository by the id in the request
exports.update = (req, res) => {
    const id = req.params.id

    Repository.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Repository was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Repository with id=${id}. Maybe Repository was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Repository with id=" + id
            })
        })
}

// Delete a Repository with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Repository.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Repository was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Repository with id=${id}. Maybe Repository was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Repository with id=" + id
            })
        })
}

// Delete all Repositories from the database.
exports.deleteAll = (req, res) => {
    Repository.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Repositories were deleted successfully!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all repositories."
            })
        })
}

// Find all published Repositories
exports.findAllPublished = (req, res) => {
    Repository.findAll({ where: { published: true } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving repositories."
            })
        })
}