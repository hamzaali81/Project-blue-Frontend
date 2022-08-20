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

const CategoryPage = ({ category, product, dispatch }) => {
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
      {
        isCategoryList ?
          <List
            itemLayout="horizontal"
            dataSource={category.items}
            renderItem={item => (
              <List.Item className={style.cursorPointer} onClick={() => { setCurrentCategory(item.id); setIsCategoryList(false) }}>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={
                    <div>
                      {item.name} ({item.product_count})
                      <div className={style.itemAction}>
                        <span />
                      </div>
                    </div>}
                  description=""
                />
              </List.Item>
            )}
          /> :
          <div>
            <Button className="mb-2" onClick={() => setIsCategoryList(true)}>Back</Button>
            <ProductItems />
          </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(CategoryPage)
