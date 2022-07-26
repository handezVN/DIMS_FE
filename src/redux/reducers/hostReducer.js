import ACTIONS from '../actions';
const initialState = {
    data: [],
    loading: false,
    error: undefined,
};

function hostReducer(state = initialState, action) {
    switch (action.type) {
        // Fetch user
        case ACTIONS.HOSTFETCH:
            return {
                ...state,
                loading: true,
            };

        case ACTIONS.HOSTSUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case ACTIONS.HOSTFAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default hostReducer;
