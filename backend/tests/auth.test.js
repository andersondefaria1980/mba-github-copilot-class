const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../src/controllers/authController');
const pool = require('../src/config/database');

// Mock dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/config/database');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('login', () => {
    test('should return 400 if username or password is missing', async () => {
      req.body = { username: 'admin' };
      
      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
    });

    test('should return 401 for invalid credentials - user not found', async () => {
      req.body = { username: 'invalid', password: 'pass' };
      pool.query.mockResolvedValue({ rows: [] });
      
      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    test('should return 401 for invalid password', async () => {
      req.body = { username: 'admin', password: 'wrongpass' };
      pool.query.mockResolvedValue({ 
        rows: [{ id: 1, username: 'admin', password_hash: 'hashedpass' }] 
      });
      bcrypt.compare.mockResolvedValue(false);
      
      await authController.login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    test('should return token for valid credentials', async () => {
      req.body = { username: 'admin', password: 'pass' };
      pool.query.mockResolvedValue({ 
        rows: [{ id: 1, username: 'admin', password_hash: 'hashedpass' }] 
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');
      
      await authController.login(req, res);
      
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 1, username: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      expect(res.json).toHaveBeenCalledWith({ 
        token: 'fake-jwt-token', 
        username: 'admin' 
      });
    });
  });
});
