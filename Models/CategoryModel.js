const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: {type : String, required : true},
});

const Category = mongoose.model('Categories', CategorySchema);
module.exports = Category;
