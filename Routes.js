const {Router} = require('express');
const { getCategories, addCategory } = require('./Controller/CategoryController');
const { getAddons, addAddon } = require('./Controller/AddonController');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('./Controller/ProductController');
const { createOrder, getOrders, getCurrentDayOrders, countCurrentDayOrders, updateOrderStatus, getDailyOrders } = require('./Controller/OrderController');
const router = Router();

router.get('/getCategories', getCategories)
router.post('/addCategory', addCategory)

router.get('/getAddons', getAddons)
router.post('/addAddon', addAddon)

router.post('/addProduct', addProduct)
router.get('/getProducts', getProducts)
router.patch('/updateProduct/:_id', updateProduct)
router.delete('/deleteProduct/:_id', deleteProduct)

router.post('/createOrder',createOrder)
router.post('/getOrders',getOrders)
router.post('/getCurrentDayOrders', getCurrentDayOrders)
router.get('/countCurrentDayOrders', countCurrentDayOrders)
router.get('/getDailyOrders/:date', getDailyOrders)
router.patch('/updateOrderStatus', updateOrderStatus)

module.exports = router;