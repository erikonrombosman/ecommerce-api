import User from './user.model';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


exports.register = async (req, res) => {
  try {
    if (req.body.password != req.body.repeatPassword) {
      return res.status(400).json({msg: 'Contraseñas deben ser iguales'});
    }
    const user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).json({msg: 'Este usuario ya existe'});

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.salt = newUser.makeSalt();
    newUser.password = await newUser.encryptPassword(req.body.password);
    await newUser.save();
    res.status(201).json({msg: 'Usuario creado exitosamente'});
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'algo malo pasó'});
  }
}

exports.login = async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) {
      return res.status(400).json({msg: 'Email y contraseña son requeridos'});
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).json({msg: 'Este usuario no existe'});

    const isAuth = await user.authenticate(req.body.password);
    if (!isAuth) {
      return res.status(401).json({msg: 'Credenciales incorrectas'});
    }

    const token = jwt.sign(user.userToken(), process.env.JWT_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '365d'});
    
    res.status(200).json({authToken: token, refreshToken});
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'algo malo pasó'});
  }
}