const Category = require('../Models/CategoryModel');

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({categories: categories});
  } catch (error) {
    res.status(500).json({ message: 'Error getting categories' });
  }
};

module.exports.addCategory = async (req, res) => {
  // console.log(req.body.category_name);
  try {
    const category = await Category.create({category_name: req.body.category_name});
    res.status(200).json({category: category});
  } catch (error) {
    res.status(500).json({ message: 'Error adding category' });
  }
};