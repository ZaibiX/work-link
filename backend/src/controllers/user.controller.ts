import type { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";
import {SkillCategory } from "../../generated/prisma/enums.js";



// async function getHomeData(req: Request, res: Response) {

//     const CITY: string = req.query.city ? (req.query.city as string) : "Lahore";
//     const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
//     const LIMIT: number = 10;
//     const SKIP: number = (PAGE - 1) * LIMIT;
    
//     try{
//           const totalGigs = await prisma.gig.count({
//         where: {
//             city: CITY,
//             isActive: true,
//             isDeleted: false
//         }
//     });

     

//     const recentGigs = await prisma.gig.findMany({
//         take: LIMIT,
//         skip: SKIP,
//         orderBy: {
//             createdAt: "desc",
//         },
//         where: {
//             isActive: true,
//             isDeleted: false,
//             city: CITY
//         },

//         select: {
//             id: true,
//             title: true,
//             description: true,
//             price: true,
//             category: true,
//             address: true,
//             city: true,
//             worker: {
//                 select: {
//                     user: {
//                         select: {

//                             name: true,

//                         }
//                     }
//                 }
//             }
//         }
//     });
    
//   res.status(200).json({ status: "success", data: {recentGigs, totalGigs } });
//   return;
//     }
//     catch(err){

//         res.status(500).json({ status: "error", message: "An error occurred while fetching home data." });
//         return;
//     }
  

// }

 const searchGigs = async (req: Request, res: Response) => {
  //req.params: category, city, sortBy, searchText, page
  console.log("from backend req.query: ",req.query);
  try {
    const allowedSortBy = ["recent", "old", "priceLowToHigh", "priceHighToLow"];

    // 1. Requirement Validation
    const categoryInput = req.query.category ? String(req.query.category) : "";
    const cityInput = req.query.city ? String(req.query.city) : "";
    const sortByInput = req.query.sortBy ? String(req.query.sortBy) : "";

    if (!categoryInput || !cityInput || !sortByInput) {
      return res.status(400).json({ error: "Category, City, and SortBy are required." });
    }

    // 2. Sort Validation
    if (!allowedSortBy.includes(sortByInput)) {
      return res.status(400).json({ error: "Invalid sortBy value." });
    }

    // 3. Category Validation & Mapping
    let skillCategory: SkillCategory | undefined;

    if (categoryInput === "ALL") {
      // Valid state: Prisma will ignore the category filter
      skillCategory = undefined;
    } else if ((Object.values(SkillCategory) as string[]).includes(categoryInput)) {
      // Valid state: Specific Enum value
      skillCategory = categoryInput as SkillCategory;
    } else {
      // Invalid state: User sent "absctdf" or something else
      return res.status(400).json({ error: "Invalid category value." });
    }

    // 4. Other Inputs
    const searchText = req.query.searchText ? String(req.query.searchText) : "";
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // 5. Define Sorting Order
    let orderByCondition: any = { createdAt: "desc" };
    if (sortByInput === "old") orderByCondition = { createdAt: "asc" };
    else if (sortByInput === "priceLowToHigh") orderByCondition = { price: "asc" };
    else if (sortByInput === "priceHighToLow") orderByCondition = { price: "desc" };

    // 6. Unified Where Clause
    const whereCondition: any = {
      isDeleted: false,
      isActive: true,
      city: cityInput,
      category: skillCategory, 
      ...(searchText && {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { description: { contains: searchText, mode: 'insensitive' } },
          { area: { contains: searchText, mode: 'insensitive' } },
        ],
      }),
    };

    // 7. Concurrent Database Calls
    const [totalGigs, gigs] = await Promise.all([
      prisma.gig.count({ where: whereCondition }),
      prisma.gig.findMany({
        where: whereCondition,
        take: limit,
        skip: skip,
        orderBy: orderByCondition,
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          category: true,
          area: true,
          city: true,
          worker: {
            select: {
              user: { select: { name: true } }
            }
          }
        }
      })
    ]);

    res.json({gigs, totalGigs });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

// async function getRecentGigs(req: Request, res: Response) {
//     // Implement your logic to fetch recent gigs here, e.g., query the database for the latest gigs
//     const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
//     const LIMIT: number = 10;
//     const SKIP: number = (PAGE - 1) * LIMIT;
//     const recentGigs = await prisma.gig.findMany({
//         take: LIMIT,
//         skip: SKIP,
//         orderBy: {
//             createdAt: "desc",
//         },
//         where: {
//             isActive: true,
//             isDeleted: false
//         },

//         select: {
//             id: true,
//             title: true,
//             description: true,
//             price: true,
//             category: true,
//             address: true,
//             city: true,
//             worker: {
//                 select: {
//                     user: {
//                         select: {

//                             name: true,

//                         }
//                     }
//                 }
//             }
//         }
//     });

//     res.status(200).json({ status: "success", data: recentGigs });
// }
export { searchGigs };



//   const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
//     const LIMIT: number = 10;
//     const SKIP: number = (PAGE - 1) * LIMIT/2;
//     const toShowQty = totalGigs - SKIP*2;
//     let recentTake: number;
//     let oldTake: number;
//     if(toShowQty < LIMIT){
//          recentTake = Math.ceil(toShowQty / 2);
//          oldTake = toShowQty - recentTake;
//     }
//     else { 
//         recentTake = Math.ceil(LIMIT / 2);
//         oldTake = LIMIT - recentTake;
//     }

//     const split = Math.ceil(totalGigs / 2);


//     const oldGigs = await prisma.gig.findMany({
//         take: oldTake,
//         skip: SKIP,
//         orderBy: [
//             { createdAt: "asc" },
//             { sequence: "asc" }
//         ],
//         where: {
//             isActive: true,
//             isDeleted: false
//         },

//         select: {
//             id: true,
//             title: true,
//             description: true,
//             price: true,
//             category: true,
//             address: true,
//             city: true,
//             worker: {
//                 select: {
//                     user: {
//                         select: {

//                             name: true,

//                         }
//                     }
//                 }
//             }
//         }
//     });  

//     const recentGigs = await prisma.gig.findMany({
//         take: recentTake,
//         skip: SKIP,
//         orderBy: [
//             { createdAt: "desc" },
//             { sequence: "desc" }
//         ],
//         where: {
//             isActive: true,
//             isDeleted: false
//         },

//         select: {
//             id: true,
//             title: true,
//             description: true,
//             price: true,
//             category: true,
//             address: true,
//             city: true,
//             worker: {
//                 select: {
//                     user: {
//                         select: {

//                             name: true,

//                         }
//                     }
//                 }
//             }
//         }
//     });    

//apply zigzag
    
//     res.status(200).json({ status: "success", data: { recent: recentGigs, old: oldGigs }, totalGigs });