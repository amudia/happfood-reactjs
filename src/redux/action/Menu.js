import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getMenu = (id) => {
    const url = APP_URL.concat(`restaurants/menu/${id}`)
    return {
        type: 'GET_MENU',
        payload: axios.get(url)
    }
}