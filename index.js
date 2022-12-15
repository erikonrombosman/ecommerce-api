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

let uri;
if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'dev'){
  uri = process.env.MONGODB_URI
} else {
  const { DB_USER, DB_PASSWORD, DB_CLUSTER } = process.env;
  uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}`;
}
// Se realiza la conección a mongodb
// uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@appdist.izigz.mongodb.net/?retryWrites=true&w=majority`

try {
  mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }
  );  
} catch(err) {
  console.error(err);
}


mongoose.connection.on("connected",  () => console.log("Connected!"));

app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'), () => {
  console.log(`hola ${app.get('port')}`)
});

require('./routes')(app);
