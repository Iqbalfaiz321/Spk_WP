const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

const router = express.Router();

//register User
router.post("/register", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role, });
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//login user
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
        res.json({message: "Login successful", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router