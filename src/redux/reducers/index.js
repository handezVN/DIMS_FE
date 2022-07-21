import { combineReducers } from 'redux';
import auth from './authReducer';
import loadingReducer from './loadingReducer';
import paymentReducer from './paymentReducer';
export default combineReducers({
    auth,
    loadingReducer,
    paymentReducer,
});
