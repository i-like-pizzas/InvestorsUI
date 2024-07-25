import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import InvestorService from "../services/investors/investorService";
import { AssetClass, Investor, InvestorCommitment } from "../services/investors/dtos";
import { ApiResponse } from "../api/investorApi";

// TODO - this design will not work if multiple detail components need to be displayed
interface InvestorDetailState {
    investorLoading: boolean,
    commitmentsLoading: boolean,
    error?: string | undefined | null,
    investor?: Investor | undefined,
    assetClasses?: Map<AssetClass, string> | undefined,
    commitments?: InvestorCommitment[] | undefined
}

const initialInvestorDetailsState: InvestorDetailState = {
    investorLoading: true,
    commitmentsLoading: false
}

export const investorDetailStore = createSlice({
    name: 'investorDetails',
    initialState: initialInvestorDetailsState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getInvestorDetails.fulfilled, (state: InvestorDetailState, action) => {
            state.investor = action.payload.investor;
            state.error = action.payload.error;
            state.assetClasses = action.payload.assetClasses;
            state.investorLoading = false;
        }).addCase(getInvestorDetails.pending, (state: InvestorDetailState) => {
            state.error = undefined;
            state.commitments = undefined;
            state.assetClasses = undefined;
            state.investorLoading = true;
        }).addCase(getInvestorDetails.rejected, (state: InvestorDetailState, action) => {
            state.error = action.error.message;
            state.investorLoading = false;
        }).addCase(getInvestorCommitments.fulfilled, (state: InvestorDetailState, action) => {
            state.commitments = action.payload.isSuccess() ? action.payload.data : [];
            state.error = !action.payload.isSuccess() ? action.payload.message : undefined
            state.commitmentsLoading = false;
        }).addCase(getInvestorCommitments.pending, (state: InvestorDetailState) => {
            state.error = undefined;
            state.commitmentsLoading = true;
        }).addCase(getInvestorCommitments.rejected, (state: InvestorDetailState, action) => {
            state.error = action.error.message;
            state.commitmentsLoading = false;
        })
    }
});

export const getInvestorCommitments = createAsyncThunk<ApiResponse<InvestorCommitment[]>, { investorId: number, assetClass: AssetClass }, { state: RootState }>('getInvestorCommitments',
    async (args) => {
        const investorService = new InvestorService();

        return await investorService.getInvestorCommitments(args.investorId, args.assetClass);
    }
);

export const getInvestorDetails = createAsyncThunk<{ investor: Investor | undefined, assetClasses: Map<AssetClass, string> | undefined, error: string | undefined | null }, number, { state: RootState }>('getInvestorDetails',
    async (investorId) => {

        const investorService = new InvestorService();
        const response = await investorService.getInvestors();
        let investor: Investor | undefined;
        let error: string | undefined | null = undefined;
        const assetClasses = investorService.getAssetClasses();

        if (!response.isSuccess()) {
            error = response.message;
        } else {
            // TODO - not great
            investor = response.data?.find(x => x.firm_id == investorId);

            if (!investor) {
                error = 'Not found';
            }
        }

        return {
            investor: investor,
            error: error,
            assetClasses: assetClasses
        }
    }
);



