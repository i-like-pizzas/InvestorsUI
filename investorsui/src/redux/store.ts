import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;