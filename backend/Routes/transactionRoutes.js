const router = require('express').Router();
const TransactionController = require("../Controllers/TransactionController");


router.get("/initializedb", TransactionController.initializeDatabase)
router.get('/transactions', async(req, res) => {
    const {month, page, perPage, searchText} = req.query;
    try {
        const result = await TransactionController.listTransactions(month, +page, +perPage, searchText);
        res.status(200).json({success: true, message: "data fetched successfully", transactions: result});
    } catch (error) {
        res.status(500).json({ error: error });
    }
})
router.get("/statistics", TransactionController.statistics);

module.exports = router;