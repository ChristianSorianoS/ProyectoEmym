const db = require("../database/db");

exports.createOrder = async (params) => {
  const { userId, cart } = params;

  if (!cart) throw { message: "El carro no ha sido encontrado", statusCode: 400 };
  if (!userId) throw { message: "El usuario no ha sido encontrado", statusCode: 400 };

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO orders (user_id) VALUES (?)`,
      [userId],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result) {
          let newOrderId = result.insertId;
          cart.products.forEach(async (prod) => {
            db.query(
              `SELECT p.quantity FROM products p WHERE p.id = ?`,
              [prod.id],
              (err, result) => {
                if (err) reject({ message: err, statusCode: 500 });

                let productQuantity = result[0].quantity; 

                // CAPTAR LA CANTIDAD DE PRODUCTOS QUE ESTÁN EN LA ORDEN
                let updatedQuantity = productQuantity - prod.quantity;
                if (updatedQuantity > 0) {
                  productQuantity = updatedQuantity;
                } else productQuantity = 0;

                db.query(
                  `INSERT INTO orders_details (order_id, product_id, quantity) VALUES (?,?,?)`,
                  [newOrderId, prod.id, prod.quantity],
                  (err, result) => {
                    if (err) reject({ message: err, statusCode: 500 });

                    db.query(
                      `UPDATE products SET quantity = ${productQuantity} WHERE id = ${prod.id}`,
                      (err, result) => {
                        if (err) reject({ message: err, statusCode: 500 });
                        console.log(result);
                      }
                    );
                  }
                );
              }
            );
          });

          resolve({
            message: `Tu pedido fue ingresado con exito con el id ${newOrderId}`,
            orderId: newOrderId,
            products: cart.products,
            statusCode: 201,
          });
        } else {
          reject({
            message: "Error al ingresar tu pedido",
            statusCode: 500,
          });
        }
      }
    );
  });
};

exports.getSingleOrder = async (params) => {
  const { orderId, userId } = params;

  if (!orderId) throw { message: "No se encuentra la orden", statusCode: 400 };
  if (!userId) throw { message: "No se encuentra el usuario", statusCode: 400 };

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM orders INNER JOIN orders_details ON ( orders.id = orders_details.order_id ) WHERE orders.id = ? AND orders.user_id = ?`,
      [orderId, userId],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0)
          reject({ message: "Pedido no encontrado", statusCode: 400 });

        resolve({
          statusCode: 200,
          message: `Pedido encontrado`,
          data: result,
        });
      }
    );
  });
};

exports.getOrders = async (params) => {
  const { userId } = params;

  if (!userId) throw { message: "El ususario no fue encontrado", statusCode: 400 };

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM orders INNER JOIN orders_details ON ( orders.id = orders_details.order_id ) WHERE user_id = ?`,
      [userId],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0)
          reject({ message: "No se encontraron pedidos", statusCode: 400 });

        resolve({
          statusCode: 200,
          message: `${result.length} pedidos fueron encontrados`,
          data: result,
        });
      }
    );
  });
};
