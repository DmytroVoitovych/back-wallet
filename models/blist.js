const { Schema, model } = require('mongoose');

const blistSchema = Schema(  { // схема данных которые может принимать база / строго типизирована
    token: {
    type: String,
    default: null,
  },
   tokenRefresh: {
    type: String,
    default: null,
    }
},{versionKey:false, timestamps:false});


const Blist = model('blist', blistSchema);

module.exports = {
  Blist
};