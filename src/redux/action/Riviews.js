import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getRiviews = (id) => {
    const url = APP_URL.concat(`riviews/${id}`)
    return {
        type: 'GET_RIVIEWS',
        payload: axios.get(url)
    }
}