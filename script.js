const periodsBegin = document.getElementById('periods-begin')
const periodsEnd = document.getElementById('periods-end')
const periodsWeekend = document.getElementById('periods-weekend')
const periodsResult = document.getElementById('periods-result')

const percentsSumm = document.getElementById('percents-summ')
const percentsTax = document.getElementById('percents-tax')
const percentsTaxType = document.getElementById('percents-tax-type')
const percentsPeriod = document.getElementById('percents-period')
const percentsResult = document.getElementById('percents-result')

const feeSumm = document.getElementById('fee-summ')
const feeRange = document.getElementById('fee-range')
const feeResultDetail = document.getElementById('fee-result-detail')
const feeResult = document.getElementById('fee-result')

const reverseFeeSumm = document.getElementById('reverseFee-fee')
const reverseFeeResult = document.getElementById('reversFee-result')

let dateBegin = new Date()
let dateEnd = new Date()
let dateWeekend = false

let debtSumm = 0
let debtTax = 0
let debtTaxType = ''
let debtPeriod = 0
let debtResult = 0

const num = (i) => {
    return Number(i)
}

const local = (i) => {
    return Math.ceil(i).toLocaleString('ru')
}

const diffDates = () => {
    let dateB = Date.parse(dateBegin)
    let dateE = Date.parse(dateEnd)
    let count = 0
    for (let i = dateB + 24 * 60 * 60 * 1000; i <= dateE; i = i + 24 * 60 * 60 * 1000) {
        let item = new Date(i).getDay()
        if (dateWeekend) {
            if (item != 0 & item != 6) {
                count++
            }
        } else {
            count++
        }
    }
    periodsResult.innerHTML = count
}

const debtCalc = () => {
    if (debtTaxType === 'day') {
        debtResult = debtSumm * debtTax / 100 * debtPeriod
        percentsResult.innerHTML = `${local(debtSumm)} x ${debtTax}/100 x ${local(debtPeriod)} =
        ${local(debtResult)} руб.`
    } if (debtTaxType === 'month') {
        debtResult = debtSumm * debtTax / 100 / 30 * debtPeriod
        percentsResult.innerHTML = `${local(debtSumm)} x ${debtTax}/100/30 x ${local(debtPeriod)} =
        ${local(debtResult)} руб.`
    } if (debtTaxType === 'year') {
        debtResult = debtSumm * debtTax / 100 / 365 * debtPeriod
        percentsResult.innerHTML = `${local(debtSumm)} x ${debtTax}/100/365 x ${local(debtPeriod)} =
        ${local(debtResult)} руб.`
    }
}

const feeCalc = (iskSumm = 0) => {
    if (iskSumm < 0) {
        feeResult.innerHTML = 'Введена отрицательная сумма!'
    } else if (iskSumm < 20001) {
        let score = iskSumm * 4 / 100
        if (score < 400) {
            score = 400;
            feeResultDetail.innerHTML = 'Минимальный размер пошлины'
            feeResult.innerHTML = `${local(score)} руб.`
        } else {
            feeResultDetail.innerHTML =
                `${iskSumm.toLocaleString('ru-RU')} x 4 / 100 = ${local(score)} руб.`
            feeResult.innerHTML = `${local(score)} руб.`
        }
    } else if (iskSumm >= 20001 && iskSumm < 100001) {
        let score = 800 + (iskSumm - 20000) * 3 / 100
        feeResultDetail.innerHTML =
            `800 + (${iskSumm.toLocaleString('ru-RU')} - 20 000) x 3 / 100 = ${local(score)} руб.`
        feeResult.innerHTML = `${local(score)} руб.`
    } else if (iskSumm >= 100001 && iskSumm < 200001) {
        let score = 3200 + (iskSumm - 100000) * 2 / 100
        feeResultDetail.innerHTML =
            `3 200 + (${iskSumm.toLocaleString('ru-RU')} - 100 000) x 2 / 100 = ${local(score)} руб.`
        feeResult.innerHTML = `${local(score)} руб.`
    } else if (iskSumm >= 200001 && iskSumm <= 1000000) {
        let score = 5200 + (iskSumm - 200000) * 1 / 100
        feeResultDetail.innerHTML =
            `5 200 + (${iskSumm.toLocaleString('ru-RU')} - 200 000) x 1 / 100 = ${local(score)} руб.`
        feeResult.innerHTML = `${local(score)} руб.`
    } else if (iskSumm > 1000000) {
        let score = 13200 + (iskSumm - 1000000) * 0.5 / 100
        if (score > 60000) {
            score = 60000
            feeResultDetail.innerHTML = 'Максимальный размер пошлины!'
            feeResult.innerHTML = `${local(score)} руб.`
        } else {
            feeResultDetail.innerHTML =
                `13 200 + (${iskSumm.toLocaleString('ru-RU')} - 1 000 000) x 0.5 / 100 = ${local(score)} руб.`
            feeResult.innerHTML = `${local(score)} руб.`
        }

    }
}

const reverseFee = (fee = 0) => {
    if (fee < 400) {
        reverseFeeResult.innerHTML = '-'
    } else if (fee <= 800) {
        let reverse = fee / 4 * 100
        reverseFeeResult.innerHTML = `${reverse.toLocaleString('ru-RU')} руб.`
    } else if (fee <= 3200) {
        let reverse = (fee - 800) / 3 * 100 + 20000
        reverseFeeResult.innerHTML = `${Math.floor(reverse).toLocaleString('ru-RU')} руб.`
    } else if (fee <= 5200) {
        let reverse = (fee - 3200) / 2 * 100 + 100000
        reverseFeeResult.innerHTML = `${Math.floor(reverse).toLocaleString('ru-RU')} руб.`
    } else if (fee <= 13200) {
        let reverse = (fee - 5200) / 1 * 100 + 200000
        reverseFeeResult.innerHTML = `${Math.floor(reverse).toLocaleString('ru-RU')} руб.`
    } else if (fee <= 60000) {
        let reverse = (fee - 13200) / 0.5 * 100 + 1000000
        reverseFeeResult.innerHTML = `${Math.floor(reverse).toLocaleString('ru-RU')} руб.`
    } else {
        reverseFeeResult.innerHTML = 'Максимальный размер пошлины 60000 руб.!'
    }
}

periodsBegin.addEventListener('input', () => {
    dateBegin = new Date(periodsBegin.value)
    diffDates()
})

periodsEnd.addEventListener('input', () => {
    dateEnd = new Date(periodsEnd.value)
    diffDates()
})

periodsWeekend.onclick = () => {
    dateWeekend = periodsWeekend.checked
    console.log(dateWeekend)
    diffDates()
}

percentsSumm.addEventListener('input', () => {
    debtSumm = num(percentsSumm.value)
    debtCalc()
})

percentsTax.addEventListener('input', () => {
    debtTax = num(percentsTax.value)
    debtCalc()
})

percentsTaxType.addEventListener('input', () => {
    debtTaxType = percentsTaxType.value
    debtCalc()
})

percentsPeriod.addEventListener('input', () => {
    debtPeriod = num(percentsPeriod.value)
    debtCalc()
})

feeSumm.addEventListener('input', () => {
    feeRange.value = feeSumm.value
    feeCalc(num(feeSumm.value))
})

feeRange.addEventListener('input', () => {
    feeSumm.value = feeRange.value
    feeCalc(num(feeSumm.value))
})

reverseFeeSumm.addEventListener('input', () => {
    reverseFee(num(reverseFeeSumm.value))
})
