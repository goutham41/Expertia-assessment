const { Schema, model } = require("mongoose");

const AppliedCompaniesSchema = new Schema(
  {
    company:{type:Object,default:{}},
    status: Boolean,
    user_id: String,
    company_id:String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);
const AppliedCompanies = model("appliedcompaines", AppliedCompaniesSchema);
module.exports = AppliedCompanies;
