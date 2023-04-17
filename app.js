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

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// key = locations
// use header   'x-basic-token'
var secKey = "91d03fd8a7a8c02ea93f50d31fa14132";
function auth(key) {
  if (key === secKey) {
    return true;
  }
  return false;
}

// Conect DB
mongoose
  .connect(mongoUrl)
  .then(console.log("Db Connected"))
  .catch((err) => {
    console.log(err);
  });

// Create locationSchema
let locationSchema = new mongoose.Schema({
  location_id: {
    type: "Number",
  },
  location_name: {
    type: "String",
  },
  state_id: {
    type: "Number",
  },
  state: {
    type: "String",
  },
  country_name: {
    type: "String",
  },
});

// Create Restraunt Schema
let restraundSchema = new mongoose.Schema({
  restaurant_id: {
    type: "Number",
  },
  restaurant_name: {
    type: "String",
  },
  location_id: {
    type: "Number",
  },
  state_id: {
    type: "Number",
  },
  address: {
    type: "String",
  },
  restaurant_thumb: {
    type: "String",
  },
  average_rating: {
    type: "Number",
  },
  rating_text: {
    type: "String",
  },
  cost: {
    type: "Number",
  },
  contact_number: {
    type: "Number",
  },
  mealTypes: {
    type: ["Mixed"],
  },
  cuisines: {
    type: ["Mixed"],
  },
  image_gallery: {
    type: ["String"],
  },
});

// Create locationcollection
const location = mongoose.model("location", locationSchema);

// Create restrauntcollection
const restraunt_data = mongoose.model("restraunt_data", restraundSchema);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/locations", async (req, res) => {
  let key = req.header("x-basic-token");
  if (auth(key)) {
    let result = await location.find();
    res.send(result);
  } else {
    res.send("User unauthorised");
  }
});

app.get("/restraunts", async (req, res) => {
  let key = req.header("x-basic-token");

  if (auth(key)) {
    let result = await restraunt_data.find();
    res.send(result);
  } else {
    res.send("User unauthorised");
  }
});

// Listener
app.listen(4000, () => {
  console.log(`DB Connected at ${port}`);
});
