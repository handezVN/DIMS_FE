import ACTIONS from '../actions';
const initialState = {
    data: [],
    loading: false,
    error: undefined,
};

function paymentReducer(state = initialState, action) {
    switch (action.type) {
        // Fetch user
        case ACTIONS.PAYMENTFETCH:
            return {
                ...state,
                loading: true,
            };

        case ACTIONS.PAYMENTSUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case ACTIONS.PAYMENTFAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default paymentReducer;
