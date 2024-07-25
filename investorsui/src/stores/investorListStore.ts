import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import InvestorService from "../services/investors/investorService";
import { Investor } from "../services/investors/dtos";
import { ApiResponse } from "../api/investorApi";

interface InvestorListState {
    loading: boolean,
    error?: string | undefined | null,
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
    extraReducers: (builder) => {
        builder.addCase(getInvestors.fulfilled, (state: InvestorListState, action) => {
            state.investors = action.payload.isSuccess() && action.payload.data ? action.payload.data : [];
            state.error = !action.payload.isSuccess() ? action.payload.message : undefined;
            state.loading = false;
        }).addCase(getInvestors.pending, (state: InvestorListState) => {
            state.error = undefined;
            state.loading = true;
        }).addCase(getInvestors.rejected, (state: InvestorListState, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
});

export const getInvestors = createAsyncThunk<ApiResponse<Investor[]>, void, { state: RootState }>('investors',
    async () => {
        const investorService = new InvestorService();

        return await investorService.getInvestors();
    }
);