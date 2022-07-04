const express = require("express");
const router = new express();
const Data = require("../models/Userprofile");
const User = require("../models/User");
// const UserProfile = require("../models/Userprofile")

const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      status: "Not logged-in",
      message: "User isn't logged in.!",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        message: "Invaild user",
      });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};
router.get("/users",userAuth, async(req,res)=>{
  // console.log(req.user._id);
  // let ID=req.user._id
  let data = await Data.find();

  
  res.json({
    status: "sucess",
    data: await data,
  });

})
router.get("/user", userAuth, async (req, res) => {
  console.log(req.user._id);
  let ID=req.user._id
  let data1 = await User.find({_id:ID});

  
  res.json({
    status: "sucess",
    data: await data1,
  });
});



router.get("/search/:objectid", async (req, res) => {
  try {
    const objectid = req.params.objectid;
    const data = await Data.findOne({ objectid: objectid });
    if (!data) {
      return res.json({
        status: "Not found",
        message: "post not found",
      });
    }
    // let data = await Data.findOne(PPID: PPID);
    res.json({
      status: "sucess",
      data: await data,
    });
  } catch (e) {
    res.json({
      status: "err",
      message: e.message,
    });
  }
});

router.put("/user/:id", async (req, res) => {
  
  // const dat= await User.findOneAndUpdate({_id:req.params.id})
  // console.log(dat);
  // const data = await User.findOneAndUpdate(
  //   { _id: id },
  //   { $set: { ...data1 } }
  // );
  try {
    const id = req.params.id;
    console.log(req.user);
    const data1 = new Data({ ...req.body});
    const daa = await Data.findOne(
      { _id: id },
      // { $set: { ...data1 } }
    );
    console.log(daa);
    const data = await Data.findOneAndUpdate(
      { id: id },
      { $set: { ...data1 } }
    );
    const inventory = new Data({
      id: id,
      current: req.body.current
    });
console.log(inventory);
const hd=await Data.findOneAndUpdate(
  { _id: id },
  { $set: { ...data1 } }
    
)
console.log(hd);
    res.json({
      status: "sucess",
      data: await data,
      message: "something isnt working",
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
});

module.exports = router;
