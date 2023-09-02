const { createProduct, removeProduct } = require("../services/productService");

exports.create_product = async (req, res, next) => {
  const { name, desc, price, stock, img } = req.body;
  createProduct({ name, desc, price, stock, img })
    .then((result) => {
      res.status(result.statusCode).send({ ...result });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.remove_product = async (req, res, next) => {
  const { id } = req.body;
  removeProduct({ id })
    .then((result) => {
      res.status(result.statusCode).send({ ...result });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};
