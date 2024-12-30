const Cash = require('../Models/CashModel');

module.exports.addCash = async (req, res) => {
    const {cash, cashDate} = req.body;

    console.log(req.body)

    const isExistingCash = await Cash.findOne({cashDate : cashDate});

    if(isExistingCash) {
        try {
            const response = await Cash.findOneAndUpdate({cashDate : cashDate}, {cash : cash});
            return res.status(200).json({cash: response});
        } catch (error) {
            return res.status(500).json({ message: 'Error adding cash', error });
        }
    }
    try {
        const response = await Cash.create({cash, cashDate});
        res.status(200).json({cash: response});
    } catch (error) {
        res.status(500).json({ message: 'Error adding cash', error });
    }
};

module.exports.getCash = async (req, res) => {
    const dateString = req.query.date;

    try {
        const response = await Cash.findOne({cashDate : dateString});
        if(response == null)
        {
            return res.status(200).json({cash: 0})
        }
        else
        {
            return res.status(200).json({cash: response.cash})
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error getting cash' });
    }
};
