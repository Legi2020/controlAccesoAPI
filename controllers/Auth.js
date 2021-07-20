const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  if (!req.body.user || !req.body.password) {
    return res.json({
      error: true,
      message: "Debe completar ambos cambios",
    });
  }
  const admin = await Admin.findOne({
    where: {
      user: req.body.user,
    },
  });
  if (!admin) {
    return res.json({
      error: true,
      message: "Credenciales incorrectas",
    });
  }

  const verificarPassword = bcrypt.compareSync(
    req.body.password,
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

module.exports = {
  login,
  verificarToken,
};
