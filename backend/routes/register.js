const bcrypt = require('bcryptjs');

const Joi = require("joi");
const express = require("express");
const {User} = require("../models/user")
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

//post - saving data to DB
router.post("/", async(req, res) => {

    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        
    });

    //cheking if body matches schema

        const {error} = schema.validate(req.body)

        if(error) return res.status(400).send(error.details[0].message);
    
    //checking if user already exists

        let user = await User.findOne({email: req.body.email});

        if(user) return res.status(400).send("User already exists.");

    //creating user

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    
    //hashing

        const salt = await bcrypt.genSalt(10) // randomly generated value 

        user.password = await bcrypt.hash(user.password, salt)

    //saving user

        user = await user.save();

    //generating token
        
        const token = genAuthToken(user);

    //sending token to frontend

        res.send(token);
  
});

module.exports = router;