const {Router} = require('express');
const { getCategories, addCategory } = require('./Controller/CategoryController');
const { getAddons, addAddon } = require('./Controller/AddonController');
const { addProduct, getProducts } = require('./Controller/ProductController');
const router = Router();

router.get('/getCategories', getCategories)
router.post('/addCategory', addCategory)

router.get('/getAddons', getAddons)
router.post('/addAddon', addAddon)

router.post('/addProduct', addProduct)
router.get('/getProducts', getProducts)

module.exports = router;