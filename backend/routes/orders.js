const express = require("express");

const fs = require("fs");

const path = require("path");

const router = express.Router();

const ordersPath =
    path.join(__dirname, "../data/orders.json");


// CREATE ORDER

router.post("/", (req, res) => {

    const newOrder = req.body;

    const orders =
        JSON.parse(fs.readFileSync(ordersPath));

    orders.push(newOrder);

    fs.writeFileSync(
        ordersPath,
        JSON.stringify(orders, null, 2)
    );

    res.json({
        message: "Order placed successfully"
    });

});


// GET ALL ORDERS

router.get("/", (req, res) => {

    const orders =
        JSON.parse(fs.readFileSync(ordersPath));

    res.json(orders);

});


module.exports = router;