const axios = require('axios')
module.exports = app => {
    const getByLanguage = (req, res) => {
        const page = req.query.page || 1

        axios
            .get(
                `https://api.github.com/search/repositories?q=language:${req.params.language}&s=stars&page=${page}&per_page=3`
            )
            .then(repos => (repos = res.json(repos.data.items)))
            .catch(() => res.send(500))
    }

    const getById = (req, res) => {
        axios
            .get(`https://api.github.com/repositories/${req.params.id}`)
            .then(repos => (repos = res.json(repos.data)))
            .catch(() => res.send(500))
    }

    const save = async (req, res) => {
        let table = 'repositorios'
        if (process.env.NODE_ENV == 'test') {
            table = 'test'
        }

        const result = await app
            .db(table)
            .select('id_github')
            .where({ id_github: req.body.id_github })

        if (result.length != 0) {
            return res.status(409).send('Repositório já salvo')
        }
        const repos = { ...req.body }

        app.db(table)
            .insert(repos)
            .then(_ => res.status(200).send())
            .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('repositorios')
            .select('id_github', 'name', 'image')
            .then(repos => (repos = res.json(repos)))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const rowsDeleted = await app
            .db('test')
            .where({ id_github: req.body.id_github })
            .del()

        if (rowsDeleted == 0) {
            return res.status(400).send('Repos não encontrado')
        }

        res.status(200).send('Repos removido')
    }

    return { getByLanguage, getById, save, get, remove }
}
