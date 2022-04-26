import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

exports.firstMiddleware = (req, res, next) => {
  req.holi = "El profe erik te saluda";
  next();
}

exports.validateAuthentication = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) return res.status(401).json({msg: 'Necesitas autorizarte'});
  
    const token = authorization.split(' ').length == 2 ? authorization.split(' ')[1] : null;
    if (!token) return res.status(401).json({msg: 'Necesitas autorizarte'});
  
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) req.user = verify;
    next();
  } catch(err) {
    return res.status(401).json({msg: 'Necesitas autorizarte'});
  }
}