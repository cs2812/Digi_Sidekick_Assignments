const mongoose = require("mongoose")

const employee =  new mongoose.Schema({
    employee_name:{type:String, require:true},
    email: { type: String, require: true, unique: true },
    password:{type:String,require:true}
},
{
    versionKey: false,
  }
)

const Employee = mongoose.model("employee",employee)

module.exports = Employee;