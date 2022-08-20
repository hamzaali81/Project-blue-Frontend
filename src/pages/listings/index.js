import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Spin, Pagination, List, Avatar } from 'antd';
import ProductItems from 'components/productItems'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import Catalog from 'components/catalog'
import style from './style.module.scss'

const mapStateToProps = ({ category, product, dispatch }) => ({
  category,
  product,
  dispatch
})

const { TabPane } = Tabs;

const Listings = ({ category, product, dispatch }) => {
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
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Active
            </span>
          }
          key="1"
        >
          <ProductItems />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Sold
            </span>
          }
          key="2"
        >
          <ProductItems />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Hidden
            </span>
          }
          key="3"
        >
          <ProductItems />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(Listings)
