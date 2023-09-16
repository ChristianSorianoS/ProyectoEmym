const express = require("express");
const router = express.Router();
const db = require("../database/db");
const productController = require("../controllers/productController");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, category = "all" } = req.query;

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  db.query(
    `SELECT p.id, p.title, p.image, p.price, p.short_desc, p.quantity,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id ${ category === "all" ? '' : `WHERE LOWER(c.title) = '${category}' `} LIMIT ${startValue}, ${limit}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity, p.short_desc,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id WHERE p.id = ${productId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
});

// INSERTAR NUEVO PRODUCTO
router.post("/create", productController.create_product);

// MODIFICAR UN PRODUCTO
router.post("/update", productController.update_product);

// BORRAR UN PRODUCTO
router.post("/delete", productController.remove_product);
module.exports = router;
