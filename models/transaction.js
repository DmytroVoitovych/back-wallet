// const funcErrorCatch = require('../utils/funcErrorCatch');
// const { Schema, model } = require('mongoose');

// const transactionSchema = Schema(  { // схема данных которые может принимать база / строго типизирована

//     owner: { // что бы каждый пользватель видел только свои транзакции
//       type: Schema.Types.ObjectId,
//       ref: 'user', // название колекции
//     }
// },{versionKey:false, timestamps:true});

// contactSchema.post("save", funcErrorCatch);
// const Action = model('transaction', transactionSchema);

// module.exports = {
//   Action,
// };