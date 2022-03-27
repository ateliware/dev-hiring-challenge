import { Router } from "express";
import * as repositoryController from "../controller/repositoryController.js"

const route = Router();

route.get("/most-starred/:language", repositoryController.getMostStarredRepository);

export default route;


