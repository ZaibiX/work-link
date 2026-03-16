import {prisma} from "./src/utils/prisma.js";
import {UserRole, SkillCategory, WorkerStatus } from "./generated/prisma/enums.js";
import type {WorkerProfileModel } from "./generated/prisma/models/WorkerProfile.js";



async function main() {
 const seedGigs = async () => {
  try {
    console.log("🚀 Starting seed process...");

    // Helper to format strings to UPPERCASE_WITH_UNDERSCORES
    const formatValue = (val: string) => val.toUpperCase().replace(/\s+/g, '_');

    // 1. Create a few Workers first
    const workers: WorkerProfileModel[] = [];
    const workerNames = ["Zubair Khan", "Arsalan Arif", "Kamran Ahmed", "Sajid Ali"];

    for (const name of workerNames) {
      const newUser = await prisma.user.create({
        data: {
          name,
          email: `${name.toLowerCase().replace(" ", ".")}@worklink.pk`,
          password: "hashed_password_here",
          role: UserRole.WORKER,
          workerProfile: {
            create: {
              phone: "03001234567",
              skillCategory: SkillCategory.SOLAR_EXPERT,
              country: "PAKISTAN",
              city: formatValue("Lahore"), // Added formatting
              experienceYears: 5,
              cnic: `42101-${Math.floor(1000000 + Math.random() * 9000000)}-1`,
              status: WorkerStatus.AVAILABLE,
            },
          },
        },
        include: { workerProfile: true },
      });
      if (newUser.workerProfile) workers.push(newUser.workerProfile);
    }

    // 2. Data Pools for 22 Gigs
    const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad"];
    const areas = ["Gulberg", "DHA Phase 6", "Bahria Town", "Saddar", "E-11", "Model Town"];
    const titles = [
      "AC Deep Cleaning & Gas Refill",
      "Solar Panel Maintenance",
      "Emergency Plumbing Fix",
      "Complete Home Wiring",
      "Professional Wood Polishing",
      "Full House Paint Job"
    ];

    const categories = Object.values(SkillCategory);

    console.log(`🔨 Creating 22 Gigs for ${workers.length} workers...`);

    // 3. Generate 22 Gigs
    const gigPromises = Array.from({ length: 22 }).map(async (_, i) => {
      const randomWorker = workers[i % workers.length];
      if (!randomWorker) {
        throw new Error(`Worker at index ${i} not found.`);
      }
      
      const randomCategory = categories[i % categories.length];
      const rawCity = cities[i % cities.length] || "Lahore";
      const rawArea = areas[i % areas.length] || "Gulberg";

      return await prisma.gig.create({
        data: {
          title: `${titles[i % titles.length]} #${i + 1}`,
          description: "Providing high-quality professional service with 6 months warranty. We ensure clean work and use genuine parts only. Customer satisfaction is our top priority.",
          price: 1200 + (i * 150),
          category: randomCategory || SkillCategory.OTHER,
          city: formatValue(rawCity), // Formatting applied here
          area: formatValue(rawArea), // Formatting applied here
          workerId: randomWorker.id, 
          isActive: true,
          isDeleted: false,
          customSkill: randomCategory === "OTHER" ? "CCTV Expert" : null,
        },
      });
    });

    const results = await Promise.all(gigPromises);
    
    console.log(`✅ Success! Created ${results.length} gigs.`);
    return { success: true, count: results.length };

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Execute
seedGigs();


}

main();
