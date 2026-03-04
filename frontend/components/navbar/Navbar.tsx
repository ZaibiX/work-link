"use client";
import React, { useState } from 'react'
import { styled, useTheme, useColorScheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
// import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import Button from '@mui/material/Button'
import Image from 'next/image'
import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

// Component to hide the AppBar on scroll
function HideOnScroll(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  )
}

const drawerWidth = 240 // Standard drawer width for larger screens
const navItems = ["Browse Workers", "Post a Gig", "Become a Worker",]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function HideAppBar(props: Props) {
  const { window } = props
  // const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { mode, setMode } = useColorScheme();
  // setMode("system");
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("System prefers dark mode:", prefersDarkMode);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  if (!mode) return;
  console.log("Current theme mode:", mode);
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", width: "100%", alignItems: "center", mx: "auto", }}>
      
      <DrawerHeader sx={{ width: "100%", }}>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", px: 1, mt: 1 }}>
          <Typography variant='h6'>
            WorkLink
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ mr: 0 }} >

            {/* {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronRightIcon />} */}
            <CloseIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      {/* <Divider flexItem /> */}

      <List sx={{ mt: "auto", width: "100%", p: 2,}}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <ListItemText primary={item} />
              <ChevronRightIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} flexItem/>
      <Box sx={{
        display: { xs: 'flex', sm: 'none', },
        // bgcolor:'pink',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        marginTop: "auto",
        p: 2,
        mb: 6,
        width: "100%",
      }}>
        {/* Mode list */}
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            // p: 2,
            width: "100%",
            // borderRadius: 3,
            // bgcolor: "purple",
          }}
        >
          <Typography >Theme</Typography>
         <List sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1, }}
            >
           <ListItemButton
            onClick={() => setMode("light")}
            selected={mode === "light"}
          >
            <LightModeIcon color="action"/>
          </ListItemButton>

          <ListItemButton
            onClick={() => setMode("dark")}
            selected={mode === "dark"}
          >
            <DarkModeIcon color="action" />
          </ListItemButton>

          <ListItemButton
            onClick={() => setMode("system")}
            selected={mode === "system"}

          >
            <SettingsBrightnessIcon color="action"/>
          </ListItemButton>
         </List>
        </Box>
        {/* <Divider flexItem/> */}
        <Button variant="outlined" size="large" sx={{ width: "90%", textTransform: "none" }}>Login</Button>
        <Button variant="contained" size="large" sx={{ width: "90%", textTransform: "none" }}>Create Account</Button>
      </Box>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="nav" color="default" sx={{}} elevation={0}>
          <Toolbar >


            {/* Logo/Title and items*/}
            <Box sx={{ flexGrow: 1, display: "flex", gap: 4, alignItems: "center", }}>
              {/* <Typography
              variant="h6"
              // component="div"
              sx={{ display: { xs: 'block', sm: 'block',  },  color:"text.primary"}}
            >
              WorkLink
            </Typography> */}
              {/* <div style={{backgroundColor:"pink",padding:0, margin:0}}>
              <img 
  src="/gptRemove.gb.png" 
  alt="WorkLink Logo" 
  style={{ 
    height: '40px',   // Fixed height keeps the header consistent
    width: 'auto',     // Let the width adjust automatically to stay proportional
    objectFit: 'contain' ,
    padding:0,
    margin:0,
  }} 
/>

            </div> */}
              <div style={{ position: 'relative', width: '140px', height: '60px' }}>
                <Image
                  src="/wl.png"
                  alt="WorkLink Logo"
                  fill
                  // width={160}          
                  style={{
                    objectFit: 'contain', // Ensures it doesn't stretch
                    objectPosition: 'left', // Aligns it to the left of the header
                    filter: mode === "dark" ? "invert(1)" : "none",
                  }}
                  priority // Loads the logo immediately (important for LCP)
                />
              </div>

              {/* Navigation buttons for desktop */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: "center", gap: 2, }}>

                {navItems.map((item) => (
                  <Button key={item} sx={{ color: 'text.secondary', textTransform: "none" }} >
                    {item}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'flex', }, gap: 2, alignItems: "center", mx: 2, }}>

              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === "dark" ? <LightModeIcon color='primary' /> : <DarkModeOutlinedIcon color='primary' />}
              </IconButton>

              <Button variant="outlined" size="medium" sx={{ textTransform: "none" }}>Login</Button>
              <Button variant="contained" size="medium" sx={{ textTransform: "none" }}>Create Account</Button>
            </Box>
            {/* Hamburger Icon for mobile (hidden when drawer is open) */}
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0, display: { md: 'none' }, ...(mobileOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>

        </AppBar>
      </HideOnScroll>

      {/* Spacer to prevent content from going under the fixed app bar */}
      <Toolbar />

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          transitionDuration={200}

          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            BackdropProps: {
              transitionDuration: 150,
            },
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { xs: '100%', sm: drawerWidth }, // Full screen on xs, standard width on sm
              height: { xs: "100%", sm: "100%" }
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container>
    </React.Fragment>
  )
}