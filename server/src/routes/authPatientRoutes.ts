import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginPatient);

export default router;