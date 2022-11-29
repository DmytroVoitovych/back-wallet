const express = require('express');
const {ctrPost, ctrGet, ctrSta} = require('../../controlers/transaction/index'); 
const {check, checkToken, checkList} = require('../../utils/index');
// const checkFormatId = require('../../validation/funcValidateId');

const router = express.Router();

router.get('/', checkList, checkToken, check(ctrGet));

router.get(`/statistics`, checkList, checkToken, check(ctrSta));

router.post('/add', checkList, checkToken, check(ctrPost));

// router.delete('/:id', checkToken, checkFormatId, check(ctrDell));

// router.put('/:id', checkToken, checkFormatId, check(ctrPut));

// router.patch('/:id/favorite', checkToken, checkFormatId, check(ctrPatch));

module.exports = router;
