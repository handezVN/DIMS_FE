import ACTIONS from '../actions';
const initialState = {
    data: {},
};

function RoomReducer(state = initialState, action) {
    switch (action.type) {
        // Fetch user
        case ACTIONS.ROOM_SUCCESS:
            return {
                ...state,
                loading: true,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default RoomReducer;
