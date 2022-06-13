const router = express.Router();

app.use("/products", require("./api/v1/products/index.js"))
app.use("/users", require("./api/v1/users/index.js"))