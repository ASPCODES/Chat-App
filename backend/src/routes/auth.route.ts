import express from "express";
import { login, logout, signup } from "../controllers/auth.contoller.js";

const router = express.Router();

// url/api/auth/signup
router.post("/signup", signup);

// url/api/auth/login
router.post("/login", login);

// url/api/auth/logout
router.post("/logout", logout);

export default router;
