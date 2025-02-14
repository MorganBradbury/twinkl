import { Router } from "express";
import { getUser, signUp } from "../controllers/userController";

const router = Router();

router.post("/signup", signUp);
router.get("/user/:id", getUser);

export default router;