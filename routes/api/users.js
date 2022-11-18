const express = require('express');
const {check, checkUnique, checkUser, checkToken} = require('../../utils/index');
const { ctrSignUp, ctrLogin,  ctrCurrent, ctrLogout, ctrSub } = require('../../controlers/login/index');

const router = express.Router();

router.post('/signup', checkUnique, check(ctrSignUp)); // регистрация //двойная валидация

router.post('/login', checkUser, check(ctrLogin)); // вход //двойная валидация

router.get('/current', checkToken, check(ctrCurrent)); // проверка текущего пользвателя

router.get('/logout', checkToken, check(ctrLogout)); // выход


// router.get('/verify/:verificationToken', check(ctrEmail)); //подтверждение почты пользвателя // верификация по почте

// router.post('/verify',  check(ctrRefetchEmail)); // повторная отправка письма для верификации по почте



module.exports = router;