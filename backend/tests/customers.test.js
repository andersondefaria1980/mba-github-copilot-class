const customersController = require('../src/controllers/customersController');
const pool = require('../src/config/database');
const { validateCustomer } = require('../src/utils/validators');

// Mock dependencies
jest.mock('../src/config/database');
jest.mock('../src/utils/validators');

describe('Customers Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('should return array of customers', async () => {
      const mockCustomers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ];
      pool.query.mockResolvedValue({ rows: mockCustomers });
      
      await customersController.getAll(req, res);
      
      expect(res.json).toHaveBeenCalledWith(mockCustomers);
    });
  });

  describe('create', () => {
    test('should return 201 with valid data', async () => {
      const customerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890'
      };
      req.body = customerData;
      validateCustomer.mockReturnValue({ valid: true, errors: [] });
      pool.query.mockResolvedValue({ 
        rows: [{ id: 1, ...customerData }] 
      });
      
      await customersController.create(req, res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    test('should return 400 for invalid email', async () => {
      req.body = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '1234567890'
      };
      validateCustomer.mockReturnValue({ 
        valid: false, 
        errors: ['Invalid email format'] 
      });
      
      await customersController.create(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
    });
  });

  describe('update', () => {
    test('should return 200 for existing customer', async () => {
      const customerData = {
        name: 'John Doe Updated',
        email: 'john@example.com',
        phone: '1234567890'
      };
      req.params.id = '1';
      req.body = customerData;
      validateCustomer.mockReturnValue({ valid: true, errors: [] });
      pool.query.mockResolvedValue({ 
        rowCount: 1,
        rows: [{ id: 1, ...customerData }] 
      });
      
      await customersController.update(req, res);
      
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    test('should return 404 for non-existing customer', async () => {
      req.params.id = '999';
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890'
      };
      validateCustomer.mockReturnValue({ valid: true, errors: [] });
      pool.query.mockResolvedValue({ rowCount: 0, rows: [] });
      
      await customersController.update(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Customer not found' });
    });
  });
});
