import {combineReducers} from 'redux'

import login from './login'
import register from './register'
import items from './items'
import cart from './cart'
import details from './Detail'
import riviews from './Riviews'
import suggest from './Suggest'

const appReducer = combineReducers({
  login,
  register,
  items,
  cart,
  details,
  riviews,
  suggest
})

export default appReducer
