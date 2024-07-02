const bcrypt = require('bcryptjs');

const Joi = require("joi");
const express = require("express");
const {User} = require("../models/user")
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

//post - saving data to DB
router.post("/", async(req, res) => {

    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        
    });

    //cheking if body matches schema

        const {error} = schema.validate(req.body)

        if(error) return res.status(400).send(error.details[0].message);
    
    //checking if user  exists

        let user = await User.findOne({email: req.body.email});

        if(!user) return res.status(400).send("Invalid email or password.");

    //validating

        const isValid = await bcrypt.compare(req.body.password, user.password); 

        if(!isValid) return res.status(400).send("Invalid email or password.");

    //generating token

        const token = genAuthToken(user)

        res.send(token)
  
});

module.exports = router;