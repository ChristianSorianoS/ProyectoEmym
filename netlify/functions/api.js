const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const serverless = require("serverless-http");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router index
const indexRouter = require("../../backend/routes/index");

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).send("Health Check");
});


app.use("/api/v1/", indexRouter);


module.exports.handler = serverless(app);

