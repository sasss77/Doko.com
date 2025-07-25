// adminController.test.js
const {
  getDashboardStats,
  getSystemHealth,
  getReports,
  getFinancialReports,
  manageUsers,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getSystemLogs,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/adminController');

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Coupon = require('../models/Coupon');

// Mock all models
jest.mock('../models/User');
jest.mock('../models/Product');
jest.mock('../models/Order');
jest.mock('../models/Category'); 
jest.mock('../models/Coupon');

describe('AdminController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      body: {},
      params: {},
      user: { id: 'admin123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getDashboardStats', () => {
    it('should return dashboard statistics successfully', async () => {
      req.query = { period: '30' };

      // Mock all countDocuments calls
      User.countDocuments
        .mockResolvedValueOnce(1000) // totalUsers
        .mockResolvedValueOnce(50)   // newUsers
        .mockResolvedValueOnce(100)  // totalSellers
        .mockResolvedValueOnce(80);  // activeSellers

      Product.countDocuments
        .mockResolvedValueOnce(500)  // totalProducts
        .mockResolvedValueOnce(450)  // activeProducts  
        .mockResolvedValueOnce(25)   // newProducts
        .mockResolvedValueOnce(10);  // lowStockProducts

      Product.aggregate.mockResolvedValueOnce([{ totalValue: 50000 }]);

      Order.countDocuments
        .mockResolvedValueOnce(200)  // totalOrders
        .mockResolvedValueOnce(15)   // recentOrders
        .mockResolvedValueOnce(5)    // pendingOrders
        .mockResolvedValueOnce(8);   // processingOrders

      Order.aggregate
        .mockResolvedValueOnce([{    // revenueStats
          totalRevenue: 25000,
          averageOrderValue: 125,
          orderCount: 200
        }])
        .mockResolvedValueOnce([{    // monthlyRevenue
          _id: { year: 2024, month: 1 },
          revenue: 5000,
          orders: 40
        }]);

      Category.countDocuments
        .mockResolvedValueOnce(20)   // totalCategories
        .mockResolvedValueOnce(18);  // activeCategories

      Product.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([
          { name: 'Product 1', soldCount: 100, price: 50, image: 'img1.jpg' }
        ])
      });

      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([
          {
            orderNumber: 'ORD001',
            user: { firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
            totalAmount: 100,
            orderStatus: 'pending',
            createdAt: new Date()
          }
        ])
      });

      await getDashboardStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        stats: expect.objectContaining({
          users: expect.objectContaining({
            total: 1000,
            new: 50,
            sellers: 100,
            activeSellers: 80
          }),
          products: expect.objectContaining({
            total: 500,
            active: 450,
            new: 25,
            lowStock: 10,
            totalValue: 50000
          })
        }),
        topProducts: expect.any(Array),
        recentOrders: expect.any(Array),
        monthlyRevenue: expect.any(Array)
      });
    });

    it('should handle empty revenue stats', async () => {
      User.countDocuments.mockResolvedValue(0);
      Product.countDocuments.mockResolvedValue(0);
      Product.aggregate.mockResolvedValue([]);
      Order.countDocuments.mockResolvedValue(0);
      Order.aggregate.mockResolvedValue([]);
      Category.countDocuments.mockResolvedValue(0);

      Product.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([])
      });

      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([])
      });

      await getDashboardStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        stats: expect.objectContaining({
          revenue: {
            total: 0,
            average: 0,
            orderCount: 0
          }
        }),
        topProducts: [],
        recentOrders: [],
        monthlyRevenue: []
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      User.countDocuments.mockRejectedValue(error);

      await getDashboardStats(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSystemHealth', () => {
    it('should return system health with no issues', async () => {
      Product.countDocuments.mockResolvedValue(0);
      User.countDocuments.mockResolvedValue(0);
      Order.countDocuments.mockResolvedValue(0);

      await getSystemHealth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        health: {
          database: 'connected',
          criticalIssues: [],
          status: 'healthy',
          lastChecked: expect.any(Date)
        }
      });
    });

    it('should return system health with critical issues', async () => {
      Product.countDocuments.mockResolvedValue(5);  // low stock
      User.countDocuments.mockResolvedValue(3);     // pending sellers
      Order.countDocuments.mockResolvedValue(2);    // old pending orders

      await getSystemHealth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        health: {
          database: 'connected',
          criticalIssues: [
            '5 products with critically low stock',
            '3 pending seller applications',
            '2 orders pending for more than 24 hours'
          ],
          status: 'needs_attention',
          lastChecked: expect.any(Date)
        }
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Product.countDocuments.mockRejectedValue(error);

      await getSystemHealth(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getReports', () => {
    it('should return sales report', async () => {
      req.query = { type: 'sales', startDate: '2024-01-01', endDate: '2024-12-31' };

      const mockSalesData = [
        {
          _id: { year: 2024, month: 1, day: 1 },
          totalSales: 1000,
          orderCount: 10,
          averageOrderValue: 100
        }
      ];

      Order.aggregate.mockResolvedValue(mockSalesData);

      await getReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        reportType: 'sales',
        period: { startDate: '2024-01-01', endDate: '2024-12-31' },
        data: mockSalesData
      });
    });

    it('should return products report', async () => {
      req.query = { type: 'products' };

      const mockProductsData = [
        {
          _id: 'category1',
          categoryName: 'Electronics',
          productCount: 50,
          totalSold: 200,
          averagePrice: 150,
          totalRevenue: 30000
        }
      ];

      Product.aggregate.mockResolvedValue(mockProductsData);

      await getReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        reportType: 'products',
        period: { startDate: undefined, endDate: undefined },
        data: mockProductsData
      });
    });

    it('should return users report', async () => {
      req.query = { type: 'users' };

      const mockUsersData = [
        {
          _id: { year: 2024, month: 1, role: 'customer' },
          count: 100
        }
      ];

      User.aggregate.mockResolvedValue(mockUsersData);

      await getReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        reportType: 'users',
        period: { startDate: undefined, endDate: undefined },
        data: mockUsersData
      });
    });

    it('should return error for invalid report type', async () => {
      req.query = { type: 'invalid' };

      await getReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid report type. Use: sales, products, or users'
      });
    });

    it('should handle errors', async () => {
      req.query = { type: 'sales' };
      const error = new Error('Database error');
      Order.aggregate.mockRejectedValue(error);

      await getReports(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getFinancialReports', () => {
    it('should return financial reports for monthly period', async () => {
      req.query = { period: 'monthly', year: '2024' };

      const mockFinancialStats = [
        {
          _id: null,
          totalRevenue: 100000,
          totalOrders: 500,
          averageOrderValue: 200
        }
      ];

      const mockTopSellers = [
        {
          _id: 'seller1',
          totalRevenue: 50000,
          totalOrders: 250,
          totalCommission: 5000,
          businessName: 'Test Business',
          firstName: 'John',
          lastName: 'Seller'
        }
      ];

      Order.aggregate
        .mockResolvedValueOnce(mockFinancialStats)
        .mockResolvedValueOnce(mockTopSellers);

      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([
          {
            _id: 'order1',
            orderNumber: 'ORD001',
            totalAmount: 200,
            orderStatus: 'delivered',
            createdAt: new Date(),
            user: { firstName: 'Jane', lastName: 'Customer' },
            items: [{ seller: { firstName: 'John', lastName: 'Seller', sellerInfo: { businessName: 'Test Business' } } }]
          }
        ])
      });

      await getFinancialReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({
          summary: expect.objectContaining({
            totalRevenue: 100000,
            totalCommission: 10000, // 10% of 100000
            totalPayouts: 90000,
            netProfit: 7500 // 10000 - 2500 (2.5% processing fees)
          }),
          topSellers: mockTopSellers,
          recentTransactions: expect.any(Array),
          period: 'monthly',
          year: '2024'
        })
      });
    });

    it('should handle empty financial stats', async () => {
      req.query = { period: 'yearly' };

      Order.aggregate
        .mockResolvedValueOnce([]) // empty financial stats
        .mockResolvedValueOnce([]); // empty top sellers

      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([])
      });

      await getFinancialReports(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({
          summary: {
            totalRevenue: 0,
            totalCommission: 0,
            totalPayouts: 0,
            netProfit: 0
          },
          topSellers: [],
          recentTransactions: [],
          period: 'yearly',
          year: expect.any(String)
        })
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Order.aggregate.mockRejectedValue(error);

      await getFinancialReports(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('manageUsers', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = {
        _id: 'user123',
        fullName: 'John Doe',
        email: 'john@test.com',
        role: 'customer',
        isActive: true,
        save: jest.fn().mockResolvedValue(true)
      };
    });

    it('should activate user successfully', async () => {
      req.body = { action: 'activate', userId: 'user123' };
      mockUser.isActive = false;

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(mockUser.isActive).toBe(true);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User activate successfully',
        user: expect.objectContaining({
          id: 'user123',
          isActive: true
        })
      });
    });

    it('should deactivate user successfully', async () => {
      req.body = { action: 'deactivate', userId: 'user123' };

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(mockUser.isActive).toBe(false);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should promote user to admin', async () => {
      req.body = { action: 'promote_to_admin', userId: 'user123' };

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(mockUser.role).toBe('admin');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not promote user who is already admin', async () => {
      req.body = { action: 'promote_to_admin', userId: 'user123' };
      mockUser.role = 'admin';

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User is already an admin'
      });
    });

    it('should demote admin to customer', async () => {
      req.body = { action: 'demote_from_admin', userId: 'user123' };
      mockUser.role = 'admin';

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(mockUser.role).toBe('customer');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not demote non-admin user', async () => {
      req.body = { action: 'demote_from_admin', userId: 'user123' };

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User is not an admin'
      });
    });

    it('should return error for user not found', async () => {
      req.body = { action: 'activate', userId: 'nonexistent' };

      User.findById.mockResolvedValue(null);

      await manageUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found'
      });
    });

    it('should return error for invalid action', async () => {
      req.body = { action: 'invalid_action', userId: 'user123' };

      User.findById.mockResolvedValue(mockUser);

      await manageUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid action'
      });
    });

    it('should handle errors', async () => {
      req.body = { action: 'activate', userId: 'user123' };
      const error = new Error('Database error');
      User.findById.mockRejectedValue(error);

      await manageUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createCoupon', () => {
    it('should create coupon successfully', async () => {
      req.body = {
        code: 'SAVE20',
        discountType: 'percentage',
        discountValue: 20,
        validUntil: new Date('2024-12-31')
      };

      const mockCoupon = {
        _id: 'coupon123',
        ...req.body,
        createdBy: 'admin123'
      };

      Coupon.create.mockResolvedValue(mockCoupon);

      await createCoupon(req, res, next);

      expect(Coupon.create).toHaveBeenCalledWith({
        ...req.body,
        createdBy: 'admin123'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon created successfully',
        coupon: mockCoupon
      });
    });

    it('should handle errors', async () => {
      req.body = { code: 'SAVE20' };
      const error = new Error('Validation error');
      Coupon.create.mockRejectedValue(error);

      await createCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateCoupon', () => {
    it('should update coupon successfully', async () => {
      req.params.id = 'coupon123';
      req.body = { discountValue: 25 };

      const mockUpdatedCoupon = {
        _id: 'coupon123',
        code: 'SAVE25',
        discountValue: 25
      };

      Coupon.findByIdAndUpdate.mockResolvedValue(mockUpdatedCoupon);

      await updateCoupon(req, res, next);

      expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith(
        'coupon123',
        req.body,
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon updated successfully',
        coupon: mockUpdatedCoupon
      });
    });

    it('should return error for coupon not found', async () => {
      req.params.id = 'nonexistent';
      req.body = { discountValue: 25 };

      Coupon.findByIdAndUpdate.mockResolvedValue(null);

      await updateCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'coupon123';
      const error = new Error('Database error');
      Coupon.findByIdAndUpdate.mockRejectedValue(error);

      await updateCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteCoupon', () => {
    it('should delete coupon successfully', async () => {
      req.params.id = 'coupon123';

      const mockCoupon = { _id: 'coupon123', code: 'SAVE20' };
      Coupon.findByIdAndDelete.mockResolvedValue(mockCoupon);

      await deleteCoupon(req, res, next);

      expect(Coupon.findByIdAndDelete).toHaveBeenCalledWith('coupon123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon deleted successfully'
      });
    });

    it('should return error for coupon not found', async () => {
      req.params.id = 'nonexistent';

      Coupon.findByIdAndDelete.mockResolvedValue(null);

      await deleteCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'coupon123';
      const error = new Error('Database error');
      Coupon.findByIdAndDelete.mockRejectedValue(error);

      await deleteCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllCoupons', () => {
    it('should get all coupons with pagination', async () => {
      req.query = { page: '1', limit: '10' };

      const mockCoupons = [
        { _id: 'coupon1', code: 'SAVE20', createdBy: { firstName: 'Admin', lastName: 'User' } }
      ];

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockCoupons)
      });

      Coupon.countDocuments.mockResolvedValue(1);

      await getAllCoupons(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        total: 1,
        totalPages: 1,
        currentPage: 1,
        coupons: mockCoupons
      });
    });

    it('should filter coupons by active status', async () => {
      req.query = { isActive: 'true' };

      const mockCoupons = [];
      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockCoupons)
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getAllCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({ isActive: true });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Coupon.find.mockImplementation(() => {
        throw error;
      });

      await getAllCoupons(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSystemLogs', () => {
    it('should return system logs successfully', async () => {
      const mockOrders = [
        {
          orderNumber: 'ORD001',
          user: { firstName: 'John', lastName: 'Doe' },
          orderStatus: 'pending',
          createdAt: new Date()
        }
      ];

      const mockUsers = [
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@test.com',
          role: 'customer',
          createdAt: new Date()
        }
      ];

      const mockProducts = [
        {
          name: 'Test Product',
          seller: { firstName: 'Seller', lastName: 'One' },
          isActive: true,
          createdAt: new Date()
        }
      ];

      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockOrders)
      });

      User.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockUsers)
      });

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockProducts)
      });

      await getSystemLogs(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        logs: expect.arrayContaining([
          expect.objectContaining({
            type: expect.stringMatching(/order|user|product/),
            action: expect.any(String),
            user: expect.any(String),
            timestamp: expect.any(Date)
          })
        ])
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Order.find.mockImplementation(() => {
        throw error;
      });

      await getSystemLogs(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAdminProfile', () => {
    it('should return admin profile successfully', async () => {
      const mockAdmin = {
        _id: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@test.com',
        role: 'admin'
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAdmin)
      });

      await getAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        admin: mockAdmin
      });
    });

    it('should return error for admin not found', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await getAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Admin not found'
      });
    });

    it('should return error for non-admin user', async () => {
      const mockUser = {
        _id: 'user123',
        role: 'customer'
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await getAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      User.findById.mockImplementation(() => {
        throw error;
      });

      await getAdminProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateAdminProfile', () => {
    it('should update admin profile successfully', async () => {
      req.body = {
        firstName: 'Updated',
        lastName: 'Admin',
        phone: '1234567890'
      };

      const mockAdmin = {
        _id: 'admin123',
        role: 'admin'
      };

      const mockUpdatedAdmin = {
        _id: 'admin123',
        firstName: 'Updated',
        lastName: 'Admin',
        phone: '1234567890',
        role: 'admin'
      };

      User.findById.mockResolvedValue(mockAdmin);
      User.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUpdatedAdmin)
      });

      await updateAdminProfile(req, res, next);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'admin123',
        {
          firstName: 'Updated',
          lastName: 'Admin',
          phone: '1234567890'
        },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Admin profile updated successfully',
        admin: mockUpdatedAdmin
      });
    });

    it('should prevent role updates', async () => {
      req.body = { role: 'customer' };

      await updateAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Role cannot be updated through this endpoint'
      });
    });

    it('should prevent password updates', async () => {
      req.body = { password: 'newpassword' };

      await updateAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Password cannot be updated through this endpoint. Use change password endpoint.'
      });
    });

    it('should return error for admin not found', async () => {
      req.body = { firstName: 'Updated' };

      User.findById.mockResolvedValue(null);

      await updateAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Admin not found'
      });
    });

    it('should return error for non-admin user', async () => {
      req.body = { firstName: 'Updated' };

      const mockUser = { role: 'customer' };
      User.findById.mockResolvedValue(mockUser);

      await updateAdminProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    });

    it('should handle errors', async () => {
      req.body = { firstName: 'Updated' };
      const error = new Error('Database error');
      User.findById.mockRejectedValue(error);

      await updateAdminProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
