"use client";

import React, { useState, useEffect } from "react";
import { 
  Container, Paper, Typography, Box, TextField, MenuItem, 
  Button, Stack, Divider, InputAdornment 
} from "@mui/material";
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

const SKILL_CATEGORIES = ["AC_TECHNICIAN", "ELECTRICIAN", "PLUMBER", "SOLAR_EXPERT", "PAINTER", "CARPENTER", "OTHER"];

export default function CreateGig() {
  const params = useParams();
  const router = useRouter();
  // const workerId = params.workerId;
  // const sampleId = "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";
  const gigId = params.gigId;


//   const {workerId, gigId} = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    customSkill: "",
    city: "Lahore",
    area: "",
  });

  useEffect(()=>{
    async function fetchGig(){
      try{
        const response = await axiosInstance.get(`worker/gig/${gigId}`)
        setFormData(response.data.data);
        console.log(response.data.data);
      }catch(err:any){
        console.error(err.response?.data?.message || err.message)
      }
    }

    fetchGig();
  },[])


  // State for errors - remains empty until Submit is clicked
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    setFormData({
      ...formData, 
      category: selectedCategory,
      customSkill: selectedCategory === "OTHER" ? formData.customSkill : "" 
    });
  };

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // VALIDATION TRIGGERED ONLY HERE
    let newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Gig title is required";
    if (!formData.description.trim()) newErrors.description = "Please provide a description";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid price";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.area.trim()) newErrors.area = "Area address is required";
    
    if (formData.category === "OTHER" && !formData.customSkill.trim()) {
      newErrors.customSkill = "Please specify your custom skill";
    }

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      // console.log("Validation passed. Submitting Gig for:", workerId, formData);
      // console.log("saving changes")
      try{
      const response = await axiosInstance.put(`worker/gig/${gigId}`, formData);
      setFormData(response.data.data)

      }catch(err:any){
        console.log("error is: ",err)
        console.error(err.response?.data?.message || err.message)
        
      }
      // router.push('/worker/dashboard');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button 
        component={Link} 
        href="/worker/dashboard" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 3, fontWeight: 700, color: 'text.secondary', textTransform: 'none' }}
      >
        Back to Dashboard
      </Button>

      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
            <PostAddIcon sx={{ color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>Edit your Gig</Typography>
            <Typography variant="body2" color="text.secondary">Offer a specific service to customers</Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Gig Title"
                placeholder="e.g., Professional AC Deep Cleaning"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Category"
                value={formData.category}
                onChange={handleCategoryChange}
                error={!!errors.category}
                helperText={errors.category}
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat.replace(/_/g, ' ')}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Price (PKR) / hr"
                type="number"
                slotProps={{input:{
                  startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,

                }
                }}
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>

            {/* Custom Skill specifier - only shows if "OTHER" is picked */}
            {formData.category === "OTHER" && (
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Specify Your Skill"
                  placeholder="e.g., CCTV Installation"
                  slotProps={{ htmlInput:{ maxLength: 15 } }}
                  value={formData.customSkill}
                  onChange={(e) => setFormData({...formData, customSkill: e.target.value})}
                  error={!!errors.customSkill}
                  helperText={errors.customSkill || "Maximum 15 characters"}
                />
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Detailed Description"
                placeholder="Describe what is included in this service..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }} /></Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              >
                <MenuItem value="Lahore">Lahore</MenuItem>
                <MenuItem value="Karachi">Karachi</MenuItem>
                <MenuItem value="Islamabad">Islamabad</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Area Address"
                placeholder="e.g., Gulberg III"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                error={!!errors.area}
                helperText={errors.area}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  sx={{ px: 6, py: 1.5, borderRadius: 3, fontWeight: 800, textTransform: 'none' }}
                >
                  Save Gig
                </Button>
                <Button 
                  component={Link}
                  href="/worker/dashboard"
                  variant="text" 
                  size="large" 
                  sx={{ fontWeight: 700, borderRadius: 3, color: 'text.secondary', textTransform: 'none' }}
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}