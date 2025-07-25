// cartController.test.js
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  getCartSummary
} = require('../controllers/cartController');

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// Mock the models
jest.mock('../models/Cart');
jest.mock('../models/Product');
jest.mock('../models/Coupon');

describe('Cart Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      user: { id: 'user123' }
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

  describe('getCart', () => {
    it('should return existing cart successfully', async () => {
      const mockCart = {
        _id: 'cart123',
        user: 'user123',
        items: [
          {
            product: {
              _id: 'product1',
              name: 'Test Product',
              isActive: true
            },
            quantity: 2
          }
        ],
        calculateTotals: jest.fn(),
        save: jest.fn()
      };

      const mockPopulate = {
        populate: jest.fn().mockReturnThis()
      };
      Cart.findOne.mockReturnValue(mockPopulate);
      mockPopulate.populate.mockResolvedValue(mockCart);

      await getCart(req, res, next);

      expect(Cart.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(mockCart.calculateTotals).toHaveBeenCalled();
      expect(mockCart.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        cart: mockCart
      });
    });

    it('should create new cart if none exists', async () => {
      const newCart = {
        _id: 'newcart123',
        user: 'user123',
        items: [],
        calculateTotals: jest.fn(),
        save: jest.fn()
      };

      const mockPopulate = {
        populate: jest.fn().mockReturnThis()
      };
      Cart.findOne.mockReturnValue(mockPopulate);
      mockPopulate.populate.mockResolvedValue(null);
      Cart.create.mockResolvedValue(newCart);

      await getCart(req, res, next);

      expect(Cart.create).toHaveBeenCalledWith({ user: 'user123', items: [] });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should filter out inactive products', async () => {
      const mockCart = {
        _id: 'cart123',
        user: 'user123',
        items: [
          { product: { _id: 'product1', isActive: true }, quantity: 2 },
          { product: { _id: 'product2', isActive: false }, quantity: 1 },
          { product: null, quantity: 1 }
        ],
        calculateTotals: jest.fn(),
        save: jest.fn()
      };

      const mockPopulate = {
        populate: jest.fn().mockReturnThis()
      };
      Cart.findOne.mockReturnValue(mockPopulate);
      mockPopulate.populate.mockResolvedValue(mockCart);

      await getCart(req, res, next);

      expect(mockCart.items).toHaveLength(1);
      expect(mockCart.items[0].product.isActive).toBe(true);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Database error');
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockReturnThis().populate.mockRejectedValue(error)
      });

      await getCart(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('addToCart', () => {
    it('should add product to cart successfully', async () => {
      const mockProduct = {
        _id: 'product1',
        name: 'Test Product',
        price: 100,
        salePrice: 80,
        stock: 10,
        isActive: true
      };

      const mockCart = {
        _id: 'cart123',
        user: 'user123',
        items: [],
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.body = { productId: 'product1', quantity: 2 };

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      await addToCart(req, res, next);

      expect(Product.findById).toHaveBeenCalledWith('product1');
      expect(mockCart.items).toHaveLength(1);
      expect(mockCart.items[0]).toEqual({
        product: 'product1',
        quantity: 2,
        price: 80
      });
      expect(mockCart.calculateTotals).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Product added to cart successfully',
        cart: mockCart
      });
    });

    it('should update quantity if product already exists in cart', async () => {
      const mockProduct = {
        _id: 'product1',
        stock: 10,
        price: 100,
        isActive: true
      };

      const mockCart = {
        items: [
          { product: { toString: () => 'product1' }, quantity: 2, price: 100 }
        ],
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.body = { productId: 'product1', quantity: 3 };

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      await addToCart(req, res, next);

      expect(mockCart.items[0].quantity).toBe(5);
    });

    it('should return 404 if product not found', async () => {
      req.body = { productId: 'product1' };
      Product.findById.mockResolvedValue(null);

      await addToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return 400 if product is not active', async () => {
      const mockProduct = { _id: 'product1', isActive: false };
      req.body = { productId: 'product1' };

      Product.findById.mockResolvedValue(mockProduct);

      await addToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product is not available'
      });
    });

    it('should return 400 if insufficient stock', async () => {
      const mockProduct = {
        _id: 'product1',
        stock: 2,
        isActive: true
      };
      req.body = { productId: 'product1', quantity: 5 };

      Product.findById.mockResolvedValue(mockProduct);

      await addToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Only 2 items available in stock'
      });
    });

    it('should create new cart if none exists', async () => {
      const mockProduct = {
        _id: 'product1',
        price: 100,
        stock: 10,
        isActive: true
      };

      const newCart = {
        items: [],
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.body = { productId: 'product1', quantity: 1 };

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(null);
      Cart.create.mockResolvedValue(newCart);

      await addToCart(req, res, next);

      expect(Cart.create).toHaveBeenCalledWith({ user: 'user123', items: [] });
    });
  });

  describe('updateCartItem', () => {
    it('should update cart item quantity successfully', async () => {
      const mockProduct = {
        _id: 'product1',
        stock: 10,
        price: 100
      };

      const mockCart = {
        items: [
          { product: { toString: () => 'product1' }, quantity: 2, price: 100 }
        ],
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.params.productId = 'product1';
      req.body = { quantity: 5 };

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      await updateCartItem(req, res, next);

      expect(mockCart.items[0].quantity).toBe(5);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Cart item updated successfully',
        cart: mockCart
      });
    });

    it('should return 400 if quantity is less than 1', async () => {
      req.body = { quantity: 0 };
      req.params.productId = 'product1';

      await updateCartItem(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Quantity must be at least 1'
      });
    });

    it('should return 404 if product not found', async () => {
      req.body = { quantity: 2 };
      req.params.productId = 'product1';
      Product.findById.mockResolvedValue(null);

      await updateCartItem(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found'
      });
    });

    it('should return 400 if quantity exceeds stock', async () => {
      const mockProduct = { _id: 'product1', stock: 3 };
      req.body = { quantity: 5 };
      req.params.productId = 'product1';

      Product.findById.mockResolvedValue(mockProduct);

      await updateCartItem(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Only 3 items available in stock'
      });
    });

    it('should return 404 if cart not found', async () => {
      const mockProduct = { _id: 'product1', stock: 10 };
      req.body = { quantity: 2 };
      req.params.productId = 'product1';

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(null);

      await updateCartItem(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cart not found'
      });
    });

    it('should return 404 if product not found in cart', async () => {
      const mockProduct = { _id: 'product1', stock: 10 };
      const mockCart = {
        items: [
          { product: { toString: () => 'product2' }, quantity: 2 }
        ]
      };

      req.body = { quantity: 2 };
      req.params.productId = 'product1';

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      await updateCartItem(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found in cart'
      });
    });
  });

  describe('removeFromCart', () => {
    it('should remove product from cart successfully', async () => {
      const mockCart = {
        items: [
          { product: { toString: () => 'product1' }, quantity: 2 },
          { product: { toString: () => 'product2' }, quantity: 1 }
        ],
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.params.productId = 'product1';
      Cart.findOne.mockResolvedValue(mockCart);

      await removeFromCart(req, res, next);

      expect(mockCart.items).toHaveLength(1);
      expect(mockCart.items[0].product.toString()).toBe('product2');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Product removed from cart successfully',
        cart: mockCart
      });
    });

    it('should return 404 if cart not found', async () => {
      req.params.productId = 'product1';
      Cart.findOne.mockResolvedValue(null);

      await removeFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cart not found'
      });
    });

    it('should return 404 if product not found in cart', async () => {
      const mockCart = {
        items: [
          { product: { toString: () => 'product2' }, quantity: 1 }
        ]
      };

      req.params.productId = 'product1';
      Cart.findOne.mockResolvedValue(mockCart);

      await removeFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Product not found in cart'
      });
    });
  });

  describe('clearCart', () => {
    it('should clear cart successfully', async () => {
      const mockCart = {
        items: [{ product: 'product1', quantity: 2 }],
        appliedCoupon: 'coupon1',
        totalAmount: 100,
        discountAmount: 10,
        finalAmount: 90,
        save: jest.fn()
      };

      Cart.findOne.mockResolvedValue(mockCart);

      await clearCart(req, res, next);

      expect(mockCart.items).toEqual([]);
      expect(mockCart.appliedCoupon).toBeNull();
      expect(mockCart.totalAmount).toBe(0);
      expect(mockCart.discountAmount).toBe(0);
      expect(mockCart.finalAmount).toBe(0);
      expect(mockCart.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Cart cleared successfully',
        cart: mockCart
      });
    });

    it('should return 404 if cart not found', async () => {
      Cart.findOne.mockResolvedValue(null);

      await clearCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cart not found'
      });
    });
  });

  describe('applyCoupon', () => {
    it('should apply coupon successfully', async () => {
      const mockCoupon = {
        _id: 'coupon1',
        code: 'SAVE10',
        isActive: true,
        isValid: true,
        canBeUsedBy: jest.fn().mockReturnValue({ valid: true })
      };

      const mockCart = {
        items: [{ product: { isActive: true }, quantity: 2 }],
        totalAmount: 100,
        discountAmount: 0,
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.body = { couponCode: 'save10' };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart)
      });

      await applyCoupon(req, res, next);

      expect(Coupon.findOne).toHaveBeenCalledWith({
        code: 'SAVE10',
        isActive: true
      });
      expect(mockCart.appliedCoupon).toBe('coupon1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon applied successfully',
        cart: mockCart,
        discount: mockCart.discountAmount
      });
    });

    it('should return 400 if coupon code is not provided', async () => {
      req.body = {};

      await applyCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon code is required'
      });
    });

    it('should return 404 if coupon not found', async () => {
      req.body = { couponCode: 'INVALID' };
      Coupon.findOne.mockResolvedValue(null);

      await applyCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid coupon code'
      });
    });

    it('should return 400 if coupon is not valid', async () => {
      const mockCoupon = {
        code: 'EXPIRED',
        isActive: true,
        isValid: false
      };

      req.body = { couponCode: 'EXPIRED' };
      Coupon.findOne.mockResolvedValue(mockCoupon);

      await applyCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Coupon is expired or not yet valid'
      });
    });

    it('should return 400 if cart is empty', async () => {
      const mockCoupon = {
        code: 'SAVE10',
        isActive: true,
        isValid: true
      };

      const mockCart = {
        items: [],
        calculateTotals: jest.fn(),
        save: jest.fn()
      };

      req.body = { couponCode: 'SAVE10' };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart)
      });

      await applyCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cart is empty'
      });
    });

    it('should sync cart items from localStorage', async () => {
      const mockCoupon = {
        _id: 'coupon1',
        code: 'SAVE10',
        isActive: true,
        isValid: true,
        canBeUsedBy: jest.fn().mockReturnValue({ valid: true })
      };

      const mockProduct = {
        _id: 'product1',
        price: 100,
        isActive: true,
        stock: 10
      };

      const mockCart = {
        items: [],
        totalAmount: 100,
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      req.body = {
        couponCode: 'SAVE10',
        cartItems: [{ id: 'product1', quantity: 2 }]
      };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart)
      });

      await applyCoupon(req, res, next);

      expect(mockCart.items).toHaveLength(1);
      expect(mockCart.items[0]).toEqual({
        product: 'product1',
        quantity: 2,
        price: 100
      });
    });

    it('should return 400 if coupon cannot be used', async () => {
      const mockCoupon = {
        code: 'SAVE10',
        isActive: true,
        isValid: true,
        canBeUsedBy: jest.fn().mockReturnValue({
          valid: false,
          reason: 'Minimum order amount not met'
        })
      };

      const mockCart = {
        items: [{ product: { isActive: true }, quantity: 1 }],
        totalAmount: 50,
        calculateTotals: jest.fn(),
        save: jest.fn()
      };

      req.body = { couponCode: 'SAVE10' };

      Coupon.findOne.mockResolvedValue(mockCoupon);
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart)
      });

      await applyCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Minimum order amount not met'
      });
    });
  });

  describe('removeCoupon', () => {
    it('should remove coupon successfully', async () => {
      const mockCart = {
        appliedCoupon: 'coupon1',
        calculateTotals: jest.fn(),
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue()
      };

      Cart.findOne.mockResolvedValue(mockCart);

      await removeCoupon(req, res, next);

      expect(mockCart.appliedCoupon).toBeNull();
      expect(mockCart.calculateTotals).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Coupon removed successfully',
        cart: mockCart
      });
    });

    it('should return 404 if cart not found', async () => {
      Cart.findOne.mockResolvedValue(null);

      await removeCoupon(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cart not found'
      });
    });
  });

  describe('getCartSummary', () => {
    it('should return cart summary successfully', async () => {
      const mockCart = {
        itemCount: 3,
        totalAmount: 200,
        discountAmount: 20,
        finalAmount: 180,
        appliedCoupon: { code: 'SAVE10' }
      };

      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCart)
      });

      await getCartSummary(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        summary: {
          itemCount: 3,
          totalAmount: 200,
          discountAmount: 20,
          finalAmount: 180,
          appliedCoupon: { code: 'SAVE10' }
        }
      });
    });

    it('should return empty summary if cart not found', async () => {
      Cart.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await getCartSummary(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        summary: {
          itemCount: 0,
          totalAmount: 0,
          discountAmount: 0,
          finalAmount: 0,
          appliedCoupon: null
        }
      });
    });
  });
});
