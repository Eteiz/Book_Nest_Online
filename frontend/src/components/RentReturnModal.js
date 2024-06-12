import React, { useState } from 'react';
import { format } from 'date-fns';
import { Modal, Box, Typography, Button, Divider, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReturnBookMutation } from '../features/api/rentalsApiSlice';
import { checkTokenExpiration } from '../features/api/authSlice';

const RentReturnModal = ({ rental, open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user.emailAddress);

  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const [returnBook, { isLoading }] = useReturnBookMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

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
      const response = await returnBook({ userEmail: user, rentalId: rental.id, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setTimeout(handleSuccess, 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an error returning the book', color: 'error' });
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
        <Typography variant="h3">Return a book</Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Book title */}
            <Typography variant="h5">Title:</Typography>
            <Typography variant="body2">{rental.book.title}</Typography>
            {/* Book authors */}
            <Typography variant="h5" mt={1}>
              Authors:
            </Typography>
            {rental.book.authors.map((item, index) => (
              <Typography key={index} variant="body2">
                {item.name}
              </Typography>
            ))}
            {/* Rental start date */}
            <Typography variant="h5" mt={2}>
              Rental start date:
            </Typography>
            <Typography variant="body2" color="inherit">
              {format(rental.startDate, 'MM/dd/yyyy HH:mm:ss')}
            </Typography>
            {/* Rental return date */}
            <Typography variant="h5">Rental due date:</Typography>
            <Typography
              variant="body2"
              style={{
                color: new Date(rental.dueDate) < new Date() && rental.rentalStatus === 'OUT' ? 'red' : 'inherit',
              }}
            >
              {format(rental.dueDate, 'MM/dd/yyyy HH:mm:ss')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src={`${process.env.PUBLIC_URL}/${rental.book.imageUrl}`}
              alt={rental.book.title}
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
            {isLoading ? <CircularProgress size={24} /> : 'Return a book'}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default RentReturnModal;
