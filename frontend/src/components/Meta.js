import React from 'react'
import { Helmet } from 'react-helmet'


const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Gradly | Home',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, but electronics, cheap electronics',
}

export default Meta