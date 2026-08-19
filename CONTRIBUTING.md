# Contributing

Thanks for considering a contribution to Calculadora Simples Nacional.

## Getting set up

```bash
git clone <repo-url>
cd calculadora-simples-nacional
pnpm install
```

## Making a change

1. Create a branch off `main`: `git checkout -b feat/short-description`
2. Make your change, with tests where it makes sense — new annex/tax rules
   should include a worked example in `tests/`, ideally cross-checked
   against the official PGDAS-D manual
3. Run the test suite before opening a PR:

   ```bash
   pnpm test
   ```

4. Commit with a clear message (Conventional Commits preferred:
   `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`)
5. Open a pull request against `main` and fill in the PR template

## Reporting bugs / requesting features

Use the issue templates — they ask for the details that make an issue
actionable (repro steps, expected vs. actual behavior, environment).

## Code style

No linter/formatter is configured yet. Match the existing style in
`src/simplificamos.js` (4-space indentation, no semicolons).

## Questions

Open an issue if you're not sure something counts as a bug.
