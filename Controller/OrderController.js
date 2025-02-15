const Order = require('../Models/OrderModel');
const Expenses = require('../Models/ExpenseModel');

module.exports.createOrder = async (req, res) => {
  const {order_id, items, total_price, change_price, customer_name} = req.body;
  const now = new Date();
  const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

  try {
    const response = await Order.create({order_id, items, total_price, change_price, customer_name, created_at: phTime});
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
  const newDate = new Date(date)
  // const dateFrom = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0);
  // const dateTo = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59, 999);
  const dateFrom = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
  const dateTo = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59, 999));
  
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
//  const dateFrom = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0));
//  const dateTo = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999));
  try {
    const response = await Order.find({status: 'active'});
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
}

module.exports.countCurrentDayOrders = async (req, res) => {
  
  try {
    const response = await Order.find({status: 'active'}).countDocuments();
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
  const dateFrom = new Date(date.split('/')[0])
  const dateTo = new Date(date.split('/')[1])

  console.log(dateFrom)
  console.log(dateTo)

  function formatDateToString(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
}
  
  try {
    const expenses = await Expenses.find({
      expenseDate: { $gte: formatDateToString(dateFrom), $lte: formatDateToString(dateTo) } // Directly filter by Date objects
    });

    const summaryExpenses = expenses.reduce((acc, expense) => {
      const date = formatDateToString(new Date(expense.expenseDate))
      const expenseAmount = expense.total_price
      if (acc[date]) {
        acc[date] += expenseAmount
      } else {
        acc[date] = expenseAmount
      }
      return acc
    }, {})

    //compute daily sales with subtracted expenses
    let orders = await Order.aggregate([
      {
        $match: {
          created_at: { $gte: dateFrom, $lte: dateTo },
          //Only get done status
          $and: [{ status: 'Done' }]
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%m-%d-%Y', date: '$created_at' } },
          total_price: { $sum: '$total_price' }
        }
      }
    ])
    const dailySales = orders.map((order) => {
      const date = formatDateToString(new Date(order._id))
      const totalSales = order.total_price
      const dailySales = totalSales - summaryExpenses[date]
      const dailySale = dailySales || totalSales
      const expense = summaryExpenses[date] || 0
      return { date, dailySale,  expense, totalSales }
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log(dailySales)
    return res.status(200).json(dailySales);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : error.message});
  }
}