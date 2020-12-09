import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch all products
//@route GET /api/products/
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//@desc Fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product)
        res.json(product);
    else {
        res.status(404);
        throw new Error('Product Not found!');
    }
})

//@desc Delete product
//@route Delete /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product Removed' });

    }
    else {
        res.status(404);
        throw new Error('Product Not found!');
    }
})


//@desc Create product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = await new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Descriptions'
    });

    const createdProduct = await product.save();

    if (createdProduct) {
        res.status(201).json(createdProduct);
    }
    else {
        res.status(404);
        throw new Error('Failed to create the product!');
    }
})

//@desc update product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    const updatedProduct = await product.save();

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();

        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product Not found!');
    }
})


export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };

