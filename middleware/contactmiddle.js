const contact = require('../model/contactmodel')

const middleCheck = (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email required" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = middleCheck;
