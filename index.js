import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j6vka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log(uri);

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected",  () => console.log("Connected!"));

app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'), () => {
  console.log(`hola ${app.get('port')}`)
});

app.use("/products", require("./api/v1/products"))
