import { Router } from "express";
import { getLabels } from "../controllers/labelsController.js";

const router = Router()

router.get('/', getLabels)

export default router