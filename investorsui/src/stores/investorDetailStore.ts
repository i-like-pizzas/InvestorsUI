import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import InvestorService from "../services/investors/investorService";
import { AssetClass, Investor, InvestorCommitment } from "../services/investors/dtos";

interface InvestorDetailState {
    loading: boolean,
    investor?: Investor | undefined,
    assetClasses?: Map<AssetClass, string> | undefined,
    commitments?: Record<AssetClass, InvestorCommitment[]> | undefined
}


const initialInvestorDetailsState: InvestorDetailState = {
    loading: true
}

export const investorDetailStore = createSlice({
    name: 'investorDetails',
    initialState: initialInvestorDetailsState,
    reducers: {

    },
    //extraReducers: (builder) => {

    //}
});