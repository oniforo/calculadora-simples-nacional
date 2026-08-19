const Simplificamos = require('../src/simplificamos')

describe('12. Manual PGDAS-D 2018 Example 12 (p. 123) - Initial Setup', () => {
    
    let calculator

    beforeAll(() => {
        calculator = new Simplificamos(3, 500 * 1e3, 100 * 1e3)
    })

    test('annex is 3', () => {
        expect(calculator.annex_number).toBe(3)
    })    

    test('gross accumulated income is 500,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(500 * 1e3)
    })

    test('gross current income is 100,000.00', () => {
        expect(calculator.current_gross_income).toBe(100 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
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

    describe('Updates ISS', () => {
    
        
        beforeAll(() => {
            calculator.custom_taxes = { 'ISS': 2 }
        })
    
        test('calculates tax distribution values', () => {
            expect(calculator.tax_distribution).toEqual({
                'IRPJ': 0.39888,
                'CSLL': 0.34902,
                'Cofins': 1.36018,
                'PIS/Pasep': 0.29517,
                'CPP': 4.32785,
                'ISS': 2.00000
            })
        })
    
        test('calculates amount due for each tax', () => {
            expect(calculator.distributed_amount_due).toEqual({
                'IRPJ': 398.88,
                'CSLL': 349.02,
                'Cofins': 1360.18,
                'PIS/Pasep': 295.17,
                'CPP': 4327.85,
                'ISS': 2000.00
            })
        })
    
        test('calculates total amount due', () => {
            expect(calculator.amount_due).toBe(8731.10)
        })
    
    })
    
})
