import type { Request, Response } from 'express';
import { prisma } from "../utils/prisma.js";
import { SkillCategory, WorkerStatus, UserRole } from '../../generated/prisma/enums.js';

const ALLOWED_SKILLS = Object.values(SkillCategory);
const ALLOWED_STATUS = Object.values(WorkerStatus);


export async function createWorkerProfile(req: Request, res: Response) {
  try {
    // console.log("body:", req.body);
    const { userId } = req.params as { userId: string };
    const { phone, skillCategory, country, city, experienceYears, cnic } = req.body;

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
  // Implementation for getting worker profile
  try {
    const param: string = String(req.params.workerId) ?? "";
    const queryUserId: string = req.query.userId ? String(req.query.userId) : "";
    const lookupKey: string = param ?? queryUserId;

    if (!lookupKey) {
      return res.status(400).json({ error: "Provide worker id or userId (route param or query)." });
    }

    // Try find by worker profile id first
    let profile = await prisma.workerProfile.findUnique({
      where: { id: lookupKey },
      include: {
        gigs: true,
        user: { select: { id: true, name: true, email: true } },
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

    return res.status(200).json({ data: profile });
  } catch (err) {
    console.error("getWorkerProfile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateWorkerProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params as { userId: string };
    const { phone, skillCategory, country, city, experienceYears, cnic } = req.body;

    // Check if the skillCategory is allowed
    if (skillCategory && !ALLOWED_SKILLS.includes(skillCategory as SkillCategory)) {
      return res.status(400).json({
        success: false,
        message: `Invalid skillCategory. Allowed: ${ALLOWED_SKILLS.join(", ")}`
      });
    }

    // Check if the worker profile exists
    const existingProfile = await prisma.workerProfile.findUnique({ where: { userId } });
    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Worker profile not found"
      });
    }

    // Prepare the data to update (only fields provided)
    const updateData: Partial<typeof existingProfile> = {};
    if (phone) updateData.phone = phone;
    if (skillCategory) updateData.skillCategory = skillCategory as SkillCategory;
    if (country) updateData.country = country;
    if (city) updateData.city = city;
    if (experienceYears !== undefined) updateData.experienceYears = experienceYears;
    if (cnic) updateData.cnic = cnic;

    const updatedProfile = await prisma.workerProfile.update({
      where: { userId },
      data: updateData,
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
    });

    return res.status(200).json({
      success: true,
      message: "Worker profile updated successfully",
      data: updatedProfile,
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

