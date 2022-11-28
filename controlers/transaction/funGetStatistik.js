const {Action} = require('../../models/transaction');

const dat = new Date();

const funcGetStatistik = async ({ user, query }, res) => {

    const { month = dat.getMonth() + 1, year = dat.getFullYear() } = query; // пагинация
  
    const curr = await Action.find({ owner: user._id });
    const data = await (await Action.find({
        owner: user._id,
        type: 'income',
        date: query.month !== 'undefined' || !query.month?new RegExp(`.${month}.${year}`):new RegExp(`.${year}`)
    }, 'sum', {}));
    
    const categorys = await Action.aggregate([
        {
            $match: {
                owner: user._id,
                type: 'expense',
                date: query.month !== 'undefined' || !query.month?new RegExp(`.${month}.${year}`):new RegExp(`.${year}`)
            }
        },
        {
            $group: { _id: `$category`, total: { $sum: "$sum" } },
    
    
        },
        { $sort: { total: -1 } },
              
        {
            
            $project: {
                _id: 0, category: '$_id', totalex: "$total"
            },
        }
    ]);

    const totalIncome = data.reduce((prev, { sum }) => prev + sum, 0).toFixed(2); // все приходы за период
    const totalExpense = categorys.reduce((prev, { totalex }) => prev + totalex, 0).toFixed(2); //расходы за период
    
  
      console.log(user);

  return res.json({ 
      status: 200,
      stats: categorys.map(({ totalex, category }) => ({ category, totalex:totalex.toFixed(2) })),
      totalIncome,
      totalExpense,
      currBalance: curr.length === 0?(25000).toFixed(2):Number(...curr.slice(-1).map(e=>e.balance)).toFixed(2),
    
    })
}; // find без аргументов возращает всю колекцию
// const funcGetContacts = async (_, res) =>  res.json({ status: 200, data: await Contact.find({},'name email phone'), }); // вторым аргументом можна передать определенные поля для вывода с колекции

module.exports = funcGetStatistik;