const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const riviews = (state = initialState, action) => {
    switch(action.type){
        case 'GET_RIVIEWS_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_RIVIEWS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_RIVIEWS_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
        case 'POST_RIVIEWS_PENDING':
        return {
            ...state,
            isLoading: true,
            isError: false,
        }
        case 'POST_RIVIEWS_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
        case 'POST_RIVIEWS_FULFILLED':
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

export default riviews