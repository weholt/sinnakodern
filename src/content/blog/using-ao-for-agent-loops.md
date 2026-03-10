---
author: Thomas Augestad Weholt
title: Using AO for Agent Loops
slug: using-ao-for-agent-loops
project: agent-ops
featured: false
draft: false
tags:
  - docs
  - tooling
  - workflow
description: "A short, example-driven walkthrough of how AO can run an agent through a small theoretical queue until the ready work is gone."
pubDatetime: 2026-03-10T18:35:29Z
---

Imagine a theoretical maintenance sprint with three small ready issues: update docs, fix a tiny bug, and tighten one validation rule.

You want AO to keep an agent moving through that queue instead of stopping after a single session.

## Walk the loop once before trusting it

First, inspect the prompt AO would send to the agent.

```bash
ao hooks loop-prompt --engine copilot
```

This generates the iteration prompt for the selected engine so you can see the task framing before anything runs.

The prompt looks reasonable, so test the loop selection without launching the agent.

```bash
ao hooks loop-run --engine copilot --dry-run
```

This proves AO can choose a ready issue and prepare the next iteration without doing any real work yet.

Now run the real loop.

```bash
ao hooks loop-run --engine copilot --max 10
```

This tells AO to invoke Copilot, rebuild state after each run, and continue until the queue is empty or the iteration cap is reached.

When it finishes, inspect what is left.

```bash
ao next --limit 10
```

This shows whether the ready queue actually shrank, which is the fastest sanity check after an autonomous run.

Then inspect focus.

```bash
ao focus
```

This lets you see what AO considered current or next after the loop processed the queue.

## Make the next session continue automatically

Now imagine you like the direct loop run and want the next iteration to start whenever an agent session ends.

Start by installing the hook config for the engine.

```bash
ao hooks agent-install --engine copilot
```

This writes the engine hook configuration AO needs so session-end events can call back into the loop.

Then turn on autonomous looping in `.agent/ops/hooks.yml`.

```yaml
engines:
  copilot:
    autonomous_loop:
      enabled: true
      max_iterations: 10
```

This gives AO permission to continue automatically instead of waiting for a manual `loop-run` command every time.

Now a theoretical flow looks like this: an agent session ends, AO rebuilds state, finds the next ready issue, launches the next iteration, and keeps going until there is no autonomous-ready work left.

That is the useful mental model for AO loops. They are not magic. They are just a disciplined queue runner built on top of clean issue state, prompt generation, and repeatable session hooks.
