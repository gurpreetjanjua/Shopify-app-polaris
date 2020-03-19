import { ORDER_SUCCESS, ORDER_FAILURE } from '../actions/authActions';
const initialState = {
    orders: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_SUCCESS:
            return { ...state, orders: action.payload };
        case ORDER_FAILURE:
            return state;
        default:
            return state;
    }
};

export default authReducer;