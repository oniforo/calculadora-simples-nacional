const Simplificamos = require('../src/simplificamos')

describe('Manual PGDAS-D 2018 Example 4 (p. 107)', () => {
    
    const calculator = new Simplificamos(
        null, 500 * 1e3, 10 * 1e3, 250 * 1e3, true
    )

    test('annex is 3 (override)', () => {
        expect(calculator.annex_number).toBe(3)
    })    

    test('gross accumulated income is 500,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(500 * 1e3)
    })

    test('gross current income is 10,000.00', () => {
        expect(calculator.current_gross_income).toBe(10 * 1e3)
    })
    
    test('r-factor is >= 0.28', () => {
        expect(calculator.r_factor).toBeGreaterThanOrEqual(0.28)
    })

    test('get the range based on the r-factor', () => {
        expect(calculator.range).toBe('3')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 13.5,
            "valor a deduzir": 17640,
            "repartição de tributos": {
                "IRPJ": 4,
                "CSLL": 3.5,
                "Cofins": 13.64,
                "PIS/Pasep": 2.96,
                "CPP": 43.4,
                "ISS": 32.5
            }
        })
    })

    test('verifies effetive tax rate', () => {
        expect(calculator.effective_tax).toBe(0.09972)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(997.21) // 997.20
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.39888,
            'CSLL': 0.34902,
            'Cofins': 1.36018,
            'PIS/Pasep': 0.29517,
            'CPP': 4.32785,
            'ISS': 3.24090
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 39.89,
            'CSLL': 34.90,
            'Cofins': 136.02,
            'PIS/Pasep': 29.52,
            'CPP': 432.79, // 432.78
            'ISS': 324.09
        })
    })

})