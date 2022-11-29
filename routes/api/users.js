const express = require('express');
const {check, checkUnique, checkUser, checkToken, checkRefresh, checkList} = require('../../utils/index');
const { ctrSignUp, ctrLogin,  ctrCurrent, ctrLogout, ctrRefresh } = require('../../controlers/login/index');

const router = express.Router();

router.post('/signup', checkUnique, check(ctrSignUp)); // регистрация //двойная валидация

router.post('/login', checkUser, check(ctrLogin)); // вход //двойная валидация

router.post('/refresh', checkRefresh, check(ctrRefresh)); // рефреш //двойная валидация

router.get('/current', checkList, checkToken, check(ctrCurrent)); // проверка текущего пользвателя

router.get('/logout', checkList, checkToken, check(ctrLogout)); // выход


// router.get('/verify/:verificationToken', check(ctrEmail)); //подтверждение почты пользвателя // верификация по почте

// router.post('/verify',  check(ctrRefetchEmail)); // повторная отправка письма для верификации по почте



module.exports = router;