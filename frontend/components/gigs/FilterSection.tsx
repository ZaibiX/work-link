"use client";
import { TextField, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function FilterSection({ searchParams, onFilterChange }: any) {
  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      {/* Search Bar - Populated from Home Page query */}
      <TextField
        fullWidth
        defaultValue={searchParams.get('q') || ""}
        placeholder="Search for 'AC Repair' or 'Carpenter'..."
        slotProps={{input:{startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,}
          
        }}
        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
      />

      {/* Row of Dropdowns */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl fullWidth size="small">
          <InputLabel>City</InputLabel>
          <Select defaultValue={searchParams.get('location') || 'Lahore'} label="City">
            <MenuItem value="Lahore">Lahore</MenuItem>
            <MenuItem value="Karachi">Karachi</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select defaultValue={searchParams.get('category') || 'All'} label="Category">
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="SOLAR_EXPERT">Solar Expert</MenuItem>
            <MenuItem value="AC_TECHNICIAN">AC Technician</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select defaultValue={searchParams.get('filter') || 'recent'} label="Sort By">
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}