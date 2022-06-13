//Importamos express, librería para crear un web server
import express from "express";
// Librería para conectarnos a MongoDB
import mongoose from "mongoose";
// Lee datos de un archivo .env
import dotenv from "dotenv";

dotenv.config();

// Iniciamos el web server
const app = express();
// Le indicamos a express que usaremos json
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@appdist.izigz.mongodb.net/?retryWrites=true&w=majority`
// Se realiza la conección a mongodb
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jtasf.mongodb.net/ecommerce`

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);  

mongoose.connection.on("connected",  () => console.log("Connected!"));

app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'), () => {
  console.log(`hola ${app.get('port')}`)
});

app.use("/api/v1", require("./routes"));
