const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const cart = (state=initialState, action)=>{
    switch(action.type){
        case 'GET_CART_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_CART_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_CART_FULFILLED':
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
  
  export default cart