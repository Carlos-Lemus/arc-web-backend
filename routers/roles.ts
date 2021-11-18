import { Router } from "express";
import { getRoles } from "../controllers/roles";
import { validateJwt } from "../middlewares";

const router = Router();

router.get('/', [
    validateJwt,
], getRoles)

export default router;