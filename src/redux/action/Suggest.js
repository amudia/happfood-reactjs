import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getSuggest = (id) => {
    const url = APP_URL.concat(`items/${id}`)
    return {
        type: 'GET_SUGGEST',
        payload: axios.get(url)
    }
}