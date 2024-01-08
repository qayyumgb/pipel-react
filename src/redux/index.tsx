import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


import { BASE_API } from '../service';


const store = configureStore({
    reducer: {
        [BASE_API.reducerPath]: BASE_API.reducer,
    },
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(BASE_API.middleware),
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



export default store;
