import type { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { SkillCategory } from "../../generated/prisma/enums.js";

// ---------------------------------------------------------------------------
// Extend Express Request to include the authenticated user
// ---------------------------------------------------------------------------
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: UserRole;
    email: string;
  };
}

// ---------------------------------------------------------------------------
// GET /worker/gigs
// Returns all gigs belonging to the authenticated worker
// ---------------------------------------------------------------------------
export async function getWorkerGigs(req: Request, res: Response) {
  try {
    // const { id: userId } = (req as AuthenticatedRequest).user;
    const workerId= "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";


    const gigs = await prisma.gig.findMany({
      where: {
        workerId: workerId,
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: gigs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ---------------------------------------------------------------------------
// GET /worker/gigs/:gigId
// Returns a single gig — only if it belongs to the authenticated worker
// ---------------------------------------------------------------------------
export async function getWorkerGigById(req: Request, res: Response) {
  try {
    // const { id: userId } = (req as AuthenticatedRequest).user;
    
    const { gigId } = req.params as { gigId: string };
    // const {workerId} = req.body;
    //example id
    const workerId= "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";

    const gig = await prisma.gig.findFirst({
      where: {
        id: gigId,
        workerId: workerId,   // ownership check in the same query
        isDeleted: false,
      },
      select:{
        title:true,
        price:true,
        city:true,
        area:true,
        category:true,
        customSkill:true,
        description:true,
      }
    });

    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }

    return res.status(200).json({ success: true, data: gig });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ---------------------------------------------------------------------------
// POST /worker/gigs
// Creates a new gig for the authenticated worker
// ---------------------------------------------------------------------------
export async function createWorkerGig(req: Request, res: Response) {

  console.log(req.body);
  try {
    // const { id: userId, role } = (req as AuthenticatedRequest).user;

    // if (role !== UserRole.WORKER) {
    //   return res.status(403).json({ success: false, message: "Only workers can create gigs" });
    // }

    const { title, description, price, category, city, area, lat, lng , customSkill} = req.body;
    // const workerId: string = String(req.params.workerId);
    const workerId= "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";

    console.log("workerId: ", workerId);
    // Fetch the worker profile id — needed for the relation
    // This is the only extra DB call and it's unavoidable since req.user doesn't carry workerId
    
    if(!Object.values(SkillCategory).includes(category)){
        return res.status(404).json({ success: false, message: "You entered something wrong" });

    }

    // if(category=== SkillCategory.OTHER){

    // }

    const gig = await prisma.gig.create({
      data: {
        title,
        description,
        price: Number(price),
        category,
        city,
        area,
        lat,
        lng,
        customSkill,
        // Prisma uses this ID to fill the 'workerId' column in the Gig table
        worker: { connect: { id: workerId } },
      },
    });

    return res.status(201).json({ success: true, message: "Gig created successfully", gig: gig });
  } catch (error: any) {
    console.error("Error creating gig:", error.message || error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ---------------------------------------------------------------------------
// PATCH /worker/gigs/:gigId
// Updates a gig — only if it belongs to the authenticated worker
// ---------------------------------------------------------------------------
export async function updateWorkerGig(req: Request, res: Response) {
  try {
    // const { id: userId } = (req as AuthenticatedRequest).user;
    const { gigId } = req.params as { gigId: string };
    const workerId= "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";


    const { title, description, price , category, city, area, lat, lng, isActive, customSkill } = req.body;

    // updateMany lets us apply the ownership check (worker.userId) and update in one query.
    // It returns { count } — if count is 0, the gig either doesn't exist or isn't owned by this worker.
    const gig = await prisma.gig.update({
      where: {
        id: gigId,
        workerId: workerId,
        isDeleted: false,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price:Number(price) }),
        ...(category !== undefined && { category }),
        ...(city !== undefined && { city }),
        ...(area !== undefined && { area }),
        ...(lat !== undefined && { lat:Number(lat) }),
        ...(lng !== undefined && { lng:Number(lng) }),
        ...(isActive !== undefined && { isActive }),
        ...(customSkill !== undefined && { customSkill }),

      },
       select:{
        title:true,
        price:true,
        city:true,
        area:true,
        category:true,
        customSkill:true,
        description:true,
      }
    });

    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }

    return res.status(200).json({ success: true, message: "Gig updated successfully", data:gig });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ---------------------------------------------------------------------------
// DELETE /worker/gigs/:gigId
export async function deleteWorkerGig(req: Request, res: Response) {
  try {
    // const { id: userId } = (req as AuthenticatedRequest).user;
    const workerId= "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";

    const { gigId } = req.params as { gigId: string };

    const { count } = await prisma.gig.deleteMany({
      where: {
        id: gigId,
        workerId: workerId,
        // isDeleted: false,
      },
    });

    if (count === 0) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }

    return res.status(200).json({ success: true, message: "Gig deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}