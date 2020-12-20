import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch Create new Order
//@route POST /api/orders/
//@access Protected
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc Fetch Order By Id
//@route GET /api/orders/:id
//@access Protected
const getOrderbyId = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found!');
        return;
    }
});

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Protected
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paiAt = Date.now();
        order.paymentresult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!');
        return;
    }
});


//@desc Get logged in users orders
//@route GET /api/orders/myorders
//@access Protected
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

//@desc Get all orders
//@route GET /api/orders/
//@access Protected Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});
export { addOrderItems, getOrderbyId, updateOrderToPaid, getMyOrders, getOrders };
