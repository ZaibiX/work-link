"use client";
import { Box, Paper, Container, Typography, Divider, Button, Stack } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

export const AuthWrapper = ({ title, subtitle, children, onGoogleClick }: any) => (
  <Container maxWidth="sm" sx={{ py: { xs: 4, md: 10 } }}>
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: 4, 
        border: '1px solid', 
        borderColor: 'divider',
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>{subtitle}</Typography>
      
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleClick}
        sx={{ 
          py: 1.2, 
          borderRadius: 2, 
          textTransform: 'none', 
          fontWeight: 600,
          borderColor: 'divider',
          color: 'text.primary',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' }
        }}
      >
        Continue with Google
      </Button>

      <Divider sx={{ my: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 600 }}>
          OR
        </Typography>
      </Divider>

      {children}
    </Paper>
  </Container>
);