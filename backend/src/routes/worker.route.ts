import express from "express";
import { getWorkerProfile, updateWorkerProfile,  createWorkerProfile } from "../controllers/workerProfile.controller.js";
import {getWorkerGigs, createWorkerGig, updateWorkerGig, deleteWorkerGig, getWorkerGigById,} from "../controllers/workerGig.controller.js";
import { mockAuth } from "../middleware/mockAuth.js";
import protectRoute from "../middleware/protectRoute.js";
import passport from "../config/passport.js"

const workerRouter = express.Router();  

workerRouter.get("/profile", passport.authenticate('jwt', { session: false }),protectRoute(["WORKER"]), getWorkerProfile);
workerRouter.put("/profile/:workerId", passport.authenticate('jwt', { session: false }), protectRoute(["WORKER"]), updateWorkerProfile);
workerRouter.post("/profile", passport.authenticate("jwt", { session: false }), protectRoute([]), createWorkerProfile);

// workerRouter.get("/gigs", mockAuth, getWorkerGigs); not yet used
workerRouter.post("/gig", passport.authenticate("jwt", { session: false }), protectRoute(["WORKER"]), createWorkerGig);
workerRouter.put("/gig/:gigId", passport.authenticate("jwt", { session: false }),  protectRoute(["WORKER"]),updateWorkerGig);
workerRouter.delete("/gig/:gigId",passport.authenticate("jwt", { session: false }),protectRoute(["WORKER"]) ,deleteWorkerGig);
workerRouter.get("/gig/:gigId", passport.authenticate("jwt", { session: false }), protectRoute(["WORKER"]), getWorkerGigById);

// workerRouter.get("/manage-profile/:workerId");
// workerRouter.get("/my-gigs/:workerId");

export default workerRouter;