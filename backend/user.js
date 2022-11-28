const mongoose = require("mongoose");
var conn = mongoose.Collection;
var UserSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    type_of: {
        type:String,
    },
    phone_number: {
        type:String,
    },
    account_address: {
        type:String,
    },
    password: {
        type:String
    }
},
{ timestamps: true }
);

var User=mongoose.model('User',UserSchema);
module.exports=User;