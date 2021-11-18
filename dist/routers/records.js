"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const records_1 = require("../controllers/records");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validateJwt,
], records_1.getRecords);
router.get('/data-by-year', [
    middlewares_1.validateJwt,
], records_1.getRecordsDataByYear);
exports.default = router;
//# sourceMappingURL=records.js.map