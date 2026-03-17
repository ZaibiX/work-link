import express from "express";
import {searchGigs, getSingleGig } from "../controllers/user.controller.js";

const userRouter = express.Router();

// userRouter.get("/", getHomeData);

userRouter.get("/search/gigs", searchGigs);
userRouter.get("/gig/:gigId", getSingleGig);

export default userRouter;