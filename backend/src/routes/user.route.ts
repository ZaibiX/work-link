import express from "express";
import { getHomeData, searchGigs } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getHomeData);
userRouter.get("/search", searchGigs);

export default userRouter;