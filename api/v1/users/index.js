import express from "express";
import controller from "./user.controller";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;