
var initialState = [] ;
var myReducer = (state = initialState , action) => {
    if(action.type == 'SET_NUMBER_ARR_NOTIFI'){
        state = action.arr;
        return state;
    }
    return state;
}

export default myReducer;
