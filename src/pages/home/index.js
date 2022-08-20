import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Pagination } from 'antd';
import Catalog from 'components/catalog'
import ProductItems from 'components/productItems'

const mapStateToProps = ({ category, product, dispatch }) => ({
  category,
  product,
  dispatch
})

const HomePage = ({ category, product, dispatch }) => {
  const [currentCategory, setCurrentCategory] = useState(-1);
  useEffect(() => {
    getProductDataByCategory();
  }, [currentCategory])
  const getProductDataByCategory = () => {
    dispatch({
      type: 'product/GET_PRODUCTS_BY_CATEGORY',
      payload: { id: currentCategory },
    })
  }

  return (
    <div>
      <Button type={currentCategory === -1 ? "primary" : ""} onClick={() => setCurrentCategory(-1)} className="mr-3 mb-3">All</Button>
      {
        category.items && category.items.map((item, index) => {
          return <Button key={Math.random()} type={currentCategory === item.id ? "primary" : ""} onClick={() => setCurrentCategory(item.id)} className="mr-3 mb-3">{item.name}</Button>
        })
      }
      <ProductItems />
    </div>
  )
}

export default connect(mapStateToProps)(HomePage)
