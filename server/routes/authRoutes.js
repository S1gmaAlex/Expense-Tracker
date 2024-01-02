import express from "express";
import {
    getUserProfile,
    getCurrentUser,
	signupUser,
    loginUser,
    logoutUser,
    updateUser,
} from "../controllers/authCotroller.js";
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router();
router.get("/profile/:id", protectRoute, getUserProfile);
router.get("/currentUser", protectRoute, getCurrentUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;