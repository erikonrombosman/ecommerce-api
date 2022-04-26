import express from "express";
import controller from "./product.controller.js";
import { validateAuthentication } from "../middlewares.js";

const router = express.Router();

router.get("/", controller.indexProduct);
router.post("/", controller.createProduct);
router.get("/:id", controller.getProduct);
router.delete("/:id", controller.deleteProduct);
router.put("/:id", validateAuthentication, controller.updateProduct);


module.exports = router;