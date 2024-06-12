import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Card,
  Divider,
  Button,
  Link,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  CardContent,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyGetRentalsQuery, useGetRentalStatusesQuery } from '../features/api/rentalsApiSlice';
import { useEffect, useState } from 'react';
import { validateToDate } from '../utils/validation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '../components/Pagination';
import { checkTokenExpiration, checkAdminRole } from '../features/api/authSlice';

const AdminRentalPage = () => {
  // Url param, state data
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useState form data
  const [checkedRentalStatuses, setCheckedRentalStatuses] = useState([]);
  const [selectedNameFragment, setSelectedNameFragment] = useState('');
  const [selectedStartFromDate, setSelectedStartFromDate] = useState('');
  const [selectedStartToDate, setSelectedStartToDate] = useState('');
  const [selectedDueFromDate, setSelectedDueFromDate] = useState('');
  const [selectedDueToDate, setSelectedDueToDate] = useState('');
  const [selectedReturnFromDate, setSelectedReturnFromDate] = useState('');
  const [selectedReturnToDate, setSelectedReturnToDate] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [errors, setErrors] = useState({});
  const [getRentals, { data: rentals, error, isLoading }] = useLazyGetRentalsQuery();

  const {
    data: rentalStatuses,
    error: rentalStatusesError,
    isLoading: rentalStatusesIsLoading,
  } = useGetRentalStatusesQuery();

  // Checking if user is on their site
  useEffect(() => {
    dispatch(checkTokenExpiration());
    const isAdmin = dispatch(checkAdminRole());
    console.log(isAdmin);
    // if (!token || !isAdmin) {
    //   navigate('/signin');
    // }
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
    if (name === 'startDateFrom') setSelectedStartFromDate(value);
    if (name === 'startDateTo') setSelectedStartToDate(value);
    if (name === 'dueDateFrom') setSelectedDueFromDate(value);
    if (name === 'dueDateTo') setSelectedDueToDate(value);
    if (name === 'returnDateFrom') setSelectedReturnFromDate(value);
    if (name === 'returnDateTo') setSelectedReturnToDate(value);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.startDateTo = validateToDate(selectedStartFromDate, selectedStartToDate);
    newErrors.dueDateTo = validateToDate(selectedDueFromDate, selectedDueToDate);
    newErrors.returnDateTo = validateToDate(selectedReturnFromDate, selectedReturnToDate);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const getRentalFilterData = () => {
    return {
      nameFragment: selectedNameFragment,
      startDateFrom: selectedStartFromDate,
      startDateTo: selectedStartToDate,
      dueDateFrom: selectedDueFromDate,
      dueDateTo: selectedDueToDate,
      returnDateFrom: selectedReturnFromDate,
      returnDateTo: selectedReturnToDate,
      rentalStatuses: checkedRentalStatuses,
    };
  };

  const handleApplyFilters = async (pageNumber, pageSize) => {
    if (!validate()) return;
    const rentalFilterData = getRentalFilterData();
    try {
      await getRentals({ rentalFilterData, token, page: pageNumber, size: pageSize });
    } catch (err) {
      console.error('Error fetching rentals:', err);
    }
  };

  const handleApplyFiltersClick = () => {
    setPageNumber(0);
    handleApplyFilters(0, pageSize);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Typography variant="h2" mb={4}>
        Rental history 👁️‍🗨️
      </Typography>
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
          {/* Start date */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="release_date" id="release_date">
              <Typography variant="h5">Start date</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent={'space-between'}>
                <TextField
                  id="startDateFrom"
                  label="From"
                  name="startDateFrom"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedStartFromDate}
                  onChange={handleChange}
                  sx={{ width: '49%' }}
                />
                <TextField
                  id="startDateTo"
                  label="To"
                  name="startDateTo"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedStartToDate}
                  onChange={handleChange}
                  error={!!errors.startDateTo}
                  helperText={errors.startDateTo}
                  sx={{ width: '49%' }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Due Date */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="release_date" id="release_date">
              <Typography variant="h5">Due date</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent={'space-between'}>
                <TextField
                  id="dueDateFrom"
                  label="From"
                  name="dueDateFrom"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedDueFromDate}
                  onChange={handleChange}
                  sx={{ width: '49%' }}
                />
                <TextField
                  id="dueDateTo"
                  label="To"
                  name="dueDateTo"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedDueToDate}
                  onChange={handleChange}
                  error={!!errors.dueDateTo}
                  helperText={errors.dueDateTo}
                  sx={{ width: '49%' }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Return Date */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="release_date" id="release_date">
              <Typography variant="h5">Return date</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent={'space-between'}>
                <TextField
                  id="returnDateFrom"
                  label="From"
                  name="returnDateFrom"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedReturnFromDate}
                  onChange={handleChange}
                  sx={{ width: '49%' }}
                />
                <TextField
                  id="returnDateTo"
                  label="To"
                  name="returnDateTo"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={selectedReturnToDate}
                  onChange={handleChange}
                  error={!!errors.returnDateTo}
                  helperText={errors.returnDateTo}
                  sx={{ width: '49%' }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Rental status */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="rentalStatus" id="rentalstatus">
              <Typography variant="h5">Rental status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {rentalStatusesIsLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : rentalStatusesError ? (
                <Typography color="error" fontSize="12px" fontFamily="Roboto" marginLeft="8px">
                  Unable to load data: {rentalStatusesError.message}
                </Typography>
              ) : rentalStatuses && rentalStatuses.length > 0 ? (
                <>
                  <List
                    sx={{
                      paddingY: 0,
                      maxHeight: { xs: '150px', md: '300px' },
                      overflowY: 'auto',
                      display: 'block',
                    }}
                  >
                    {rentalStatuses.map((data) => (
                      <ListItem key={data} sx={{ paddingY: 0, paddingX: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={checkedRentalStatuses.includes(data)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setCheckedRentalStatuses([...checkedRentalStatuses, data]);
                                } else {
                                  setCheckedRentalStatuses(checkedRentalStatuses.filter((name) => name !== data));
                                }
                              }}
                            />
                          }
                          label={<Typography>{data}</Typography>}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ paddingTop: 1 }} />
                  <Box sx={{ paddingTop: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="secondary" onClick={() => setCheckedRentalStatuses(rentalStatuses)}>
                      Select all
                    </Button>
                    <Button color="secondary" onClick={() => setCheckedRentalStatuses([])}>
                      Clear
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography fontSize="12px" fontFamily="Roboto" marginLeft="8px">
                  No filters available
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1, width: '100%' }}
            onClick={handleApplyFiltersClick}
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
          {rentals && rentals.content && (
            <>
              <Pagination
                data={rentals}
                pageSize={pageSize}
                pageNumber={pageNumber}
                setPageSize={setPageSize}
                setPageNumber={setPageNumber}
              />
              {rentals.content.length >= 1 && (
                <>
                  {rentals.content.map((rental) => (
                    <Card key={rental.id} sx={{ my: 2, p: 1, display: 'flex', justifyContent: 'column' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151, height: 151 }}
                        image={`${process.env.PUBLIC_URL}/${rental.book.imageUrl}`}
                        alt={rental.book.title}
                      />
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Link href={`/book/${rental.book.id}`}>
                          <Typography variant="h4">{rental.book.title}</Typography>
                        </Link>
                        <Divider sx={{ my: 1 }} />
                        {/* Status */}
                        <Box display="flex" gap={1} mb={1}>
                          <Typography variant="h5">Status: </Typography>
                          <Typography
                            variant="subtitle2"
                            style={{
                              color:
                                rental.rentalStatus === 'RETURNED'
                                  ? 'green'
                                  : rental.rentalStatus === 'LOST'
                                    ? 'red'
                                    : rental.rentalStatus === 'WITHDRAWN'
                                      ? 'purple'
                                      : 'inherit',
                            }}
                          >
                            {rental.rentalStatus}
                          </Typography>
                        </Box>
                        {/* Start date */}
                        <Box display="flex" gap={1}>
                          <Typography variant="h5">Rent start date: </Typography>
                          <Typography variant="body2" color="inherit">
                            {format(rental.startDate, 'MM/dd/yyyy HH:mm:ss')}
                          </Typography>
                        </Box>
                        {/* Due date */}
                        <Box display="flex" gap={1}>
                          <Typography variant="h5">Rent due date: </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color:
                                new Date(rental.dueDate) < new Date() && rental.rentalStatus === 'OUT'
                                  ? 'red'
                                  : 'inherit',
                            }}
                          >
                            {format(rental.dueDate, 'MM/dd/yyyy HH:mm:ss')}
                          </Typography>
                        </Box>
                        {/* Return date */}
                        {rental.rentalStatus === 'RETURNED' && (
                          <Box display="flex" gap={1} mt={1}>
                            <Typography variant="h5">Rent return date: </Typography>
                            <Typography variant="body2" color="inherit">
                              {format(rental.returnDate, 'MM/dd/yyyy HH:mm:ss')}
                            </Typography>
                          </Box>
                        )}
                        <Divider sx={{ my: 1 }} />
                      </CardContent>
                    </Card>
                  ))}
                  <Pagination
                    data={rentals}
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
      </Grid>
    </Container>
  );
};

export default AdminRentalPage;
