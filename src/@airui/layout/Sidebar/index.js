import React, { useState } from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Switch, Radio, Select, Tooltip, Input } from 'antd'
import classNames from 'classnames'
import { debounce } from 'lodash'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  isSidebarOpen: settings.isSidebarOpen,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMenuShadow: settings.isMenuShadow,
  isMenuUnfixed: settings.isMenuUnfixed,
  menuLayoutType: settings.menuLayoutType,
  menuType: settings.menuType,
  menuColor: settings.menuColor,
  flyoutMenuColor: settings.flyoutMenuColor,
  authPagesColor: settings.authPagesColor,
  isTopbarFixed: settings.isTopbarFixed,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  routerAnimation: settings.routerAnimation,
  locale: settings.locale,
  theme: settings.theme,
  primaryColor: settings.primaryColor,
  isFooterDark: settings.isFooterDark,
  description: settings.description,
  logo: settings.logo,
})

const Sidebar = ({
  dispatch,
  isSidebarOpen,
  isMenuCollapsed,
  isMenuShadow,
  isMenuUnfixed,
  menuLayoutType,
  menuType,
  menuColor,
  flyoutMenuColor,
  authPagesColor,
  isTopbarFixed,
  isContentMaxWidth,
  isAppMaxWidth,
  isGrayBackground,
  isGrayTopbar,
  isCardShadow,
  isSquaredBorders,
  isBorderless,
  routerAnimation,
  locale,
  theme,
  primaryColor,
  isFooterDark,
  description,
  logo,
}) => {
  const [defaultColor] = useState('#1b55e3')

  const selectColor = debounce(color => {
    dispatch({
      type: 'settings/SET_PRIMARY_COLOR',
      payload: {
        color,
      },
    })
  }, 200)

  const setTheme = nextTheme => {
    dispatch({
      type: 'settings/SET_THEME',
      payload: {
        theme: nextTheme,
      },
    })
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'menuColor',
        value: nextTheme === 'dark' ? 'dark' : 'light',
      },
    })
  }

  const resetColor = () => {
    dispatch({
      type: 'settings/SET_PRIMARY_COLOR',
      payload: {
        color: defaultColor,
      },
    })
  }

  const changeSetting = (setting, value) => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting,
        value,
      },
    })
  }

  const toggleSettings = e => {
    e.preventDefault()
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
    })
  }

  const selectMenuType = e => {
    const { value } = e.target
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'menuType',
        value,
      },
    })
  }

  const selectMenuLayoutType = e => {
    const { value } = e.target
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'menuLayoutType',
        value,
      },
    })
  }

  const colorPickerHandler = (e, setting, value) => {
    e.preventDefault()
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting,
        value,
      },
    })
  }

  const selectRouterAnimation = value => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'routerAnimation',
        value,
      },
    })
  }

  const selectLocale = value => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'locale',
        value,
      },
    })
  }

  const ColorPicker = props => {
    return props.colors.map(item => {
      return (
        <a
          href="#"
          key={item}
          onClick={e => colorPickerHandler(e, props.setting, item)}
          className={classNames(`${style.air__sidebar__select__item}`, {
            [style.air__sidebar__select__item__active]: props.value === item,
            [style.air__sidebar__select__item__black]: item === 'dark',
            [style.air__sidebar__select__item__white]: item === 'white',
            [style.air__sidebar__select__item__gray]: item === 'gray',
            [style.air__sidebar__select__item__blue]: item === 'blue',
            [style.air__sidebar__select__item__img]: item === 'image',
          })}
        />
      )
    })
  }

  return (
    <div>
      <div
        className={classNames(style.air__sidebar, {
          [style.air__sidebar__toggled]: isSidebarOpen,
        })}
      >
        <PerfectScrollbar>
          <div className={style.air__sidebar__inner}>
            <a
              href="#"
              className={`fe fe-x-circle ${style.air__sidebar__close}`}
              onClick={toggleSettings}
            />
            <h5>
              <strong>Theme Settings</strong>
            </h5>
            <div className="air__utils__line" style={{ marginTop: 25, marginBottom: 30 }} />
            <div>
              <div className={`${style.air__sidebar__type} mb-4`}>
                <div className={style.air__sidebar__type__title}>
                  <span>Application Name</span>
                </div>
                <div className={style.air__sidebar__type__items}>
                  <Input
                    className="mb-3"
                    value={logo}
                    onChange={e => {
                      const { value } = e.target
                      changeSetting('logo', value)
                    }}
                  />
                  <Input
                    value={description}
                    onChange={e => {
                      const { value } = e.target
                      changeSetting('description', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__type}>
                <div className={style.air__sidebar__type__title}>
                  <span>Menu Layout</span>
                </div>
                <div className={style.air__sidebar__type__items}>
                  <Radio.Group onChange={selectMenuLayoutType} defaultValue={menuLayoutType}>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="left">Left Menu</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="top">Top Menu</Radio>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="top-dark">Top Dark</Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="nomenu">No menu</Radio>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className={style.air__sidebar__type}>
                <div className={style.air__sidebar__type__title}>
                  <span>Left Menu Type</span>
                </div>
                <div className={style.air__sidebar__type__items}>
                  <Radio.Group onChange={selectMenuType} defaultValue={menuType}>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="default" disabled={menuLayoutType !== 'left'}>
                            Default
                          </Radio>
                        </div>
                        <div className="mb-2">
                          <Radio value="flyout" disabled={menuLayoutType !== 'left'}>
                            Flyout
                          </Radio>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-2">
                          <Radio value="compact" disabled={menuLayoutType !== 'left'}>
                            Compact
                          </Radio>
                        </div>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className={`${style.air__sidebar__type} mb-4`}>
                <div className={style.air__sidebar__type__title}>
                  <span>Router Animation</span>
                </div>
                <div className={style.air__sidebar__type__items}>
                  <Select
                    defaultValue={routerAnimation}
                    style={{ width: '100%' }}
                    onChange={selectRouterAnimation}
                  >
                    <Select.Option value="none">None</Select.Option>
                    <Select.Option value="slide-fadein-up">Slide Up</Select.Option>
                    <Select.Option value="slide-fadein-right">Slide Right</Select.Option>
                    <Select.Option value="fadein">Fade In</Select.Option>
                    <Select.Option value="zoom-fadein">Zoom</Select.Option>
                  </Select>
                </div>
              </div>
              <div className={`${style.air__sidebar__type} mb-4`}>
                <div className={style.air__sidebar__type__title}>
                  <span>Internationalization</span>
                </div>
                <div className={style.air__sidebar__type__items}>
                  <Select value={locale} style={{ width: '100%' }} onChange={selectLocale}>
                    <Select.Option value="en-US">English (en-US)</Select.Option>
                    <Select.Option value="fr-FR">French (fr-FR)</Select.Option>
                    <Select.Option value="ru-RU">Русский (ru-RU)</Select.Option>
                    <Select.Option value="zh-CN">简体中文 (zh-CN)</Select.Option>
                  </Select>
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Left Menu: Collapsed</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isMenuCollapsed}
                    disabled={menuLayoutType !== 'left'}
                    onChange={value => {
                      changeSetting('isMenuCollapsed', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Left Menu: Unfixed</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isMenuUnfixed}
                    disabled={menuLayoutType !== 'left'}
                    onChange={value => {
                      changeSetting('isMenuUnfixed', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Left Menu: Shadow</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isMenuShadow}
                    onChange={value => {
                      changeSetting('isMenuShadow', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Footer: Dark</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isFooterDark}
                    onChange={value => {
                      changeSetting('isFooterDark', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Menu: Color</div>
                <div className={style.air__sidebar__container}>
                  <ColorPicker
                    setting="menuColor"
                    value={menuColor}
                    colors={['white', 'gray', 'blue', 'dark']}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Flyout: Color</div>
                <div className={style.air__sidebar__container}>
                  <ColorPicker
                    setting="flyoutMenuColor"
                    value={flyoutMenuColor}
                    colors={['white', 'gray', 'blue', 'dark']}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Auth: Background</div>
                <div className={style.air__sidebar__container}>
                  <ColorPicker
                    setting="authPagesColor"
                    value={authPagesColor}
                    colors={['white', 'gray', 'image']}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Topbar: Fixed</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isTopbarFixed}
                    onChange={value => {
                      changeSetting('isTopbarFixed', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Topbar: Gray Background</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isGrayTopbar}
                    onChange={value => {
                      changeSetting('isGrayTopbar', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>App: Content Max-Width</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isContentMaxWidth}
                    onChange={value => {
                      changeSetting('isContentMaxWidth', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>App: Max-Width</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isAppMaxWidth}
                    onChange={value => {
                      changeSetting('isAppMaxWidth', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>App: Gray Background</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isGrayBackground}
                    onChange={value => {
                      changeSetting('isGrayBackground', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Cards: Squared Borders</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isSquaredBorders}
                    onChange={value => {
                      changeSetting('isSquaredBorders', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Cards: Shadow</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isCardShadow}
                    onChange={value => {
                      changeSetting('isCardShadow', value)
                    }}
                  />
                </div>
              </div>
              <div className={style.air__sidebar__item}>
                <div className={style.air__sidebar__label}>Cards: Borderless</div>
                <div className={style.air__sidebar__container}>
                  <Switch
                    checked={isBorderless}
                    onChange={value => {
                      changeSetting('isBorderless', value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
      <Tooltip title="Settings" placement="left">
        <a
          role="button"
          tabIndex="0"
          onFocus={e => {
            e.preventDefault()
          }}
          onKeyPress={toggleSettings}
          onClick={toggleSettings}
          style={{ bottom: 'calc(50% + 120px)' }}
          className={style.air__sidebar__toggleButton}
        >
          <i className="fe fe-settings" />
        </a>
      </Tooltip>
      <Tooltip title="Switch Dark / Light Theme" placement="left">
        <a
          role="button"
          tabIndex="0"
          onFocus={e => {
            e.preventDefault()
          }}
          onKeyPress={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          style={{ bottom: 'calc(50% + 60px)' }}
          className={style.air__sidebar__toggleButton}
        >
          {theme === 'default' && <i className="fe fe-moon" />}
          {theme !== 'default' && <i className="fe fe-sun" />}
        </a>
      </Tooltip>
      <Tooltip title="Set Primary Color" placement="left">
        <a
          style={{ bottom: 'calc(50%)' }}
          className={`${style.air__sidebar__toggleButton} ${style.color} ${
            primaryColor === defaultColor ? style.reset : ''
          }`}
        >
          <button
            type="button"
            tabIndex="0"
            onFocus={e => {
              e.preventDefault()
            }}
            onKeyPress={resetColor}
            onClick={resetColor}
          >
            <i className="fe fe-x-circle" />
          </button>
          <input
            type="color"
            id="colorPicker"
            onChange={e => selectColor(e.target.value)}
            value={primaryColor}
          />
          <i className="fe fe-package" />
        </a>
      </Tooltip>
      <Tooltip title="Documentation" placement="left">
        <a
          href="https://docs.sellpixels.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ bottom: 'calc(50% - 60px)' }}
          className={style.air__sidebar__toggleButton}
        >
          <i className="fe fe-book-open" />
        </a>
      </Tooltip>
    </div>
  )
}

export default connect(mapStateToProps)(Sidebar)
