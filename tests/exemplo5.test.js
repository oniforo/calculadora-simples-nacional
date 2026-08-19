const Simplificamos = require('../src/simplificamos')

describe('5. Manual PGDAS-D 2018 Example 5 (p. 108)', () => {
    
    const calculator = new Simplificamos(
        null, 500 * 1e3, 10 * 1e3, 100 * 1e3, true
    )

    test('annex is 5 (override)', () => {
        expect(calculator.annex_number).toBe(5)
    })    

    test('gross accumulated income is 500,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(500 * 1e3)
    })

    test('gross current income is 10,000.00', () => {
        expect(calculator.current_gross_income).toBe(10 * 1e3)
    })
    
    test('r-factor is < 0.28', () => {
        expect(calculator.r_factor).toBeLessThan(0.28)
    })

    test('get the range based on the r-factor', () => {
        expect(calculator.range).toBe('3')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 19.5,
            "valor a deduzir": 9900,
            "repartição de tributos": {
                "IRPJ": 24,
                "CSLL": 15,
                "Cofins": 14.92,
                "PIS/Pasep": 3.23,
                "CPP": 23.85,
                "ISS": 19
            }
        })
    })

    test('verifies effetive tax rate', () => {
        expect(calculator.effective_tax).toBe(0.17520)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(1752.00)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 4.20480,
            'CSLL': 2.62800,
            'Cofins': 2.61398,
            'PIS/Pasep': 0.56590,
            'CPP': 4.17852,
            'ISS': 3.32880
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 420.48,
            'CSLL': 262.80,
            'Cofins': 261.40,
            'PIS/Pasep': 56.59,
            'CPP': 417.85, 
            'ISS': 332.88
        })
    })

})