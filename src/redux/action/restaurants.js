import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getRestaurants = ()=>{ 
    const url = APP_URL.concat(`restaurants`)
    return {
        type: 'GET_RESTAURANTS',
        payload: axios.get(url)
        }
    }

