const AppliedCompanies = require("../models/AppliedCompanies");

module.exports.CreateAppliedCompanies = (req, res) => {
  const company = new AppliedCompanies(req.body);
  AppliedCompanies.find({ company_id: req.body.company_id }).exec(
    (err, succ) => {
      if (err) {
        res.send(err);
      } else {
        if (succ.length >= 1) {
          res.send({ ...succ, message: "Already applied" });
        } else {
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
        }
      }
    },
  );
};

module.exports.GetAppliedCompanies = async(req, res) => {
   var totalCount = 0;
 await AppliedCompanies.find({ user_id: req.params.id }).exec((err, succ) => {
    if (succ) {
      totalCount = succ.length;
    }
  });
    let { page, limit } = req.query;
    if (page == undefined) {
      page = 1;
    }
  await AppliedCompanies.find({ user_id: req.params.id })
    .skip(page * limit)
    .limit(limit)
    .exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        if (succ.length === 0) {
          return res.status(201).send({
            message: "they is nothing to show",
          });
        } else {
          return res
            .status(201)
            .send({ succ, status: true, count: totalCount });
        }
      }
    });
};

module.exports.CancelProcess = async(req,res)=>{
   await AppliedCompanies.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: false } },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
}