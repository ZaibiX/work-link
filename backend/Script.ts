import {prisma} from "./src/utils/prisma.js";

async function main() {
  try{
    const user = await prisma.gig.deleteMany({
      
  
    });
    console.log("User created:", user);
      
    
  } catch (error: any) {
    console.error("Error creating user:", error.message);
  } finally {
    await prisma.$disconnect();
  }


}

main();
