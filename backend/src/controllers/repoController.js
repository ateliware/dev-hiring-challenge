
const repoRepository = require('../repositories/repoRepository')


async function getTodos(req, res, next){
    
    const repo = await repoRepository.getRepoTodos()
    res.json(repo);
}

async function getRepoPorId(req, res, next){
    const repo = req.params.repo
    const repoData = await repoRepository.getRepoPorId(repo)
    res.json(repoData)
}


async function inserirRepo(req, res, next){

    const {name, description, language, html_url} = req.body
    console.log('backend = '+name, description, language, html_url)

    const repo = await repoRepository.insertRepo({
        name,
        description,
        language,
        html_url
    })
    res.status(201).json(repo.get({ plain: true}))
}

async function deleteRepo(req, res, next) {
    const id = req.params.id;
    const repo = await repoRepository.getRepoPorId(id);
    await repoRepository.deleteRepo(id)
    res.sendStatus(204);
}

module.exports = {
    getTodos,
    getRepoPorId,
    inserirRepo ,
    deleteRepo   
}