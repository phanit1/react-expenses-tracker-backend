// imported express
const express = require('express')
//created a router
const router = express.Router();
//used schema by this line
const modeldata = require('./model')

router.get('/', async (req, res) => {
    return res.status(200).send("<h1>Welcome This is Expenses Tracker API</h1> <br> <h2>If you want to get data, use /expenses</h2> <br> <h2>If you want to send data to database, use /postexpense</h2> <br>" +
        "<h2>If you want to get data based on specific username, use /expenses/username</h2> <br>" +
        "<h2>If you want to get data based on specific username and expensedate, use /expenses/username/date</h2><br>")
})
//post request to post expense to db
router.post('/postexpense', async (req, res) => {
    console.log(req.body)
    try {
        let data = await modeldata.findOne({ "Username": req.body.Username, "Income": req.body.Income })
        if (data == null) {
            let user = new modeldata(req.body);
            await user.save();
            return res.status(200).send("Successfully added")
        }
        else {
            return res.status(409).send("User Already Exists with Same Income")
        }
    }
    catch (err) {
        console.log(err)
        return res.status(404).send(err)
    }
})

//get all expenses
router.get("/expenses", async (req, res) => {
    try {
        var result = await modeldata.find({})
        return res.json(result)
    } catch (error) {
        return res.status(500).send(error)
    }
});

// get request to get the expenses by username from db
router.get('/expenses/:username', async (req, res) => {
    try {
        const allexpenses = await modeldata.find({ Username: req.params.username })
        if (allexpenses.length > 0) {
            console.log(allexpenses)
            return res.status(200).send(allexpenses)
        }
        else {
            return res.status(404).send("User Not Found")
        }
    }
    catch (error) { // if database error comes
        console.log(error)
        return res.status(500).send(error)
    }
})

// get request to get the expenses by username and date from db
router.get('/expenses/:username/:date', async (req, res) => {
    try {
        const allexpenses = await modeldata.findOne({ Username: req.params.username, ExpenseDate: req.params.date })
        if (allexpenses) {
            console.log(allexpenses)
            return res.status(200).send(allexpenses)
        }
        else {
            return res.status(404).send("User Not Found")
        }
    }
    catch (error) { // if database error comes
        console.log(error)
        return res.status(500).send(error)
    }
})
module.exports = router