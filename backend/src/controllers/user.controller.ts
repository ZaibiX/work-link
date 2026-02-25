import type { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";


async function getHomeData(req: Request, res: Response) {

    const CITY: string = req.query.city ? (req.query.city as string) : "Lahore";
    const totalGigs = await prisma.gig.count({
        where: {
            city: CITY,
            isActive: true,
            isDeleted: false
        }
    });

     const PAGE: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const LIMIT: number = totalGigs <= 10 ? totalGigs : 10;
    const HALF = (totalGigs-LIMIT) > LIMIT ? Math.ceil(LIMIT/2): Math.ceil((totalGigs - LIMIT)/2);
    



    const SKIP: number = (PAGE - 1) * HALF;

    const recentGigs = await prisma.gig.findMany({
        take: HALF,
        skip: SKIP,
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isActive: true,
            isDeleted: false,
            city: CITY
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

    const oldGigs = await prisma.gig.findMany({
        take:(totalGigs - LIMIT) - HALF,
        skip: SKIP,
        orderBy: {
            createdAt: "asc",
        },
        where: {
            isActive: true,
            isDeleted: false,
            city: CITY

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

    const zigzagGigs = [];
    for (let i = 0; i < Math.max(recentGigs.length, oldGigs.length); i++) {
        if (i < recentGigs.length) {
            zigzagGigs.push(recentGigs[i]);
        }
        if (i < oldGigs.length) {
            zigzagGigs.push(oldGigs[i]);
        }

    res.status(200).json({ status: "success", data: zigzagGigs, totalGigs });


}
}

function searchGigs(req: Request, res: Response) {
    const { query } = req.body || { query: "nothing" };
    // Implement your search logic here, e.g., query the database for gigs matching the search term
    res.json({ message: `Search results for query: ${query}` });
}

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