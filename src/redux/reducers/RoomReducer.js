import ACTIONS from '../actions';
const initialState = {
    data: {},
    daysinmonth: {},
    monthsinyear: {},
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
        case ACTIONS.GET_ALLDAYSINMONTH:
            return {
                ...state,
                loading: true,
                daysinmonth: action.payload,
            };
        case ACTIONS.GET_AllMONTHSINYEARS:
            return {
                ...state,
                loading: true,
                monthsinyear: action.payload,
            };
        default:
            return state;
    }
}

export default RoomReducer;
