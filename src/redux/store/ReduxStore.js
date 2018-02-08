import {combineReducers, createStore} from 'redux';
import busReducer from '../../redux/reducers/busReducer';
import userReducer from '../../redux/reducers/userReducer';

export default () => {
    const store = createStore(
        combineReducers({
            busReducer,
            userReducer
        })
    )
    return store;
}