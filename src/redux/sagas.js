import { all } from 'redux-saga/effects'
import user from './user/sagas'
import category from './category/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import product from './product/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), category(), product()])
}
