const { Schema, model } = require("mongoose");

const companiesSchema = new Schema({
    company_name: String,
    logo: String,
    role: String,
    ctc: Number,
    experience: {type:Array,default:[]},
    location:{type:Array,default:[]},
    openinigs: Number,
    process:{type:Array,default:[]},
    description: String,
    additional_information:String
});
const companies = model("compaines", companiesSchema);
module.exports = companies;
