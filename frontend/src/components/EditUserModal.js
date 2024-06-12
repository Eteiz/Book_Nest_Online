import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Divider, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../features/api/authSlice';
import { validateAddress, validateCity, validatePhoneNumber, validatePostalCode } from '../utils/validation';
import { useUpdateUserMutation } from '../features/api/usersApiSlice';

const EditUserModal = ({ userEmail, open, handleClose, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [errors, setErrors] = useState({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (open && userData) {
      setFormData({
        address: userData.address || '',
        city: userData.city || '',
        postalCode: userData.postalCode || '',
        phoneNumber: userData.phoneNumber || '',
      });
    }
  }, [open, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: '',
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    newErrors.address = validateAddress(formData.address);
    newErrors.city = validateCity(formData.city);
    newErrors.postalCode = validatePostalCode(formData.postalCode);
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    dispatch(checkTokenExpiration());
    if (!token) {
      navigate('/signin');
    }

    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await updateUser({ userEmail, userData: formData, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setTimeout(handleSuccess, 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an error updating data.', color: 'error' });
    }
  };

  const handleSuccess = () => {
    handleClose();
    window.location.reload();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setFormData({ address: '', city: '', postalCode: '', phoneNumber: '' });
        handleClose();
      }}
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
          <Typography variant="h3">Edit profile {userEmail}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        {/* User data */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              autoComplete="postal-code"
              value={formData.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              id="city"
              label="City"
              name="city"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phoneNumber"
              size="small"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              inputProps={{ maxLength: 12 }}
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
          <Button type="button" variant="contained" color="error" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Update profile'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFormData({ address: '', city: '', postalCode: '', phoneNumber: '' });
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
