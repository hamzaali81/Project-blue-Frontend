import React, { useState, useEffect } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { find } from 'lodash'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout, Button } from 'antd'
import PerfectScrollbar from 'react-perfect-scrollbar'
import style from './style.module.scss'

const { Sider } = Layout
const mapStateToProps = ({ menu, settings }) => ({
  menuData: menu.menuData,
  settings,
  flyoutActive:
    (settings.menuType === 'flyout' ||
      settings.menuType === 'compact' ||
      settings.isMenuCollapsed) &&
    !settings.isMobileView,
})

const flyoutTimers = {}
let flyoutItems = {}

const MenuLeft = ({ dispatch, menuData = [], location: { pathname }, settings, flyoutActive }) => {
  const [activeSubmenu, setActiveSubmenu] = useState('')
  const [activeItem, setActiveItem] = useState('')
  const [renderedFlyoutItems, setRenderedFlyoutItems] = useState({})

  useEffect(() => {
    setActiveItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuData])

  const toggleSettings = e => {
    e.preventDefault()
    const { isSidebarOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
    })
  }

  const toggleMenu = e => {
    e.preventDefault()
    const { isMenuCollapsed } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    })
  }

  const toggleMobileMenu = e => {
    e.preventDefault()
    const { isMobileMenuOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    })
  }

  const handleSubmenuClick = (e, key) => {
    e.preventDefault()
    if (flyoutActive) {
      return
    }
    setActiveSubmenu(activeSubmenu === key ? '' : key)
  }

  const handleFlyoutOver = (event, key, items) => {
    if (flyoutActive) {
      clearInterval(flyoutTimers[key])
      const item = event.currentTarget
      const itemDimensions = item.getBoundingClientRect()
      const element = renderFlyoutMenu(items, key, itemDimensions)
      setRenderedFlyoutItems({
        ...renderedFlyoutItems,
        [key]: element,
      })
      flyoutItems = {
        ...renderedFlyoutItems,
        [key]: element,
      }
    }
  }

  const handleFlyoutOut = key => {
    if (flyoutActive) {
      flyoutTimers[key] = setTimeout(() => {
        delete flyoutItems[key]
        setRenderedFlyoutItems({
          ...flyoutItems,
        })
      }, 100)
    }
  }

  const handleFlyoutContainerOver = key => {
    clearInterval(flyoutTimers[key])
  }

  const renderFlyoutMenu = (items, key, itemDimensions) => {
    const left = `${itemDimensions.left + itemDimensions.width - 10}px`
    const top = `${itemDimensions.top}px`

    return (
      <div
        style={{ left, top }}
        className={classNames(style.air__menuFlyout, {
          [style.air__menuFlyoutLeft]: settings.menuLayoutType === 'left',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
        })}
        key={key}
      >
        <ul
          className={style.air__menuLeft__list}
          onMouseEnter={() => handleFlyoutContainerOver(key)}
          onMouseLeave={() => handleFlyoutOut(key)}
        >
          {items.map(item => {
            return (
              <li
                className={classNames(style.air__menuLeft__item, {
                  [style.air__menuLeft__item__active]: activeItem === item.key,
                })}
                key={item.key}
              >
                <Link to={item.url} className={style.air__menuLeft__link}>
                  {item.icon && <i className={`${item.icon} ${style.air__menuLeft__icon}`} />}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const setActiveItems = () => {
    if (!menuData.length) {
      return
    }
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const currentItem = find(flattenItems(menuData, 'children'), ['url', pathname]) || {}
    const currentSubmenu = menuData.reduce((key, parent) => {
      if (Array.isArray(parent.children)) {
        parent.children.map(child => {
          if (child.key === currentItem.key) {
            key = parent
          }
          return ''
        })
      }
      return key
    })
    setActiveItem(currentItem.key)
    setActiveSubmenu(currentSubmenu.key)
  }

  const generateMenuItems = () => {
    const menuItem = item => {
      const { key, title, icon, url } = item
      if (item.category) {
        return (
          <li className={style.air__menuLeft__category} key={Math.random()}>
            <span>{title}</span>
          </li>
        )
      }
      return (
        <li
          className={classNames(style.air__menuLeft__item, {
            [style.air__menuLeft__item__active]: activeItem === key,
          })}
          key={key}
        >
          {item.url && (
            <Link to={url} className={style.air__menuLeft__link}>
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </Link>
          )}
          {!item.url && (
            <a href="#" onClick={e => e.preventDefault()} className={style.air__menuLeft__link}>
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </a>
          )}
        </li>
      )
    }

    const submenuItem = item => {
      return (
        <li
          className={classNames(style.air__menuLeft__item, style.air__menuLeft__submenu, {
            [style.air__menuLeft__submenu__active]: activeSubmenu === item.key,
          })}
          key={item.key}
        >
          <a
            href="#"
            className={style.air__menuLeft__link}
            onClick={e => handleSubmenuClick(e, item.key)}
            onMouseEnter={event => handleFlyoutOver(event, item.key, item.children)}
            onFocus={event => handleFlyoutOver(event, item.key, item.children)}
            onMouseLeave={() => handleFlyoutOut(item.key)}
            onBlur={() => handleFlyoutOut(item.key)}
          >
            <i className={`${item.icon} ${style.air__menuLeft__icon}`} />
            <span>{item.title}</span>
            {item.count && (
              <span className="badge text-white bg-blue-light float-right mt-1 px-2">
                {item.count}
              </span>
            )}
          </a>
          <ul className={style.air__menuLeft__list}>
            {item.children.map(sub => {
              if (sub.children) {
                return submenuItem(sub)
              }
              return menuItem(sub)
            })}
          </ul>
        </li>
      )
    }

    return menuData.map(item => {
      if (item.isSellButton)
        return (
          <Link to={item.url}>
            <div className={style.air__menuLeft__banner} style={{ fontSize: '16px', padding: '10px 10px 10px 10px' }}>
              <Button block="true" type="primary" shape="round">
                {item.title}<PlusCircleOutlined />
              </Button>
            </div>
          </Link>
        )
      if (item.children) {
        return submenuItem(item)
      }
      return menuItem(item)
    })
  }

  const items = generateMenuItems()

  return (
    <Sider width="auto">
      <TransitionGroup>
        {Object.keys(renderedFlyoutItems).map(item => {
          return (
            <CSSTransition key={item} timeout={0} classNames="air__menuFlyout__animation">
              {renderedFlyoutItems[item]}
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      <div
        className={classNames(style.air__menuLeft, {
          [style.air__menuLeft__mobileToggled]: settings.isMobileMenuOpen,
          [style.air__menuLeft__toggled]: settings.isMenuCollapsed,
          [style.air__menuLeft__unfixed]: settings.isMenuUnfixed,
          [style.air__menuLeft__shadow]: settings.isMenuShadow,
          [style.air__menuLeft__flyout]: settings.menuType === 'flyout',
          [style.air__menuLeft__compact]: settings.menuType === 'compact',
          [style.air__menuLeft__blue]: settings.menuColor === 'blue',
          [style.air__menuLeft__white]: settings.menuColor === 'white',
          [style.air__menuLeft__gray]: settings.menuColor === 'gray',
          [style.air__menuFlyout__black]:
            settings.flyoutMenuColor === 'dark' && settings.menuType !== 'default',
          [style.air__menuFlyout__white]:
            settings.flyoutMenuColor === 'white' && settings.menuType !== 'default',
          [style.air__menuFlyout__gray]:
            settings.flyoutMenuColor === 'gray' && settings.menuType !== 'default',
        })}
      >
        <div className={style.air__menuLeft__outer}>
          <a 
            href="#"
            className={style.air__menuLeft__mobileToggleButton}
            onClick={toggleMobileMenu}
          >
            <span />
          </a>
          <a href="#" className={style.air__menuLeft__toggleButton} onClick={toggleMenu}>
            <span />
            <span />
          </a>
          <img
            className='logoIconSize'
            src="resources/images/logo.png"
            alt="logo"
          />
          {/* <a href="#" onClick={e => e.preventDefault()} className={style.air__menuLeft__logo}>
            <div className={style.air__menuLeft__logo__letter}>A</div>
            <div className={style.air__menuLeft__logo__name}>{settings.logo}</div>
            <div className={style.air__menuLeft__logo__descr}>{settings.description}</div>
          </a> */}
          {/* <a href="#" onClick={e => e.preventDefault()} className={style.air__menuLeft__user}>
            <div className={style.air__menuLeft__user__avatar}>
              <img src="resources/images/avatars/avatar.png" alt="David Beckham" />
            </div>
            <div className={style.air__menuLeft__user__name}>David Beckham</div>
            <div className={style.air__menuLeft__user__role}>Administrator</div>
          </a> */}
          <PerfectScrollbar>
            <div id="menu-left-container" className={style.air__menuLeft__container}>
              <ul className={style.air__menuLeft__list}>
                {/* <li className={style.air__menuLeft__category}>
                  <span>GENERAL</span>
                </li>
                <li className={style.air__menuLeft__item}>
                  <a href="#" className={style.air__menuLeft__link} onClick={toggleSettings}>
                    <i className={`fe fe-settings ${style.air__menuLeft__icon}`} />
                    <span>Home</span>
                  </a>
                </li>
                <li className={style.air__menuLeft__item}>
                  <a
                    href="https://docs.sellpixels.com/"
                    className={style.air__menuLeft__link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fe fe-compass ${style.air__menuLeft__icon}`} />
                    <span>Categories</span>
                  </a>
                </li> */}
                {items}
              </ul>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      <a href="#" className={style.air__menuLeft__backdrop} onClick={toggleMobileMenu} />
    </Sider>
  )
}

export default withRouter(connect(mapStateToProps)(MenuLeft))
