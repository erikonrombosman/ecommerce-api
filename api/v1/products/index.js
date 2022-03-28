import express from "express";
import controller from "./product.controller";

const router = express.Router();

router.get("/", controller.indexProduct);
router.post("/", controller.createProduct);
router.get("/id", controller.getProduct);
router.delete("/:id", controller.deleteProduct);
router.update("/:id", controller.updateProduct);


module.exports = router;