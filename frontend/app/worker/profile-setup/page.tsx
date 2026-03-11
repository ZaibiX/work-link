"use client";

import React, { useState } from "react";
import { 
  Container, Paper, Typography, Box, TextField, MenuItem, 
  Grid, Button, Stack, Divider, Checkbox, FormControlLabel 
} from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Enums based on your Prisma Schema
const SKILL_CATEGORIES = ["AC_TECHNICIAN", "ELECTRICIAN", "SOLAR_EXPERT", "PLUMBER", "CARPENTER", "OTHER"];

export default function CreateWorkerProfile() {
  // States for form data
  const [skillCategory, setSkillCategory] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [city, setCity] = useState("Lahore");
  const [agreed, setAgreed] = useState(false);

  // State for errors
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation logic only on submit
    let newErrors: any = {};
    if (!skillCategory) newErrors.skillCategory = "Skill Category is required";
    if (!experienceYears) newErrors.experienceYears = "Experience is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!cnic) newErrors.cnic = "CNIC is required";
    if (!agreed) newErrors.agreed = "You must agree to continue";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting Data:", { skillCategory, experienceYears, phone, cnic, city, agreed });
      // Proceed with your submission logic
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: {xs:2,md:4} }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 6 }, 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            Become a WorkLink Professional
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete your profile to start receiving work opportunities in your area.
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container sx={{gap:{xs:2, md:4}}}>
            
            {/* 1. Professional Identity */}
            <Grid sx={{width:"100%"}}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <BusinessCenterIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Professional Details</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid >
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Skill Category"
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value)}
                    error={!!errors.skillCategory}
                    helperText={errors.skillCategory || "Select your primary expertise"}
                  >
                    {SKILL_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid >
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    label="Years of Experience"
                    placeholder="e.g. 5"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    error={!!errors.experienceYears}
                    helperText={errors.experienceYears}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid ><Divider /></Grid>

            {/* 2. Personal & Legal Information */}
            <Grid sx={{width:"100%"}} >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <AssignmentIndIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Verification & Contact</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    placeholder="03xx xxxxxxx"
                    size="small"

                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone || "Used for customer contact"}
                  />
                </Grid>
                <Grid >
                  <TextField
                    fullWidth
                    label="CNIC Number"
                    size="small"

                    placeholder="xxxxx-xxxxxxx-x"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    error={!!errors.cnic}
                    helperText={errors.cnic || "For identity verification (Confidential)"}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid ><Divider /></Grid>

            {/* 3. Location */}
            <Grid sx={{width:"100%"}} >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Service Location</Typography>
              </Stack>
              
              <Grid container spacing={2}>
                <Grid >
                  <TextField
                    fullWidth
                    label="Country"
                    defaultValue="Pakistan"
                    size="small"

                    disabled // Locked to Pakistan as per marketplace scope
                  />
                </Grid>
                <Grid >
                  <TextField
                    select
                    fullWidth
                    size="small"

                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <MenuItem value="Lahore">Lahore</MenuItem>
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            {/* Submission Area */}
            <Grid sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    size="small" 
                  />
                }
                label={
                  <Typography variant="body2" color={errors.agreed ? "error" : "text.secondary"}>
                    I agree to provide accurate information and follow WorkLink's professional code of conduct.
                  </Typography>
                }
              />
              <Button 
                type="submit"
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  mt: 4, 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 800, 
                  fontSize: '1rem',
                  textTransform: 'none'
                }}
              >
                Complete My Profile
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}