import { Router } from "express";
import { getRecords, getRecordsDataByYear } from "../controllers/records";
import { validateJwt } from "../middlewares";

const router: Router = Router();

router.get('/', [
    validateJwt,
], getRecords);


router.get('/data-by-year', [
    validateJwt,
], getRecordsDataByYear);

export default router;