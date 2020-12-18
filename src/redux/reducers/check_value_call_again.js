
var initialState = false ;
var myReducer = (state = initialState , action) => {
    if(action.type == 'CHECK_CALL_AGAIN_VALUE'){
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;
