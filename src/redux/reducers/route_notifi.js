
var initialState = 'Home';
var myReducer = (state = initialState , action) => {
    if(action.type == 'SET_ROUTE'){
        state = action;
        return state;
    }
    return state;
}
export default myReducer;
