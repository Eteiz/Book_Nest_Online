import React from 'react';
import { Button, Typography, Container, Grid, Link } from '@mui/material';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Grid container spacing={2} alignItems={'center'} textAlign={'left'}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2">Read wherever and whenever you want!</Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            At <b>BookNest</b>, you can dive into a world where the magic of words brings endless imagination to life.
            Whether you're looking for the thrill of a new adventure, the insights of non-fiction, or the comfort of a
            classic tale, find it all here—available to read wherever and whenever you choose. Join now and start your
            journey through uncharted worlds and groundbreaking knowledge today!
          </Typography>
          <Grid container direction="row" justifyContent="flex-start" spacing={1} mb={1}>
            <Grid item>
              <Link href="/catalog">
                <Button variant="contained" color="secondary">
                  Browse our collection
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                <Button variant="outlined" color="secondary">
                  Sign up
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Typography variant="body2">
            Already have an account?
            <Link href="/signin"> Sign in!</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: { xs: 1, md: 0 } }}>
          <img src={`${process.env.PUBLIC_URL}/homepage_image.svg`} alt="Girl sitting on a books"></img>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
