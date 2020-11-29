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

export { addOrderItems, getOrderbyId };
