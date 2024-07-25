import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import InvestorService from "../services/investors/investorService";
import { Investor } from "../services/investors/dtos";

interface InvestorListState {
    loading: boolean,
    investors: Investor[] 
}

const initialInvestorListState: InvestorListState = {
    loading: true,
    investors: []
}

export const investorListStore = createSlice({
    name: 'investorList',
    initialState: initialInvestorListState,
    reducers: {

    },
    //extraReducers: (builder) => {
       
    //}
});