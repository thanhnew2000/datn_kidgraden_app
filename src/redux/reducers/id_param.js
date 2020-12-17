
var initialState = [] ;
var myReducer = (state = initialState , action) => {
    if(action.type == 'SET_PARAM_SCREEN'){
        state = action.arr;
        return state;
    }
    return state;
}

export default myReducer;
