import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart 

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
 
  const dispatch = useDispatch()

  const navigate = useNavigate() 

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup className='my-2' controlId='address'>
                <FormLabel>Address</FormLabel>
                <FormControl 
                    type='text' 
                    placeholder='Enter address' 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                ></FormControl>
            </FormGroup>

            <FormGroup className='my-2' controlId='city'>
                <FormLabel>city</FormLabel>
                <FormControl 
                    type='text' 
                    placeholder='Enter city' 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                ></FormControl>
            </FormGroup>
            
            <FormGroup className='my-2' controlId='postalCode'>
                <FormLabel>Postal Code</FormLabel>
                <FormControl 
                    type='text' 
                    placeholder='Enter postalCode' 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)}
                ></FormControl>
            </FormGroup>

            <FormGroup className='my-2' controlId='country'>
                <FormLabel>country</FormLabel>
                <FormControl 
                    type='text' 
                    placeholder='Enter country' 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                ></FormControl>
            </FormGroup>

            <Button className='my-2' type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen