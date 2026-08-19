const Simplificamos = require('../src/simplificamos')

describe('Manual PGDAS-D 2018 Example 2 (p. 105) - RPA1', () => {
    
    const calculator = new Simplificamos(1, 300 * 1e3, 300 * 1e3)

    test('annex is 1', () => {
        expect(calculator.annex_number).toBe(1)
    })

    test('gross accumulated income is 300,000.00', () => {
        expect(calculator.accumulated_gross_income).toBe(300 * 1e3)
    })

    test('gross current income is 300,000.00', () => {
        expect(calculator.current_gross_income).toBe(300 * 1e3)
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
        expect(calculator.effective_tax).toBe(0.0532)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(15960)
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
            'IRPJ': 877.80,
            'CSLL': 558.60,
            'Cofins': 2033.31, // 2033.31
            'PIS/Pasep': 440.49, //440.50
            'CPP': 6623.40,
            'ICMS': 5426.40
        })
    })

})

describe('Manual PGDAS-D 2018 Example 2 (p. 105) - RPA2', () => {
    
    const calculator = new Simplificamos(3, 300 * 1e3, 100 * 1e3)

    test('annex is 3', () => {
        expect(calculator.annex_number).toBe(3)
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
            "aliquota": 11.2,
            "valor a deduzir": 9360,
            "repartição de tributos": {
                "IRPJ": 4,
                "CSLL": 3.5,
                "Cofins": 14.05,
                "PIS/Pasep": 3.05,
                "CPP": 43.4,
                "ISS": 32
            }
        })
    })

    test('verifies effetive tax rate', () => {
        expect(calculator.effective_tax).toBe(0.0808)
    })

    test('calculates total amount due', () => {
        expect(calculator.amount_due).toBe(8080)
    })

    test('calculates tax distribution values', () => {
        expect(calculator.tax_distribution).toEqual({
            'IRPJ': 0.32320,
            'CSLL': 0.28280,
            'Cofins': 1.13524,
            'PIS/Pasep': 0.24644,
            'CPP': 3.50672,
            'ISS': 2.58560
        })
    })

    test('calculates amount due for each tax', () => {
        expect(calculator.distributed_amount_due).toEqual({
            'IRPJ': 323.20,
            'CSLL': 282.80,
            'Cofins': 1135.24,
            'PIS/Pasep': 246.44,
            'CPP': 3506.72,
            'ISS': 2585.60
        })
    })

})

describe('Manual PGDAS-D 2018 Example 2 (p. 105) - Total Amount Due', () => {
    
    const calculator1 = new Simplificamos(1, 300 * 1e3, 300 * 1e3)
    const calculator2 = new Simplificamos(3, 300 * 1e3, 100 * 1e3)

    const amount_due = calculator1.amount_due + calculator2.amount_due

    test('calculate total amount due', () => {
        expect(amount_due).toBe(24040.00)
    })

})