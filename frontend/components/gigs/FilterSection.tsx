"use client";
import { TextField, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import { useSearchParams, useRouter } from 'next/navigation';

export default function FilterSection() {

  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    searchText: searchParams.get('searchText') || "",
    city: searchParams.get('city') || "LAHORE",
    category: searchParams.get('category') || "ALL",
    sortBy: searchParams.get('sortBy') || "recent"
  });
  const router= useRouter()
  console.log("filters ", filters)
  // console.log("router query", router.query);

  function handleOnchange(e: any){
    
    // console.log(e.target.value);
    // console.log(e.target.name);
    
    setFilters((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  function handleApplyFilters(){
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchText", filters.searchText);
    params.set("city", filters.city);
    params.set("category", filters.category);
    params.set("sortBy", filters.sortBy);
    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  }

  console.log("Search Params in FilterSection:", searchParams.toString());
  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      {/* Search Bar - Populated from Home Page query */}
      <TextField
        fullWidth
        value={filters.searchText}
        placeholder="Search for 'AC Repair' or 'Carpenter'..."
        slotProps={{input:{startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,}
       
          
        }}
        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
         onChange={handleOnchange}
         name="searchText"
      />

      {/* Row of Dropdowns */}
      <Stack direction={{ xs: 'row', sm: 'row' }} sx={{ mb: 4, flexWrap:"wrap",gap:2,justifyContent:"flex-start",}}>
        <FormControl  size="small">
          <InputLabel>City</InputLabel>
          <Select value={filters.city} label="City" 
          onChange={handleOnchange}
          name="city"
          >
            <MenuItem value="LAHORE">Lahore</MenuItem>
            <MenuItem value="KARACHI">Karachi</MenuItem>
          </Select>
        </FormControl>

        <FormControl  size="small">
          <InputLabel>Category</InputLabel>
          <Select value={filters.category} label="Category"
           onChange={handleOnchange}
          name="category"
          >
            <MenuItem value="ALL">All Categories</MenuItem>
            <MenuItem value="SOLAR_EXPERT">Solar Expert</MenuItem>
            <MenuItem value="AC_TECHNICIAN">AC Technician</MenuItem>
          </Select>
        </FormControl>

        <FormControl  size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={filters.sortBy} label="Sort By"
           onChange={handleOnchange}
          name="sortBy"
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="old">Older</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            


          </Select>
        </FormControl>

        <Button  color="primary" onClick={handleApplyFilters} >Apply Filters</Button>

      </Stack>
    </Stack>
  );
}