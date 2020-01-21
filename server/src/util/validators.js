const AdministartorService = require('../services/administrator.service');


const validateLogin = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateCreateAdministrator = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else {
    const regEx = /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{20,}$/;
    if (!password.match(regEx)) {
      errors.password = 'Please improve password for security. Must have atleast 2 characters,numbers and symbols.';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateUpdateAdministrator = async (id, { email, password }) => {
  const errors = {};

  if (email) {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) errors.email = 'Email must be a valid email address';

    const existingEmail = await AdministartorService.findOneAdministrator({ email, _id: { $ne: id } });

    if (existingEmail) errors.email = 'email already exists.';
  }

  if (password) {
    const regEx = /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{20,}$/;
    if (!password.match(regEx)) errors.password = 'Please improve password for security. Must have atleast 2 characters,numbers and symbols.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


module.exports = { validateLogin, validateCreateAdministrator, validateUpdateAdministrator };
