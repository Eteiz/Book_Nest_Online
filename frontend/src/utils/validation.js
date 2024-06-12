export const validatePesel = (pesel) => {
  const peselRegex = /^\d{11}$/;
  if (!pesel) {
    return 'PESEL is required.';
  }
  if (!peselRegex.test(pesel)) {
    return 'PESEL must be exactly 11 digits.';
  }
  return null;
};

export const validateBirthDate = (birthDate) => {
  if (!birthDate) {
    return 'Birth date is required.';
  }
  const birthDateObj = new Date(birthDate);
  if (birthDateObj > new Date()) {
    return 'Birth date cannot be in the future.';
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address) {
    return 'Address is required.';
  }
  if (address.length < 1 || address.length > 255) {
    return 'Address must be between 1 and 255 characters.';
  }
  return null;
};

export const validateCity = (city) => {
  if (!city) {
    return 'City is required.';
  }
  if (city.length < 1 || city.length > 255) {
    return 'City must be between 1 and 255 characters.';
  }
  return null;
};

export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^\d{2}-\d{3}$/;
  if (!postalCode) {
    return 'Postal code is required.';
  }
  if (!postalCodeRegex.test(postalCode)) {
    return 'Postal code must be in the format nn-nnn.';
  }
  return null;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\\+\\d{11}|\\d{9})$/;
  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    return 'Phone number must be in the format +nnnnnnnnnnn or nnnnnnnnn.';
  }
  return null;
};

export const validateFirstName = (firstName) => {
  if (!firstName) {
    return 'First name is required.';
  }
  if (firstName.length < 1 || firstName.length > 255) {
    return 'First name must be between 1 and 255 characters.';
  }
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName) {
    return 'Last name is required.';
  }
  if (lastName.length < 1 || lastName.length > 255) {
    return 'Last name must be between 1 and 255 characters.';
  }
  return null;
};

export const validateEmailAddress = (emailAddress) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailAddress) {
    return 'Email address is required.';
  }
  if (emailAddress.length < 1 || emailAddress.length > 255) {
    return 'Email address must be between 1 and 255 characters.';
  }
  if (!emailRegex.test(emailAddress)) {
    return 'Email address is not valid.';
  }
  return null;
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 8 || password.length > 255) {
    return 'Password must be between 8 and 255 characters.';
  }
  if (!passwordRegex.test(password)) {
    return 'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, and one number.';
  }
  return null;
};

export const validateToDate = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return null;
  }
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);
  if (toDateObj < fromDateObj) {
    return 'To date must be greater than or equal to From date.';
  }
  return null;
};

export const validateTitle = (title) => {
  if (!title) {
    return 'Title is required.';
  }
  if (title.length < 1 || title.length > 255) {
    return 'Title must be between 1 and 255 characters.';
  }
  return null;
};

export const validateImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'Image URL is required.';
  }
  if (imageUrl.length < 1 || imageUrl.length > 255) {
    return 'Image URL must be between 1 and 255 characters.';
  }
  return null;
};

export const validateIsbnIssn = (isbnIssn) => {
  if (isbnIssn && isbnIssn.length > 8) {
    return 'ISBN/ISSN must be 8 characters or less.';
  }
  return null;
};

export const validateUkd = (ukd) => {
  if (ukd && ukd.length > 255) {
    return 'UKD must be 255 characters or less.';
  }
  return null;
};

export const validateReleaseDate = (releaseDate) => {
  if (!releaseDate) {
    return 'Release date is required.';
  }
  const releaseDateObj = new Date(releaseDate);
  if (releaseDateObj > new Date()) {
    return 'Release date cannot be in the future.';
  }
  return null;
};
