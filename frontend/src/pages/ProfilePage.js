import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Container, Typography, Grid, Box, Button, TextField, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../features/api/authSlice';
import { useGetUserQuery } from '../features/api/usersApiSlice';
import ArchiveUserModal from '../components/ArchiveUserModal';
import EditUserModal from '../components/EditUserModal';

const ProfilePage = () => {
  // Url param, state data
  const { userEmail } = useParams();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Checking if user is on their site
  useEffect(() => {
    dispatch(checkTokenExpiration());
    if (!token || !user || user.emailAddress !== userEmail) {
      navigate('/signin');
    }
  }, [dispatch, token, user, userEmail, navigate]);

  // Fetching user data
  const { data: userData, error, isLoading } = useGetUserQuery({ userEmail, token }, { skip: !userEmail || !token });

  return (
    <Container maxWidth="lg" sx={{ minHeight: '70vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <img src={`${process.env.PUBLIC_URL}/profilepage_image.svg`} alt="Girl sitting on a books"></img>
        </Grid>
        <Grid item xs={12} md={7}>
          {userEmail && (
            <>
              <Typography variant="h2" textAlign={'center'}>
                {userEmail}'s profile
              </Typography>
              {/* User data */}
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error" fontSize="12px" fontFamily="Roboto" marginLeft="8px">
                  Unable to load data: {error.message}
                </Typography>
              ) : (
                userData && (
                  <>
                    <Typography variant="subtitle2" mt={1} textAlign={'center'}>
                      Created at {new Date(userData.createdAt).toLocaleString()}
                    </Typography>
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          size="small"
                          fullWidth
                          label="First Name"
                          disabled
                          value={userData.firstName}
                          inputProps={{ maxLength: 255 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Last Name"
                          disabled
                          value={userData.lastName}
                          inputProps={{ maxLength: 255 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Email Address"
                          disabled
                          value={userData.emailAddress}
                          inputProps={{ maxLength: 255 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Address"
                          disabled
                          value={userData.address}
                          inputProps={{ maxLength: 255 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Postal Code"
                          disabled
                          value={userData.postalCode}
                          inputProps={{ maxLength: 6 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="City"
                          value={userData.city}
                          disabled
                          inputProps={{ maxLength: 255 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="PESEL"
                          disabled
                          value={userData.pesel}
                          inputProps={{ maxLength: 11 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Birth Date"
                          type="date"
                          disabled
                          InputLabelProps={{ shrink: true }}
                          value={userData.birthDate}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Phone Number"
                          disabled
                          value={userData.phoneNumber ? userData.phoneNumber : 'Not added'}
                          inputProps={{ maxLength: 12 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>

                    {/* User data */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<EditNoteRoundedIcon />}
                        onClick={() => setEditModalOpen(true)}
                      >
                        Edit profile
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => setArchiveModalOpen(true)}>
                        Archive account
                      </Button>
                    </Box>
                    <ArchiveUserModal
                      userEmail={userEmail}
                      open={archiveModalOpen}
                      handleClose={() => setArchiveModalOpen(false)}
                    />
                    <EditUserModal
                      userEmail={userEmail}
                      open={editModalOpen}
                      handleClose={() => setEditModalOpen(false)}
                      userData={userData}
                    />
                  </>
                )
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProfilePage;
