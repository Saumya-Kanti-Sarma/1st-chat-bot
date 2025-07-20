import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products with pagination
router.get('/', async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.ceil(totalProducts / limit);

    // Get products with pagination
    const products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET all products with pagination and filters
router.get('/filter', async (req, res) => {
  try {
    const search = req.query.search;
    const low_to_high = req.query.low_to_high === 'true';
    const most_sales = req.query.most_sales === 'true';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build sort query
    let sortByPrice = {};
    if (low_to_high) {
      sortByPrice = { price: 1 }; // Sort by price low to high
    }
    let sortBySales = {};
    if (most_sales) {
      sortBySales = { total_sales: -1 }; // Sort by most sales
    }

    // Get products with search, pagination, and sorting
    const products = await Product.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ ...sortBySales, ...sortByPrice })

    res.status(200).json({
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});


export default router; 