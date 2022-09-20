const AppliedCompanies = require("../models/AppliedCompanies");

module.exports.CreateAppliedCompanies = (req, res) => {
  const company = new AppliedCompanies(req.body);
  company.save((err, succ) => {
    if (err) {
      return res.status(401).send({
        status: false,
        message: "Error occurred due wrong validation ",
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "successfully applied ",
        ...succ._doc,
      });
    }
  });
};

module.exports.GetAppliedCompanies = (req, res) => {
  AppliedCompanies.find({user_id:req.params.id})
  .exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      if (succ.length === 0) {
        return res.status(201).send({
          message: "they is nothing to show",
        });
      } else {
        return res.status(201).send({ succ, status: true, count: succ.length });
      }
    }
  });
};
