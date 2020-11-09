
var initialState = 0;
var myReducer = (state = initialState , action) => {
    if(action.type == 'NUMBER_NOTI'){
        state = 10;
        return state;
    } else if(action.type == 'SET_NUMBER_NOTIFI'){
        state = action.newNumber;
        return state;
    }
    return state;
}
export default myReducer;
