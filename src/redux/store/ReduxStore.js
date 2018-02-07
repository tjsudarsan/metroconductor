import {combineReducers, createStore} from 'redux';
import busReducer from '../../redux/reducers/busReducer';

export default () => {
    const store = createStore(
        combineReducers({
            busReducer
        })
    )
    return store;
}