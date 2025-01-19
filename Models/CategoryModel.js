const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: {type : String, required : true},
  created_at: {type : Date, default : Date.now}
});

const Category = mongoose.model('Categories', CategorySchema);
module.exports = Category;
