// importing express
const express = require("express")
// importing body  parser
const bodyParser = require("body-parser")
// importing mongoose for database connection
const mongoose = require("mongoose")

const app = express()
const url = "mongodb+srv://ppaproject:Teamwork12@sample-sxout.mongodb.net/ExpensesDB?retryWrites=true&w=majority"; // setting mongodb database url
const cors = require("cors")

//to use router we need to import
const authRouters = require('./route')

app.use(cors())
app.use(bodyParser.json())
app.use(authRouters)

//connecting mongo
//to ignoring warnings
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// connecting database
mongoose.connection.on("connected", () => {
    console.log("connected to mongo")
})

// database connection error
mongoose.connection.on("error", (err) => {
    console.log("this is error", err)
})

// connecting port 
app.listen(process.env.PORT||8000 ,() => {
    console.log("server running")
})