import { IMilesInfo, ITransaction } from "./Transaction"
import knapsack from "./knapsack"

export interface IResult {
    message?: string,
    spendMiles?: number,
    compensatedRubles?: number,
    transactions?: ITransaction[],
}

export const optimize = (milesInfo: IMilesInfo): IResult => {
    if (!milesInfo.balance || !milesInfo.transactions) {
        return {
            message: 'Нет транзакций или доступных миль'
        }
    }

    const knapsackInput = milesInfo.transactions
        .map(t => ({ transaction: t, w: t.miles, v: t.price }))

    try {
        const result = knapsack(knapsackInput, milesInfo.balance)
        const transactions: ITransaction[] = result.subset.map((r: any) => r.transaction)
        if (transactions.length === 0) {
            return {
                message: 'Мало миль'
            }
        }

        const miles = transactions.map(t => t.miles).reduce((a, b) => a + b, 0)
        const rubles = transactions.map(t => t.price).reduce((a, b) => a + b, 0)

        return {
            spendMiles: miles,
            compensatedRubles: rubles,
            transactions: transactions,
        }
    } catch (ex) {
        return {
            message: `Что-то не так, ${ex}`
        }
    }
}
