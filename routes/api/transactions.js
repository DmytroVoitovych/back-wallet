const express = require('express');
const {ctrPost, ctrGet, ctrSta} = require('../../controlers/transaction/index'); 
const {check, checkToken, checkList} = require('../../utils/index');
// const checkFormatId = require('../../validation/funcValidateId');

const router = express.Router();

router.get('/', checkList, checkToken, check(ctrGet));

router.get(`/statistics`, checkList, checkToken, check(ctrSta));

router.post('/add', checkList, checkToken, check(ctrPost));

module.exports = router;
