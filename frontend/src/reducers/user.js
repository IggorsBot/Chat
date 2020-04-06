const initialState = {
    user_id: 0,
    name: "",
    email: "",
};

export function user_detail(state = initialState, action) {
    switch(action.type){
        case 'GET_USER':
            return {...state,
              user_id: action.payload.user_id,
              name: action.payload.name,
              email: action.payload.email};
        default:
            return state
    }
}
export default user_detail;
