import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { find } from 'lodash'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import style from './style.module.scss'

const mapStateToProps = ({ menu, settings }) => ({
  menuData: menu.menuData,
  settings,
  flyoutActive: !settings.isMobileView,
})

const flyoutTimers = {}
let flyoutItems = {}

const MenuTop = ({ dispatch, menuData = [], location: { pathname }, settings, flyoutActive }) => {
  const [activeSubmenu, setActiveSubmenu] = useState('')
  const [activeItem, setActiveItem] = useState('')
  const [renderedFlyoutItems, setRenderedFlyoutItems] = useState({})

  useEffect(() => {
    setActiveItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuData])

  const toggleSettings = () => {
    const { isSidebarOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
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
    const left = `${itemDimensions.left + itemDimensions.width / 2}px`
    const top = `${itemDimensions.top + itemDimensions.height}px`

    return (
      <div
        style={{ left, top }}
        className={classNames(style.air__menuFlyout, {
          [style.air__menuFlyoutTop]: settings.menuLayoutType === 'top',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
        })}
        key={key}
      >
        <ul
          className={style.air__menuTop__list}
          onMouseEnter={() => handleFlyoutContainerOver(key)}
          onMouseLeave={() => handleFlyoutOut(key)}
        >
          {items.map(item => {
            return (
              <li
                className={classNames(style.air__menuTop__item, {
                  [style.air__menuTop__item__active]: activeItem === item.key,
                })}
                key={item.key}
              >
                <Link to={item.url} className={style.air__menuTop__link}>
                  {item.icon && <i className={`${item.icon} ${style.air__menuTop__icon}`} />}
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
        return null
      }
      return (
        <li
          className={classNames(style.air__menuTop__item, {
            [style.air__menuTop__item__active]: activeItem === key,
          })}
          key={key}
        >
          {item.url && (
            <Link to={url} className={style.air__menuTop__link}>
              {icon && <i className={`${icon} ${style.air__menuTop__icon}`} />}
              <span>{title}</span>
            </Link>
          )}
          {!item.url && (
            <a href="#" onClick={e => e.preventDefault()} className={style.air__menuTop__link}>
              {icon && <i className={`${icon} ${style.air__menuTop__icon}`} />}
              <span>{title}</span>
            </a>
          )}
        </li>
      )
    }

    const submenuItem = item => {
      return (
        <li
          className={classNames(style.air__menuTop__item, style.air__menuTop__submenu, {
            [style.air__menuTop__submenu__active]: activeSubmenu === item.key,
          })}
          key={item.key}
        >
          <a
            href="#"
            className={style.air__menuTop__link}
            onClick={e => handleSubmenuClick(e, item.key)}
            onMouseEnter={event => handleFlyoutOver(event, item.key, item.children)}
            onFocus={event => handleFlyoutOver(event, item.key, item.children)}
            onMouseLeave={() => handleFlyoutOut(item.key)}
            onBlur={() => handleFlyoutOut(item.key)}
          >
            <i className={`${item.icon} ${style.air__menuTop__icon}`} />
            <span>{item.title}</span>
            {item.count && (
              <span className="badge text-white bg-blue-light float-right mt-1 px-2">
                {item.count}
              </span>
            )}
          </a>
          <ul className={style.air__menuTop__list}>
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
      if (item.children) {
        return submenuItem(item)
      }
      return menuItem(item)
    })
  }

  const items = generateMenuItems()

  return (
    <div>
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
        className={classNames(style.air__menuTop, {
          [style.air__menuTop__mobileToggled]: settings.isMobileMenuOpen,
          [style.air__menuTop__shadow]: settings.isMenuShadow,
          [style.air__menuTop__flyout]: true,
          [style.air__menuTop__blue]: settings.menuColor === 'blue',
          [style.air__menuTop__white]: settings.menuColor === 'white',
          [style.air__menuTop__gray]: settings.menuColor === 'gray',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
        })}
      >
        <div className={style.air__menuTop__outer}>
          <a href="#" className={style.air__menuTop__mobileToggleButton} onClick={toggleMobileMenu}>
            <span />
          </a>
          <a href="#" onClick={e => e.preventDefault()} className={style.air__menuTop__logo}>
            <div className={style.air__menuTop__logo__letter}>A</div>
            <div className={style.air__menuTop__logo__name}>{settings.logo}</div>
            <div className={style.air__menuTop__logo__descr}>{settings.description}</div>
          </a>
          <div id="menu-left-container" className={style.air__menuTop__container}>
            <ul className={style.air__menuTop__list}>
              <li className={style.air__menuTop__item}>
                <a href="#" className={style.air__menuTop__link} onClick={toggleSettings}>
                  <i className={`fe fe-settings ${style.air__menuTop__icon}`} />
                  <span>Settings</span>
                </a>
              </li>
              <li className={style.air__menuTop__item}>
                <a
                  href="https://docs.airuitemplate.com/"
                  className={style.air__menuTop__link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fe fe-compass ${style.air__menuTop__icon}`} />
                  <span>Documentation</span>
                </a>
              </li>
              {items}
            </ul>
          </div>
        </div>
      </div>
      <a href="#" className={style.air__menuTop__backdrop} onClick={toggleMobileMenu} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(MenuTop))
