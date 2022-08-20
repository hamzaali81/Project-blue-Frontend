import React, { useState } from 'react'
import { Button } from 'antd';
import style from './style.module.scss'

const Catalog = ({ isFavourite, isNew, image, name, price, oldPrice, categories, description }) => {
  const [favourite, setFavourite] = useState(isFavourite)

  const setIsFavourite = e => {
    e.preventDefault()
    setFavourite(!favourite)
  }

  return (
    <div className="card overflow-hidden">
      {/* <div hidden={!isNew} className={style.new}>
        New
      </div> */}
      <div className="card-body p-0">
        {/* <Button className={`${style.favourite} ${favourite ? 'text-dark' : 'text-gray-3'}`}><i className="fe fe-heart font-size-21" /></Button> */}
        <Button onClick={setIsFavourite} className={`${style.favourite} ${favourite ? 'text-dark' : 'text-gray-3'}`} icon={<i className="fe fe-heart font-size-21" />} />
        <a
          role="menuitem"
          className={`${style.favourite} ${favourite ? 'text-dark' : 'text-gray-3'}`}
          onClick={setIsFavourite}
          onKeyPress={setIsFavourite}
          tabIndex="0"
        >
          <i className="fe fe-heart font-size-21" />
        </a>
        <div className="d-inline">
          <div className="d-inline">
            <img className={`${style.productImage} img-fluid`} src={image} alt={name} />
          </div>
          <div className={`${style.width60} d-inline-block p-2`}>
            <div className={`${style.ellipsis} font-size-14 mb-3`}>
              {
                categories && categories.map(item => `[${item.name}] `)
              }
            </div>
            <div className={`${style.ellipsis} mb-2 font-size-18 font-weight-bold`}>{name}</div>
            <div className={`${style.ellipsis}`}>{description}</div>
            <div className={`${style.ellipsis} font-size-14`}>{price}</div>
          </div>
        </div>
        {/* <div className={`${style.image} border-bottom height-250 mb-3`}>
          <img className="img-fluid" src={image} alt={name} />
        </div> */}
        {/* <div className="font-size-24 font-weight-bold text-dark mb-2">
          {price}{' '}
          <del hidden={!oldPrice} className="align-text-top font-size-14">
            {oldPrice}
          </del>
        </div>
        <div>
          <a className="text-blue font-size-18">{name}</a>
        </div> */}
      </div>
    </div>
  )
}

export default Catalog
