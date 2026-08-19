const Simplificamos = require('../src/simplificamos')

describe('Manual PGDAS-D 2018 Example 3 (p. 106)', () => {
    
    const calculator = new Simplificamos(
        1, [10 * 1e3, 100 * 1e3], 100 * 1e3
    )

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })    

    test('gross accumulated income is 660,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(660000)
    })

    test('gross current income is 100,000.00', () => {
        expect(calculator.current_gross_income).toBe(100 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
        expect(calculator.range).toBe('3')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 9.5,
            "valor a deduzir": 13860,
            "repartição de tributos": {
                "IRPJ": 5.5,
                "CSLL": 3.5,
                "Cofins": 12.74,
                "PIS/Pasep": 2.76,
                "CPP": 41.5,
                "ICMS": 34
            }
        })
    })

    test('verifies effetive tax rate', () => {
        expect(calculator.effective_tax).toBe(0.074)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(7400)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.40700,
            'CSLL': 0.25900,
            'Cofins': 0.94276,
            'PIS/Pasep': 0.20424,
            'CPP': 3.07100, // 3.108
            'ICMS': 2.51600 // 2.479
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 407.00,
            'CSLL': 259.00,
            'Cofins': 942.76,
            'PIS/Pasep': 204.24,
            'CPP': 3071.00, // 3108.00
            'ICMS': 2516.00 // 3071.00
        })
    })

})