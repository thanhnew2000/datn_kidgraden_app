
var initialState = 0 ;
var myReducer = (state = initialState , action) => {
    if(action.type == 'SET_ID_PARAM_THONG_BAO'){
        state = action.id;
        return state;
    }
    return state;
}

export default myReducer;
