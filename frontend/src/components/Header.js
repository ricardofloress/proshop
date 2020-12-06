import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';


//vai retornar um elemento html com bootstarp que vai ser a header, apenas pode retornar um div com conteudo(tem de estar encapsulado) lá dentro
const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        //Bootstrap Navbar Layout
        //apenas adicionei o container e mudei o conteudo


        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={<div className='icon-toggle'> <i className="fas fa-user"></i> {userInfo.name}</div>} id='username'>

                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                (<LinkContainer to='/login'>
                                    <Nav.Link ><i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>
                                )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={<div className='icon-toggle'> <i className="fas fa-user-lock"></i> admin</div>} id='adminmenu'>
                                    <LinkContainer to='/admin/userslist'>
                                        <NavDropdown.Item >Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productslist'>
                                        <NavDropdown.Item >Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderslist'>
                                        <NavDropdown.Item >Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
