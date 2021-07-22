const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const user = req.body.data.user;
  const password = req.body.data.password;

  if (!user  || !password) {
    return res.json({
      error: true,
      message: "Debe completar ambos campos",
    });
  }
  const admin = await Admin.findOne({
    where: {
      user
    },
  });
  if (!admin) {
    return res.json({
      error: true,
      message: "Credenciales incorrectas",
    });
  }

  const verificarPassword = bcrypt.compareSync(
    password,
    admin.password,
  );
  if (!verificarPassword) {
    return res.json({
      error: true,
      message: "Credenciales incorrectas",
    });
  }

  const payload = {
    check: true,
  };
  const token = jwt.sign(payload, process.env.LLAVE, {
    expiresIn: 1440,
  });

  res.json({
    mensaje: "Autenticación correcta",
    token: token,
  });
};

const verificarToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, process.env.LLAVE, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      mensaje: "Token no proveída.",
    });
  }
};

const verificarTokenUser = (req, res) => {
  const token = req.body.data.token;
  if (token) {
    jwt.verify(token, process.env.LLAVE, (err, decoded) => {
      if (err) {
        return res.json({error: true, message: 'Token inválido' });
      } else {
        req.decoded = decoded;
        res.json({
          error: false,
          message: 'Token valido'
        });
      }
    });
  } else {
    res.json({
      error: true,
      mensaje: "Token no proveída.",
    });
  }
}

module.exports = {
  login,
  verificarToken,
  verificarTokenUser
};
