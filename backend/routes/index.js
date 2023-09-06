const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const productsRoute = require("./products");
const ordersRoute = require("./orders");

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/products", productsRoute);
router.use("/orders", ordersRoute);

module.exports = router;
