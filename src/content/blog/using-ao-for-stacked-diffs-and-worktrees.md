---
author: Thomas Augestad Weholt
title: Using AO for Stacked Diffs and Worktrees
slug: using-ao-for-stacked-diffs-and-worktrees
project: agent-ops
featured: false
draft: false
tags:
  - docs
  - tooling
  - workflow
description: "A short, example-driven walkthrough of how AO can split one theoretical feature into stack layers or epic worktree steps."
pubDatetime: 2026-03-10T18:34:29Z
---

Imagine a theoretical feature called `auth-flow`.

It is too large for one branch, but still small enough that you want one coherent delivery story. AO gives you two ways to do that: stacked layers with `ao stack`, or epic steps with `ao worktree`.

## One feature as a stack

Start on your main working branch and initialize the stack.

```bash
ao stack init auth-flow
```

This creates layer 0, which becomes the base of the whole stacked-diff sequence.

The first slice is data-model work, so create a new layer for that.

```bash
ao stack add auth-models
```

This branches a new layer from layer 0, giving you a smaller review unit instead of stuffing everything into one branch.

The next slice is API work, and you want it opened immediately in your editor.

```bash
ao stack add api-endpoints -e code
```

This creates the next layer on top of the stack and opens it in VS Code so you can start there right away.

After finishing the model layer, push it for review.

```bash
ao stack push -m "Add auth models"
```

This pushes the current layer and creates a PR against the layer below, which is the whole point of stacked diffs.

Later, you discover the model layer needs one more field. You fix it there first, then move those changes upward.

```bash
ao stack merge
```

This cascade-merges the updated lower layer into the higher layers, so the stack keeps its ordering without manual branch surgery.

Before final review, check that the whole stack is healthy.

```bash
ao stack status
```

This shows whether layers are clean, pushed, and associated with the expected PR state.

When the feature is ready to be reviewed as one final unit, create a squashed branch.

```bash
ao stack squash -m "feature: auth flow"
```

This produces one reviewable branch containing all stack changes without destroying the original layered history.

## The same idea as worktree steps

Now imagine the same theoretical feature is part of a larger epic called `Identity overhaul`, and you want AO to help plan the steps first.

```bash
ao worktree plan --epic "Identity overhaul" --max-files 6 --max-loc 300
```

This asks AO to suggest dependency-ordered steps and warn when a step looks too large.

The planner suggests a bootstrap step first, so create that worktree.

```bash
ao worktree add --epic "Identity overhaul" --step 1 --summary bootstrap --open editor
```

This creates the first epic step worktree and opens it in your default editor.

The second step is the API layer, and you want an agent-oriented launcher for it.

```bash
ao worktree add --epic "Identity overhaul" --step 2 --summary api --open claude
```

This creates the next step with a predictable branch name and opens it in the chosen tool.

Once the step branches are ready, land them into the epic parent.

```bash
ao worktree land --epic "Identity overhaul"
```

This merges the prepared steps into the epic parent branch in the intended order.

When the whole epic is approved and CI is green, do the final landing.

```bash
ao worktree land --epic "Identity overhaul" --final --target main --ci-green --approved
```

This performs the final squash to the target branch, but only after you explicitly acknowledge the review and CI gates.

The practical difference is simple: `ao stack` feels like layered PR delivery, while `ao worktree` feels like planned epic execution. Both are really about breaking one feature into smaller, reviewable moves.
