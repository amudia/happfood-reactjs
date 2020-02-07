import {combineReducers} from 'redux'

import login from './login'
import register from './register'
import items from './items'
import restaurants from './restaurants'
import cart from './cart'
import details from './Detail'
import detailrestaurant from './Detailrestaurant'
import menu from './Menu'
import riviews from './Riviews'
import suggest from './Suggest'

const appReducer = combineReducers({
  login,
  register,
  items,
  restaurants,
  cart,
  details,
  detailrestaurant,
  menu,
  riviews,
  suggest
})

export default appReducer
