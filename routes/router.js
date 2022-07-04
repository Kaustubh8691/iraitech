const router = require("express").Router();
const User = require("../models/User");
const UserProfile = require("../models/Userprofile")
// const userLogin = require("../controllers/userLogin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const user

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      status: "Not registerd",
      message: "User isn't register",
    });
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).json({
      status: "Not authorize",
      message: "Password is wrong",
    });
  }

  var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res.json({
    status: "sucess",
    token: token,
    UserID: user._id,
    UserName: user.UserName,
  });
});

router.post("/Signup", async (req, res) => {
  // const data = new User({
  //   ...req.body,
  //   UserName : name,
  //   UserID : UserID
  // });
  const user = await User.findOne({ email: req.body.email });
  
  if (!user) {
    const name = req.body.email.substring(0, req.body.email.lastIndexOf("@"));
    const UserID = req.body.UserID;

    const hashPass = await bcrypt.hash(req.body.password, 10);

    const data = new User({
      ...req.body,
      password: hashPass,
      UserName: name,
      userid: UserID
    });
    const data1=new UserProfile({
      ...req.body,
      password: hashPass,
      UserName: name,
      objectID:req.body.UserID
    })
    res.status(200).json({
      status: "sucess",
      data1: await data1.save(),
      data: await data.save(),
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "user is already register",
    });
  }

  
});



module.exports = router;
