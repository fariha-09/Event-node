import express from "express";

import { signIn,signUp } from "../controller/users.js";

const authRouter=express.Router();

authRouter.post("/login",signIn);
authRouter.post("/signup",signUp);

export default authRouter;