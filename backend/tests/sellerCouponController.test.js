// sellerCouponController.test.js
const {
  createSellerCoupon,
  updateSellerCoupon,
  deleteSellerCoupon,
  getSellerCoupons,
  getSellerCouponById
} = require('../controllers/sellerCouponController');

const Coupon = require('../models/Coupon');

// Mock dependencies
jest.mock('../models/Coupon');

describe('SellerCouponController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id: 'seller123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('createSellerCoupon', () => {
    it('should create coupon successfully', async () => {
      req.body = {
        code: 'SAVE20',
        discountType: 'percentage',
        discountValue: 20,
        validUntil: new Date('2025-12-31'),
        isActive: true
      };

      const mockCoupon = {
        _id: 'coupon123',
        code: 'SAVE20',
        discountType: 'percentage',
        discountValue: 20,
        validUntil: new Date('2025-12-31'),
        createdBy: 'seller123',
        seller: 'seller123',
        isActive: true
      };

      Coupon.create.mockResolvedValue(mockCoupon);

      await createSellerCoupon(req, res, next);

      expect(Coupon.create).toHaveBeenCalledWith({
        code: 'SAVE20',
        discountType: 'percentage',
        discountValue: 20,
        validUntil: new Date('2025-12-31'),
        isActive: true,
        createdBy: 'seller123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon created successfully',
        coupon: mockCoupon
      });
    });

    it('should create coupon with minimal data', async () => {
      req.body = {
        code: 'MINIMAL',
        discountType: 'fixed',
        discountValue: 10
      };

      const mockCoupon = {
        _id: 'coupon456',
        ...req.body,
        createdBy: 'seller123',
        seller: 'seller123'
      };

      Coupon.create.mockResolvedValue(mockCoupon);

      await createSellerCoupon(req, res, next);

      expect(Coupon.create).toHaveBeenCalledWith({
        ...req.body,
        createdBy: 'seller123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle validation errors', async () => {
      req.body = {
        discountType: 'percentage',
        discountValue: 20
        // Missing required 'code' field
      };

      const error = new Error('Validation failed: code is required');
      Coupon.create.mockRejectedValue(error);

      await createSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle duplicate coupon code error', async () => {
      req.body = {
        code: 'DUPLICATE',
        discountType: 'percentage',
        discountValue: 15
      };

      const error = new Error('Coupon code already exists');
      error.code = 11000; // MongoDB duplicate key error
      Coupon.create.mockRejectedValue(error);

      await createSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle other database errors', async () => {
      req.body = {
        code: 'SAVE20',
        discountType: 'percentage',
        discountValue: 20
      };

      const error = new Error('Database connection failed');
      Coupon.create.mockRejectedValue(error);

      await createSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateSellerCoupon', () => {
    it('should update coupon successfully', async () => {
      req.params.id = 'coupon123';
      req.body = {
        discountValue: 25,
        isActive: false
      };

      const mockCoupon = {
        _id: 'coupon123',
        code: 'SAVE20',
        seller: 'seller123',
        discountValue: 20
      };

      const mockUpdatedCoupon = {
        _id: 'coupon123',
        code: 'SAVE20',
        seller: 'seller123',
        discountValue: 25,
        isActive: false
      };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Coupon.findByIdAndUpdate.mockResolvedValue(mockUpdatedCoupon);

      await updateSellerCoupon(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith(
        'coupon123',
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon updated successfully',
        coupon: mockUpdatedCoupon
      });
    });

    it('should update coupon with partial data', async () => {
      req.params.id = 'coupon123';
      req.body = {
        isActive: true
      };

      const mockCoupon = {
        _id: 'coupon123',
        seller: 'seller123'
      };

      const mockUpdatedCoupon = {
        _id: 'coupon123',
        seller: 'seller123',
        isActive: true
      };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Coupon.findByIdAndUpdate.mockResolvedValue(mockUpdatedCoupon);

      await updateSellerCoupon(req, res, next);

      expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith(
        'coupon123',
        { isActive: true },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error if coupon not found', async () => {
      req.params.id = 'nonexistent';
      req.body = { discountValue: 25 };

      Coupon.findOne.mockResolvedValue(null);

      await updateSellerCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to update it'
      });
      expect(Coupon.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('should return error if coupon belongs to different seller', async () => {
      req.params.id = 'coupon123';
      req.body = { discountValue: 25 };

      // Coupon exists but belongs to different seller
      Coupon.findOne.mockResolvedValue(null);

      await updateSellerCoupon(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to update it'
      });
    });

    it('should handle validation errors during update', async () => {
      req.params.id = 'coupon123';
      req.body = { discountValue: -10 }; // Invalid discount value

      const mockCoupon = {
        _id: 'coupon123',
        seller: 'seller123'
      };

      const error = new Error('Validation failed: discountValue must be positive');
      Coupon.findOne.mockResolvedValue(mockCoupon);
      Coupon.findByIdAndUpdate.mockRejectedValue(error);

      await updateSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle database errors', async () => {
      req.params.id = 'coupon123';
      req.body = { discountValue: 25 };

      const error = new Error('Database error');
      Coupon.findOne.mockRejectedValue(error);

      await updateSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteSellerCoupon', () => {
    it('should delete coupon successfully', async () => {
      req.params.id = 'coupon123';

      const mockCoupon = {
        _id: 'coupon123',
        code: 'SAVE20',
        seller: 'seller123'
      };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Coupon.findByIdAndDelete.mockResolvedValue(mockCoupon);

      await deleteSellerCoupon(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(Coupon.findByIdAndDelete).toHaveBeenCalledWith('coupon123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon deleted successfully'
      });
    });

    it('should return error if coupon not found', async () => {
      req.params.id = 'nonexistent';

      Coupon.findOne.mockResolvedValue(null);

      await deleteSellerCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to delete it'
      });
      expect(Coupon.findByIdAndDelete).not.toHaveBeenCalled();
    });

    it('should return error if coupon belongs to different seller', async () => {
      req.params.id = 'coupon123';

      // Query returns null because seller doesn't match
      Coupon.findOne.mockResolvedValue(null);

      await deleteSellerCoupon(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to delete it'
      });
    });

    it('should handle errors during deletion', async () => {
      req.params.id = 'coupon123';

      const mockCoupon = {
        _id: 'coupon123',
        seller: 'seller123'
      };

      const error = new Error('Database deletion failed');
      Coupon.findOne.mockResolvedValue(mockCoupon);
      Coupon.findByIdAndDelete.mockRejectedValue(error);

      await deleteSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle errors during find operation', async () => {
      req.params.id = 'coupon123';

      const error = new Error('Database find failed');
      Coupon.findOne.mockRejectedValue(error);

      await deleteSellerCoupon(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSellerCoupons', () => {
    it('should get seller coupons with default parameters', async () => {
      const mockCoupons = [
        {
          _id: 'coupon1',
          code: 'SAVE20',
          seller: 'seller123',
          createdBy: { firstName: 'John', lastName: 'Seller' }
        },
        {
          _id: 'coupon2',
          code: 'SAVE30',
          seller: 'seller123',
          createdBy: { firstName: 'John', lastName: 'Seller' }
        }
      ];

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockCoupons)
      });

      Coupon.countDocuments.mockResolvedValue(2);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        total: 2,
        totalPages: 1,
        currentPage: 1,
        coupons: mockCoupons
      });
    });

    it('should filter coupons by active status', async () => {
      req.query = { isActive: 'true' };

      const mockCoupons = [
        {
          _id: 'coupon1',
          code: 'ACTIVE20',
          seller: 'seller123',
          isActive: true
        }
      ];

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockCoupons)
      });

      Coupon.countDocuments.mockResolvedValue(1);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        isActive: true
      });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        count: 1,
        total: 1,
        coupons: mockCoupons
      }));
    });

    it('should filter coupons by inactive status', async () => {
      req.query = { isActive: 'false' };

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        isActive: false
      });
    });

    it('should filter expired coupons', async () => {
      req.query = { isExpired: 'true' };

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        validUntil: { $lt: expect.any(Date) }
      });
    });

    it('should filter non-expired coupons', async () => {
      req.query = { isExpired: 'false' };

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        validUntil: { $gte: expect.any(Date) }
      });
    });

    it('should handle pagination', async () => {
      req.query = { page: '2', limit: '5' };

      const mockFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      Coupon.find.mockReturnValue(mockFind);
      Coupon.countDocuments.mockResolvedValue(15);

      await getSellerCoupons(req, res, next);

      expect(mockFind.skip).toHaveBeenCalledWith(5); // (2-1) * 5
      expect(mockFind.limit).toHaveBeenCalledWith(5);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        totalPages: 3, // Math.ceil(15/5)
        currentPage: 2
      }));
    });

    it('should handle multiple filters', async () => {
      req.query = {
        isActive: 'true',
        isExpired: 'false',
        page: '1',
        limit: '20'
      };

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        isActive: true,
        validUntil: { $gte: expect.any(Date) }
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      Coupon.find.mockImplementation(() => {
        throw error;
      });

      await getSellerCoupons(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle errors in countDocuments', async () => {
      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      const error = new Error('Count failed');
      Coupon.countDocuments.mockRejectedValue(error);

      await getSellerCoupons(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSellerCouponById', () => {
    it('should get coupon by id successfully', async () => {
      req.params.id = 'coupon123';

      const mockCoupon = {
        _id: 'coupon123',
        code: 'SAVE20',
        seller: 'seller123',
        discountValue: 20,
        createdBy: { firstName: 'John', lastName: 'Seller' }
      };

      Coupon.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCoupon)
      });

      await getSellerCouponById(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        coupon: mockCoupon
      });
    });

    it('should return error if coupon not found', async () => {
      req.params.id = 'nonexistent';

      Coupon.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await getSellerCouponById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to view it'
      });
    });

    it('should return error if coupon belongs to different seller', async () => {
      req.params.id = 'coupon123';

      // Query returns null because seller doesn't match
      Coupon.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await getSellerCouponById(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        _id: 'coupon123',
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon not found or you do not have permission to view it'
      });
    });

    it('should handle database errors', async () => {
      req.params.id = 'coupon123';

      const error = new Error('Database query failed');
      Coupon.findOne.mockImplementation(() => {
        throw error;
      });

      await getSellerCouponById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle populate errors', async () => {
      req.params.id = 'coupon123';

      const error = new Error('Populate failed');
      Coupon.findOne.mockReturnValue({
        populate: jest.fn().mockRejectedValue(error)
      });

      await getSellerCouponById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Edge cases and additional scenarios', () => {
    it('should handle invalid ObjectId in params', async () => {
      req.params.id = 'invalid-object-id';

      const error = new Error('Invalid ObjectId');
      error.name = 'CastError';
      Coupon.findOne.mockRejectedValue(error);

      await getSellerCouponById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle empty query parameters', async () => {
      req.query = {};

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123'
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle string boolean values correctly', async () => {
      req.query = { isActive: 'false', isExpired: 'true' };

      Coupon.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Coupon.countDocuments.mockResolvedValue(0);

      await getSellerCoupons(req, res, next);

      expect(Coupon.find).toHaveBeenCalledWith({
        seller: 'seller123',
        isActive: false,
        validUntil: { $lt: expect.any(Date) }
      });
    });
  });
});
