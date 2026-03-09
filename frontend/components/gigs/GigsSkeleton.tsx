"use client";
import { Box, Skeleton, Grid, Card, CardContent, Stack } from "@mui/material";

export default function GigsSkeleton() {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, i) => (
        <Grid size={{ xs: 12, md: 6 }} key={i}>
          <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="20%" />
                </Box>
              </Stack>
              <Skeleton variant="rectangular" height={24} width="80%" sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1 }} />
              <Stack direction="row" justifyContent="space-between">
                <Skeleton variant="text" width="20%" height={40} />
                <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 2 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}