import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect) 
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(register(name, email, password))
        }

    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <FormGroup className='my-2' controlId='name'>
                <FormLabel>Name</FormLabel>
                <FormControl 
                    type='name' 
                    placeholder='Enter name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                ></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='email'>
                <FormLabel>Email Address</FormLabel>
                <FormControl 
                type='email' 
                placeholder='Enter email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='password'>
                <FormLabel>Password</FormLabel>
                <FormControl 
                type='password' 
                placeholder='Enter Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='my-2' controlId='confirmPassword'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl 
                type='password' 
                placeholder='Confirm Password' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
            </FormGroup>

            <Button className='my-3' type='submit' variant='primary'>
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Acount? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen