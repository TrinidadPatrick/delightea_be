const Addon = require('../Models/AddonsModel');

module.exports.getAddons = async (req, res) => {
  try {
    const addons = await Addon.find();
    res.status(200).json({addons: addons});
  } catch (error) {
    res.status(500).json({ message: 'Error getting categories' });
  }
};

module.exports.addAddon = async (req, res) => {
  try {
    const addon = await Addon.create({addon_name: req.body.addon_name, addon_price: req.body.addon_price});
    res.status(200).json({addon});
  } catch (error) {
    res.status(500).json({ message: 'Error adding category' });
  }
};