import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getDetailrestaurant = (id) => {
    const url = APP_URL.concat(`restaurants/${id}`)
    return {
        type: 'GET_DETAILRESTAURANT',
        payload: axios.get(url)
    }
}