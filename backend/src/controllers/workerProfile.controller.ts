import type { Request, Response } from 'express';
import { prisma } from "../utils/prisma.js";
import { SkillCategory, WorkerStatus, UserRole } from '../../generated/prisma/enums.js';

const ALLOWED_SKILLS = Object.values(SkillCategory);
const ALLOWED_STATUS = Object.values(WorkerStatus);


export async function createWorkerProfile(req: Request, res: Response) {
  // console.log("from create worker profile: cookie", req.cookies);

  if(!req.user || !(req.user as any).id){
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  console.log("User from auth middleware:", req.user);
  try {
    // console.log("body:", req.body);
    const userId = (req.user as any)?.id;
    const { phone, skillCategory, country, city, experienceYears, cnic, agreed } = req.body;
    if(!agreed){
      return res.status(400).json({ success: false, message: "You must agree to the terms to create a worker profile" });
    }

    const existingProfile = await prisma.workerProfile.findUnique({ where: { userId } });
    if (!ALLOWED_SKILLS.includes(skillCategory as SkillCategory)) {
      return res.status(400).json({
        success: false,
        message: `Invalid skillCategory. Allowed: ${ALLOWED_SKILLS.join(", ")}`
      });
    }

    if (existingProfile) {
      return res.status(409).json({ message: "User already has a worker profile" });
    }

    const [, workerProfile] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId, role: UserRole.CLIENT },
        data: { role: UserRole.WORKER },
      }),
      prisma.workerProfile.create({
        data: {
          phone,
          skillCategory,
          country,
          city,
          experienceYears,
          cnic,
          user: { connect: { id: userId } },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
    ]);

    return res.status(201).json({
      success: true,
      message: "Worker profile created successfully",
      data: workerProfile,
    });
  } catch (error: any) {

    console.error("createWorkerProfile error:", error.message);

    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      return res.status(409).json({
        success: false,
        message:
          field === "cnic"
            ? "A worker profile with this CNIC already exists"
            : "This user already has a worker profile",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User not found",//or if user.role == WORKER
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


export async function getWorkerProfile(req: Request, res: Response) {
  if(!req.user || !(req.user as any).id){
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  // Implementation for getting worker profile
  try {
    // const param: string = String(req.params.workerId) ?? "";
    // const queryUserId: string = req.query.userId ? String(req.query.userId) : "";
    const lookupKey: string = (req.user as any)?.id;

    if (!lookupKey) {
      return res.status(400).json({ error: "Provide worker id or userId (route param or query)." });
    }

    // Try find by worker profile id first
    let profile = await prisma.workerProfile.findUnique({
      where: { id: lookupKey },
      select: {
        gigs: {select:{
          id:true,
          title:true,
          price:true,
          isActive: true,
        }},
        id:true,
        user: { select: { id: true, name: true, email: true } },
        phone: true,
        skillCategory:true,
        status: true,

      },
    });

    // if not found, try by userId
    // if (!profile) {
    //   profile = await prisma.workerProfile.findUnique({
    //     where: { userId: lookupKey },
    //     include: {
    //       gigs: true,
    //       user: { select: { id: true, name: true, email: true } },
    //     },
    //   });
    // }

    if (!profile) {
      return res.status(404).json({ error: "Worker profile not found." });
    }

    return res.status(200).json({ profile });
  } catch (err) {
    console.error("getWorkerProfile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateWorkerProfile(req: Request, res: Response) {

  if(!req.user || !(req.user as any).id){
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  console.log("Data to update: ", req.body);
  try {
    const workerId = (req.user as any)?.id; // Assuming workerId is same as userId from auth middleware
    const { phone, skillCategory, user, status } = req.body;

    // 1. Validation for skillCategory (keep your existing logic)
    if (skillCategory && !ALLOWED_SKILLS.includes(skillCategory as SkillCategory)) {
      return res.status(400).json({
        success: false,
        message: `Invalid skillCategory. Allowed: ${ALLOWED_SKILLS.join(", ")}`
      });
    }

    // 2. Build the Prisma-compliant update object
    // We use 'any' or the specific Prisma generated type to avoid the assignment error
    const data: any = {}; 

    if (phone) data.phone = phone;
    if (status) data.status = status;
    if (skillCategory) data.skillCategory = skillCategory;

    // Correct way to handle nested user updates:
    if (user && user.name) {
      data.user = {
        update: {
          name: user.name
        }
      };
    }

    // 3. Perform the update
    const updatedProfile = await prisma.workerProfile.update({
      where: { id: workerId },
      data: data, // Prisma now knows to update the linked User's name
      select: {
        gigs: {
          select: {
            id: true,
            title: true,
            price: true,
            isActive: true,
          }
        },
        user: { select: { id: true, name: true, email: true } },
        phone: true,
        skillCategory: true,
        status: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Worker profile updated successfully",
      profile: updatedProfile,
    });

  } catch (error: any) {
    console.error("updateWorkerProfile error:", error.message);

    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      return res.status(409).json({
        success: false,
        message:
          field === "cnic"
            ? "A worker profile with this CNIC already exists"
            : "Duplicate data error",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Worker profile not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

