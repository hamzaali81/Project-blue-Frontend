import React from 'react'
import { Spin } from 'antd';
import { connect } from 'react-redux'
import Catalog from 'components/catalog'

const mapStateToProps = ({ category, product, dispatch }) => ({
    category,
    product,
    dispatch
})

const ProductItems = ({ category, product, dispatch }) => {
    return (
        <Spin size="large" spinning={product.loading}>
            <div className="row">
                {product.items && product.items.map(item => {
                    const { image, name, price, description, categories } = item
                    return (
                        <div className="col-xl-4 col-lg-6" key={Math.random()}>
                            <Catalog
                                isNew="true"
                                isFavorite="true"
                                image={image}
                                name={name}
                                description={description}
                                categories={categories}
                                price={price}
                                oldPrice={10}
                            />
                        </div>
                    )
                })}
            </div>
        </Spin>
    )
}

export default connect(mapStateToProps)(ProductItems)
