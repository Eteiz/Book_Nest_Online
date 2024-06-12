import { useState } from 'react';
import { Modal, Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useArchiveUserMutation } from '../features/api/usersApiSlice';
import { checkTokenExpiration, clearCredentials } from '../features/api/authSlice';

const ArchiveUserModal = ({ userEmail, open, handleClose }) => {
  // State management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [archiveUser, { isLoading }] = useArchiveUserMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

  const handleSuccess = () => {
    dispatch(clearCredentials());
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
      const response = await archiveUser({ userEmail, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setTimeout(handleSuccess, 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an archiving the account', color: 'error' });
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
          <Typography variant="h3">Archive the account</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          Are you sure you want to archive the account for <b>{userEmail}</b>? Your account will be deactivated and you
          will no longer be able to access it.
        </Typography>
        <Divider sx={{ my: 1 }} />
        {status.message && (
          <Typography my={1} color={status.color}>
            {status.message}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Button type="button" variant="contained" color="error" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Archive account'}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ArchiveUserModal;
