const companies = require("../models/companies");

module.exports.Createcompanies = (req, res) => {
  const company = new companies(req.body);
  company.save((err, succ) => {
    if (err) {
      return res.status(401).send({
        status: false,
        message: "Error occurred due wrong validation ",
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "new companies added",
        ...succ._doc,
      });
    }
  });
};

module.exports.Getcompanies = (req, res) => {
  let { page, limit } = req.query;
  if (page == undefined) {
    page = 1;
  }
  companies
    .find()
    .skip(page * limit)
    .limit(limit)
    .exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        if (succ.length === 0) {
          return res.status(201).send({
            message: "data not present keep different page number",
          });
        } else {
          return res.status(201).send({ succ, status: true,count:succ.length });
        }
      }
    });
};
