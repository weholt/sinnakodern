---
author: Thomas Augestad Weholt
title: Using AO for Issue Management
slug: using-ao-for-issue-management
project: agent-ops
featured: false
draft: false
tags:
  - docs
  - tooling
  - workflow
description: "A short, example-driven AO workflow that follows one theoretical feature from issue creation to focus, progress, and clean closure."
pubDatetime: 2026-03-10T18:33:29Z
---

Imagine a small theoretical project: you are improving an internal docs site, and one concrete job is to add a troubleshooting page for stack merge conflicts.

AO works best when you treat that job as a first-class issue instead of a sticky note in your head.

## A simple issue flow

Start by creating the work item.

```bash
ao issue add "Write stack merge troubleshooting guide" --type docs --priority medium --epic "Docs refresh"
```

This creates a real AO issue with a type, a priority, and an epic instead of leaving the task as vague background noise.

Now ask AO what is ready to work on.

```bash
ao next --limit 5
```

This shows the top ready issues, so you can confirm whether your new docs task should be picked up now or wait behind something more urgent.

Say AO shows your new docs task near the top and you decide to work on it this session. Set the active focus.

```bash
ao focus set-doing DOCS-0001@abc123 --task "Draft stack merge troubleshooting guide"
```

This marks the issue as the thing you are actively doing, which is much better than manually poking at `focus.json`.

Before you start writing, leave yourself one short pointer for what happens after this task.

```bash
ao focus set-next "Review the remaining Docs refresh issues after the guide is done"
```

This updates the next-step note so the session does not end in total amnesia.

Now move the issue into active work.

```bash
ao issue set DOCS-0001@abc123 --status in_progress
```

This changes the issue state without needing a full structured patch.

If you also want the issue to show who is driving it, set that too.

```bash
ao issue set DOCS-0001@abc123 --owner agent
```

This is a quick metadata update, useful when AO or an agent is doing the work rather than a named human.

Halfway through, you want to double-check the issue details before finishing.

```bash
ao issue show DOCS-0001@abc123
```

This prints the full issue so you can verify the title, current state, and any notes before you close it.

Once the page is written and committed, close the issue cleanly.

```bash
ao issue close DOCS-0001@abc123 --log "Added troubleshooting steps and example commands for stack merge conflicts"
```

This closes the loop and leaves a useful explanation behind instead of a silent status change.

Finally, sync focus so the session state reflects reality.

```bash
ao focus sync
```

This rebuilds the focus view from the active issue store, which keeps your current work and next work aligned with the actual issue state.

That is the core AO issue rhythm: create the work, ask what is ready, set focus, move the issue forward, and close it with context.
