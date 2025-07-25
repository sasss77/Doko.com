// productController.test.js
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getProductReviews,
  searchProducts,
  getSellerProducts
} = require('../controllers/productController');

const Product = require('../models/Product');
const Category = require('../models/Category');

// Mock dependencies
jest.mock('../models/Product');
jest.mock('../models/Category');

describe('ProductController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      body: {},
      params: {},
      user: { id: 'user123', role: 'seller' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should get all products with default parameters', async () => {
      const mockProducts = [
        {
          _id: 'product1',
          name: 'Test Product 1',
          price: 100,
          isActive: true,
          seller: { firstName: 'John', lastName: 'Doe' }
        },
        {
          _id: 'product2',
          name: 'Test Product 2',
          price: 200,
          isActive: true,
          seller: { firstName: 'Jane', lastName: 'Smith' }
        }
      ];

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts)
      });

      Product.countDocuments.mockResolvedValue(2);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({ isActive: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        total: 2,
        totalPages: 1,
        currentPage: 1,
        products: mockProducts
      });
    });

    it('should filter products by category', async () => {
      req.query = { category: 'electronics' };

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isActive: true,
        category: 'electronics'
      });
    });

    it('should filter products by price range', async () => {
      req.query = { minPrice: '50', maxPrice: '150' };

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isActive: true,
        price: { $gte: 50, $lte: 150 }
      });
    });

    it('should filter products by rating', async () => {
      req.query = { rating: '4' };

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isActive: true,
        rating: { $gte: 4 }
      });
    });

    it('should filter products by availability', async () => {
      req.query = { availability: 'in-stock' };

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isActive: true,
        stock: { $gt: 0 }
      });
    });

    it('should search products by text', async () => {
      req.query = { search: 'handmade' };

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isActive: true,
        $text: { $search: 'handmade' }
      });
    });

    it('should sort products by price ascending', async () => {
      req.query = { sortBy: 'price', sortOrder: 'asc' };

      const mockFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      Product.find.mockReturnValue(mockFind);
      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(mockFind.sort).toHaveBeenCalledWith({ price: 1 });
    });

    it('should sort products by rating', async () => {
      req.query = { sortBy: 'rating' };

      const mockFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      Product.find.mockReturnValue(mockFind);
      Product.countDocuments.mockResolvedValue(0);

      await getAllProducts(req, res, next);

      expect(mockFind.sort).toHaveBeenCalledWith({ rating: -1 });
    });

    it('should handle pagination', async () => {
      req.query = { page: '2', limit: '5' };

      const mockFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      Product.find.mockReturnValue(mockFind);
      Product.countDocuments.mockResolvedValue(10);

      await getAllProducts(req, res, next);

      expect(mockFind.skip).toHaveBeenCalledWith(5);
      expect(mockFind.limit).toHaveBeenCalledWith(5);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        totalPages: 2,
        currentPage: 2
      }));
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Product.find.mockImplementation(() => {
        throw error;
      });

      await getAllProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getProductById', () => {
    it('should get product by id successfully', async () => {
      req.params.id = 'product123';

      const mockProduct = {
        _id: 'product123',
        name: 'Test Product',
        isActive: true,
        viewCount: 5,
        save: jest.fn().mockResolvedValue(true)
      };

      Product.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockProduct)
        })
      });

      await getProductById(req, res, next);

      expect(Product.findById).toHaveBeenCalledWith('product123');
      expect(mockProduct.viewCount).toBe(6);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        product: mockProduct
      });
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';

      Product.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null)
        })
      });

      await getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return error if product is not active', async () => {
      req.params.id = 'product123';

      const mockProduct = {
        _id: 'product123',
        name: 'Test Product',
        isActive: false
      };

      Product.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockProduct)
        })
      });

      await getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product is not available'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      const error = new Error('Database error');

      Product.findById.mockImplementation(() => {
        throw error;
      });

      await getProductById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getFeaturedProducts', () => {
    it('should get featured products successfully', async () => {
      const mockProducts = [
        { _id: 'product1', name: 'Featured Product 1', isFeatured: true, isActive: true },
        { _id: 'product2', name: 'Featured Product 2', isFeatured: true, isActive: true }
      ];

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockProducts)
      });

      await getFeaturedProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        isFeatured: true,
        isActive: true
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        products: mockProducts
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Product.find.mockImplementation(() => {
        throw error;
      });

      await getFeaturedProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getRelatedProducts', () => {
    it('should get related products successfully', async () => {
      req.params.id = 'product123';

      const mockProduct = {
        _id: 'product123',
        category: 'electronics'
      };

      const mockRelatedProducts = [
        { _id: 'product2', name: 'Related Product 1', category: 'electronics' },
        { _id: 'product3', name: 'Related Product 2', category: 'electronics' }
      ];

      Product.findById.mockResolvedValue(mockProduct);
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockRelatedProducts)
      });

      await getRelatedProducts(req, res, next);

      expect(Product.findById).toHaveBeenCalledWith('product123');
      expect(Product.find).toHaveBeenCalledWith({
        category: 'electronics',
        _id: { $ne: 'product123' },
        isActive: true
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        products: mockRelatedProducts
      });
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';

      Product.findById.mockResolvedValue(null);

      await getRelatedProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      const error = new Error('Database error');

      Product.findById.mockRejectedValue(error);

      await getRelatedProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createProduct', () => {
    it('should create product successfully', async () => {
      req.body = {
        name: 'New Product',
        price: 100,
        category: 'electronics',
        description: 'Test description'
      };

      const mockProduct = {
        _id: 'product123',
        ...req.body,
        seller: 'user123',
        sku: 'ELECTRONICS-1234567890',
        populate: jest.fn().mockResolvedValue({
          _id: 'product123',
          ...req.body,
          seller: { firstName: 'John', lastName: 'Doe' }
        })
      };

      Product.create.mockResolvedValue(mockProduct);

      await createProduct(req, res, next);

      expect(Product.create).toHaveBeenCalledWith({
        ...req.body,
        seller: 'user123',
        sku: expect.stringMatching(/^ELECTRONICS-\d+$/)
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        product: expect.objectContaining({
          seller: { firstName: 'John', lastName: 'Doe' }
        })
      });
    });

    it('should create product with custom SKU', async () => {
      req.body = {
        name: 'New Product',
        price: 100,
        category: 'electronics',
        sku: 'CUSTOM-SKU-123'
      };

      const mockProduct = {
        _id: 'product123',
        ...req.body,
        seller: 'user123',
        populate: jest.fn().mockResolvedValue({
          _id: 'product123',
          ...req.body,
          seller: { firstName: 'John', lastName: 'Doe' }
        })
      };

      Product.create.mockResolvedValue(mockProduct);

      await createProduct(req, res, next);

      expect(Product.create).toHaveBeenCalledWith({
        ...req.body,
        seller: 'user123',
        sku: 'CUSTOM-SKU-123'
      });
    });

    it('should handle errors', async () => {
      req.body = { name: 'New Product' };
      const error = new Error('Validation error');

      Product.create.mockRejectedValue(error);

      await createProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProduct', () => {
    it('should update product successfully as owner', async () => {
      req.params.id = 'product123';
      req.body = { name: 'Updated Product', price: 150 };

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      const mockUpdatedProduct = {
        _id: 'product123',
        name: 'Updated Product',
        price: 150,
        seller: { firstName: 'John', lastName: 'Doe' }
      };

      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUpdatedProduct)
      });

      await updateProduct(req, res, next);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        'product123',
        req.body,
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        product: mockUpdatedProduct
      });
    });

    it('should update product successfully as admin', async () => {
      req.params.id = 'product123';
      req.body = { name: 'Updated Product' };
      req.user = { id: 'admin123', role: 'admin' };

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      const mockUpdatedProduct = {
        _id: 'product123',
        name: 'Updated Product'
      };

      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUpdatedProduct)
      });

      await updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';

      Product.findById.mockResolvedValue(null);

      await updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return error if not authorized', async () => {
      req.params.id = 'product123';
      req.user = { id: 'otheruser', role: 'seller' };

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      Product.findById.mockResolvedValue(mockProduct);

      await updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Not authorized to update this product'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      const error = new Error('Database error');

      Product.findById.mockRejectedValue(error);

      await updateProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully as owner', async () => {
      req.params.id = 'product123';

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      await deleteProduct(req, res, next);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('product123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Product deleted successfully'
      });
    });

    it('should delete product successfully as admin', async () => {
      req.params.id = 'product123';
      req.user = { id: 'admin123', role: 'admin' };

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      await deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';

      Product.findById.mockResolvedValue(null);

      await deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return error if not authorized', async () => {
      req.params.id = 'product123';
      req.user = { id: 'otheruser', role: 'seller' };

      const mockProduct = {
        _id: 'product123',
        seller: { toString: () => 'user123' }
      };

      Product.findById.mockResolvedValue(mockProduct);

      await deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Not authorized to delete this product'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      const error = new Error('Database error');

      Product.findById.mockRejectedValue(error);

      await deleteProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('addProductReview', () => {
    it('should add review successfully', async () => {
      req.params.id = 'product123';
      req.body = { rating: 5, comment: 'Great product!' };

      const mockProduct = {
        _id: 'product123',
        reviews: [],
        save: jest.fn().mockResolvedValue(true),
        populate: jest.fn().mockResolvedValue({
          reviews: [
            {
              user: 'user123',
              rating: 5,
              comment: 'Great product!'
            }
          ]
        })
      };

      Product.findById.mockResolvedValue(mockProduct);

      await addProductReview(req, res, next);

      expect(mockProduct.reviews).toHaveLength(1);
      expect(mockProduct.reviews[0]).toEqual({
        user: 'user123',
        rating: 5,
        comment: 'Great product!'
      });
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Review added successfully',
        reviews: expect.any(Array)
      });
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';
      req.body = { rating: 5, comment: 'Great product!' };

      Product.findById.mockResolvedValue(null);

      await addProductReview(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return error if user already reviewed', async () => {
      req.params.id = 'product123';
      req.body = { rating: 5, comment: 'Great product!' };

      const mockProduct = {
        _id: 'product123',
        reviews: [
          {
            user: { toString: () => 'user123' },
            rating: 4,
            comment: 'Previous review'
          }
        ]
      };

      Product.findById.mockResolvedValue(mockProduct);

      await addProductReview(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'You have already reviewed this product'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      req.body = { rating: 5, comment: 'Great product!' };
      const error = new Error('Database error');

      Product.findById.mockRejectedValue(error);

      await addProductReview(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getProductReviews', () => {
    it('should get product reviews successfully', async () => {
      req.params.id = 'product123';

      const mockProduct = {
        _id: 'product123',
        reviews: [
          {
            user: { firstName: 'John', lastName: 'Doe' },
            rating: 5,
            comment: 'Great product!'
          }
        ],
        rating: 4.5,
        reviewCount: 1
      };

      Product.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockProduct)
      });

      await getProductReviews(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        reviews: mockProduct.reviews,
        rating: 4.5,
        reviewCount: 1
      });
    });

    it('should return error if product not found', async () => {
      req.params.id = 'nonexistent';

      Product.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(null)
      });

      await getProductReviews(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should handle errors', async () => {
      req.params.id = 'product123';
      const error = new Error('Database error');

      Product.findById.mockImplementation(() => {
        throw error;
      });

      await getProductReviews(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('searchProducts', () => {
    it('should search products successfully', async () => {
      req.query = { q: 'handmade', page: '1', limit: '12' };

      const mockProducts = [
        { _id: 'product1', name: 'Handmade Jewelry', isActive: true },
        { _id: 'product2', name: 'Handmade Pottery', isActive: true }
      ];

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts)
      });

      Product.countDocuments.mockResolvedValue(2);

      await searchProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: { $regex: 'handmade', $options: 'i' } },
              { description: { $regex: 'handmade', $options: 'i' } },
              { tags: { $in: [expect.any(RegExp)] } },
              { artisan: { $regex: 'handmade', $options: 'i' } },
              { district: { $regex: 'handmade', $options: 'i' } }
            ]
          }
        ]
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        total: 2,
        totalPages: 1,
        currentPage: 1,
        query: 'handmade',
        products: mockProducts
      });
    });

    it('should return error if search query is missing', async () => {
      req.query = {};

      await searchProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Search query is required'
      });
    });

    it('should handle errors', async () => {
      req.query = { q: 'handmade' };
      const error = new Error('Database error');

      Product.find.mockImplementation(() => {
        throw error;
      });

      await searchProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSellerProducts', () => {
    it('should get seller products successfully', async () => {
      req.query = { category: 'electronics' };

      const mockProducts = [
        {
          _id: 'product1',
          name: 'Seller Product 1',
          seller: 'user123',
          category: 'electronics'
        }
      ];

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts)
      });

      Product.countDocuments.mockResolvedValue(1);

      await getSellerProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        seller: 'user123',
        isActive: true,
        category: 'electronics'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        total: 1,
        totalPages: 1,
        currentPage: 1,
        products: mockProducts
      });
    });

    it('should filter seller products with multiple criteria', async () => {
      req.query = {
        category: 'electronics',
        minPrice: '50',
        maxPrice: '200',
        availability: 'in-stock',
        sortBy: 'price',
        sortOrder: 'asc'
      };

      const mockFind = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      Product.find.mockReturnValue(mockFind);
      Product.countDocuments.mockResolvedValue(0);

      await getSellerProducts(req, res, next);

      expect(Product.find).toHaveBeenCalledWith({
        seller: 'user123',
        isActive: true,
        category: 'electronics',
        price: { $gte: 50, $lte: 200 },
        stock: { $gt: 0 }
      });
      expect(mockFind.sort).toHaveBeenCalledWith({ price: 1 });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Product.find.mockImplementation(() => {
        throw error;
      });

      await getSellerProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
