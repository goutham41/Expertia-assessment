require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const cors = require("cors");
const CompaniesRouter = require("./routes/companies");
const AccountRouter = require("./routes/user")
const AppliedCompaniesRouter = require("./routes/appliedcompaines")
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://rapidhiring.netlify.app/"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use("/start", (req, res) => {
  try {
    res.status(201).send("server started");
  } catch (error) {
    res.status(401).send(error);
  }
});
app.use("/companies",CompaniesRouter);
app.use("/account",AccountRouter);
app.use("/applied", AppliedCompaniesRouter);
app.listen(process.env.PORT, async () => {
  await connection;
  console.log("connected to db");
  console.log(`Server started on ${process.env.PORT}`);
});
