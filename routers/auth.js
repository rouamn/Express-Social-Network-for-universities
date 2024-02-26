import express from "express";
import { login } from "../Controllers/auth.js"
import { register } from "../Controllers/auth.js";


const router = express.Router()

router.post("/login", login)
router.post("/register", register)

export default router;