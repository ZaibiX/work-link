"use client";

import React, { useState, useEffect } from "react";
import {
    Container, Paper, Typography, Box, TextField, MenuItem,
    Button, Stack, Divider, Card, CardContent, IconButton, Switch
} from "@mui/material";
import Grid from '@mui/material/Grid'; // MUI v7 approach (Grid2)
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance"

const MOCK_WORKER = {
    id: "worker-123",
    user: {
        name: "Zubair kkKhan",
    },
    phone: "03001234567",
    skillCategory: "SOLAR_EXPERT",
    gigs: [
        { id: "g1", title: "Solar Panel Cleaning", price: 1500, isActive: true },
        { id: "g2", title: "Complete Inverter Setup", price: 5000, isActive: false },
    ],
    status: "BUSY"
};

const SKILL_CATEGORIES = ["AC_TECHNICIAN", "ELECTRICIAN", "PLUMBER", "SOLAR_EXPERT", "PAINTER", "CARPENTER", "OTHER"];



export default function ProfileManagement() {
    const sampleId = "38a18bfb-a95a-4e16-ac1c-1ace0cc4babb";
    const [profile, setProfile] = useState(MOCK_WORKER);
    const [gigs, setGigs] = useState(MOCK_WORKER.gigs);

    const handleToggleActive = (id: string) => {
        setGigs(gigs.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g));
    };

    // const isLimitReached = gigs.length >= 3;
    const isLimitReached = false;

    async function handleSaveChanges() {

        try{

            const response = await axiosInstance.put(`/worker/profile/${sampleId}`, profile);

            const prof: any = {
                    id:response.data.profile.id,
                    user: response.data.profile.user,
                    skillCategory: response.data.profile.skillCategory,
                    phone: response.data.profile.phone,
                    status: response.data.profile.status
                }

                console.log(prof);
                setProfile(prof);
                setGigs(response.data.profile.gigs);

        }catch(err: any){
            console.error("Error while save changes triggered: ", err.response?.data?.message|| err.message)
        }
    }

    useEffect(() => {
        async function fetchProfileDetails() {
            try {
                const response = await axiosInstance.get(`worker/profile/${sampleId}`);

                console.log("Data from response: ", response.data)

                const prof: any = {
                    id: response.data.profile.id,
                    user: response.data.profile.user,
                    skillCategory: response.data.profile.skillCategory,
                    phone: response.data.profile.phone,
                    status: response.data.profile.status
                }

                setProfile(prof);
                setGigs(response.data.profile.gigs);
            } catch (err: any) {
                console.error(err.response?.data?.message || err.message);
            }



        }

        fetchProfileDetails();
    }, [])


    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>
                Manage Profile
            </Typography>

            {/* SECTION 1: PROFILE INFORMATION */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider', mb: 5 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <BusinessCenterIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Basic Information</Typography>
                </Stack>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={profile.user.name}
                            size="small"
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    user: {
                                        ...prev.user,
                                        name: e.target.value
                                    }
                                }))
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={profile.phone}
                            size="small"
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    phone: e.target.value
                                }))
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Profession / Skill"
                            value={profile.skillCategory}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    skillCategory: e.target.value
                                }))
                            }
                        >
                            {SKILL_CATEGORIES.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat.replace(/_/g, ' ')}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Added Worker Status Field */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Current Availability Status"
                            value={profile.status || "AVAILABLE"}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    status: e.target.value
                                }))
                            }
                        >
                            <MenuItem value="AVAILABLE">Available</MenuItem>
                            <MenuItem value="BUSY">Busy</MenuItem>
                            <MenuItem value="NOT_AVAILABLE">Not Available</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <MailOutlineIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            To update your <strong>CNIC</strong> or <strong>City</strong>, please email us at
                            <Box component="span" sx={{ color: 'primary.main', fontWeight: 700, ml: 0.5 }}>
                                support@worklink.example
                            </Box>
                        </Typography>
                    </Stack>
                </Box>

                <Button variant="contained" sx={{ mt: 3, fontWeight: 800, px: 4, borderRadius: 2 }} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Paper>

            {/* SECTION 2: GIGS MANAGEMENT */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>My Gigs</Typography>
                <Typography variant="body2" color={isLimitReached ? "error" : "text.secondary"} sx={{ fontWeight: 700 }}>
                    {gigs.length}/3 Gigs Used
                </Typography>
            </Stack>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Stack spacing={2}>
                    {gigs.map((gig) => (
                        <Card key={gig.id} variant="outlined" sx={{ borderRadius: 3, borderColor: 'divider' }}>
                            <CardContent sx={{ p: '16px !important' }}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{gig.title}</Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>Rs. {gig.price}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} alignItems="center">
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{gig.isActive ? "ACTIVE" : "HIDDEN"}</Typography>
                                            <Switch
                                                checked={gig.isActive}
                                                size="small"
                                                onChange={() => handleToggleActive(gig.id)}
                                                color="success"
                                            />
                                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />


                                            <Button variant="outlined" size="small" component={Link} href={`/worker/gig/edit/${gig.id}`} endIcon={<EditIcon />} >
                                                Edit
                                            </Button>

                                            <Button variant="outlined" size="small" color="error" endIcon={<DeleteIcon />} >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add Gig Button remains visible but disables at limit */}
                    <Button
                        component={isLimitReached ? "button" : Link}
                        href={!isLimitReached ? `/worker/gig/create/${profile.id}` : undefined}
                        variant="outlined"

                        disabled={isLimitReached}
                        startIcon={<AddIcon />}
                        sx={{
                            py: 2,
                            width: "fit-content",
                            alignSelf: "center",
                            borderStyle: 'dashed',
                            borderRadius: 3,
                            fontWeight: 800,
                            // Keep dashed border look even when disabled
                            "&.Mui-disabled": {
                                borderStyle: 'dashed',
                                color: 'text.disabled'
                            }
                        }}
                    >
                        {isLimitReached ? "Maximum Gig Limit Reached" : "Create New Gig"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}