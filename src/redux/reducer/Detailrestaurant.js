const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const detailrestaurant = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DETAILRESTAURANT_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_DETAILRESTAURANT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_DETAILRESTAURANT_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
        default :
        return state
    }
}

export default detailrestaurant