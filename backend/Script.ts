import {prisma} from "./src/utils/prisma.js";

async function main() {
  try {
    // Get a worker to assign gigs to
    let worker = await prisma.workerProfile.findFirst();
if (!worker) {
  const user = await prisma.user.create({
    data: {
      name: "Default Worker",
      email: "worker@example.com",
      password: "password123",
      role: "WORKER",
    },
  });

  worker = await prisma.workerProfile.create({
    data: {
      userId: user.id,
      phone: "03001234567",
      skillCategory: "OTHER",
      country: "Pakistan",
      city: "Lahore",
      experienceYears: 1,
      cnic: "12345-1234567-1",
    },
  });

  console.log("Created default worker for seeding gigs.");
}

    // Create 17 gigs
    const gigsData = Array.from({ length: 17 }, (_, i) => ({
      title: `Gig ${i + 1}`,
      description: `This is the description for Gig ${i + 1}.`,
      price: 1000 + i * 100,        // Example pricing
      category: "OTHER",  // Example category
      city: worker.city,
      address: `Address ${i + 1}`,
      workerId: worker.id,
      isActive: true,
      isDeleted: false,
    }));

    const createdGigs = await prisma.gig.createMany({
      data: gigsData,
      skipDuplicates: true, // avoids duplicates if script is run multiple times
    });

    console.log(`Successfully created ${createdGigs.count} gigs!`);
  } catch (error) {
    console.error("Error creating gigs:", error);
  } finally {
    await prisma.$disconnect();
  }


}

main();
