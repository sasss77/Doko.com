// authController.test.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
  refreshToken
} = require('../controllers/authController');

const User = require('../models/User');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../models/User');

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRE = '7d';

describe('AuthController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 'user123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new customer successfully', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123',
        phone: '1234567890'
      };

      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer',
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date()
      };

      User.findOne.mockResolvedValue(null); // No existing user
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await register(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@test.com' });
      expect(User.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123',
        role: 'customer',
        phone: '1234567890'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock-token',
        user: {
          id: 'user123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'customer',
          avatar: null,
          isVip: false,
          preferences: {},
          createdAt: expect.any(Date)
        }
      });
    });

    it('should register a new seller successfully', async () => {
      req.body = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        password: 'password123',
        role: 'seller',
        phone: '1234567890',
        businessName: 'Jane\'s Store'
      };

      const mockUser = {
        _id: 'seller123',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        role: 'seller',
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date(),
        sellerInfo: {
          businessName: 'Jane\'s Store',
          isApproved: false,
          rating: 0
        }
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await register(req, res, next);

      expect(User.create).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        password: 'password123',
        role: 'seller',
        phone: '1234567890',
        sellerInfo: {
          businessName: 'Jane\'s Store',
          isApproved: false
        }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock-token',
        user: expect.objectContaining({
          role: 'seller',
          sellerInfo: {
            businessName: 'Jane\'s Store',
            isApproved: false,
            rating: 0
          }
        })
      });
    });

    it('should return error if user already exists', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: 'john@test.com' });

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User already exists with this email'
      });
      expect(User.create).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123'
      };

      const error = new Error('Database error');
      User.findOne.mockRejectedValue(error);

      await register(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      req.body = {
        email: 'john@test.com',
        password: 'password123'
      };

      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer',
        isActive: true,
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date(),
        matchPassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });
      jwt.sign.mockReturnValue('mock-token');

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@test.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock-token',
        user: expect.objectContaining({
          id: 'user123',
          email: 'john@test.com'
        })
      });
    });

    it('should return error for non-existent user', async () => {
      req.body = {
        email: 'nonexistent@test.com',
        password: 'password123'
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should return error for inactive user', async () => {
      req.body = {
        email: 'john@test.com',
        password: 'password123'
      };

      const mockUser = {
        isActive: false
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Account is deactivated'
      });
    });

    it('should return error for role mismatch', async () => {
      req.body = {
        email: 'john@test.com',
        password: 'password123',
        role: 'admin'
      };

      const mockUser = {
        isActive: true,
        role: 'customer'
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials for this role'
      });
    });

    it('should return error for incorrect password', async () => {
      req.body = {
        email: 'john@test.com',
        password: 'wrongpassword'
      };

      const mockUser = {
        isActive: true,
        role: 'customer',
        matchPassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should handle errors', async () => {
      req.body = {
        email: 'john@test.com',
        password: 'password123'
      };

      const error = new Error('Database error');
      User.findOne.mockImplementation(() => {
        throw error;
      });

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getMe', () => {
    it('should return current user successfully', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer'
      };

      User.findById.mockResolvedValue(mockUser);

      await getMe(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: mockUser
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      User.findById.mockRejectedValue(error);

      await getMe(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      req.body = {
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        phone: '9876543210',
        address: '123 New Street',
        preferences: { theme: 'dark' }
      };

      const mockUpdatedUser = {
        _id: 'user123',
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        phone: '9876543210',
        address: '123 New Street',
        preferences: { theme: 'dark' }
      };

      User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      await updateProfile(req, res, next);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        {
          firstName: 'John Updated',
          lastName: 'Doe Updated',
          phone: '9876543210',
          address: '123 New Street',
          preferences: { theme: 'dark' }
        },
        {
          new: true,
          runValidators: true
        }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: mockUpdatedUser
      });
    });

    it('should update profile with partial data', async () => {
      req.body = {
        firstName: 'John Updated',
        phone: undefined, // Should be filtered out
        address: '123 New Street'
      };

      const mockUpdatedUser = {
        _id: 'user123',
        firstName: 'John Updated',
        address: '123 New Street'
      };

      User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      await updateProfile(req, res, next);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        {
          firstName: 'John Updated',
          address: '123 New Street'
        },
        {
          new: true,
          runValidators: true
        }
      );
    });

    it('should handle errors', async () => {
      req.body = { firstName: 'John' };
      const error = new Error('Database error');
      User.findByIdAndUpdate.mockRejectedValue(error);

      await updateProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      req.body = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123'
      };

      const mockUser = {
        _id: 'user123',
        matchPassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
        password: 'oldpassword'
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await changePassword(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(mockUser.matchPassword).toHaveBeenCalledWith('oldpassword');
      expect(mockUser.password).toBe('newpassword123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Password updated successfully'
      });
    });

    it('should return error for incorrect current password', async () => {
      req.body = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123'
      };

      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false)
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await changePassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Current password is incorrect'
      });
      expect(mockUser.save).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      req.body = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123'
      };

      const error = new Error('Database error');
      User.findById.mockImplementation(() => {
        throw error;
      });

      await changePassword(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      await logout(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Logged out successfully'
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Unexpected error');
      // Force an error by making res.status throw
      res.status.mockImplementation(() => {
        throw error;
      });

      await logout(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer',
        isActive: true,
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date()
      };

      User.findById.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('new-mock-token');

      await refreshToken(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'new-mock-token',
        user: {
          id: 'user123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'customer',
          avatar: null,
          isVip: false,
          preferences: {},
          createdAt: expect.any(Date)
        }
      });
    });

    it('should return error for user not found', async () => {
      User.findById.mockResolvedValue(null);

      await refreshToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found or inactive'
      });
    });

    it('should return error for inactive user', async () => {
      const mockUser = {
        _id: 'user123',
        isActive: false
      };

      User.findById.mockResolvedValue(mockUser);

      await refreshToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found or inactive'
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      User.findById.mockRejectedValue(error);

      await refreshToken(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('generateToken utility', () => {
    it('should generate token with correct parameters', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer',
        isActive: true,
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date()
      };

      User.findById.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('generated-token');

      await refreshToken(req, res, next);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'user123' },
        'test-secret',
        { expiresIn: '7d' }
      );
    });
  });

  describe('sendTokenResponse utility', () => {
    it('should format customer response correctly', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'customer',
        isActive: true,
        avatar: 'avatar.jpg',
        isVip: true,
        preferences: { theme: 'dark' },
        createdAt: new Date()
      };

      User.findById.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await refreshToken(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock-token',
        user: {
          id: 'user123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'customer',
          avatar: 'avatar.jpg',
          isVip: true,
          preferences: { theme: 'dark' },
          createdAt: expect.any(Date)
        }
      });
    });

    it('should format seller response with sellerInfo correctly', async () => {
      const mockUser = {
        _id: 'seller123',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        role: 'seller',
        isActive: true,
        avatar: null,
        isVip: false,
        preferences: {},
        createdAt: new Date(),
        sellerInfo: {
          businessName: 'Jane\'s Store',
          isApproved: true,
          rating: 4.5
        }
      };

      User.findById.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await refreshToken(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock-token',
        user: {
          id: 'seller123',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@test.com',
          role: 'seller',
          avatar: null,
          isVip: false,
          preferences: {},
          createdAt: expect.any(Date),
          sellerInfo: {
            businessName: 'Jane\'s Store',
            isApproved: true,
            rating: 4.5
          }
        }
      });
    });
  });
});
