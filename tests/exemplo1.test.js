const Simplificamos = require('../src/simplificamos')

describe('Manual PGDAS-D 2018 Example 1 (p. 103)', () => {
    
    const calculator = new Simplificamos(1, 300 * 1e3, 100 * 1e3)

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })

    test('gross accumulated income is 300,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(300 * 1e3)
    })

    test('gross current income is 100,000.00', () => {
        expect(calculator.current_gross_income).toBe(100 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
        expect(calculator.range).toBe('2')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            'aliquota': 7.3,
            'valor a deduzir': 5940,
            'repartição de tributos': {
                'IRPJ': 5.5,
                'CSLL': 3.5,
                'Cofins': 12.74,
                'PIS/Pasep': 2.76,
                'CPP': 41.5,
                'ICMS': 34
            }
        })
    })

    test('verifies effetive tax rate', () => {
        expect(calculator.effective_tax).toBe(0.0532)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(5320)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.29260,
            'CSLL': 0.18620,
            'Cofins': 0.67777,
            'PIS/Pasep': 0.14683,
            'CPP': 2.20780,
            'ICMS': 1.80880
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 292.60,
            'CSLL': 186.20,
            'Cofins': 677.77,
            'PIS/Pasep': 146.83,
            'CPP': 2207.80,
            'ICMS': 1808.80
        })
    })

})