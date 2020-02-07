import axios from 'axios'
import {APP_URL} from '../../resources/config'

export const getRiviews = (id) => {
    const url = APP_URL.concat(`riviews/${id}`)
    return {
        type: 'GET_RIVIEWS',
        payload: axios.get(url)
    }
}

export const postRiviews = (id_item,id_user,riview,rating)=>{
    console.log(id_item,id_user,riview,rating)
    return {
      type: 'POST_RIVIEWS',
      payload: axios.post(APP_URL,{id_item,id_user,riview,rating})
    }
  }