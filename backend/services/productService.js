const db = require("../database/db");

exports.createProduct = async (params) => {
  const { name, desc, price, stock, img } = params;

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (title, image, description, price, quantity, short_desc, cat_id) VALUES (?,?,?,?,?,?,?)`,
      [name, img, desc, price, stock, desc, 1],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result) {
          let newProductId = result.insertId;

          resolve({
            message: `Tu producto fue creado con exito con el id ${newProductId}`,
            productId: newProductId,
            statusCode: 201,
          });
        } else {
          reject({
            message: "Error al crear producto",
            statusCode: 500,
          });
        }
      }
    );
  });
};

exports.updateProduct = async (params) => {
  const { id, name, desc, price, stock, img } = params;

  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE products SET title = ?, image = ?, description = ?, price = ?, quantity = ?, short_desc = ?, cat_id = ? 
      WHERE id = (?)`,
      [name, img, desc, price, stock, desc, 1, id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result) {
          if(result.affectedRows > 0){
            resolve({
              message: `Tu producto fue actualizado con exito con el id ${id}`,
              productId: id,
              statusCode: 201,
            });
          }
          else{
            resolve({
              message: `No se encontro un producto con el id ${id}`,
              productId: id,
              statusCode: 204,
            });
          }
        } else {
          reject({
            message: "Error al actualizar producto",
            statusCode: 500,
          });
        }
      }
    );
  });
};

exports.removeProduct = async (params) => {
  const { id } = params;

  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM products WHERE id = (?)`,
      [id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result) {

          resolve({
            message: `Tu producto fue eliminado con exito con el id ${id}`,
            productId: id,
            statusCode: 201,
          });
        } else {
          reject({
            message: "Error al eliminar producto",
            statusCode: 500,
          });
        }
      }
    );
  });
};
