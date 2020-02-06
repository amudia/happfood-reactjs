const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const details = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DETAILS_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_DETAILS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_DETAILS_FULFILLED':
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

export default details