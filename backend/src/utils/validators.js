function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateCustomer(data) {
  const errors = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.push('Phone is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateEmail, validateCustomer };
