import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
// url/api/auth/signup
router.post("/signup", signup);

// url/api/auth/login
router.post("/login", login);

// url/api/auth/logout
router.post("/logout", logout);

export default router;
