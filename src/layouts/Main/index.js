import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from '@airui/layout/TopBar'
import TopBarDark from '@airui/layout/TopBarDark'
import SubBar from '@airui/layout/SubBar'
import MenuLeft from '@airui/layout/MenuLeft'
import MenuTop from '@airui/layout/MenuTop'
import Footer from '@airui/layout/Footer'
import FooterDark from '@airui/layout/FooterDark'
import Sidebar from '@airui/layout/Sidebar'
import SupportChat from '@airui/layout/SupportChat'

const mapStateToProps = ({ settings }) => ({
  menuLayoutType: settings.menuLayoutType,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isSquaredBorders: settings.isSquaredBorders,
  isCardShadow: settings.isCardShadow,
  isBorderless: settings.isBorderless,
  isTopbarFixed: settings.isTopbarFixed,
  isGrayTopbar: settings.isGrayTopbar,
  isFooterDark: settings.isFooterDark,
})

const MainLayout = ({
  children,
  menuLayoutType,
  isContentMaxWidth,
  isAppMaxWidth,
  isGrayBackground,
  isSquaredBorders,
  isCardShadow,
  isBorderless,
  isTopbarFixed,
  isGrayTopbar,
  isFooterDark,
}) => {
  return (
    <div className={classNames({ air__layout__grayBackground: isGrayBackground })}>
      <Layout
        className={classNames({
          air__layout__contentMaxWidth: isContentMaxWidth,
          air__layout__appMaxWidth: isAppMaxWidth,
          air__layout__grayBackground: isGrayBackground,
          air__layout__squaredBorders: isSquaredBorders,
          air__layout__cardsShadow: isCardShadow,
          air__layout__borderless: isBorderless,
        })}
      >
        {/* <Sidebar /> */}
        {/* <SupportChat /> */}
        {menuLayoutType === 'left' && <MenuLeft />}
        {menuLayoutType === 'top' && <MenuTop />}
        <Layout>
          <Layout.Header
            className={classNames('air__layout__header', {
              air__layout__fixedHeader: isTopbarFixed,
              air__layout__headerGray: isGrayTopbar,
            })}
          >
            {menuLayoutType !== 'top-dark' && <TopBar />}
            {menuLayoutType === 'top-dark' && <TopBarDark />}
            {/* <SubBar /> */}
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative' }}>
            <div className="air__utils__content">{children}</div>
          </Layout.Content>
          <Layout.Footer>
            {!isFooterDark && <Footer />}
            {isFooterDark && <FooterDark />}
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(MainLayout))
