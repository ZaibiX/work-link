import express from "express";
import {searchGigs } from "../controllers/user.controller.js";

const userRouter = express.Router();

// userRouter.get("/", getHomeData);

userRouter.get("/search/gigs", searchGigs);

export default userRouter;