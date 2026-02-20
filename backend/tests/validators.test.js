const { validateEmail, validateCustomer } = require('../src/utils/validators');

describe('Validators', () => {
  describe('validateEmail', () => {
    test('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    test('should return false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('invalid@domain')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateCustomer', () => {
    test('should return valid for complete data', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890'
      };
      const result = validateCustomer(data);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should return invalid for missing name', () => {
      const data = {
        email: 'john@example.com',
        phone: '1234567890'
      };
      const result = validateCustomer(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });

    test('should return invalid for missing email', () => {
      const data = {
        name: 'John Doe',
        phone: '1234567890'
      };
      const result = validateCustomer(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    test('should return invalid for invalid email format', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '1234567890'
      };
      const result = validateCustomer(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid email format');
    });

    test('should return invalid for missing phone', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      const result = validateCustomer(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Phone is required');
    });
  });
});
