const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
const products = require("./products")
const app = express()
const stripe = require("./routes/stripe")
const productsRoute = require("./routes/products")
const users = require("./routes/users")
const orders = require("./routes/orders")
const bodyParser = require('body-parser');

require("dotenv").config()

app.use(bodyParser.json({ limit: '50mb' })); // adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json())
app.use(cors())

app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/stripe", stripe)
app.use("/api/products", productsRoute)
app.use("/api/users", users)
app.use("/api/orders", orders)

app.get("/", (req, res) => {
    res.send("Welcome to our online shop API...")
})

app.get("/products", (req, res) => {
    res.send(products);
})


//const port = 5000
 port = process.env.PORT || 5000
const uri = process.env.DB_URI

app.listen(port, console.log(`Server running on ${port}`));


//connecting to DB

mongoose.connect(uri, {
 
}).then(() => console.log("MongoDB conncetion successfull."))
.catch((err) => console.log("MongoDB connection failed.", err.message));