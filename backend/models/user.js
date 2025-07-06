const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  engineeringField: { type: String, required: true },
  yearofStudy: { type: String, required: true },
  academicDocument: { type: String },
  password: { type: String, required: true }
  // confirmPassword removed
});



const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;