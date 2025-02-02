const Order = require('../Models/OrderModel');

module.exports.createOrder = async (req, res) => {
  const {order_id, items, total_price, change_price, customer_name} = req.body;

  try {
    const response = await Order.create({order_id, items, total_price, change_price, customer_name});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.updateOrder = async (req, res) => {
  const {order_id, items, total_price, change_price, customer_name} = req.body;
  try {
    const response = await Order.findOneAndUpdate({order_id}, {items, total_price, change_price, customer_name});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.getOrders = async (req, res) => {
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;
  
  try {
    const response = await Order.find({created_at: {$gte: dateFrom, $lte: dateTo}});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.getDailyOrders = async (req, res) => {
  const date = req.query.date
  const [day, month, year] = date.split('/');
  const dateObject = new Date(year, month - 1, day);
  const newDate = new Date(dateObject)
  const dateFrom = new Date(dateObject.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0);
  const dateTo = new Date(dateObject.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59, 999);
  
  try {
    const response = await Order.find({
      created_at: { $gte: dateFrom, $lte: dateTo },
      $or: [{ status: 'Done' }, { status: 'Cancelled' }]
    });
    // console.log(response)
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({message : error.message});
  }
}

module.exports.getCurrentDayOrders = async (req, res) => {
  const date = new Date();
  const dateFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const dateTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  try {
    const response = await Order.find({created_at: {$gte: dateFrom, $lte: dateTo}, status: 'active'});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.countCurrentDayOrders = async (req, res) => {
  const date = new Date();
  const dateFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const dateTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  
  try {
    const response = await Order.find({created_at: {$gte: dateFrom, $lte: dateTo}, status: 'active'}).countDocuments();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.updateOrderStatus = async (req, res) => {
  const {order_id, status} = req.body;
  try {
    const response = await Order.findOneAndUpdate({order_id}, {status: status});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.getMonthlyOrders = async (req, res) => {
  const date = req.query.date
  const [day, month, year] = date.split('/');
  const dateObject = new Date(year, month - 1, day);
  const newDate = new Date(dateObject)
  const dateFrom = new Date(dateObject.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0);
  const dateTo = new Date(dateObject.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59, 999);
  
  try {
    const response = await Order.find({
      created_at: { $gte: dateFrom, $lte: dateTo },
      $or: [{ status: 'Done' }, { status: 'Cancelled' }]
    });
    // console.log(response)
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({message : error.message});
  }
}