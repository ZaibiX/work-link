import type { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";
import {SkillCategory } from "../../generated/prisma/enums.js";

async function getHomeData(req: Request, res: Response) {

    const CITY: string = req.query.city ? (req.query.city as string) : "Lahore";
    const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const LIMIT: number = 10;
    const SKIP: number = (PAGE - 1) * LIMIT;
    
    try{
          const totalGigs = await prisma.gig.count({
        where: {
            city: CITY,
            isActive: true,
            isDeleted: false
        }
    });

     

    const recentGigs = await prisma.gig.findMany({
        take: LIMIT,
        skip: SKIP,
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isActive: true,
            isDeleted: false
        },

        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            address: true,
            city: true,
            worker: {
                select: {
                    user: {
                        select: {

                            name: true,

                        }
                    }
                }
            }
        }
    });
    
  res.status(200).json({ status: "success", data: {recentGigs, totalGigs } });
  return;
    }
    catch(err){

        res.status(500).json({ status: "error", message: "An error occurred while fetching home data." });
        return;
    }
  

}

 const searchGigs = async (req: Request, res: Response) => {
  try {
    const allowedFilters = ["recent", "old", "priceLowToHigh", "priceHighToLow"];

    // const { query, category, city } = req.query;
    const queryStr = String(req.query.query || "");
    const categoryStr = req.query.category?.toString() || "";
    const cityStr = String(req.query.city || "");
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit: number = 20;
    const skip: number = (page - 1) * limit;
    const filter : string = req.query.filter ? String(req.query.filter) : "recent";
    if (!allowedFilters.includes(filter)) {
  return res.status(400).json({ error: "Invalid filter value." });
}
let orderByCondition: any = { createdAt: "desc" }; // default recent
    if (filter === "old") {
  orderByCondition = { createdAt: "asc" };
} else if (filter === "priceLowToHigh") {
  orderByCondition = { price: "asc" };
} else if (filter === "priceHighToLow") {
  orderByCondition = { price: "desc" };
}

    const isValidCategory = (Object.values(SkillCategory) as string[]).includes(categoryStr);
    if (categoryStr && !isValidCategory) {
      res.status(400).json({ error: "Invalid category value." });
      return;
    }

    if(!queryStr && !categoryStr && !cityStr){
        res.status(400).json({ error: "At least one search parameter (query, category, or city) is required." });
        return;
    }

    const gigs = await prisma.gig.findMany({
        take: limit,
        skip: skip,
        orderBy: orderByCondition,

      where: {
        isDeleted: false,
        isActive: true,
        // AND logic: all conditions must be met
        AND: [
          // 1. Filter by Category (Button)
          categoryStr ? { category: categoryStr } : {},
          
          // 2. Filter by City
          cityStr ? { city: cityStr } : {city: "Lahore"}, // Default to Lahore if city is not provided

          // 3. Search Bar Logic (Text Search)
          queryStr ? {
            OR: [
              { title: { contains: queryStr, mode: 'insensitive' } },
              { description: { contains: queryStr, mode: 'insensitive' } },
            ]
          } : {},
        ]
      },
      select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            address: true,
            city: true,
        worker: { select: {
            
            
            user: { select: { name: true } }
         } }
      }
    });

    res.json({ data: gigs });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};

async function getRecentGigs(req: Request, res: Response) {
    // Implement your logic to fetch recent gigs here, e.g., query the database for the latest gigs
    const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const LIMIT: number = 10;
    const SKIP: number = (PAGE - 1) * LIMIT;
    const recentGigs = await prisma.gig.findMany({
        take: LIMIT,
        skip: SKIP,
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isActive: true,
            isDeleted: false
        },

        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            category: true,
            address: true,
            city: true,
            worker: {
                select: {
                    user: {
                        select: {

                            name: true,

                        }
                    }
                }
            }
        }
    });

    res.status(200).json({ status: "success", data: recentGigs });
}
export { getHomeData, searchGigs, getRecentGigs };



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