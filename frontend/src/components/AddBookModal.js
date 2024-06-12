import { useState } from 'react';
import { Modal, Box, Typography, Divider, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { useCreateBookMutation } from '../features/api/booksApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAdminRole, checkTokenExpiration } from '../features/api/authSlice';
import {
  validateTitle,
  validateImageUrl,
  validateIsbnIssn,
  validateUkd,
  validateReleaseDate,
} from '../utils/validation';
import FilterDictComponent from './FilterDictComponent';
import { useGetBookTypesQuery } from '../features/api/bookTypesApiSlice';
import { useGetCategoriesQuery } from '../features/api/categoriesApiSlice';
import { useGetAuthorsQuery } from '../features/api/authorsApiSlice';

// Props of texfields
const textFieldProps = {
  size: 'small',
  fullWidth: true,
};

const AddBookModal = ({ open, handleClose }) => {
  // State management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [checkedBookTypes, setCheckedBookTypes] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedAuthors, setCheckedAuthors] = useState([]);
  const [errors, setErrors] = useState({});
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [status, setStatus] = useState({ message: null, color: 'error' });

  // Default state of form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbnIssn: '',
    ukd: '',
    imageUrl: 'book_default.jpg',
    releaseDate: '',
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
    newErrors.title = validateTitle(formData.title);
    newErrors.imageUrl = validateImageUrl(formData.imageUrl);
    newErrors.isbnIssn = validateIsbnIssn(formData.isbnIssn);
    newErrors.ukd = validateUkd(formData.ukd);
    newErrors.releaseDate = validateReleaseDate(formData.releaseDate);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking if logged user is admin
    dispatch(checkTokenExpiration());
    const isAdmin = dispatch(checkAdminRole());
    if (!token || !isAdmin) {
      navigate('/signinadmin');
    }
    if (!validate()) return;

    const completeFormData = {
      ...formData,
      authorsId: checkedAuthors,
      categoriesId: checkedCategories,
      booktypesId: checkedBookTypes,
    };
    try {
      const response = await createBook({ bookData: completeFormData, token }).unwrap();
      setStatus({ message: response, color: 'success.main' });
      // Clearing data after successful submission
      setFormData({
        title: '',
        description: '',
        isbnIssn: '',
        ukd: '',
        imageUrl: '',
        releaseDate: '',
      });
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
        setFormData({
          title: '',
          description: '',
          isbnIssn: '',
          ukd: '',
          imageUrl: '',
          releaseDate: '',
        });
        setCheckedAuthors([]);
        setCheckedCategories([]);
        setCheckedBookTypes([]);
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
          overflowY: 'auto',
          backgroundColor: 'white',
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
        }}
      >
        <Typography variant="h3" textAlign="center">
          Add new book
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...textFieldProps}
              autoFocus
              error={!!errors.title}
              helperText={errors.title}
              id="title"
              inputProps={{ maxLength: 255 }}
              label="Title"
              name="title"
              onChange={handleChange}
              required
              value={formData.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...textFieldProps}
              id="description"
              label="Description"
              multiline
              name="description"
              onChange={handleChange}
              required
              value={formData.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...textFieldProps}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
              id="imageUrl"
              inputProps={{ maxLength: 255 }}
              label="Image URL"
              name="imageUrl"
              onChange={handleChange}
              required
              value={formData.imageUrl}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...textFieldProps}
              error={!!errors.isbnIssn}
              helperText={errors.isbnIssn}
              id="isbnIssn"
              inputProps={{ maxLength: 8 }}
              label="isbnIssn"
              name="isbnIssn"
              onChange={handleChange}
              value={formData.isbnIssn}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...textFieldProps}
              id="ukd"
              label="ukd"
              name="ukd"
              value={formData.ukd}
              onChange={handleChange}
              error={!!errors.ukd}
              helperText={errors.ukd}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...textFieldProps}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate}
              id="releaseDate"
              InputLabelProps={{ shrink: true }}
              label="Release date"
              name="releaseDate"
              onChange={handleChange}
              required
              type="date"
              value={formData.releaseDate}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterDictComponent
              filterTitle={'Authors'}
              filterQuery={useGetAuthorsQuery}
              selectedFilterData={checkedAuthors}
              setSelectedFilterData={setCheckedAuthors}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterDictComponent
              filterTitle={'Categories'}
              filterQuery={useGetCategoriesQuery}
              selectedFilterData={checkedCategories}
              setSelectedFilterData={setCheckedCategories}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterDictComponent
              filterTitle={'Types'}
              filterQuery={useGetBookTypesQuery}
              selectedFilterData={checkedBookTypes}
              setSelectedFilterData={setCheckedBookTypes}
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
            {isLoading ? <CircularProgress size={24} /> : 'Add new book'}
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                isbnIssn: '',
                ukd: '',
                imageUrl: '',
                releaseDate: '',
              });
              setCheckedAuthors([]);
              setCheckedCategories([]);
              setCheckedBookTypes([]);
              handleClose();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddBookModal;
