import express from "express";

import authRoute from "./auth.js"
import userRoutes from "./users.js"
const router =express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);

export default router;