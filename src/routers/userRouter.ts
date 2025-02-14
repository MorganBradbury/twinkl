import { Router } from "express";
import { getUser, signUp } from "../controllers/userController";
import { validateUser } from "../middleware/userRequestValidator";

const router = Router();

router.post("/signup", validateUser, signUp);
router.get("/user/:id", getUser);

export default router;