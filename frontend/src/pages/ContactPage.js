import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const card_pages = [
  {
    imageSource: `${process.env.PUBLIC_URL}/contactpage_meetUs.png`,
    imageTitle: 'BookNest library',
    cardHeader: 'Visit Us In-Person!',
    cardContent: (
      <>
        BookNest is conveniently located in the heart of <strong>Helsinki, Finland at 24 Esplanadi Street.</strong>
      </>
    ),
  },
  {
    imageSource: `${process.env.PUBLIC_URL}/contactpage_callUs.png`,
    imageTitle: 'BookNest call center',
    cardHeader: 'Give Us A Call!',
    cardContent: (
      <>
        You can reach BookNest at <strong>+358 9 123 4567</strong>. We're here to help with any questions you might
        have!
      </>
    ),
  },
  {
    imageSource: `${process.env.PUBLIC_URL}/contactpage_emailUs.png`,
    imageTitle: 'BookNest email address',
    cardHeader: 'Get in Touch Via Email!',
    cardContent: (
      <>
        Send your inquiries or feedback to <strong>contact@booknest.fi</strong> and we'll get back to you as soon as
        possible!
      </>
    ),
  },
];

function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Typography
        variant="h2"
        textAlign={'center'}
        sx={{
          width: { xs: '100%', md: '70%' },
          margin: 'auto',
        }}
      >
        We're here to help and listen!
      </Typography>
      <Typography
        variant="body1"
        textAlign={'center'}
        sx={{
          margin: 'auto',
          my: 2,
          width: { xs: '100%', md: '70%' },
        }}
      >
        At <strong>BookNest</strong>, we value your experience and are eager to assist you with any questions or
        feedback you might have. Whether you need help navigating our site, finding the perfect book, or have
        suggestions on how we can improve, we're all ears! Below, you'll find our contact details including email,
        telephone number, our address and frequently asked questions. Reach out today—we're looking forward to hearing
        from you!
      </Typography>
      <Grid container my={2} spacing={2} alignItems={'top'} justifyContent={'center'}>
        {card_pages.map((page) => (
          <Grid key={page.cardHeader} item sm={7} md={4}>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia sx={{ height: 140 }} image={page.imageSource} title={page.imageTitle} />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {page.cardHeader}
                </Typography>
                <Typography variant="body2">{page.cardContent}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default ContactPage;
