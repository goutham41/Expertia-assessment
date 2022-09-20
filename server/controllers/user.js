const Users = require("../models/user");

module.exports.CreateUser = async (req, res) => {
  const user = new Users(req.body);

  Users.find({ username: req.body.username }).exec((err, succ) => {
    if (err) {
      res.status(201).send({ status: false, message: "some thing went wrong" });
    } else {
      if (succ.length === 1) {
        res.status(200).send(succ[0]._id);
      } else {
        user.save((err, succ) => {
          if (err) {
            return res.status(401).send({
              status: false,
              message: "Error occurred due wrong validation ",
            });
          } else {
            return res.status(200).send({
              status: true,
              message: "successfully created account",
              ...succ._doc,
            });
          }
        });
      }
    }
  });
};

module.exports.LoginUser = async (req, res) => {
  Users.findOne({
    email: req.body.email,
    password: req.body.password,
  }).exec((err, succ) => {
    if (err) {
      return res
        .status(401)
        .send({ status: false, message: "Error due to wrong credentials" });
    } else {
      if (succ === null) {
        return res
          .status(401)
          .send({ status: false, message: "Error due to wrong credentials" });
      } else {
        res.status(200).send({
          status: true,
          message: "login successfully",
          succ,
        });
      }
    }
  });
};
