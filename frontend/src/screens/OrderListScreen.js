import React, { useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from "../actions/orderActions";
//import { ORDER_LIST_RESET } from '../constants/orderConstants';

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo.isAdmin) { history.pushState('/login'); }

        dispatch(listOrders());

    }, [dispatch, history, userInfo]);

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>orders</h1>
                </Col>

            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>IS PAID</th>
                            <th>IS DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user._id && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} €</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
