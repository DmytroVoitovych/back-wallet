const ctrSignUp = require('./funcPostSignUp');
const ctrLogin = require('./funcPostLogin');
const ctrCurrent = require('./funcGetCurrentUser');
const ctrLogout = require('./funcGetLogout');


module.exports = {
    ctrSignUp, 
    ctrLogin,
    ctrCurrent,
    ctrLogout,
        
};