const ctrSignUp = require('./funcPostSignUp');
const ctrLogin = require('./funcPostLogin');
const ctrCurrent = require('./funcGetCurrentUser');
const ctrLogout = require('./funcGetLogout');
const ctrRefresh = require('./funcPostRefresh');

module.exports = {
    ctrSignUp, 
    ctrLogin,
    ctrCurrent,
    ctrLogout,
    ctrRefresh
        
};