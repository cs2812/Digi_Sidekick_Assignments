const mongoose = require("mongoose")

const user =  new mongoose.Schema({
    username:{type:String, require:true},
    email: { type: String, require: true, unique: true },
    gender:{type:String,require:true,enum:["male","female"]},
    married:{type:Boolean,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    age:{type:Number,require:true},
},
{
    versionKey: false,
  }
)

const User = mongoose.model("user",user)

module.exports = User;