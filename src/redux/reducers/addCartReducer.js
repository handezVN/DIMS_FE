import ACTIONS from '../actions';
const initProduct = {
    cartFetch: 0,
};

const addCartReducer = (state = initProduct, action) => {
    switch (action.type) {
        case ACTIONS.CART_FETCH:
            return {
                ...state,
                cartFetch: Math.floor(Math.random() * 100),
            };
        default:
            return state;
    }
};
export default addCartReducer;
