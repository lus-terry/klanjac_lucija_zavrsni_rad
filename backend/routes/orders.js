
const {isAdmin} = require("../middleware/auth");
const moment = require("moment");
const { Order } = require("../models/order");
const router = require("express").Router();



// CREATE ORDER
router.post("/", async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      console.log("newOrder", newOrder)
      const savedOrder = await newOrder.save();
      console.log("savedOrder", savedOrder)
      res.status(201).send(savedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  
//GET ORDERS

router.get("/", async(req, res) => {

    const query = req.query.new

    try{
        const orders = query 
        ? await Order.find().sort({_id: -1}).limit(5) 
        : await Order.find().sort({_id: -1})
        
        res.status(200).send(orders)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//GET AN ORDER

router.get("/findOne")

//UPDATE ORDER

router.put("/:id", isAdmin, async(req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).send(updatedOrder);
    } catch(err) {
        res.status(500).send(err)
    }
});


//GET ORDER STATS

router.get("/stats", isAdmin, async(req, res) => {
    const previousMonth = moment()
    .month(moment().month()-1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

    try{
        const orders = await Order.aggregate([
            {
                $match: {createdAt: {$gte: new Date(previousMonth)} },
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            },
        ]);
        res.status(200).send(orders);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
 });

 //GET INCOME STATS

router.get("/income/stats", isAdmin, async(req, res) => {
    const previousMonth = moment()
    .month(moment().month()-1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

    try{
        const income = await Order.aggregate([
            {
                $match: {createdAt: {$gte: new Date(previousMonth)} },
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$total"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            },
        ]);
        res.status(200).send(income);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
 });

 //GET 1 WEEK SALES 

router.get("/week-sales", async(req, res) => {
    const last7Days = moment().subtract(7, 'days').format("YYYY-MM-DD HH:mm:ss");

    try{
        const orders = await Order.aggregate([
            {
                $match: {createdAt: {$gte: new Date(last7Days)} },
            },
            {
                $project: {
                    day: {$dayOfWeek: "$createdAt"},
                    sales: "$total",
                }
            },
            {
                $group: {
                    _id: "$day",
                    total: {$sum: "$sales"}
                }
            },
        ]);
        res.status(200).send(orders);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
 });

 // GET ALL INCOME

  router.get("/total-sales", async (req, res) => {
    try {
        // Dohvaćanje podataka o ukupnoj prodaji
        const orders = await Order.aggregate([
            {
                // Projektiranje datuma narudžbe i ukupne prodaje za svaku narudžbu
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: "$total",
                }
            },
            {
                // Grupiranje po datumu narudžbe i sumiranje ukupne prodaje
                $group: {
                    _id: "$date",
                    total: { $sum: "$sales" }
                }
            },
            {
                // Dodavanje dodatne faze agregacije za sumiranje svih ukupnih prodaja
                $group: {
                    _id: null,
                    totalSales: { $sum: "$total" }
                }
            }
        ]);
        // Ako nema podataka o narudžbama, postavite ukupnu prodaju na 0
        const totalSales = orders.length > 0 ? orders[0].totalSales : 0;
        // Slanje odgovora s ukupnom prodajom
        res.status(200).send({ totalSales });
    } catch (err) {
        // Uhvatiti i obraditi pogreške ako se dogode
        console.log(err);
        res.status(500).send(err);
    }
});
    


module.exports = router;