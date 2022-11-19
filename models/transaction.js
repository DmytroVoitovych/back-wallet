const funcErrorCatch = require('../utils/funcErrorCatch');
const { Schema, model } = require('mongoose');

const transactionSchema = Schema(  { // схема данных которые может принимать база / строго типизирована
    type: {
    type: String,
    required: [true, 'Type is required'],    
    enum: ["income", "expense"]  // обьязательный флаг пополнить или снять
    },
    category: {
    type: String,
    enum: ["Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education","Other"],
    default: "Other"
    },
    comment: {
    type: String,
    default: 'no comments',    
    },
    sum: {
     type: Number,   
     required: [true, 'Sum is required'],   
    },
    balance: {
     type: Number,    
     required: [true, 'Balance is required'],
     default: 25000,
    },
    owner: { // что бы каждый пользватель видел только свои транзакции
      type: Schema.Types.ObjectId,
      ref: 'user', // название колекции
    },
    date: {
     type: String,   
    },
     time: {
     type: String,   
    }
},{versionKey:false, timestamps:false});

transactionSchema.post("save", funcErrorCatch);
const Action = model('transaction', transactionSchema);

module.exports = {
  Action
};

