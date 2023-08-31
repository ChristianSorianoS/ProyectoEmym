const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;
  const hashedPassword = md5(password.toString());

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          reject({
            data: err,
            message: "Algo salio mal, por favor re intentalo nuevamente",
            statusCode: 400,
          });
        }

        if (result.length === 0) {
          reject({
            message: "Credenciales invalidas, por favor re intentalo nuevamente",
            statusCode: 400,
          });
        }

        if (result.length > 0) {
          const token = jwt.sign({ data: result }, "secret");
          resolve({
            message: "Inicio de sesion exitoso",
            data: result,
            token,
          });
        }
      }
    );
  });
};

exports.registerUser = async (params) => {
  const { error } = registerValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, email, password } = params;
  const hashedPassword = md5(password.toString());

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email FROM users WHERE email = ?`,
      [email],
      (err, result) => {
        if (result.length > 0) {
          reject({
            message: "Email ya se encuentra registro, por favor usa uno distinto",
            statusCode: 400,
          });
        } else if (result.length === 0) {
          db.query(
            `INSERT INTO users (fname, email, password) VALUES (?,?,?)`,
            [fullName, email, hashedPassword],
            (err, result) => {
              if (err) {
                reject({
                  message: "Algo salio mal, por favor re intentalo nuevamente",
                  statusCode: 400,
                  data: err,
                });
              } else {
                const token = jwt.sign({ data: result }, "secret");
                resolve({
                  data: result,
                  message: "Registro exitoso.",
                  token: token,
                  statusCode: 200,
                });
              }
            }
          );
        }
      }
    );
  });
};
