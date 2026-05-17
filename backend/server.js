const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);


// HOME ROUTE

app.get("/", (req, res) => {

    res.send("E-Commerce API Running");

});


// PORT

const PORT = process.env.PORT || 5000;


// START SERVER

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});