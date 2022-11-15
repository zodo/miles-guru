import { IMilesInfo, ITransaction } from "./Transaction"

export const parseCopyPaste = (input: string | undefined): IMilesInfo => {
    if (!input) {
        return {
            message: 'Пусто на входе'
        }
    }
    const balanceString = balanceRegexp.exec(input)?.groups?.["balance"]
    const balance = extractNumber(balanceString)
    if (!balance) {
        return {
            message: 'Баланс не найден'
        }
    }

    const lines = input.split("\n")

    try {
        const transactionPositions = findTransactionPositions(lines)
        const transactions = transactionPositions.map(pos => getTransaction(lines, pos))
    
        return {
            balance: balance,
            transactions: transactions,
        }
    } catch(ex) {
        console.error(ex)
        return {
            message: ex.toString()
        }
    }
}

function extractNumber(text: string | undefined): number | undefined {
    if (!text) {
        return undefined
    }
    const withoutWhitespaces = text.replace(/[^\d\,]+/gi, "").replace(",", ".")
    return parseFloat(withoutWhitespaces)
}

function findTransactionPositions(lines: string[]): number[] {
    let result: number[] = []

    for (let index = 0; index < lines.length - 1; index++) {
        const firstLine = lines[index]
        const secondLine = lines[index + 1]
        if (firstLine.match(transactionMarkers.firstLine)
            && secondLine.match(transactionMarkers.nextLine)) {
                result = [...result, index]
            }
    }

    return result
}

/*
City Travel
8 035
,00

Обменять за 9 000 <-- position
*/
function getTransaction(lines: string[], position: number): ITransaction {
    const transactionLines = lines.slice(position - 4, position + 1)

    if (transactionLines.length < 5) {
        throw 'Недостаточно строк перед "Обменять за ..."'
    }

    const name = transactionLines[0]
    if (!name) {
        throw 'Попалось пустое имя в ' + JSON.stringify(transactionLines)
    }

    const priceString = transactionLines[1] + transactionLines[2]
    const price = extractNumber(priceString)
    if (!price) {
        throw `"${priceString}" не похоже на число`
    }

    const milesString = transactionLines[4]
    const miles = extractNumber(milesString)
    if (!miles) {
        throw `"${milesString}" не похоже на число`
    }

    return {
        name: name,
        price: price,
        miles: miles,
    }
}

const balanceRegexp = /Сейчас доступно\s(?<balance>[\d\s]+)/
const transactionMarkers = {
    firstLine: /Обменять за [\d\s]+/,
    nextLine: /\s*мил[иь]/
} 
