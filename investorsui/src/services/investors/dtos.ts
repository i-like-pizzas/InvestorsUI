export interface Investor {
    firm_id: number,
    firm_name: string,
    AUM: number,
    date_added: Date,
    last_updated: Date | undefined,
    established_at: Date,
    firm_type: string,
    city: string | undefined,
    country: string | undefined,
    address: string | undefined,
    postal_code: string | undefined
}

export interface InvestorCommitment {
    id: number,
    assetClass: assetClass,
    firm_id: number,
    currency: string,
    amount: string
}

export enum assetClass {
    PE = 'pe',
    PD = 'pd',
    RE = 're',
    INF = 'inf',
    NR = 'nf',
    HF = "hf"
}