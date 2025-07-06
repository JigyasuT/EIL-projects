
const {ensureAuthenticated}=require("../middleware/Auth");

const express = require("express");
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
  console.log('---logged in user details ',req.user);
  res.status(200).json({userData:req.user});
})

module.exports=router;