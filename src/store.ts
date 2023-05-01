import { configureStore } from '@reduxjs/toolkit'
import Reducer from './store/reducers/reducer';

const store = configureStore({
    reducer: Reducer
});

export default store;
