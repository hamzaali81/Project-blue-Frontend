import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Spin, Pagination, List, Avatar } from 'antd';
import ProductItems from 'components/productItems'
import Catalog from 'components/catalog'
import style from './style.module.scss'

const mapStateToProps = ({ category, product, dispatch }) => ({
  category,
  product,
  dispatch
})

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const Favorite = ({ category, product, dispatch }) => {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [isCategoryList, setIsCategoryList] = useState(true);
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
      <ProductItems />
    </div>
  )
}

export default connect(mapStateToProps)(Favorite)
