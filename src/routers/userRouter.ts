import { Router } from "express";
import { deleteUser, getUser, signUp } from "../controllers/userController";
import { validateUser } from "../middleware/userRequestValidator";

const router = Router();

router.post("/signup", validateUser, signUp);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

export default router;
