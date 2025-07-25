// categoryController.test.js
const {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  getMainCategories,
  getCategoryStats
} = require('../controllers/categoryController');

const Category = require('../models/Category');
const Product = require('../models/Product');

// Mock the models
jest.mock('../models/Category');
jest.mock('../models/Product');

describe('Category Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all active categories successfully', async () => {
      const mockCategories = [
        { _id: '1', name: 'Electronics', isActive: true, sortOrder: 1 },
        { _id: '2', name: 'Books', isActive: true, sortOrder: 2 }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis()
      };
      Category.find.mockReturnValue(mockFind);
      mockFind.sort.mockResolvedValue(mockCategories);

      await getAllCategories(req, res, next);

      expect(Category.find).toHaveBeenCalledWith({ isActive: true });
      expect(mockFind.sort).toHaveBeenCalledWith({ sortOrder: 1, name: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        categories: mockCategories
      });
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Database error');
      Category.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(error)
      });

      await getAllCategories(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getCategoryById', () => {
    it('should return category by id successfully', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', isActive: true };
      req.params.id = '1';

      Category.findById.mockResolvedValue(mockCategory);

      await getCategoryById(req, res, next);

      expect(Category.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: mockCategory
      });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '1';
      Category.findById.mockResolvedValue(null);

      await getCategoryById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });

    it('should return 404 if category is not active', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', isActive: false };
      req.params.id = '1';

      Category.findById.mockResolvedValue(mockCategory);

      await getCategoryById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category is not available'
      });
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Database error');
      req.params.id = '1';
      Category.findById.mockRejectedValue(error);

      await getCategoryById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getCategoryBySlug', () => {
    it('should return category by slug successfully', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', slug: 'electronics', isActive: true };
      req.params.slug = 'electronics';

      Category.findOne.mockResolvedValue(mockCategory);

      await getCategoryBySlug(req, res, next);

      expect(Category.findOne).toHaveBeenCalledWith({
        slug: 'electronics',
        isActive: true
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: mockCategory
      });
    });

    it('should return 404 if category not found', async () => {
      req.params.slug = 'nonexistent';
      Category.findOne.mockResolvedValue(null);

      await getCategoryBySlug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });
  });

  describe('getCategoryProducts', () => {
    it('should return category products successfully', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', id: '1' };
      const mockProducts = [
        { _id: 'p1', name: 'Product 1', category: '1' },
        { _id: 'p2', name: 'Product 2', category: '1' }
      ];

      req.params.id = '1';
      req.query = { page: '1', limit: '12', sortBy: 'createdAt', sortOrder: 'desc' };

      Category.findOne.mockResolvedValue(mockCategory);
      
      const mockProductFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis()
      };
      
      Product.find.mockReturnValue(mockProductFind);
      mockProductFind.limit.mockResolvedValue(mockProducts);
      Product.countDocuments.mockResolvedValue(5);

      await getCategoryProducts(req, res, next);

      expect(Category.findOne).toHaveBeenCalledWith({
        $or: [
          { _id: '1' },
          { slug: '1' }
        ],
        isActive: true
      });
      expect(Product.find).toHaveBeenCalledWith({
        category: '1',
        isActive: true
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: mockCategory,
        count: 2,
        total: 5,
        totalPages: 1,
        currentPage: 1,
        products: mockProducts
      });
    });

    it('should handle different sort options', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', id: '1' };
      req.params.id = '1';
      req.query = { sortBy: 'price', sortOrder: 'asc' };

      Category.findOne.mockResolvedValue(mockCategory);
      
      const mockProductFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis()
      };
      
      Product.find.mockReturnValue(mockProductFind);
      mockProductFind.limit.mockResolvedValue([]);
      Product.countDocuments.mockResolvedValue(0);

      await getCategoryProducts(req, res, next);

      expect(mockProductFind.sort).toHaveBeenCalledWith({ price: 1 });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '1';
      Category.findOne.mockResolvedValue(null);

      await getCategoryProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });
  });

  describe('createCategory', () => {
    it('should create category successfully', async () => {
      const mockCategory = { _id: '1', name: 'New Category' };
      req.body = { name: 'New Category' };

      Category.create.mockResolvedValue(mockCategory);

      await createCategory(req, res, next);

      expect(Category.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: mockCategory
      });
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Validation error');
      req.body = { name: 'New Category' };
      Category.create.mockRejectedValue(error);

      await createCategory(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateCategory', () => {
    it('should update category successfully', async () => {
      const mockCategory = { _id: '1', name: 'Updated Category' };
      req.params.id = '1';
      req.body = { name: 'Updated Category' };

      Category.findById.mockResolvedValue({ _id: '1', name: 'Old Category' });
      Category.findByIdAndUpdate.mockResolvedValue(mockCategory);

      await updateCategory(req, res, next);

      expect(Category.findById).toHaveBeenCalledWith('1');
      expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        req.body,
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: mockCategory
      });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '1';
      Category.findById.mockResolvedValue(null);

      await updateCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete category successfully', async () => {
      const mockCategory = { _id: '1', name: 'Category to delete' };
      req.params.id = '1';

      Category.findById.mockResolvedValue(mockCategory);
      Product.countDocuments.mockResolvedValue(0);
      Category.findByIdAndDelete.mockResolvedValue(mockCategory);

      await deleteCategory(req, res, next);

      expect(Category.findById).toHaveBeenCalledWith('1');
      expect(Product.countDocuments).toHaveBeenCalledWith({ category: '1' });
      expect(Category.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Category deleted successfully'
      });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '1';
      Category.findById.mockResolvedValue(null);

      await deleteCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });

    it('should return 400 if category has products', async () => {
      const mockCategory = { _id: '1', name: 'Category with products' };
      req.params.id = '1';

      Category.findById.mockResolvedValue(mockCategory);
      Product.countDocuments.mockResolvedValue(5);

      await deleteCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cannot delete category. It has 5 products associated with it.'
      });
    });
  });

  describe('getMainCategories', () => {
    it('should return main categories successfully', async () => {
      const mockCategories = [
        { _id: '1', name: 'Electronics', subcategories: ['sub1'] },
        { _id: '2', name: 'Books', subcategories: ['sub2'] }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockCategories)
      };
      Category.find.mockReturnValue(mockFind);

      await getMainCategories(req, res, next);

      expect(Category.find).toHaveBeenCalledWith({
        isActive: true,
        'subcategories.0': { $exists: true }
      });
      expect(mockFind.sort).toHaveBeenCalledWith({ sortOrder: 1, name: 1 });
      expect(mockFind.limit).toHaveBeenCalledWith(8);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        categories: mockCategories
      });
    });
  });

  describe('getCategoryStats', () => {
    it('should return category stats successfully', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', slug: 'electronics' };
      const mockAggregateResult = [{
        avgPrice: 150,
        minPrice: 50,
        maxPrice: 500,
        totalSold: 100
      }];

      req.params.id = '1';
      Category.findById.mockResolvedValue(mockCategory);
      Product.countDocuments.mockResolvedValue(10);
      Product.aggregate.mockResolvedValue(mockAggregateResult);

      await getCategoryStats(req, res, next);

      expect(Category.findById).toHaveBeenCalledWith('1');
      expect(Product.countDocuments).toHaveBeenCalledWith({
        category: '1',
        isActive: true
      });
      expect(Product.aggregate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: {
          id: '1',
          name: 'Electronics',
          slug: 'electronics'
        },
        stats: {
          productCount: 10,
          avgPrice: 150,
          minPrice: 50,
          maxPrice: 500,
          totalSold: 100
        }
      });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '1';
      Category.findById.mockResolvedValue(null);

      await getCategoryStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Category not found'
      });
    });

    it('should handle empty aggregate result', async () => {
      const mockCategory = { _id: '1', name: 'Electronics', slug: 'electronics' };
      req.params.id = '1';

      Category.findById.mockResolvedValue(mockCategory);
      Product.countDocuments.mockResolvedValue(0);
      Product.aggregate.mockResolvedValue([]);

      await getCategoryStats(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        category: {
          id: '1',
          name: 'Electronics',
          slug: 'electronics'
        },
        stats: {
          productCount: 0,
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0,
          totalSold: 0
        }
      });
    });
  });
});
