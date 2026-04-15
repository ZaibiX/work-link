import express from "express";
import {searchGigs, getSingleGig } from "../controllers/user.controller.js";
import passport from "../config/passport.js";

const userRouter = express.Router();

// userRouter.get("/", getHomeData);

userRouter.get("/search/gigs", searchGigs);
userRouter.get("/gig/:gigId", getSingleGig);
// userRouter.get("/check",passport.authenticate("jwt", { session: false }), (req, res) => {
//     console.log("Authenticated user:", req.user);
//     console.log("Cookies:", req.cookies);
//     console.log("Headers:", req.headers);
//     console.log("Is authenticated:", req.isAuthenticated());
//     res.json({ message: "User route is working" });
// });
userRouter.get("/check", (req, res) => {
    console.log("Authenticated user:", req.user);
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);
    console.log("Is authenticated:", req.isAuthenticated());
    res.redirect('/');
});
export default userRouter;