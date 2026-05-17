const express = require("express");

const fs = require("fs");

const router = express.Router();

const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");


// REGISTER

router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const users =
        JSON.parse(fs.readFileSync(usersPath));

    const existingUser = users.find(
        (user) => user.email === email
    );

    if(existingUser){

        return res.status(400).json({
            message: "User already exists"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);

    fs.writeFileSync(
        usersPath,
        JSON.stringify(users, null, 2)
    );

    res.json({
        message: "Registration successful"
    });

});


// LOGIN

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const users =
        JSON.parse(fs.readFileSync(usersPath));

    const user = users.find(
        (u) =>
            u.email === email &&
            u.password === password
    );

    if(!user){

        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    res.json({
        message: "Login successful",
        user
    });

});


module.exports = router;