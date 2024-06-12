import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../features/api/usersApiSlice';
import { TextField, Button, Grid, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageLogo from '../components/PageLogo';
import CircularProgress from '@mui/material/CircularProgress';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  validateAddress,
  validateCity,
  validatePhoneNumber,
  validatePostalCode,
  validateFirstName,
  validateLastName,
  validateEmailAddress,
  validatePassword,
  validatePesel,
  validateBirthDate,
} from '../utils/validation';
import { checkTokenExpiration } from '../features/api/authSlice';

const HCAPTCHA_KEY = process.env.REACT_APP_HCAPTCHA_KEY;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ message: null, color: 'error' });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState(null);

  useEffect(() => {
    dispatch(checkTokenExpiration());
    if (token) {
      navigate('/');
    }
  }, [token, navigate, dispatch]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    address: '',
    city: '',
    postalCode: '',
    pesel: '',
    birthDate: '',
    phoneNumber: '',
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

  const handleCaptchaVerification = (token) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const validate = () => {
    const newErrors = {};
    newErrors.firstName = validateFirstName(formData.firstName);
    newErrors.lastName = validateLastName(formData.lastName);
    newErrors.emailAddress = validateEmailAddress(formData.emailAddress);
    newErrors.password = validatePassword(formData.password);
    newErrors.address = validateAddress(formData.address);
    newErrors.city = validateCity(formData.city);
    newErrors.postalCode = validatePostalCode(formData.postalCode);
    newErrors.pesel = validatePesel(formData.pesel);
    newErrors.birthDate = validateBirthDate(formData.birthDate);
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
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
    if (!captchaToken) {
      setCaptchaError('Please complete the captcha.');
      return;
    }
    try {
      const response = await registerUser(formData).unwrap();
      setStatus({ message: response, color: 'success.main' });
      setFormData({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        address: '',
        city: '',
        postalCode: '',
        pesel: '',
        birthDate: '',
        phoneNumber: '',
      });
      setCaptchaToken(null);
      setTimeout(() => navigate('/signin'), 1000);
    } catch (err) {
      setStatus({ message: err.data || 'There was an error processing the register request.', color: 'error' });
    }
  };

  return (
    <Container maxWidth="false" sx={{ padding: '0 !important' }}>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={5} elevation={6}>
          <Box my={8} mx={4} display="flex" flexDirection="column" alignItems={'center'}>
            <PageLogo />
            <Typography variant="h3">Sign up</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="emailAddress"
                    autoComplete="email"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    error={!!errors.emailAddress}
                    helperText={errors.emailAddress}
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="pesel"
                    label="PESEL"
                    name="pesel"
                    autoComplete="pesel"
                    value={formData.pesel}
                    onChange={handleChange}
                    error={!!errors.pesel}
                    helperText={errors.pesel}
                    inputProps={{ maxLength: 11 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.birthDate}
                    onChange={handleChange}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
              </Grid>
              <Box display="flex" flexDirection={'column'} mt={2} mb={1}>
                <HCaptcha sitekey={HCAPTCHA_KEY} onVerify={handleCaptchaVerification} />
                {captchaError && (
                  <Typography color="error" fontSize={'12px'} fontFamily={'Roboto'} marginTop="3px" marginLeft="14px">
                    {captchaError}
                  </Typography>
                )}
              </Box>
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
                {isLoading ? <CircularProgress /> : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  <Link href="/">Return to homepage</Link>
                </Grid>
                <Grid item>
                  Already have an account? <Link href="/signin">Sign in</Link>
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

export default SignUpPage;
