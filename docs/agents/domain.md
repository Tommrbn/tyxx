# Domain Docs

This project uses a single context: one `CONTEXT.md` at the project root and architectural decision records (ADRs) in `docs/adr/`.

## Before exploring

Read the root `CONTEXT.md` and any ADRs in `docs/adr/` relevant to the work.

If these files do not exist, proceed silently. The `domain-modeling` skill, reached via `grill-with-docs` or `improve-codebase-architecture`, creates them when terms or decisions are resolved.

## Use the glossary's vocabulary

When naming a domain concept in an issue, proposal, hypothesis, or test, use the term defined in `CONTEXT.md`.

If a concept is missing, check whether an existing term already covers it. Record a real vocabulary gap for `domain-modeling`.

## Flag ADR conflicts

If a proposal contradicts an existing ADR, identify the ADR and explain why the decision should be reconsidered before proceeding.
