---
title: Agent-Ops
description: Agent-Ops is a CLI for event-sourced issue handling, workflow-aware execution, and low-conflict delivery through worktrees and stacked diffs.
pubDatetime: 2026-03-10T14:15:00Z
draft: false
featured: true
tags:
  - python
  - cli
  - workflow
  - tooling
status: active
---

Agent-Ops is a CLI-first development operations tool built around issues, execution workflow, and delivery structure.

<div class="not-prose my-8 rounded-lg border border-skin-line bg-skin-card bg-opacity-40 px-6 py-8 text-center">
  <p class="font-display text-3xl font-semibold tracking-tight text-skin-accent sm:text-4xl">
    “Everything is an issue.”
  </p>
  <p class="mt-3 text-xs uppercase tracking-[0.28em] text-skin-base opacity-80">
    — SinnaKodern
  </p>
</div>

The project is hosted at `https://github.com/weholt/agent-ops`, but the repository is not public yet. The CLI is installed with:

```bash
uv tool install agent-ops-cli
```

If `uv` is not installed yet:

```bash
# Windows (PowerShell)
irm https://astral.sh/uv/install.ps1 | iex

# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Core features

`ao` combines issue handling, workflow state, worktree management, stacked-diff delivery, and a web UI in one tool.

- event-sourced issue history
- structured issue lifecycle commands
- workflow metadata on issues
- git worktree orchestration
- stacked-diff workflow support
- validation and gate commands
- Kanban and Branch Worktrees web views
- GitHub and Gitea code-host integration

## Issue handling

The issue model is broader than plain CRUD. `ao` supports:

- `ao add`
- `ao show`
- `ao set`
- `ao complete`
- `ao close`
- `ao issue from-diff`

Issues can also declare workflow expectations directly:

- no special workflow requirements
- separate worktree required
- stacked diffs preferred
- stacked diffs plus separate worktree

The underlying model is event-sourced, with append-only issue history and derived active state.

## Worktrees

`ao worktree` treats isolated execution as a first-class workflow instead of a manual Git trick.

Key commands include:

- `ao worktree add`
- `ao worktree ls`
- `ao worktree rm`
- `ao worktree merge`
- `ao worktree plan`
- `ao worktree land`

`ao worktree plan` can break an epic into dependency-ordered steps with size gates such as max files and max LOC. `ao worktree land` can merge step branches into an epic parent and then squash to a target branch when the required checks are met.

## Stacks

`ao stack` provides a layered delivery model for stacked diffs.

Key commands include:

- `ao stack init`
- `ao stack add`
- `ao stack push`
- `ao stack merge`
- `ao stack status`
- `ao stack update`
- `ao stack verify`
- `ao stack squash`
- `ao stack remove`

This supports an epic parent branch plus step branches, PRs that target the previous layer, cascade updates through the stack, and ordered verification across layers.

## Delivery controls

The delivery model includes explicit controls for:

- CI-green and approval gates for final landing
- protected-branch blocking for unsafe operations
- fallback to `gh` when no code-host token is configured
- GitHub and Gitea support through a shared provider layer

## Summary

Agent-Ops is a workflow-oriented CLI where issue state, worktree isolation, and stacked delivery are part of the same system. The strongest parts of `ao` are its event-sourced issue model, issue-driven workflow metadata, worktree planning, and layered stack operations.
