const mongoose = require("mongoose");

const data = mongoose.Schema({
    Username : {
        type : String,
        required : true
    },
    Income : {
        type: Number,
        default: 0,
        required : true
        } ,
    ExpenseDate : {
        type: Date,
        default: new Date(),
        required: true
    },
    ExpenseDesc : {
        type :String,
        required :true
    },
    Expense : {
        type :Number,
        required : true
    }
    
})

module.exports = mongoose.model("expenses", data);