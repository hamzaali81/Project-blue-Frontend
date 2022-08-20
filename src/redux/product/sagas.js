import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import store from 'store'
import qs from 'qs'
import { history, store as reduxStore } from 'index'
import * as productApi from 'services/jwt/product'
import actions from './actions'

export function* ADD_PRODUCT({ payload: { product } }) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(productApi.addProduct, product)
  if (response) {
    notification.success({
      duration: 200,
      message: 'Added Product',
      description: 'You have successfully added product!',
    })
    yield put({
      type: 'product/SET_STATE',
      payload: {
        items: []
      },
    })
  }
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_PRODUCTS_BY_CATEGORY({ payload: { id } }) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  // when category type is all, call function to get all products, otherwise, call another function related to getting products by category
  const response = id === -1 ? yield call(productApi.getProducts) : yield call(productApi.getProductsByCategory, id)
  if (response) {
    yield put({
      type: 'product/SET_STATE',
      payload: {
        items: response
      },
    })
  }
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ADD_PRODUCT, ADD_PRODUCT),
    takeEvery(actions.GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_CATEGORY),
    // takeEvery(actions.SET_THEME, SET_THEME),
    // SETUP(), // run once on app load to init listeners
  ])
}
