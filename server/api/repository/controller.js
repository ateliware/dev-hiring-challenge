const models = require("../../database/models");
const async = require('async');

exports.saveOrUpdate = async (req, res) => {
    async.eachOfLimit(req.body, 1, (repoBody, key, callbackRepo) => {
        let listaBuiltBy = [];
        listaBuiltBy = repoBody.builtBy;
        models.Repository.findOne({
            where: {
                author: repoBody.author,
                name: repoBody.name,
                language: repoBody.language
            }
        }).then((retorno) => {
            if (!retorno) {
                async.waterfall([
                    (done) => {
                        delete repoBody.builtBy;
                        models.Repository.create(repoBody).then((retorno) => {
                            return done(null, retorno.dataValues.id);
                        }).catch((err) => {
                            return done(err);
                        })
                    },
                    (repositoryId, done) => {
                        async.eachOfLimit(listaBuiltBy, 1, (obj, key, callback) => {
                            models.Comment.create({
                                "repositoryId": repositoryId,
                                "username": obj.username,
                                "href": obj.href,
                                "avatar": obj.avatar
                            }).then(() => callback()).catch((err) => callback(err));
                        }, (err) => done(err, repositoryId));
                    }
                ], (err, retorno) => callbackRepo(err))
            }
        }).catch((err) => callbackRepo(err))
    }, (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json({status: 'Success'});
    })
}

exports.getAll = async (req, res) => {
    try {
        const Repository = await models.Repository.findAll({
            include: [
                {
                    model: models.Comment,
                    as: "comments"
                }
            ]
        });
        return res.status(200).json({Repository});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const Repository = await models.Repository.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: models.Comment,
                    as: "comments",
                }
            ]
        });
        if (Repository) {
            return res.status(200).json({Repository});
        }
        return res.status(404).send("Repository with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const {repositoryId} = req.params;
        const [updated] = await models.Repository.update(req.body, {
            where: {id: repositoryId}
        });
        if (updated) {
            const updatedRepository = await models.Repository.findOne({where: {id: repositoryId}});
            return res.status(200).json({repostory: updatedRepository});
        }
        throw new Error("Repository not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const {repositoryId} = req.params;
        const deleted = await models.Repository.destroy({
            where: {id: repositoryId}
        });
        if (deleted) {
            return res.status(204).send("Repository deleted");
        }
        throw new Error("Repository not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
