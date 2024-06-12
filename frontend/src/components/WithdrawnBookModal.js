import { useState } from 'react';
import { Modal, Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWithdrawnBookMutation } from '../features/api/booksApiSlice';
import { checkTokenExpiration, checkAdminRole } from '../features/api/authSlice';

const WithdrawnBookModal = ({ book, open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [withdrawnBook, { isLoading }] = useWithdrawnBookMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

  const handleSuccess = () => {
    handleClose(true);
    window.location.reload();
  };

  const handleSubmit = async () => {
    dispatch(checkTokenExpiration());
    const isAdmin = dispatch(checkAdminRole());
    if (!token || !isAdmin) {
      navigate('/signinadmin');
    }
    try {
      const response = await withdrawnBook({ bookId: book.id, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setTimeout(handleSuccess, 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an withdrawing the book', color: 'error' });
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
          <Typography variant="h3">Withdrawn the book</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          Are you sure you want to withdrawn the book <b>{book.title}</b>? The book will be deactivated and you will not
          be able to rent it.
        </Typography>
        <Divider sx={{ my: 1 }} />
        {status.message && (
          <Typography my={1} color={status.color}>
            {status.message}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Button type="button" variant="contained" color="error" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Withdrawn the book'}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default WithdrawnBookModal;
