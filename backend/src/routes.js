import { Router } from 'express';
import ProgrammingLanguageController from './app/controllers/ProgrammingLanguageController';
import RepositoryController from './app/controllers/RepositoryController';

const router = new Router();

router.post('/repositories', RepositoryController.store);
router.delete('/repositories/:id', RepositoryController.destroy);
router.get('/repositories/:ownerId', RepositoryController.list);
router.get('/repositories/search/:ownerName', RepositoryController.search);

router.get('/programming-languages', ProgrammingLanguageController.index);

export default router;
