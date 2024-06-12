import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Box display="flex" alignItems={'center'} flexDirection={'column'}>
        <img
          src={`${process.env.PUBLIC_URL}/notfoundpage_image.svg`}
          alt="Not found"
          style={{ maxWidth: '450px', width: '100%', marginBottom: '16px' }}
        />
        <Typography
          variant="h2"
          textAlign={'center'}
          sx={{
            mb: 1,
            width: { xs: '100%', md: '70%' },
          }}
        >
          Looks like you're lost!
        </Typography>
        <Typography
          variant="body1"
          textAlign={'center'}
          sx={{
            mb: 2,
            width: { xs: '100%', md: '70%' },
          }}
        >
          We couldn't find the page you were looking for. Please check the URL or click the button below to return to
          the homepage.
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
          Return to homepage
        </Button>
      </Box>
    </Container>
  );
}
export default NotFoundPage;
