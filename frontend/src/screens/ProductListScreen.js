import React, { useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from "../actions/productActions";

const ProductListScreen = ({ match, history }) => {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const deleteHandler = (id) => {
        //if (window.confirm('Are you sure?'))
        //dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin)
            dispatch(listProducts());
        else
            history.pushState('/login');
    }, [dispatch, history, userInfo]);

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Users</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>  Create Product
                    </Button>
                </Col>
            </Row>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.phone}</td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className='fas fa-edit'>
                                            </i>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' onClick={() => deleteHandler(user._id)} variant='light'>
                                        <i className='fas fa-trash' style={{ color: 'red' }}>
                                        </i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default ProductListScreen
