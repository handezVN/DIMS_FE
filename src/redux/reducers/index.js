import { combineReducers } from 'redux';
import auth from './authReducer';
import loadingReducer from './loadingReducer';
import paymentReducer from './paymentReducer';
import hostReducer from './hostReducer';
import addCartReducer from './addCartReducer';
export default combineReducers({
    auth,
    loadingReducer,
    paymentReducer,
    hostReducer,
    addCartReducer,
});
