const {Router} = require('express');
const { getCategories, addCategory } = require('./Controller/CategoryController');
const { getAddons, addAddon } = require('./Controller/AddonController');
const { addProduct, getProducts } = require('./Controller/ProductController');
const { createOrder, getOrders, getCurrentDayOrders, countCurrentDayOrders, updateOrderStatus } = require('./Controller/OrderController');
const router = Router();

router.get('/getCategories', getCategories)
router.post('/addCategory', addCategory)

router.get('/getAddons', getAddons)
router.post('/addAddon', addAddon)

router.post('/addProduct', addProduct)
router.get('/getProducts', getProducts)

router.post('/createOrder',createOrder)
router.post('/getOrders',getOrders)
router.post('/getCurrentDayOrders', getCurrentDayOrders)
router.get('/countCurrentDayOrders', countCurrentDayOrders)
router.patch('/updateOrderStatus', updateOrderStatus)

module.exports = router;