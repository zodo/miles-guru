export interface ITransaction {
    name: string
    price: number
    miles: number
}

export interface IMilesInfo {
    balance?: number,
    transactions?: ITransaction[],
    message?: string,
}
