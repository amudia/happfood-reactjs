import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getItems = ()=>{ 
    const url = APP_URL.concat(`items`)
    return {
        type: 'GET_ITEMS',
        payload: axios.get(url)
        }
    }

