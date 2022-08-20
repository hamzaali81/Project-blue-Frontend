import actions from './actions'

const initialState = {
  loading: false,
  items: [],
  favorites: [],
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
