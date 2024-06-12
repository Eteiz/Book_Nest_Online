import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Link,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetBookTypesQuery } from '../features/api/bookTypesApiSlice';
import { useGetCategoriesQuery } from '../features/api/categoriesApiSlice';
import { useGetAuthorsQuery } from '../features/api/authorsApiSlice';
import SearchIcon from '@mui/icons-material/Search';
import FilterDictComponent from '../components/FilterDictComponent';
import { validateToDate } from '../utils/validation';
import { useLazyGetBooksQuery } from '../features/api/booksApiSlice';
import RentConfirmationModal from '../components/RentConfirmationModal';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminRole, checkTokenExpiration } from '../features/api/authSlice';
import AddBookModal from '../components/AddBookModal';
import WithdrawnBookModal from '../components/WithdrawnBookModal'; // Import the WithdrawnBookModal

const CatalogPage = () => {
  const [checkedBookTypes, setCheckedBookTypes] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedAuthors, setCheckedAuthors] = useState([]);
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [selectedNameFragment, setSelectedNameFragment] = useState('');
  const [errors, setErrors] = useState({});
  const [getBooks, { data: books, error, isLoading }] = useLazyGetBooksQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const tokenChecked = useSelector((state) => state.auth.isTokenChecked);

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [withdrawnBookModalOpen, setWithdrawnBookModalOpen] = useState(false); // State for WithdrawnBookModal

  useEffect(() => {
    dispatch(checkTokenExpiration());
    dispatch(checkAdminRole());
  }, [dispatch]);

  useEffect(() => {
    handleApplyFilters(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: '',
    });
    if (name === 'fromDate') setSelectedFromDate(value);
    if (name === 'toDate') setSelectedToDate(value);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.toDate = validateToDate(selectedFromDate, selectedToDate);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const getBookFilterData = () => {
    return {
      nameFragment: selectedNameFragment,
      fromDate: selectedFromDate,
      toDate: selectedToDate,
      authors: checkedAuthors,
      categories: checkedCategories,
      bookTypes: checkedBookTypes,
    };
  };

  const handleApplyFiltersClick = () => {
    setPageNumber(0);
    handleApplyFilters(pageNumber, pageSize);
  };

  const handleApplyFilters = async (pageNumber, pageSize) => {
    if (!validate()) return;
    const bookFilterData = getBookFilterData();
    try {
      await getBooks({ bookFilterData, page: pageNumber, size: pageSize });
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleOpenWithdrawnModal = (book) => {
    setSelectedBook(book);
    setWithdrawnBookModalOpen(true);
  };

  const handleCloseWithdrawnModal = () => {
    setWithdrawnBookModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: { xs: 0, sm: 4 } }}>
        <Grid item xs={12} sm>
          <Typography variant="h2">Browse our collection 📖</Typography>
        </Grid>
        {tokenChecked && isAdmin && (
          <Grid item xs={12} sm="auto">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ height: '40px', width: { xs: '100%', sm: 'auto' }, marginBottom: { xs: 2, sm: 0 } }}
              onClick={() => setAddBookModalOpen(true)}
            >
              Add new book
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ paddingTop: '0px !important' }}>
          <Divider sx={{ mt: 1, mb: 2 }}>
            <Typography variant="h3">Filters</Typography>
          </Divider>
          <TextField
            fullWidth
            size="small"
            id="nameFragment"
            label="Title contains"
            name="nameFragment"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={selectedNameFragment}
            onChange={(e) => setSelectedNameFragment(e.target.value)}
            sx={{ marginBottom: 1 }}
            inputProps={{ maxLength: 255 }}
          />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Release date</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent={'space-between'}>
                <TextField
                  id="fromDate"
                  label="From"
                  name="fromDate"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedFromDate}
                  onChange={handleChange}
                  sx={{ width: '49%' }}
                />
                <TextField
                  id="toDate"
                  label="To"
                  name="toDate"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedToDate}
                  onChange={handleChange}
                  error={!!errors.toDate}
                  helperText={errors.toDate}
                  sx={{ width: '49%' }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <FilterDictComponent
            filterTitle={'Authors'}
            filterQuery={useGetAuthorsQuery}
            selectedFilterData={checkedAuthors}
            setSelectedFilterData={setCheckedAuthors}
          />
          <FilterDictComponent
            filterTitle={'Categories'}
            filterQuery={useGetCategoriesQuery}
            selectedFilterData={checkedCategories}
            setSelectedFilterData={setCheckedCategories}
          />
          <FilterDictComponent
            filterTitle={'Types'}
            filterQuery={useGetBookTypesQuery}
            selectedFilterData={checkedBookTypes}
            setSelectedFilterData={setCheckedBookTypes}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1, width: '100%' }}
            onClick={() => {
              handleApplyFiltersClick();
            }}
          >
            <SearchIcon sx={{ marginRight: 1 }} />
            Apply filters
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" fontSize={'12px'} fontFamily={'Roboto'} marginLeft="8px">
              Unable to load data: {error.message}
            </Typography>
          )}
          {books && books.content && (
            <>
              <Pagination
                data={books}
                pageSize={pageSize}
                pageNumber={pageNumber}
                setPageSize={setPageSize}
                setPageNumber={setPageNumber}
              />
              {books.content.length > 0 && (
                <>
                  {books.content.map((book) => (
                    <Card key={book.id} sx={{ my: 2, p: 1, display: 'flex', justifyContent: 'column' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151, height: 151 }}
                        image={`${process.env.PUBLIC_URL}/${book.imageUrl}`}
                        alt={book.title}
                      />
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box display="flex" alignItems="baseline">
                          <Link href={`/book/${book.id}`}>
                            <Typography variant="h4">{book.title}</Typography>
                          </Link>
                          <Typography variant="subtitle2" style={{ marginLeft: '5px' }}>
                            / ({book.releaseDate.split('-')[0]})
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {book.bookTypes.map((bookType, index, array) => (
                            <span key={bookType.id}>
                              {bookType.name}
                              {index !== array.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                          <br></br>
                          <span style={{ fontSize: '15px', color: 'primary' }}>{' | '}</span>
                          {book.authors.map((author, index, array) => (
                            <span key={author.id}>
                              {author.name}
                              {index !== array.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" mt={3}>
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={!book.isAvailable}
                            onClick={() => handleOpenModal(book)}
                          >
                            {book.isAvailable ? 'Rent a book' : 'Unavailable'}
                          </Button>
                          {tokenChecked && isAdmin && (
                            <Button variant="outlined" color="error" onClick={() => handleOpenWithdrawnModal(book)}>
                              Withdrawn
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  <Pagination
                    data={books}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageSize={setPageSize}
                    setPageNumber={setPageNumber}
                  />
                </>
              )}
            </>
          )}
        </Grid>
        {selectedBook && <RentConfirmationModal book={selectedBook} open={modalOpen} handleClose={handleCloseModal} />}
      </Grid>
      <AddBookModal open={addBookModalOpen} handleClose={() => setAddBookModalOpen(false)} />
      {selectedBook && (
        <WithdrawnBookModal book={selectedBook} open={withdrawnBookModalOpen} handleClose={handleCloseWithdrawnModal} />
      )}
    </Container>
  );
};

export default CatalogPage;
