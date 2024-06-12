import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Grid, Box, CircularProgress, Typography, Card, Divider, Button, Link } from '@mui/material';
import { useLazyGetBookQuery } from '../features/api/booksApiSlice';
import RentConfirmationModal from '../components/RentConfirmationModal';

const DataRow = ({ label, data }) => {
  return (
    <>
      <Typography variant="h5" mt={1}>
        {label}
      </Typography>
      {Array.isArray(data) ? (
        data.map((item, index) => (
          <Typography key={index} variant="body2" ml={1}>
            {item.name}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" ml={1}>
          {data}
        </Typography>
      )}
    </>
  );
};

const BookPage = () => {
  const { bookId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [getBook, { data: book, error, isLoading }] = useLazyGetBookQuery();

  useEffect(() => {
    getBook(bookId);
  }, [bookId, getBook]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Link href="/">home</Link>/<Link href="/catalog">catalog</Link>
      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" fontSize={'12px'} fontFamily={'Roboto'} marginLeft="8px">
            Unable to load data: {error.message}
          </Typography>
        ) : (
          book && (
            <>
              <Grid item xs={12} sm={3}>
                <img
                  src={`${process.env.PUBLIC_URL}/${book.imageUrl}`}
                  alt={book.title}
                  style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                />
                <Typography variant="subtitle2" fontWeight={400}>
                  Added to collection: <b>{book.createdAt}</b>
                </Typography>
                <Typography variant="subtitle2" fontWeight={400}>
                  Last modified: <b>{book.modifiedAt}</b>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} sx={{ paddingTop: '0px !important' }}>
                <Card sx={{ my: 2, p: 1 }}>
                  <Typography variant="h2">{book.title}</Typography>
                  {/* ISBN, UKD */}
                  <Typography variant="body2">
                    <b>ISBN:</b> {book.isbn || '8371698305'} | <b>UKD</b>: {book.ukd || '821.111(71)-3'}
                  </Typography>
                  {/* Release date */}
                  <Typography variant="body2" fontWeight={400}>
                    Release date: <b>{book.releaseDate}</b>
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <DataRow label="Authors:" data={book.authors} />
                  <DataRow label="Description:" data={book.description} />
                  <DataRow label="Book Types:" data={book.bookTypes} />
                  <DataRow label="Categories:" data={book.categories} />
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!book.isAvailable}
                    sx={{ marginTop: 2, width: { xs: '100%', sm: 'auto' } }}
                    onClick={handleOpen}
                  >
                    {book.isAvailable ? 'Rent a book' : 'Unavailable'}
                  </Button>
                </Card>
              </Grid>
              <RentConfirmationModal book={book} open={open} handleClose={handleClose} />
            </>
          )
        )}
      </Grid>
    </Container>
  );
};
export default BookPage;
