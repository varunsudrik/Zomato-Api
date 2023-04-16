let express = require("express");
let app = express();

let mongo = require("mongo");
let MongoClient = mongo.MongoClient;
let dotenv = require("dotenv");
dotenv.config();
let mongoUrl = process.env.mongoUrl;
let bodyParser = require("body-parser");
let cors = require("cors");
const { application } = require("express");
let PORT = process.env.PORT || 4200;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
