module.exports = function(app){
  app.use("/api/v1/products", require("./api/v1/products/index.js"));
  app.use("/api/v1/users", require("./api/v1/users/index.js"));
}
