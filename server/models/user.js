const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  gender:String
});
const Users = model("User", UserSchema);
module.exports = Users;
