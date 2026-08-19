const Simplificamos = require('../src/simplificamos')

describe('7. Manual PGDAS-D 2018 Example 7 (p. 111)', () => {
    
    const calculator = new Simplificamos(1, 250 * 1e3, 60 * 1e3)

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })    

    test('gross accumulated income is 250,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(250 * 1e3)
    })

    test('gross current income is 60,000.00', () => {
        expect(calculator.current_gross_income).toBe(60 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
        expect(calculator.range).toBe('2')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 7.3,
            "valor a deduzir": 5940,
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
        expect(calculator.effective_tax).toBe(0.04924)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(2954.40)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.27082,
            'CSLL': 0.17234,
            'Cofins': 0.62732,
            'PIS/Pasep': 0.13590,
            'CPP': 2.04346,
            'ICMS': 1.67416
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 162.49,
            'CSLL': 103.40,
            'Cofins': 376.39,
            'PIS/Pasep': 81.54,
            'CPP': 1226.08, // 1226.80
            'ICMS': 1004.50
        })
    })

})