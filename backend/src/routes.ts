import { Router } from 'express';
import { RepositoryController } from './controllers/RepositoryController';

const router = Router();

const repositoryController = new RepositoryController;

router.get('/', (req, res) => res.send({ message: 'Pong' }))
router.get('/repos', repositoryController.featuredRepos);
router.get('/starred_repos', repositoryController.starredRepos);

export { router }