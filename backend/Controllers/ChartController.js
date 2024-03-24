const express = require('express');
const Transaction = require("../Models/transaction");
require('dotenv').config();
const PORT = process.env.port || 5000;

exports.barchart = async (req, res) => {
    try {
        const { month } = req.query;
        const targetMonth = month; 

        const startDate = new Date(2022, targetMonth - 1, 1); 
        const endDate = new Date(2022, targetMonth, 0);
        
        const priceRanges = [
            { range: '0 - 100', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $lte: 100 } }) },
            { range: '101 - 200', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 101, $lte: 200 } }) },
            { range: '201 - 300', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 201, $lte: 300 } }) },
            { range: '301 - 400', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 301, $lte: 400 } }) },
            { range: '401 - 500', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 401, $lte: 500 } }) },
            { range: '501 - 600', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 501, $lte: 600 } }) },
            { range: '601 - 700', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 601, $lte: 700 } }) },
            { range: '701 - 800', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 701, $lte: 800 } }) },
            { range: '801 - 900', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 801, $lte: 900 } }) },
            { range: '901-above', count: await Transaction.countDocuments({ dateOfSale: {
                $gte: startDate,
                $lt: endDate
            }, price: { $gte: 901 } }) }
        ];
        res.json({ success: true, priceRanges });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to generate bar chart.' });
    }
};

exports.piechart = async (req, res) => {
    try {
        const { month } = req.query;

        const targetMonth = month; 

        const startDate = new Date(2000, targetMonth - 1, 1); 
        const endDate = new Date(2025, targetMonth, 0);

        const categories = await Transaction.aggregate([
            { $match: { dateOfSale: {
                $gte: startDate,
                $lt: endDate
            } } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        res.json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to generate pie chart.' });
    }
};

exports.combineResponse = async (req, res) => {
    try {
        const { month } = req.query;

        const [transactionsResp, statisticsResp, barChartResp, pieChartResp] = await Promise.all([
            fetch(`http://localhost:${PORT}/api/transactions?month=${month}`),
            fetch(`http://localhost:${PORT}/api/statistics?month=${month}`),
            fetch(`http://localhost:${PORT}/chart/barchart?month=${month}`),
            fetch(`http://localhost:${PORT}/chart/piechart?month=${month}`)
        ]);

        const transactionsData = await transactionsResp.json();
        const statisticsData = await statisticsResp.json();
        const barChartData = await barChartResp.json();
        const pieChartData = await pieChartResp.json();

        const combinedResponse = {
            transactions: transactionsData,
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        };

        res.json({ success: true, data: combinedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch combined data.' });
    }
};