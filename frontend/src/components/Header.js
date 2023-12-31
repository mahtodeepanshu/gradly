import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg'  collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>Gradly</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <SearchBox  className='justify-content-center' navigate={navigate}/>
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
                {userInfo && userInfo.isAdmin && (
                    <>
                    <NavDropdown title={<span><i className='fas fa-shield-halved' /></span>} id='adminmenu'>
                        <LinkContainer to='/admin/userList'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productList'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderList'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    </>
                )}
                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : <LinkContainer to='/login'>
                        <Nav.Link>
                            <i className='fas fa-user'></i> Sign In
                        </Nav.Link>
                    </LinkContainer>
                }

                <LinkContainer to='/cart'>
                    <Nav.Link>
                        <i className='fas fa-shopping-cart'></i> Cart
                    </Nav.Link>
                </LinkContainer>
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header