# Calculadora Simples Nacional

[![Build Status](https://img.shields.io/github/actions/workflow/status/oniforo/calculadora-simples-nacional/node.js.yml?style=flat-square)](https://github.com/oniforo/calculadora-simples-nacional/actions)
[![License](https://img.shields.io/github/license/oniforo/calculadora-simples-nacional?style=flat-square)](https://github.com/oniforo/calculadora-simples-nacional/blob/main/LICENSE)

A JavaScript library for calculating **Simples Nacional** taxes — Brazil's simplified tax
regime for micro and small businesses. Given a company's annex, accumulated and current
gross revenue (and optionally its accumulated payroll for the "Fator R" rule), it computes
the effective tax rate, the amount due, and how that amount is distributed across each
underlying tax (IRPJ, CSLL, Cofins, PIS/Pasep, CPP, ICMS, ISS, etc.).

## Features

- Effective tax rate and total amount due for any of the five Simples Nacional annexes
  (Anexos I–V)
- Automatic annex selection via the **Fator R** (payroll-to-revenue ratio) rule
- Per-tax distribution of the amount due (`tax_distribution` / `distributed_amount_due`)
- Support for revenue-abroad sales, which are exempt from Cofins, PIS/Pasep, and ICMS
- Override individual tax rates via `custom_taxes`
- Bundled reference data: the official annex bracket/rate tables (`data/anexo*.json`,
  `data/anexo*-ranges.json`) and a CNAE (economic activity code) table (`data/cnae.json`)

## Installation

This project uses [pnpm](https://pnpm.io/):

```sh
pnpm install
```

## Usage

```js
const Simplificamos = require('./src/simplificamos')

const calculator = new Simplificamos(
    1,          // annex number (1-5)
    300 * 1e3,  // accumulated gross income (last 12 months)
    100 * 1e3   // current period's gross income
)

calculator.effective_tax          // effective tax rate
calculator.amount_due             // total amount due
calculator.tax_distribution       // effective rate per tax
calculator.distributed_amount_due // amount due per tax
```

### Constructor parameters

| Parameter                 | Type               | Description                                                                 |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `annex`                    | `number`            | Annex number (1–5), used when `use_r_factor` is `false`                      |
| `accumulated_gross_income`  | `number \| number[]` | Gross revenue accumulated over the last 12 months (RBT12), or a list of monthly revenues to average |
| `current_gross_income`      | `number`            | Gross revenue for the current period                                        |
| `accumulated_payroll`       | `number`            | Accumulated payroll, used to compute the Fator R                            |
| `use_r_factor`              | `boolean`           | When `true`, selects Anexo III or V automatically based on the Fator R       |
| `sale_abroad`                | `boolean`           | When `true`, excludes Cofins, PIS/Pasep, and ICMS from the tax distribution   |

## Project structure

```
data/    Official Simples Nacional annex tables (rates, deductions, bracket ranges) and CNAE codes
src/     Simplificamos calculator class
tests/   Jest tests validated against worked examples from the official PGDAS-D 2018 manual
```

## Testing

Tests are written with [Jest](https://jestjs.io/) and check the calculator's output against
worked examples from the official PGDAS-D 2018 manual (`tests/exemplo*.test.js`).

```sh
pnpm test
```
