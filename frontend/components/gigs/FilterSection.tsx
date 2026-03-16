"use client";
import { TextField, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import { useSearchParams, useRouter } from 'next/navigation';

export default function FilterSection({showSearchBar=true}:any) {

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

    router.replace(`search?${params.toString()}`);
  }

  console.log("Search Params in FilterSection:", searchParams.toString());
  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      {/* Search Bar - Populated from Home Page query */}
      {showSearchBar && (
  <TextField
    fullWidth
    value={filters.searchText}
    name="searchText"
    onChange={handleOnchange}
    onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
    placeholder="What service are you looking for?"
    // This is the key to the professional look
    slotProps={{
      input:{
        startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" sx={{ ml: 1 }} />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <Button
            variant="outlined"
            disableElevation
            onClick={handleApplyFilters}
            sx={{
              mr: 1, // Pulls it slightly to the edge for a tighter fit
              height: '36px', // Matches standard text field height
              px: 2,
              borderRadius: '8px 8px 8px 8px', // Rounds only the outer corners
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Search
          </Button>
        </InputAdornment>
      ),
      }
    }}
    sx={{
      bgcolor: "background.paper",
      borderRadius: '8px',
      // Remove the double border effect when the button is inside
      "& .MuiOutlinedInput-root": {
        paddingRight: 0, 
        pr: 0,
        "& fieldset": { borderRadius: '8px' },
      },
    }}
  />
)}

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