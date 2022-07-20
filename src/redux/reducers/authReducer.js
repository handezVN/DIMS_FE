import ACTIONS from '../actions';

const initialState = {
    user: {},
    isLogged: false,
    isAdmin: false,
    isUser: false,
    isHost: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true,
                user: action.payload,
            };
        case ACTIONS.LOGOUT:
            localStorage.removeItem('user');
            return {
                ...state,
                isLogged: false,
                user: undefined,
                isUser: false,
                isHost: false,
            };
        case ACTIONS.GETUSER:
            return {
                ...state,
                isLogged: true,
                isUser: action.payload.isUser,
                isHost: action.payload.isHost,
            };
        case ACTIONS.RELOAD:
            const foundUser = localStorage.getItem('user');
            if (foundUser) {
                const user = JSON.parse(foundUser);
                return {
                    ...state,
                    isLogged: true,
                    user: user,
                };
            } else {
                return initialState;
            }
        default:
            return state;
    }
};

export default authReducer;
