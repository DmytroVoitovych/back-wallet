const {Action} = require('../../models/transaction');
const jwt = require('jsonwebtoken');

const funcGetCurrentUser = async (req, res) => {
    const { email, name, _id, token, tokenRefresh } = req.user;
    
    const { exp} = jwt.decode(token);
    const die = new Date(exp * 1000).getTime();

    const curr = await Action.find({ owner: _id }, '');
    
    res.json({
        status: 200,
        data: {
            email,
            name,
            curr_balance: curr.length === 0?(25000).toFixed(2):Number(...curr.slice(-1).map(e=>e.balance)).toFixed(2), //текущий баланс
            options: ["Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education"],
            token_die: {
                timeFormat: new Date(die).toLocaleTimeString(),
                jsDate: die
            },
            token,
            tokenRefresh
        },
        

    });

}; 

module.exports = funcGetCurrentUser;