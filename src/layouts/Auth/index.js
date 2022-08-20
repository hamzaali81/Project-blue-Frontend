import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Sidebar from '@airui/layout/Sidebar'
import SupportChat from '@airui/layout/SupportChat'
import "../../styles/auth.css"
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  authPagesColor: settings.authPagesColor,
  logo: settings.logo,
  description: settings.description,
})

const AuthLayout = ({
  children,
  isCardShadow,
  isSquaredBorders,
  isBorderless,
  authPagesColor,
  logo,
  description,
}) => {
  return (
    <Layout>
      <Layout.Content>
        {/* <Sidebar /> */}
        {/* <SupportChat /> */}
        <div
          className={classNames(`${style.container}`, {
            air__layout__squaredBorders: isSquaredBorders,
            air__layout__cardsShadow: isCardShadow,
            air__layout__borderless: isBorderless,
            [style.white]: authPagesColor === 'white',
            [style.gray]: authPagesColor === 'gray',
          })}
          style={{
            backgroundImage:
              authPagesColor === 'image' ? 'url(resources/images/content/photos/8.jpeg)' : '',
          }}
        >
          <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
            <a href="#" onClick={e => e.preventDefault()} className={style.logo}>
              {/* <img className='logoIconSize' src={logoIcon} alt="home" /> */}
              <img
                className='logoIconSize'
                src="resources/images/logo.png"
                alt="logo"
              />
              {/* <div className={style.logo__letter}>A</div>
              <div className={style.logo__name}>{logo}</div>
              <div className={style.logo__descr}>{description}</div> */}
            </a>
          </div>
          <div className={style.containerInner}>{children}</div>
          <div className="mt-auto pb-5 pt-5">
            <ul
              className={`${style.footerNav} list-unstyled d-flex mb-0 flex-wrap justify-content-center`}
            >
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Compliance
                </a>
              </li>
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Support
                </a>
              </li>
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Contacts
                </a>
              </li>
            </ul>
            <div className="text-center">
              Copyright © 2022 BuyingAndSelling |{' '}
              <a href="https://buyingselling.vercel.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default withRouter(connect(mapStateToProps)(AuthLayout))