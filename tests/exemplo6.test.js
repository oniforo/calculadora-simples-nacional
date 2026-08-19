const Simplificamos = require('../src/simplificamos')

describe('6. Manual PGDAS-D 2018 Example 6 (p. 109) - Internal', () => {
    
    const calculator = new Simplificamos(
        1, 2000 * 1e3, 100 * 1e3
    )

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })    

    test('gross accumulated income is 2,000,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(2000 * 1e3)
    })

    test('gross current income is 100,000.00', () => {
        expect(calculator.current_gross_income).toBe(100 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
        expect(calculator.range).toBe('5')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 14.3,
            "valor a deduzir": 87300,
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
        expect(calculator.effective_tax).toBe(0.09935)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(9935.00)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.54642, // 0.54643
            'CSLL': 0.34772, // 0.34773
            'Cofins': 1.26572,
            'PIS/Pasep': 0.27421,
            'CPP': 4.12303, // 4.17270
            'ICMS': 3.37790 // 3.32823
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 546.42, // 546.43
            'CSLL': 347.72, // 347.73
            'Cofins': 1265.72,
            'PIS/Pasep': 274.21,
            'CPP': 4123.03, // 4172.70
            'ICMS': 3377.90 // 3328.23
        })
    })

})

describe('Manual PGDAS-D 2018 Example 6 (p. 109) - External', () => {
    
    const calculator = new Simplificamos(
        1, 1000 * 1e3, 50 * 1e3, null, false, true
    )

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })

    test('is an abroad sale', () => {
        expect(calculator.sale_abroad).toBeTruthy()
    })

    test('gross accumulated income is 1,000,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(1000 * 1e3)
    })

    test('gross current income is 50,000.00', () => {
        expect(calculator.current_gross_income).toBe(50 * 1e3)
    })
    
    test('get the range based on the gross income', () => {
        expect(calculator.range).toBe('4')
    })

    test('loads proper annex data from file', () => {
        expect(calculator.annex).toEqual({
            "aliquota": 10.7,
            "valor a deduzir": 22500,
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
        expect(calculator.effective_tax).toBe(0.08450)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(2133.64) // 2154.76
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.46475, 
            'CSLL': 0.29575, 
            'CPP': 3.50675 // 3.54900
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 232.38,  
            'CSLL': 147.88, 
            'CPP': 1753.38 // 1174.50
        })
    })

})

describe('Manual PGDAS-D 2018 Example 6 (p. 109) - Total Amount Due', () => {

    const calculator1 = new Simplificamos(1, 2000 * 1e3, 100 * 1e3)
    const calculator2 = new Simplificamos(1, 1000 * 1e3, 50 * 1e3, null, false, true)

    const amount_due = calculator1.amount_due + calculator2.amount_due

    test('calculate total amount due', () => {
        expect(amount_due).toBe(12068.64) // 12089.78
    })

})