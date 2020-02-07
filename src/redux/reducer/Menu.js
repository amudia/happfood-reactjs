const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const menu = (state = initialState, action) => {
    switch(action.type){
        case 'GET_MENU_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_MENU_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_MENU_FULFILLED':
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

export default menu