const mongoose = require("mongoose");
const userprofileSchema = new mongoose.Schema({

    email: {
      required: true,
      type: String,
      match: /.+\@.+\..+/,
      lowercase: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    UserName:{
      type: String
    },
    objectid:{
        type: String
    }
    
  
},{strict:false});


const UserProfile = mongoose.model("UserProfile", userprofileSchema);

module.exports = UserProfile;
