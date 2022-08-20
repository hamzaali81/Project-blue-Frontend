import React from 'react'
import { connect } from 'react-redux'
import MenuDashboards from './MenuDashboards'
import MenuPages from './MenuPages'
import Status from './Status'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const TopBarDark = ({ settings: { logo, description } }) => {
  return (
    <div className={style.topbarDark}>
      <a
        href="#"
        onClick={e => e.preventDefault()}
        className={`${style.topbarDark__logo} d-none d-md-block`}
      >
        <div className={style.topbarDark__logo__letter}>A</div>
        <div className={style.topbarDark__logo__name}>{logo}</div>
        <div className={style.topbarDark__logo__descr}>{description}</div>
      </a>
      <div className="mr-3 d-block">
        <MenuDashboards />
      </div>
      <div className="mr-auto d-block">
        <MenuPages />
      </div>
      <div className="mb-0 mr-4 d-xl-block d-none">
        <Status />
      </div>
      <div className="mr-4 d-none d-md-block">
        <LanguageSwitcher />
      </div>
      <div className="mr-4 d-none d-md-block">
        <Actions />
      </div>
      <div className="d-none d-md-block">
        <UserMenu />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(TopBarDark)
