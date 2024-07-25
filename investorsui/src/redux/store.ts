import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { investorListStore } from "../stores/investorListStore";
import { investorDetailStore } from "../stores/investorDetailStore";

const rootReducer = combineReducers({
	investorList: investorListStore.reducer,
	investorDetails: investorDetailStore.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;