const Products = require('../Models/ProductModel');

module.exports.addProduct = async (req, res) => {
    const {product_name, product_price, image, variants, addons, category_id} = req.body;
    console.log(req.body)
    try {
        const product = await Products.create({product_name, product_price, image, variants, addons, category_id});
        res.status(200).json({product: product});
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({products: products});
    } catch (error) {
        res.status(500).json({ message: 'Error getting products' });
    }
};