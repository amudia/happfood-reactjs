const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const suggest = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SUGGEST_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_SUGGEST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_SUGGEST_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.suggest,
                isLoading:false,
                isError:false,
                  }
        default :
        return state
    }
}

export default suggest