const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getSellerDashboard,
  getSellerAnalytics,
  toggleUserStatus,
  getSellerApplications,
  approveSellerApplication,
  getSellerSettings,
  updateSellerProfile
} = require('../controllers/userController');

// Mocking express response and request objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}, params = {}, query = {}, user = {}) => ({
  body,
  params,
  query,
  user
});

const next = jest.fn();

describe('User Controller', () => {
  let adminUser, customerUser, sellerUser, pendingSellerUser;

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    // Clear all collections after each test
    await User.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Disconnect from the database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Create common test users
    adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
      isActive: true,
    });

    customerUser = await User.create({
      firstName: 'Customer',
      lastName: 'User',
      email: 'customer@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'customer',
      isActive: true,
    });

    sellerUser = await User.create({
      firstName: 'Seller',
      lastName: 'User',
      email: 'seller@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'seller',
      isActive: true,
      sellerInfo: {
        businessName: 'Test Store',
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: adminUser._id,
      },
    });

    pendingSellerUser = await User.create({
      firstName: 'Pending',
      lastName: 'Seller',
      email: 'pending@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'seller',
      isActive: true,
      sellerInfo: {
        businessName: 'Pending Store',
        isApproved: false,
      },
    });
  });

  describe('createUser', () => {
    it('should create a new customer user successfully', async () => {
      const req = mockRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
      const res = mockResponse();

      await createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User created successfully',
          user: expect.objectContaining({
            email: 'john.doe@example.com',
            role: 'customer',
          }),
        })
      );
      const newUser = await User.findOne({ email: 'john.doe@example.com' });
      expect(newUser).toBeDefined();
    });

    it('should create a new seller user successfully with business name', async () => {
      const req = mockRequest({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: 'seller',
        businessName: 'Jane\'s Shop',
      });
      const res = mockResponse();

      await createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            email: 'jane.doe@example.com',
            role: 'seller',
          }),
        })
      );
      const newUser = await User.findOne({ email: 'jane.doe@example.com' });
      expect(newUser.sellerInfo.businessName).toBe('Jane\'s Shop');
      expect(newUser.sellerInfo.isApproved).toBe(false);
    });

    it('should return 400 if user with email already exists', async () => {
      const req = mockRequest({
        firstName: 'Customer',
        lastName: 'User',
        email: 'customer@example.com',
        password: 'password123',
      });
      const res = mockResponse();

      await createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User already exists with this email',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}); // Invalid request to trigger error
      const res = mockResponse();
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getAllUsers', () => {
    it('should get all users with default pagination', async () => {
      const req = mockRequest();
      const res = mockResponse();

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 4,
          total: 4,
          currentPage: 1,
          totalPages: 1,
          users: expect.any(Array),
        })
      );
      expect(res.json.mock.calls[0][0].users.length).toBe(4);
    });

    it('should filter users by role', async () => {
      const req = mockRequest({}, {}, { role: 'seller' });
      const res = mockResponse();

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json.mock.calls[0][0].count).toBe(2);
      expect(res.json.mock.calls[0][0].users[0].role).toBe('seller');
    });

    it('should exclude admin users when excludeAdmin is true', async () => {
      const req = mockRequest({}, {}, { excludeAdmin: 'true' });
      const res = mockResponse();

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json.mock.calls[0][0].count).toBe(3);
      expect(res.json.mock.calls[0][0].users.some(u => u.role === 'admin')).toBe(false);
    });

    it('should search users by name or email', async () => {
      const req = mockRequest({}, {}, { search: 'customer' });
      const res = mockResponse();

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json.mock.calls[0][0].count).toBe(1);
      expect(res.json.mock.calls[0][0].users[0].email).toBe('customer@example.com');
    });

    it('should paginate results correctly', async () => {
      // Create more users for pagination test
      for (let i = 0; i < 15; i++) {
        await User.create({
          firstName: `Test${i}`,
          lastName: 'User',
          email: `test${i}@example.com`,
          password: 'password123',
          role: 'customer',
        });
      }

      const req = mockRequest({}, {}, { page: 2, limit: 5 });
      const res = mockResponse();

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json.mock.calls[0][0].currentPage).toBe(2);
      expect(res.json.mock.calls[0][0].count).toBe(5);
      expect(res.json.mock.calls[0][0].totalPages).toBe(Math.ceil((4 + 15) / 5)); // Initial 4 users + 15 created here
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest();
      const res = mockResponse();
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();

      await getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            email: customerUser.email,
          }),
        })
      );
      expect(res.json.mock.calls[0][0].user.password).toBeUndefined(); // Password should be excluded
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, { id: nonExistentId });
      const res = mockResponse();

      await getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should call next with error if ID is invalid', async () => {
      const req = mockRequest({}, { id: 'invalidid' });
      const res = mockResponse();

      await getUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateUser', () => {
    it('should allow admin to update any user', async () => {
      const req = mockRequest(
        { firstName: 'Updated', lastName: 'Customer' },
        { id: customerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            firstName: 'Updated',
            lastName: 'Customer',
          }),
        })
      );
      const updatedCustomer = await User.findById(customerUser._id);
      expect(updatedCustomer.firstName).toBe('Updated');
    });

    it('should allow admin to update user role', async () => {
      const req = mockRequest(
        { role: 'admin' },
        { id: customerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            role: 'admin',
          }),
        })
      );
      const updatedCustomer = await User.findById(customerUser._id);
      expect(updatedCustomer.role).toBe('admin');
    });

    it('should allow user to update their own profile', async () => {
      const req = mockRequest(
        { phone: '1234567890' },
        { id: customerUser._id },
        {}, { id: customerUser._id, role: 'customer' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            phone: '1234567890',
          }),
        })
      );
      const updatedCustomer = await User.findById(customerUser._id);
      expect(updatedCustomer.phone).toBe('1234567890');
    });

    it('should prevent non-admin from updating role', async () => {
      const req = mockRequest(
        { role: 'admin' },
        { id: customerUser._id },
        {}, { id: customerUser._id, role: 'customer' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Not authorized to update user role',
        })
      );
    });

    it('should prevent non-admin from updating another user\'s profile', async () => {
      const req = mockRequest(
        { firstName: 'New Name' },
        { id: sellerUser._id },
        {}, { id: customerUser._id, role: 'customer' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Not authorized to update this user',
        })
      );
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest(
        { firstName: 'Test' },
        { id: nonExistentId },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest(
        { firstName: 'Updated' },
        { id: customerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await updateUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User deleted successfully',
        })
      );
      const deletedUser = await User.findById(customerUser._id);
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, { id: nonExistentId });
      const res = mockResponse();

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should prevent deletion of user with active orders', async () => {
      await Order.create({
        user: customerUser._id,
        items: [{ product: new mongoose.Types.ObjectId(), quantity: 1, price: 100 }],
        totalAmount: 100,
        orderStatus: 'pending',
      });
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Cannot delete user with active orders',
        })
      );
    });

    it('should prevent deletion of seller with active products', async () => {
      await Product.create({
        name: 'Active Product',
        description: 'Desc',
        price: 10,
        stock: 5,
        category: new mongoose.Types.ObjectId(),
        seller: sellerUser._id,
        isActive: true,
      });
      const req = mockRequest({}, { id: sellerUser._id });
      const res = mockResponse();

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Cannot delete seller with active products',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await deleteUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getUserProfile', () => {
    it('should get the profile of the authenticated user', async () => {
      const req = mockRequest({}, {}, {}, { id: customerUser._id });
      const res = mockResponse();

      await getUserProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            email: customerUser.email,
          }),
        })
      );
      expect(res.json.mock.calls[0][0].user.password).toBeUndefined();
    });

    it('should return 404 if authenticated user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, {}, {}, { id: nonExistentId });
      const res = mockResponse();

      await getUserProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, {}, {}, { id: customerUser._id });
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getUserProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateUserProfile', () => {
    it('should update the profile of the authenticated user', async () => {
      const req = mockRequest(
        { phone: '9876543210', firstName: 'Custy' },
        {}, {}, { id: customerUser._id }
      );
      const res = mockResponse();

      await updateUserProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({
            phone: '9876543210',
            firstName: 'Custy',
          }),
        })
      );
      const updatedCustomer = await User.findById(customerUser._id);
      expect(updatedCustomer.phone).toBe('9876543210');
      expect(updatedCustomer.firstName).toBe('Custy');
    });

    it('should not allow updating role or password through this endpoint', async () => {
      const req = mockRequest(
        { role: 'admin', password: 'newpassword' },
        {}, {}, { id: customerUser._id }
      );
      const res = mockResponse();

      await updateUserProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200); // Still 200 as other fields are updated
      const updatedCustomer = await User.findById(customerUser._id);
      expect(updatedCustomer.role).toBe('customer'); // Role should not change
      const isPasswordSame = await bcrypt.compare('password123', updatedCustomer.password);
      expect(isPasswordSame).toBe(true); // Password should not change
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({ phone: '123' }, {}, {}, { id: customerUser._id });
      const res = mockResponse();
      jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await updateUserProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getUserStats', () => {
    it('should get customer stats', async () => {
      await Order.create({
        user: customerUser._id,
        items: [{ product: new mongoose.Types.ObjectId(), quantity: 1, price: 100 }],
        totalAmount: 100,
        orderStatus: 'delivered',
      });
      await Order.create({
        user: customerUser._id,
        items: [{ product: new mongoose.Types.ObjectId(), quantity: 1, price: 50 }],
        totalAmount: 50,
        orderStatus: 'pending',
      });

      const req = mockRequest({}, { id: customerUser._id }, {}, { id: adminUser._id });
      const res = mockResponse();

      await getUserStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({ email: customerUser.email }),
          stats: expect.objectContaining({
            totalOrders: 2,
            totalSpent: 150,
            completedOrders: 1,
            pendingOrders: 1,
          }),
        })
      );
    });

    it('should get seller stats', async () => {
      await Product.create({
        name: 'Prod1',
        description: 'Desc',
        price: 10,
        stock: 5,
        soldCount: 3,
        category: new mongoose.Types.ObjectId(),
        seller: sellerUser._id,
        isActive: true,
      });
      await Product.create({
        name: 'Prod2',
        description: 'Desc',
        price: 20,
        stock: 10,
        soldCount: 2,
        category: new mongoose.Types.ObjectId(),
        seller: sellerUser._id,
        isActive: false,
      });

      const req = mockRequest({}, { id: sellerUser._id }, {}, { id: adminUser._id });
      const res = mockResponse();

      await getUserStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          user: expect.objectContaining({ email: sellerUser.email }),
          stats: expect.objectContaining({
            totalProducts: 2,
            activeProducts: 1,
            totalSold: 5,
            totalRevenue: 70, // (10*3) + (20*2)
          }),
        })
      );
    });

    it('should use req.user.id if no params.id is provided', async () => {
      await Order.create({
        user: customerUser._id,
        items: [{ product: new mongoose.Types.ObjectId(), quantity: 1, price: 100 }],
        totalAmount: 100,
        orderStatus: 'delivered',
      });
      const req = mockRequest({}, {}, {}, { id: customerUser._id, role: 'customer' });
      const res = mockResponse();

      await getUserStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json.mock.calls[0][0].user.email).toBe(customerUser.email);
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, { id: nonExistentId }, {}, { id: adminUser._id });
      const res = mockResponse();

      await getUserStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, { id: customerUser._id }, {}, { id: adminUser._id });
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getUserStats(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getSellerDashboard', () => {
    let product1, product2, order1, order2, category1;
    beforeEach(async () => {
      category1 = new mongoose.Types.ObjectId();
      product1 = await Product.create({
        name: 'Seller Prod 1',
        description: 'Desc',
        price: 50,
        stock: 10,
        soldCount: 5,
        category: category1,
        seller: sellerUser._id,
        isActive: true,
        averageRating: 4.5,
        reviewCount: 10,
      });
      product2 = await Product.create({
        name: 'Seller Prod 2',
        description: 'Desc',
        price: 25,
        stock: 20,
        soldCount: 10,
        category: category1,
        seller: sellerUser._id,
        isActive: true,
        averageRating: 4.0,
        reviewCount: 5,
      });

      order1 = await Order.create({
        user: customerUser._id,
        items: [
          { product: product1._id, quantity: 2, price: 50, seller: sellerUser._id },
          { product: new mongoose.Types.ObjectId(), quantity: 1, price: 10, seller: new mongoose.Types.ObjectId() } // Other seller's product
        ],
        totalAmount: 110,
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      });

      order2 = await Order.create({
        user: adminUser._id, // another customer for unique customer count
        items: [
          { product: product2._id, quantity: 3, price: 25, seller: sellerUser._id }
        ],
        totalAmount: 75,
        orderStatus: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      });
    });

    it('should return seller dashboard data', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();

      await getSellerDashboard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          stats: expect.objectContaining({
            totalProducts: 2,
            activeProducts: 2,
            totalSold: 15,
            totalRevenue: 5 * 50 + 10 * 25, // product sold counts
            totalCustomers: 2, // customerUser and adminUser
          }),
          recentOrders: expect.any(Array),
          topProducts: expect.any(Array),
        })
      );
      expect(res.json.mock.calls[0][0].recentOrders.length).toBe(2);
      expect(res.json.mock.calls[0][0].recentOrders[0].customer.firstName).toBe('Admin');
      expect(res.json.mock.calls[0][0].recentOrders[0].totalAmount).toBe(75); // Only seller's items total
      expect(res.json.mock.calls[0][0].topProducts.length).toBe(2);
      expect(res.json.mock.calls[0][0].topProducts[0].name).toBe('Seller Prod 2'); // Sorted by soldCount desc
    });

    it('should return zero stats if no data for seller', async () => {
      // Create a new seller with no products or orders
      const newSeller = await User.create({
        firstName: 'New',
        lastName: 'Seller',
        email: 'newseller@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'seller',
        isActive: true,
        sellerInfo: {
          businessName: 'New Store',
          isApproved: true,
        },
      });

      const req = mockRequest({}, {}, {}, { id: newSeller._id, role: 'seller' });
      const res = mockResponse();

      await getSellerDashboard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          stats: {
            totalProducts: 0,
            activeProducts: 0,
            totalSold: 0,
            totalRevenue: 0,
            totalCustomers: 0,
          },
          recentOrders: [],
          topProducts: [],
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();
      jest.spyOn(Product, 'aggregate').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getSellerDashboard(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getSellerAnalytics', () => {
    let product1, order1, order2, order3, category1, category2;

    beforeEach(async () => {
      category1 = await mongoose.model('Category').create({ name: 'Electronics' });
      category2 = await mongoose.model('Category').create({ name: 'Books' });

      product1 = await Product.create({
        name: 'Laptop',
        description: 'High performance laptop',
        price: 1000,
        stock: 5,
        soldCount: 0,
        category: category1._id,
        seller: sellerUser._id,
        isActive: true,
      });

      const product2 = await Product.create({
        name: 'Book',
        description: 'A great novel',
        price: 20,
        stock: 10,
        soldCount: 0,
        category: category2._id,
        seller: sellerUser._id,
        isActive: true,
      });

      // Orders for current month (within last 30 days)
      order1 = await Order.create({
        user: customerUser._id,
        items: [
          { product: product1._id, quantity: 1, price: 1000, seller: sellerUser._id },
        ],
        totalAmount: 1000,
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      });

      order2 = await Order.create({
        user: customerUser._id,
        items: [
          { product: product2._id, quantity: 2, price: 20, seller: sellerUser._id },
        ],
        totalAmount: 40,
        orderStatus: 'processing',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      });

      // Order for previous month (to compare trend)
      order3 = await Order.create({
        user: adminUser._id,
        items: [
          { product: product1._id, quantity: 1, price: 1000, seller: sellerUser._id },
        ],
        totalAmount: 1000,
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
      });
    });

    it('should return seller analytics for the default time range (month)', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();

      await getSellerAnalytics(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            totalRevenue: 1040, // 1000 (order1) + 40 (order2)
            totalOrders: 2,
            totalCustomers: 1, // customerUser is unique
            salesTrend: expect.any(Number), // Should be negative as previous period had 1000, current has 1040 (small positive or near 0)
            averageOrderValue: expect.any(Number),
            topCategories: expect.arrayContaining([
              expect.objectContaining({ name: 'Electronics', percentage: expect.any(Number) }),
              expect.objectContaining({ name: 'Books', percentage: expect.any(Number) })
            ]),
            monthlyData: expect.any(Array),
          }),
        })
      );
      // Trend calculation
      const currentRevenue = 1040;
      const previousRevenue = 1000;
      const expectedSalesTrend = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
      expect(res.json.mock.calls[0][0].data.salesTrend).toBeCloseTo(expectedSalesTrend);
      expect(res.json.mock.calls[0][0].data.averageOrderValue).toBeCloseTo(currentRevenue / 2);
    });

    it('should adjust analytics based on timeRange query param (week)', async () => {
      // Create a very recent order for 'week' test
      await Order.create({
        user: customerUser._id,
        items: [
          { product: product1._id, quantity: 1, price: 500, seller: sellerUser._id },
        ],
        totalAmount: 500,
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      });

      const req = mockRequest({}, {}, { timeRange: 'week' }, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();

      await getSellerAnalytics(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            totalRevenue: 500, // Only the very recent order
            totalOrders: 1,
          }),
        })
      );
    });

    it('should return 0 for trends if no previous period data', async () => {
      // Delete existing orders to ensure no previous data
      await Order.deleteMany({});
      await Product.deleteMany({});
      
      const product = await Product.create({
        name: 'New Product', description: 'desc', price: 100, stock: 10, soldCount: 0,
        category: category1._id, seller: sellerUser._id, isActive: true
      });

      await Order.create({
        user: customerUser._id,
        items: [{ product: product._id, quantity: 1, price: 100, seller: sellerUser._id }],
        totalAmount: 100,
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      });

      const req = mockRequest({}, {}, { timeRange: 'month' }, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();

      await getSellerAnalytics(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalRevenue: 100,
            totalOrders: 1,
            salesTrend: 100, // If current > 0 and prev = 0, trend is 100
            averageOrderValue: 100,
          }),
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();
      jest.spyOn(Order, 'aggregate').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getSellerAnalytics(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('toggleUserStatus', () => {
    it('should deactivate an active user', async () => {
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();

      await toggleUserStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User deactivated successfully',
          user: expect.objectContaining({
            isActive: false,
          }),
        })
      );
      const updatedUser = await User.findById(customerUser._id);
      expect(updatedUser.isActive).toBe(false);
    });

    it('should activate an inactive user', async () => {
      customerUser.isActive = false;
      await customerUser.save();

      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();

      await toggleUserStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User activated successfully',
          user: expect.objectContaining({
            isActive: true,
          }),
        })
      );
      const updatedUser = await User.findById(customerUser._id);
      expect(updatedUser.isActive).toBe(true);
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, { id: nonExistentId });
      const res = mockResponse();

      await toggleUserStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, { id: customerUser._id });
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await toggleUserStatus(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getSellerApplications', () => {
    let rejectedSellerUser;

    beforeEach(async () => {
      rejectedSellerUser = await User.create({
        firstName: 'Rejected',
        lastName: 'Seller',
        email: 'rejected@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'seller',
        isActive: true,
        sellerInfo: {
          businessName: 'Rejected Store',
          isApproved: false,
          rejectionReason: 'Invalid documents',
          rejectedAt: new Date(),
          rejectedBy: adminUser._id,
        },
      });
    });

    it('should get all seller applications', async () => {
      const req = mockRequest();
      const res = mockResponse();

      await getSellerApplications(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 3, // sellerUser (approved), pendingSellerUser, rejectedSellerUser
          sellers: expect.any(Array),
        })
      );
      expect(res.json.mock.calls[0][0].sellers.map(s => s.email)).toEqual(
        expect.arrayContaining(['seller@example.com', 'pending@example.com', 'rejected@example.com'])
      );
    });

    it('should filter pending seller applications', async () => {
      const req = mockRequest({}, {}, { status: 'pending' });
      const res = mockResponse();

      await getSellerApplications(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 1, // Only pendingSellerUser
          sellers: expect.arrayContaining([
            expect.objectContaining({ email: 'pending@example.com' }),
          ]),
        })
      );
    });

    it('should filter approved seller applications', async () => {
      const req = mockRequest({}, {}, { status: 'approved' });
      const res = mockResponse();

      await getSellerApplications(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 1, // Only sellerUser
          sellers: expect.arrayContaining([
            expect.objectContaining({ email: 'seller@example.com' }),
          ]),
        })
      );
    });

    it('should filter rejected seller applications', async () => {
      const req = mockRequest({}, {}, { status: 'rejected' });
      const res = mockResponse();

      await getSellerApplications(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 1, // Only rejectedSellerUser
          sellers: expect.arrayContaining([
            expect.objectContaining({ email: 'rejected@example.com' }),
          ]),
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest();
      const res = mockResponse();
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getSellerApplications(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('approveSellerApplication', () => {
    it('should approve a pending seller application', async () => {
      const req = mockRequest(
        { approved: true },
        { id: pendingSellerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await approveSellerApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Seller application approved successfully',
          user: expect.objectContaining({
            sellerInfo: expect.objectContaining({
              isApproved: true,
              approvedBy: adminUser._id,
            }),
          }),
        })
      );
      const updatedUser = await User.findById(pendingSellerUser._id);
      expect(updatedUser.sellerInfo.isApproved).toBe(true);
      expect(updatedUser.sellerInfo.approvedBy.toString()).toBe(adminUser._id.toString());
      expect(updatedUser.sellerInfo.rejectedAt).toBeUndefined();
      expect(updatedUser.sellerInfo.rejectionReason).toBeUndefined();
    });

    it('should reject a pending seller application with a reason', async () => {
      const req = mockRequest(
        { approved: false, rejectionReason: 'Incomplete documents' },
        { id: pendingSellerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await approveSellerApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Seller application rejected successfully',
          user: expect.objectContaining({
            sellerInfo: expect.objectContaining({
              isApproved: false,
              rejectionReason: 'Incomplete documents',
              rejectedBy: adminUser._id,
            }),
          }),
        })
      );
      const updatedUser = await User.findById(pendingSellerUser._id);
      expect(updatedUser.sellerInfo.isApproved).toBe(false);
      expect(updatedUser.sellerInfo.rejectionReason).toBe('Incomplete documents');
      expect(updatedUser.sellerInfo.rejectedBy.toString()).toBe(adminUser._id.toString());
      expect(updatedUser.sellerInfo.approvedAt).toBeUndefined();
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest(
        { approved: true },
        { id: nonExistentId },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await approveSellerApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User not found',
        })
      );
    });

    it('should return 400 if user is not a seller', async () => {
      const req = mockRequest(
        { approved: true },
        { id: customerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await approveSellerApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User is not a seller',
        })
      );
    });

    it('should return 400 if application already processed', async () => {
      const req = mockRequest(
        { approved: true },
        { id: sellerUser._id }, // Already approved seller
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();

      await approveSellerApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Seller application has already been processed',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest(
        { approved: true },
        { id: pendingSellerUser._id },
        {}, { id: adminUser._id, role: 'admin' }
      );
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await approveSellerApplication(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getSellerSettings', () => {
    it('should return seller settings', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();

      await getSellerSettings(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            profile: expect.objectContaining({
              storeName: sellerUser.sellerInfo.businessName,
              email: sellerUser.email,
            }),
            notifications: expect.any(Object),
          }),
        })
      );
    });

    it('should return 404 if seller not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest({}, {}, {}, { id: nonExistentId, role: 'seller' });
      const res = mockResponse();

      await getSellerSettings(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Seller not found',
        })
      );
    });

    it('should return 403 if user is not a seller', async () => {
      const req = mockRequest({}, {}, {}, { id: customerUser._id, role: 'customer' });
      const res = mockResponse();

      await getSellerSettings(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Access denied. Only sellers can access settings.',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest({}, {}, {}, { id: sellerUser._id, role: 'seller' });
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getSellerSettings(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateSellerProfile', () => {
    it('should update seller profile information', async () => {
      const req = mockRequest(
        {
          profile: {
            storeName: 'Updated Store',
            phone: '1122334455',
            description: 'New description',
          },
        },
        {}, {}, { id: sellerUser._id, role: 'seller' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Settings updated successfully',
          data: expect.objectContaining({
            profile: expect.objectContaining({
              storeName: 'Updated Store',
              phone: '1122334455',
              description: 'New description',
            }),
          }),
        })
      );
      const updatedSeller = await User.findById(sellerUser._id);
      expect(updatedSeller.sellerInfo.businessName).toBe('Updated Store');
      expect(updatedSeller.phone).toBe('1122334455');
      expect(updatedSeller.sellerInfo.description).toBe('New description');
    });

    it('should update seller notification settings', async () => {
      const req = mockRequest(
        {
          notifications: {
            orderNotifications: false,
            smsAlerts: true,
          },
        },
        {}, {}, { id: sellerUser._id, role: 'seller' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Settings updated successfully',
          data: expect.objectContaining({
            notifications: expect.objectContaining({
              orderNotifications: false,
              smsAlerts: true,
              emailAlerts: true, // Should default to true if not provided, but already true in original
              marketingEmails: true, // Should default to true if not provided, but already true in original
            }),
          }),
        })
      );
      const updatedSeller = await User.findById(sellerUser._id);
      expect(updatedSeller.notificationSettings.orderNotifications).toBe(false);
      expect(updatedSeller.notificationSettings.smsAlerts).toBe(true);
    });

    it('should allow seller to update password', async () => {
      const req = mockRequest(
        {
          currentPassword: 'password123',
          newPassword: 'newsecurepassword',
        },
        {}, {}, { id: sellerUser._id, role: 'seller' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Settings updated successfully',
        })
      );
      const updatedSeller = await User.findById(sellerUser._id);
      const isPasswordValid = await bcrypt.compare('newsecurepassword', updatedSeller.password);
      expect(isPasswordValid).toBe(true);
    });

    it('should return 400 if current password is incorrect', async () => {
      const req = mockRequest(
        {
          currentPassword: 'wrongpassword',
          newPassword: 'newsecurepassword',
        },
        {}, {}, { id: sellerUser._id, role: 'seller' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Current password is incorrect',
        })
      );
    });

    it('should return 404 if seller not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const req = mockRequest(
        { profile: { storeName: 'Test' } },
        {}, {}, { id: nonExistentId, role: 'seller' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Seller not found',
        })
      );
    });

    it('should return 403 if user is not a seller', async () => {
      const req = mockRequest(
        { profile: { storeName: 'Test' } },
        {}, {}, { id: customerUser._id, role: 'customer' }
      );
      const res = mockResponse();

      await updateSellerProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Access denied. Only sellers can update settings.',
        })
      );
    });

    it('should call next with error if something goes wrong', async () => {
      const req = mockRequest(
        { profile: { storeName: 'Updated' } },
        {}, {}, { id: sellerUser._id, role: 'seller' }
      );
      const res = mockResponse();
      jest.spyOn(User, 'findById').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await updateSellerProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});