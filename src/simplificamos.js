/** Class responsible for most of the calculations */
const Simplificamos = class {
    /** 
     * Calculates the effective tax rates and amounts due
     * @param {number} annex 
     * @param {number} accumulated_gross_income 
     * @param {number} current_gross_income 
     * @param {boolean} use_r_factor
     * @param {boolean} sale_abroad
     */
    constructor(
        annex, 
        accumulated_gross_income, 
        current_gross_income,
        accumulated_payroll,
        use_r_factor = false,
        sale_abroad = false
    ) {
        
        if (use_r_factor) {
            this.r_factor = accumulated_payroll / accumulated_gross_income
            this.r_factor >= 0.28
                ? this.annex_number = 3
                : this.annex_number = 5
        } else {
            this.annex_number = annex
        }

        // Observe que para calcular o RBT12 e o RBA deve-se utilizar as receitas sempre pelo regime de competência.
        if (typeof(accumulated_gross_income) == 'number') {
            this.accumulated_gross_income = accumulated_gross_income
        }

        if (typeof(accumulated_gross_income) == 'object') {
            this.accumulated_gross_income = 
                accumulated_gross_income.reduce(
                    (a, b) => (a + b) * 12 / accumulated_gross_income.length
                )
        }

        this.current_gross_income = current_gross_income
        this.use_r_factor = use_r_factor
        this.sale_abroad = sale_abroad

        this.calculate_effective_tax()
        this.calculate_tax_distribution()
        this.calculate_amount_due()

    }

    #precision(number, decimals) {
        return Number(Number
            (number.toPrecision(21)).toFixed(decimals)
        )
    }

    define_range() {
        
        for (const [key, value] of Object.entries(this.ranges)) {
            if (
                this.accumulated_gross_income >= value[0] &&
                this.accumulated_gross_income <= value[1]
            ) {
                this.range = key
            }
        }

    }

    load_data() {
        this.data = require(`../data/anexo${this.annex_number}.json`)
        this.ranges = require(`../data/anexo${this.annex_number}-ranges.json`)
    }

    calculate_tax_distribution() {

        this.tax_distribution = {}
        this.distributed_amount_due = {}
        
        for (const [key, value] of Object.entries(this.annex['repartição de tributos'])) {        

            // Na revenda de mercadorias para o exterior não há incidência de Cofins, Pis/Pasep e ICMS.
            if (
                this.sale_abroad && 
                ['Cofins', 'PIS/Pasep', 'ICMS'].includes(key)
            ) {}
            else {

                const tax_distribution = this.#precision(value * this.effective_tax, 5)
            
                this.tax_distribution[key] = tax_distribution
                this.distributed_amount_due[key] = 
                    this.#precision((tax_distribution * this.current_gross_income / 100), 2)

            }
        }
    }

    calculate_effective_tax() {
        
        this.load_data()
        this.define_range()

        this.annex = this.data['faixas'][this.range]

        this.effective_tax = 
            this.annex['aliquota'] / 100 - 
            this.annex['valor a deduzir'] / this.accumulated_gross_income
        this.effective_tax = this.#precision(this.effective_tax, 10)

    }

    calculate_amount_due() {
        const amount_due = 
            Object.values(this.distributed_amount_due).reduce((a, b) => a + b)
        this.amount_due = this.#precision(amount_due, 2)
    }

    /**
     * @param {object} taxes
     */
    set custom_taxes(taxes) {
    
        const amount_due = {}
        Object.entries(taxes).map(([k, v]) => {
            amount_due[k] = this.#precision(v * this.current_gross_income / 100, 2)
        })

        this.tax_distribution = { ...this.tax_distribution, ...taxes }
        this.distributed_amount_due = { ...this.distributed_amount_due, ...amount_due }
        this.calculate_amount_due()

    }
    
}

module.exports = Simplificamos
