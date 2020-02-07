const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const restaurants = (state=initialState, action)=>{
    switch(action.type){
        case 'GET_RESTAURANTS_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_RESTAURANTS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_RESTAURANTS_FULFILLED':
        return {
            ...state,
          data: action.payload.data.data,
          isLoading:false,
          isError:false,
        }
        default :
          return state
    }
     
  }
  
  export default restaurants