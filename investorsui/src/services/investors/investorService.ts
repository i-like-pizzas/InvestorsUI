import { ApiResponse, get } from "../../api/investorApi";
import { AssetClass, Investor, InvestorCommitment } from "./dtos";

export default class InvestorService {

	public async getInvestors(): Promise<ApiResponse<Investor[]>> {
		return await get<Investor[]>('/investors');
	}

	public async getInvestorCommitments(investor_id: number, asset_class: AssetClass): Promise<ApiResponse<InvestorCommitment[]>> {
		return await await get<InvestorCommitment[]>(`/investor/commitment/${asset_class}/${investor_id}`);
	}

	public getAssetClasses(): Map<AssetClass, string> {
		return new Map<AssetClass, string>([
			[AssetClass.PE, 'Private Equity'],
			[AssetClass.PD, 'Private Debt'],
			[AssetClass.RE, 'Real Estate'],
			[AssetClass.INF, 'Infrastructure'],
			[AssetClass.NR, 'Natural Resources'],
			[AssetClass.HF, 'Hedge Funds']
		]);
	}
}

