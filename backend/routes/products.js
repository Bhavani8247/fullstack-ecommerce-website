const express = require("express");

const fs = require("fs");

const path = require("path");

const router = express.Router();

const productsPath =
    path.join(__dirname, "../data/products.json");

const products =
    JSON.parse(fs.readFileSync(productsPath));


// GET ALL PRODUCTS

router.get("/", (req, res) => {

    const updatedProducts =
        JSON.parse(fs.readFileSync(productsPath));

    res.json(updatedProducts);

});


// GET SINGLE PRODUCT

router.get("/:id", (req, res) => {

    const updatedProducts =
        JSON.parse(fs.readFileSync(productsPath));

    const productId =
        parseInt(req.params.id);

    const product =
        updatedProducts.find(
            (item) => item.id === productId
        );

    if(!product){

        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

});


// ADD PRODUCT

router.post("/", (req, res) => {

    const newProduct = req.body;

    const updatedProducts =
        JSON.parse(fs.readFileSync(productsPath));

    updatedProducts.push(newProduct);

    fs.writeFileSync(
        productsPath,
        JSON.stringify(updatedProducts, null, 2)
    );

    res.json({
        message: "Product added successfully"
    });

});


module.exports = router;