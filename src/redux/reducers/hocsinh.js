
var initialState = {
    status : true,
    data:{}
};
var myReducer = (state = initialState , action) => {
    if(action.type == 'TOGGLE_STATUS'){
        state = {
            ten: 'Hoang Thuy Linh'
        }
        return state;
    }else if (action.type == 'FETCHING_DATA_ASYNCSTOAGE'){
        return {
            data: action.data
          }
    }
    return state;
}
export default myReducer;
