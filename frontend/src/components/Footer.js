import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PageLogo from './PageLogo';
import PageTitle from './PageTitle';
import { navbar_pages } from '../utils/navbarPages';

function Footer() {
  return (
    <Box py={4.5} mt={5} sx={{ backgroundColor: (webTheme) => webTheme.palette.primary.main }}>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{
            flexDirection: { xs: 'column-reverse', md: 'row' },
          }}
        >
          {/* Logo, title */}
          <Grid container item xs={12} md={4} direction="column" textAlign="left" sx={{ marginTop: { xs: 3, md: 0 } }}>
            <Grid
              container
              alignItems="center"
              textAlign="left"
              mb={1}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Grid item mr={1}>
                <PageLogo display="flex" />
              </Grid>
              <Grid item>
                <PageTitle mr={2} display="flex" />
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Grid item>
                <Typography variant="subtitle2">©2024 Marta Ambroziak</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Navigation links */}
          <Grid
            item
            container
            xs={12}
            md={4}
            direction="column"
            sx={{
              flexDirection: { xs: 'column-reverse', md: 'column' },
            }}
          >
            <Grid container sx={{ justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: { xs: 1, md: 0 } }}>
              <Grid item alignItems="flex-start" ml={1.5}>
                <Link href="https://www.facebook.com" target="_blank">
                  <FacebookIcon style={{ color: 'gray' }} />
                </Link>
              </Grid>
              <Grid item alignItems="flex-start" ml={1.5}>
                <Link href="https://www.twitter.com" target="_blank">
                  <TwitterIcon style={{ color: 'gray' }} />
                </Link>
              </Grid>
              <Grid item alignItems="flex-start" ml={1.5}>
                <Link href="https://www.instagram.com" target="_blank">
                  <InstagramIcon style={{ color: 'gray' }} />
                </Link>
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}>
              {navbar_pages.map((page) => (
                <Grid key={page.name} item>
                  <Link href={page.link} ml={1.5}>
                    {page.name}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
