import {combineReducers} from 'redux'

import login from './login'
import register from './register'
import items from './items'
import cart from './cart'

const appReducer = combineReducers({
  login,
  register,
  items,
  cart,
})

export default appReducer
