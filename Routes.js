const {Router} = require('express');
const { getCategories, addCategory } = require('./Controller/CategoryController');
const { getAddons, addAddon } = require('./Controller/AddonController');
const { addProduct, getProducts, updateProduct, deleteProduct, changeStatus } = require('./Controller/ProductController');
const { createOrder, getOrders, getCurrentDayOrders, countCurrentDayOrders, updateOrderStatus, getDailyOrders } = require('./Controller/OrderController');
const { addExpense, getExpenses, deleteExpense, updateExpense, computeExpenses } = require('./Controller/ExpenseController');
const { getCash, addCash } = require('./Controller/CashController');
const router = Router();

router.get('/getCategories', getCategories)
router.post('/addCategory', addCategory)

router.get('/getAddons', getAddons)
router.post('/addAddon', addAddon)

router.post('/addProduct', addProduct)
router.get('/getProducts', getProducts)
router.patch('/updateProduct/:_id', updateProduct)
router.delete('/deleteProduct/:_id', deleteProduct)
router.patch('/changeStatus/:_id', changeStatus)

router.post('/createOrder',createOrder)
router.post('/getOrders',getOrders)
router.post('/getCurrentDayOrders', getCurrentDayOrders)
router.get('/countCurrentDayOrders', countCurrentDayOrders)
router.get('/getDailyOrders', getDailyOrders)
router.patch('/updateOrderStatus', updateOrderStatus)

router.post('/addExpense', addExpense)
router.get('/getExpenses', getExpenses)
router.delete('/deleteExpense/:_id', deleteExpense)
router.patch('/updateExpense/:_id', updateExpense)
router.get('/computeExpenses', computeExpenses)

router.get('/getCash', getCash)
router.post('/addCash', addCash)

module.exports = router;