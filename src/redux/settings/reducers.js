import store from 'store'
import actions from './actions'

const STORED_SETTINGS = storedSettings => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}

const initialState = {
  ...STORED_SETTINGS({
    authProvider: 'jwt', // firebase, jwt
    logo: 'AIR UI',
    description: 'Admin Template',
    locale: 'en-US',
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    menuLayoutType: 'left', // left, top, nomenu
    menuType: 'default', // default, flyout, compact
    routerAnimation: 'slide-fadein-up', // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
    menuColor: 'dark', // dark, blue, gray, white
    flyoutMenuColor: 'blue', // dark, blue, gray, white
    authPagesColor: 'gray', // white, gray, image
    theme: 'default', // default, dark
    primaryColor: '#1b55e3',
    isMenuUnfixed: false,
    isMenuShadow: false,
    isTopbarFixed: false,
    isGrayTopbar: false,
    isContentMaxWidth: true,
    isAppMaxWidth: false,
    isGrayBackground: true,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
    isFooterDark: false,
  }),
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
