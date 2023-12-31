import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
 
    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo) {
            navigate('/login') 
        } else { 
            
            if(!user || !user.name || success){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }

  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <FormGroup className='my-2' controlId='name'>
                <FormLabel>Name</FormLabel>
                <FormControl type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='email'>
                <FormLabel>Email Address</FormLabel>
                <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='password'>
                <FormLabel>Password</FormLabel>
                <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='confirmPassword'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
            </FormGroup>

            <Button className='my-3' type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            
            {loadingOrders ?(<><h2>Fetching Orders...</h2><Loader /></>) : errorOrders ? <Message variant='info'>{errorOrders}</Message> : orders.length===0 ? <h2>No Orders</h2> : (
                <>
                    <h2>My Orders</h2> 
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.toString(0,10) : (
                                        <i className='fa fa-times' style={{ color: 'red' }}></i>
                                    )}
                                    </td>
                                    <td>{order.isDelivered ? order.deliveredAt.toString(0,10) : (
                                        <i className='fa fa-times' style={{ color: 'red' }}></i>
                                    )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            {/* <Button className='btn-sm' variant='dark'>DETAILS</Button> */}
                                            <i className='fa fa-circle-chevron-right' ></i>
                                        </LinkContainer>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen