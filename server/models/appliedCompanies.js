const { Schema, model } = require("mongoose");

const AppliedCompaniesSchema = new Schema(
  {
    company_id: String,
    user_name: String,
    status: Boolean,
    user_id: String,
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
