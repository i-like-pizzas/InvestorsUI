import { ApiResponse, get } from "../../api/investorApi";
import { assetClass, Investor, InvestorCommitment } from "./dtos";

export default class InvestorService {

	public async getInvestors(): Promise<ApiResponse<Investor[]>> {
		return await get<Investor[]>('/investors');
	}

	public async getInvestorCommitments(investor_id: number, asset_class: assetClass): Promise<ApiResponse<InvestorCommitment[]>> {
		return await await get<InvestorCommitment[]>(`/investor/commitment/${asset_class}/${investor_id}`);
	}

	public getAssetClasses(): Map<assetClass, string> {
		return new Map<assetClass, string>([
			[assetClass.PE, 'Private Equity'],
			[assetClass.PD, 'Private Debt'],
			[assetClass.RE, 'Real Estate'],
			[assetClass.INF, 'Infrastructure'],
			[assetClass.NR, 'Natural Resources'],
			[assetClass.HF, 'Hedge Funds']
		]);
	}
}

