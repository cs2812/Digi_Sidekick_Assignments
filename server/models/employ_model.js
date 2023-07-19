const mongoose = require("mongoose")

const employ =  new mongoose.Schema({
    employ_name:{type:String, require:true},
    email: { type: String, require: true, unique: true },
    password:{type:String,require:true}
},
{
    versionKey: false,
  }
)

const Employ = mongoose.model("employ",employ)

module.exports = Employ;