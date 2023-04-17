let express = require("express");
let mongoose = require("mongoose");
let app = express();
// let mongo = require("mongodb");
// let MongoClient = mongo.MongoClient;
let dotenv = require("dotenv");
dotenv.config();
const mongoUrl = process.env.mongoUrl;
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8700;
const axios = require("axios");
// var db;

let authKey = "757ddd9a97d365906e7ad80e9dee2fee";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Conect DB
mongoose
  .connect(mongoUrl)
  .then(console.log("Db Connected"))
  .catch((err) => {
    console.log(err);
  });

// Create Schema
let locationSchema = new mongoose.Schema({
  location_id: Number,
  location_name: String,
  state_id: Number,
  state: String,
  country_name: String,
});

// key = locations
var secKey = "91d03fd8a7a8c02ea93f50d31fa14132";

// Create Collection
const location = mongoose.model("location", locationSchema);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/locations", async (req, res) => {
  let key = req.header("x-basic-token");
  if (key === secKey) {
    let result = await location.find();
    res.send(result);
  } else {
    res.status(404).send("Unauthorised Access");
  }
});

app.listen(4000, () => {
  console.log(`DB Connected at ${port}`);
});
