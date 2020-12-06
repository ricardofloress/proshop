import React, { useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = ({ match, history }) => {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteProduct(id));
    };

    const createProductHandler = (product) => {
        //if (window.confirm('Are you sure?'))
        //dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin)
            dispatch(listProducts());
        else
            history.pushState('/login');
    }, [dispatch, history, userInfo, successDelete]);

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td><Image src={product.image} height={50} rounded /></td>
                                <td>{product.name}</td>
                                <td>{product.price} €</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className='fas fa-edit'>
                                            </i>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' onClick={() => deleteHandler(product._id)} variant='light'>
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
