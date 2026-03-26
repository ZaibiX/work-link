import express from "express";
import { getWorkerProfile, updateWorkerProfile,  createWorkerProfile } from "../controllers/workerProfile.controller.js";
import {getWorkerGigs, createWorkerGig, updateWorkerGig, deleteWorkerGig, getWorkerGigById,} from "../controllers/workerGig.controller.js";
import { mockAuth } from "../middleware/mockAuth.js";

const workerRouter = express.Router();  

workerRouter.get("/profile/:workerId", getWorkerProfile);
workerRouter.put("/profile/:workerId", updateWorkerProfile);
workerRouter.post("/profile/:userId", createWorkerProfile);

// workerRouter.get("/gigs", mockAuth, getWorkerGigs); not yet used
workerRouter.post("/gig", createWorkerGig);
workerRouter.put("/gig/:gigId", mockAuth,updateWorkerGig);
workerRouter.delete("/gig/:gigId",mockAuth ,deleteWorkerGig);
workerRouter.get("/gig/:gigId", mockAuth, getWorkerGigById);

// workerRouter.get("/manage-profile/:workerId");
// workerRouter.get("/my-gigs/:workerId");

export default workerRouter;