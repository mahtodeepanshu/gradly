import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const keyword = useParams().keyword
  const pageNumber = useParams().pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'><i className='fas fa-solid fa-arrow-left' style={{paddingRight: '0.5rem'}}></i> Go Back</Link>}
      
        <h1>{keyword ? `Search Results - '${keyword}'` : `Latest Products`}</h1>
        {loading 
            ? <Loader /> 
            : error 
                ? <Message variant='danger'>{error}</Message> 
                : (
                    <>
                      <Row>
                          {products.map((product) => (
                              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                  <Product product={product} />
                              </Col>
                          ))}
                      </Row>
                      <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''}
                      >
                      </Paginate>
                    </>
                  )
        }
    </>
  )
}

export default HomeScreen