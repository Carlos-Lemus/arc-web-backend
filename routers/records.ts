import { Router } from "express";
import { getRecords, getRecordsDataByYear } from "../controllers/records";

const router: Router = Router();

router.get('/', [
    
], getRecords);


router.get('/data-by-year', [
], getRecordsDataByYear);

export default router;