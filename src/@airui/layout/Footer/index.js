import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth, logo, description } }) => {
  return (
    <div
      className={classNames(style.footer, {
        [style.footerFullWidth]: !isContentMaxWidth,
      })}
    >
      <div className={style.inner}>
        <div className="row">
          <div className="col-md-8">
            <p>
              <p style={{color: "#ffffff"}}>© 2022 <strong>Buy & Sell.</strong> All Rights Reserved</p>
            </p>
           
          </div>
          {/* <div className="col-md-4">
            <div className={style.logo}>
              <div className={style.logo__letter}>A</div>
              <div className={style.logo__name}>{logo}</div>
              <div className={style.logo__descr}>{description}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
