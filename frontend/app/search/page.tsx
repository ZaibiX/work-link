"use client";
import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Pagination, Stack } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';
import FilterSection from "@/components/gigs/FilterSection";
import GigsList from "@/components/gigs/Gigs";
import GigsSkeleton from "@/components/gigs/GigsSkeleton";
import axiosInstance from "@/utils/axiosInstance";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  city: string;
  area: string;
  posted: string;
  worker: {
    user: {
      name: string;
    }
  }
}

const GIGS_DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: `${i + 1}`,
  title: [
    "Expert Solar Panel Installation & Cleaning",
    "Professional AC Gas Refilling",
    "Modern Kitchen Woodwork",
    "Emergency Leakage & Pipe Fix"
  ][i % 4],
  description: "Providing high-quality professional service with 6 months warranty. We ensure clean work and use genuine parts only.",
  price: 1500 + (i * 100),
  category: ["SOLAR_EXPERT", "AC_TECHNICIAN", "CARPENTER", "PLUMBER"][i % 4],
  city: ["Lahore", "Karachi", "Islamabad"][i % 3],
  area: ["Gulberg", "DHA Phase 5", "Bahria Town", "Saddar"][i % 4], // Added Area variable
  posted: `${i + 1}h ago`,
  worker: {
    user: {
      name: ["Zubair Khan", "Arsalan Arif", "Kamran Khan", "Sajid Ali"][i % 4]
    }
  }
}));

// async function fetchGigs(searchParams: URLSearchParams) {
//   try {
//     const response = await axiosInstance.get('/gigs/search', {
//       params: {
//         searchParams
//       }
//     });
//     console.log("Fetched Gigs:", response.data);
//     return response.data.gigs; // Assuming the API returns { data: { gigs: [...] } }
//   } catch (error) {
//     console.error("Error fetching gigs:", error);
//     throw error; // Rethrow to be caught in the calling function

//   }
// }

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [visibleGigs, setVisibleGigs] = useState<Gig[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 20;
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  console.log('paramss ', searchParams)
  // const currentPage = Number(searchParams.get('page')) || 1;
  // const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const visibleGigs = GIGS_DATA.slice(startIndex, startIndex + PAGE_SIZE);


  // Simulate Fetching Delay when filters change
  useEffect(() => {
    setLoading(true);
   
    const params = Object.fromEntries(searchParams.entries());

    const finalParams = {
      city: params.city || "LAHORE",
      category: params.category || "ALL",
      sortBy: params.sortBy || "recent",
      ...params // Spread remaining params like searchText
    };
    async function fetchGigs(searchParams: URLSearchParams) {
      // console.log("search paramm are: ", searchParams)
      try {
        const response = await axiosInstance.get('user/search/gigs', {
          params: finalParams
        });
        // console.log("Fetched Gigs:", response.data);
        const { gigs, totalGigs } = response.data
        // Assuming the API returns { data: { gigs: [...] } }
        setVisibleGigs(gigs);
        setTotalPages(Math.ceil(totalGigs / PAGE_SIZE))
        // setTotalPages(12)


        // console.log("Toatal pages: ", totalPages)
        // console.log("Toatal gigs: ", totalGigs)

      } catch (error) {
        console.error("Error fetching gigs:", error);
        throw error; // Rethrow to be caught in the calling function

      }
      finally {
        setLoading(false);
      }

    }

    fetchGigs(searchParams)

  }, [searchParams]);

  // console.log("tp",totalPages)

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>Search Opportunities</Typography>
        <Typography variant="body2" color="text.secondary">
          Showing results for "{searchParams.get('q') || 'All Services'}" in {searchParams.get('location') || 'Lahore'}
        </Typography>
      </Box>

      <FilterSection />

      {loading ? (
        <GigsSkeleton />
      ) : (
        <>
          <GigsList visibleGigs={visibleGigs} />
          <Stack alignItems="center" sx={{ mt: 6 }} >
            <Pagination count={totalPages} page={currentPage}
            shape="rounded" size="large"  
            onChange={(evt:any, val:any)=> {
              // console.log(val)
              // console.log(evt.target.value)
              setCurrentPage(val);

              const params = new URLSearchParams(searchParams.toString());
              params.set("page", val.toString());
              router.replace("?"+params.toString());

              setLoading(true);

            }}/>
          </Stack>
        </>
      )}
    </Container>
  );
}