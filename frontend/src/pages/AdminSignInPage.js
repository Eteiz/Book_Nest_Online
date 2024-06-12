import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginAdminMutation } from '../features/api/usersApiSlice';
import { TextField, Button, Grid, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiration, setCredentials } from '../features/api/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import PageLogo from '../components/PageLogo';
import { validateEmailAddress, validatePassword } from '../utils/validation';

const AdminSignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [status, setStatus] = useState({ message: null, color: 'error' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(checkTokenExpiration());
    if (token) {
      navigate('/');
    }
  }, []);

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

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
    newErrors.emailAddress = validateEmailAddress(formData.emailAddress);
    newErrors.password = validatePassword(formData.password);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    dispatch(checkTokenExpiration());
    if (token) {
      navigate('/');
    }

    e.preventDefault();
    if (!validate()) return;
    try {
      const token = await loginAdmin(formData).unwrap();
      const user = { emailAddress: formData.emailAddress };
      dispatch(setCredentials({ token, user }));
      setStatus({ message: 'Login successful!', color: 'success.main' });
      setFormData({
        emailAddress: '',
        password: '',
      });
    } catch (err) {
      setStatus({ message: err.data || 'Login failed', color: 'error' });
    }
  };

  return (
    <Container maxWidth="false" sx={{ padding: '0 !important' }}>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={5} elevation={6}>
          <Box my={8} mx={4} display="flex" flexDirection="column" alignItems={'center'}>
            <PageLogo />
            <Typography variant="h3">Admin sign in</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                required
                fullWidth
                id="emailAddress"
                label="Email Address"
                name="emailAddress"
                autoComplete="email"
                value={formData.emailAddress}
                onChange={handleChange}
                autoFocus
                error={!!errors.emailAddress}
                helperText={errors.emailAddress}
                inputProps={{ maxLength: 255 }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.password}
                helperText={errors.password}
                inputProps={{ maxLength: 255 }}
              />
              {status.message && (
                <Typography mt={1} color={status.color}>
                  {status.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : 'Sign In'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  <Link href="/">Return to homepage</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/contactpage_meetUs.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </Container>
  );
};

export default AdminSignInPage;
