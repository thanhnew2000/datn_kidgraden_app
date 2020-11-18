
var initialState = '';
var myReducer = (state = initialState , action) => {
    if(action.type == 'TOKEN_ASYNC'){
        state = action;
        return state;
    }
    return state;
}
export default myReducer;
