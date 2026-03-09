"use client";

import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Link as MuiLink, 
  Divider,
  IconButton
} from "@mui/material";
import Link from "next/link";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        borderTop: '1px solid', 
        borderColor: 'divider',
        pt: 6, 
        pb: 3,
        mt: 'auto' // Pushes footer to bottom if page content is short
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'center', md: 'flex-start' }}
          spacing={4}
        >
          {/* Brand Section */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 300 }}>
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}
            >
              WorkLink
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting Pakistan's finest skilled workers with the people who need them. Fast, reliable, and verified.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Stack 
            direction="row" 
            spacing={4} 
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Platform
              </Typography>
              <Stack spacing={1}>
                <MuiLink component={Link} href="/search/gigs" color="inherit" variant="body2" underline="hover">Browse Work</MuiLink>
                <MuiLink component={Link} href="/categories" color="inherit" variant="body2" underline="hover">Categories</MuiLink>
                <MuiLink component={Link} href="/how-it-works" color="inherit" variant="body2" underline="hover">How it Works</MuiLink>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Support
              </Typography>
              <Stack spacing={1}>
                <MuiLink component={Link} href="/help" color="inherit" variant="body2" underline="hover">Help Center</MuiLink>
                <MuiLink component={Link} href="/safety" color="inherit" variant="body2" underline="hover">Safety</MuiLink>
                <MuiLink component={Link} href="/terms" color="inherit" variant="body2" underline="hover">Terms</MuiLink>
              </Stack>
            </Box>
          </Stack>

          {/* Social / Contact */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Get in Touch
            </Typography>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
              <IconButton color="primary" size="small"><WhatsAppIcon /></IconButton>
              <IconButton color="primary" size="small"><FacebookIcon /></IconButton>
              <IconButton color="primary" size="small"><InstagramIcon /></IconButton>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {currentYear} WorkLink Pakistan. All rights reserved.
          </Typography>
          
        </Box>
      </Container>
    </Box>
  );
}