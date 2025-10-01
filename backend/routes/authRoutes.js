import express from "express";
import { body, validationResult } from "express-validator";
import {
  registerUser,
  authUser,
  getMe,
  updateMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

router.post("/login", authUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

export default router;
