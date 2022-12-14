const {Action} = require('../../models/transaction');

const funcGetTransaction = async ({ user, query }, res) => {

    const { page = 1, limit = 10,  } = query; // пагинация
    const skip = (page - 1) * limit;
     
    if (query.page === undefined) { //отдаю все транзакции при ендпоинте без пагинации
        return res.json({
      status: 200,
      alllist:  await Action.find({ owner: user._id })
    })
    }
  
  const data = await (await Action.find({ owner: user._id }, 'date category type comment sum balance _id', { skip, limit: +limit }).sort({ date: -1, _id:-1 })).reverse();
  const length = data.length;

  return res.json({ 
    status: 200,
    data: data.map(({date, category, type, comment, sum, balance, _id}) => ({date, category, type, comment, sum:sum.toFixed(2), balance:balance.toFixed(2), _id})),
    page: length === 0 ? `sorry this page ${page} empty`: page, 
   })
}; 

module.exports = funcGetTransaction;