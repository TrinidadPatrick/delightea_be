const mongoose = require('mongoose');

const AddonsSchema = new mongoose.Schema({
  addon_name: {type : String, required : true},
  addon_price: {type : Number, required : true},
});

const addons = mongoose.model('Addons', AddonsSchema);
module.exports = addons;
