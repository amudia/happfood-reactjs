import axios from 'axios'
import {APP_URL} from '../../resources/config'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
// eslint-disable-next-line no-unused-vars
let decode = '' 
if (token) {
    decode = Jwt(token)
}
export const getCart = (id)=>{ 
    const url = APP_URL.concat(`carts/${id}`)
    return {
      type: 'GET_CART',
      payload: axios.get(url, {
          headers: {
              Authorization: 'Bearer ' + token
          }
        })      
    }
    }

