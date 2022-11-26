const {Action} = require('../../models/transaction');

const funcGetCurrentUser = async (req, res) => {
    const { email, name, _id } = req.user;

    const curr = await Action.find({ owner: _id }, '');
         
    res.json({
        status: 200,
        data: {
            email,
            name,
            curr_balance: curr.length === (0).toFixed(2)?25000:Number(...curr.slice(-1).map(e=>e.balance)).toFixed(2), //текущий баланс
        },
        

    });

}; 

module.exports = funcGetCurrentUser;