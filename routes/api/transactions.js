const express = require('express');
const {ctrPost, ctrGet, ctrSta} = require('../../controlers/transaction/index'); 
const {check, checkToken} = require('../../utils/index');
// const checkFormatId = require('../../validation/funcValidateId');

const router = express.Router();

router.get('/', checkToken, check(ctrGet));

router.get(`/statistics`, checkToken, check(ctrSta));

router.post('/add', checkToken, check(ctrPost));

// router.delete('/:id', checkToken, checkFormatId, check(ctrDell));

// router.put('/:id', checkToken, checkFormatId, check(ctrPut));

// router.patch('/:id/favorite', checkToken, checkFormatId, check(ctrPatch));

module.exports = router;
