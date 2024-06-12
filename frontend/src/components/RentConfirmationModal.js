import { useState } from 'react';
import {
  Button,
  Box,
  Divider,
  Modal,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useRentBookMutation } from '../features/api/rentalsApiSlice';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../features/api/authSlice';

const RentConfirmationModal = ({ book, open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const [rentBook, { isLoading }] = useRentBookMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + 30);

  const toLocalISOString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1);
    return localISOTime;
  };

  const todayLocalISO = toLocalISOString(today);
  const returnDateLocalISO = toLocalISOString(returnDate);

  const handleSuccess = () => {
    handleClose(true);
    window.location.reload();
  };

  const handleSubmit = async () => {
    dispatch(checkTokenExpiration());
    if (!token) {
      navigate('/signin');
      return;
    }
    try {
      const rentalRequestData = {
        bookId: Number(book.id),
        userEmail: user.emailAddress,
        startDate: todayLocalISO,
        dueDate: returnDateLocalISO,
      };
      const response = await rentBook({ rentalRequestData: rentalRequestData, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setTimeout(handleSuccess, 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an error renting the book', color: 'error' });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '70%',
            sm: '400px',
          },
          height: {
            sm: 'auto',
          },
          maxHeight: '90vh',
          backgroundColor: 'white',
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h3">Rent a book</Typography>
          <Tooltip title="You can rent a maximum of 5 books with 'OUT' status and cannot rent if you have any overdue.">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Book title */}
            <Typography variant="h5">Title:</Typography>
            <Typography variant="body2">{book.title}</Typography>
            {/* Book authors */}
            <Typography variant="h5" mt={1}>
              Authors:
            </Typography>
            {book.authors.map((item, index) => (
              <Typography key={index} variant="body2">
                {item.name}
              </Typography>
            ))}
            {/* Rental start date */}
            <Typography variant="h5" mt={2}>
              Rental start date:
            </Typography>
            <Typography variant="body2">{format(today, 'MM/dd/yyyy HH:mm:ss')}</Typography>
            {/* Rental return date */}
            <Typography variant="h5">Rental due date:</Typography>
            <Typography variant="body2">{format(returnDate, 'MM/dd/yyyy HH:mm:ss')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src={`${process.env.PUBLIC_URL}/${book.imageUrl}`}
              alt={book.title}
              style={{ width: '100%', height: 'auto', marginBottom: '8px', display: matches ? 'block' : 'none' }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        {status.message && (
          <Typography my={1} color={status.color}>
            {status.message}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Button type="button" variant="contained" color="secondary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Rent a book'}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RentConfirmationModal;
