const express = require('express');
const Transaction = require("../Models/transaction");

exports.initializeDatabase = async(req,res) => {
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = await response.json();
        await Transaction.insertMany(transactions);
        res.status(201).json({success: true, message: "Database Initialised with seed data"})

    } catch (error) {
        res.status(500).json({success: false, message: "Some error occured", error: error})
    }
}

exports.listTransactions = async(month, page, perPage, searchText="") => {
   try {
    const targetMonth = month; 

    if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
        throw new Error('Invalid month.');
    }

    const query = {
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, targetMonth]
        }
    };
   
    let priceFilter = {};
    if (!isNaN(searchText)) {
        priceFilter = { price: parseFloat(searchText) };
    }

      if (searchText) {
        query.$or = [
          { title: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
          { category: { $regex: searchText, $options: 'i' } },

 
    ];
    
    const parsedPrice = parseFloat(searchText);
            if (!isNaN(parsedPrice)) {
                query.$or.push({ price: parsedPrice });
            }

      }
    
      const totalCount = await Transaction.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
    
      const transactions = await Transaction.find({sold: true, $and:[query]})
        .skip((page - 1) * perPage)
        .limit(perPage);
    
    return transactions;
   } catch (error) {
    console.error(error);
   }
}

exports.statistics = async(req, res) => {
    try {
        const { month } = req.query;
        const targetMonth = month; 

        
    if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
        throw new Error('Invalid month.');
    }

        const startDate = new Date(2022, targetMonth - 1, 1); 
        const endDate = new Date(2022, targetMonth, 0);
        

        const totalSaleAmount = await Transaction.aggregate([
            { $match:{dateOfSale: {
                    $gte: startDate,
                    $lt: endDate
                }, sold: true } },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);
        const totalSoldItems = await Transaction.countDocuments({dateOfSale: {
            $gte: startDate,
            $lt: endDate
        }, sold: true });
        const totalNotSoldItems = await Transaction.countDocuments({dateOfSale: {
            $gte: startDate,
            $lt: endDate
        }, sold: false });
        res.status(200).json({ success: true, totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve statistics.' });
    }
};



