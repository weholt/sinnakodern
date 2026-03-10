---
description: "Create a new SinnaKodern project page in Astro content from a title and body text. Use when you want ready-made project frontmatter and a file in src/content/projects/."
name: "Create project"
argument-hint: 'title: "Project title" text: "Your markdown or plain text" [tags: "tag1, tag2"] [description: "Short summary"] [status: active] [draft: false] [featured: false] [repoUrl: "https://..."] [liveUrl: "https://..."]'
agent: "agent"
---

Create one new markdown content file for SinnaKodern using [the companion template](./create-project.template.md).

Treat the chat input as arguments. Required arguments:

- `title`
- `text`

Optional arguments:

- `tags`
- `description`
- `status`
- `draft`
- `featured`
- `repoUrl`
- `liveUrl`

Requirements:

1. Create the output file in `src/content/projects/`.
2. Derive the filename and `slug` from `title` using lowercase kebab-case.
3. Populate frontmatter using the template and the repo conventions from `src/content/config.ts`.
4. Set `pubDatetime` to the current UTC timestamp in ISO 8601 format.
5. Omit `modDatetime` unless the user explicitly asks for it.
6. If `tags` are not provided, infer 2 to 5 short lowercase tags from the text. Prefer tags already used in the site when they fit.
7. If `description` is not provided, write a concise 1 to 2 sentence description based on the text.
8. Set `status` from input when provided; otherwise default it to `active`. Only use `active`, `paused`, or `archived`.
9. Set `draft` and `featured` from input when provided; otherwise default both to `false`.
10. Include `repoUrl` and `liveUrl` only when the user provides them.
11. Put the provided `text` below the frontmatter and format it as clean Markdown.
12. Do not add an H1 heading in the body if it duplicates the title; start body headings at H2 or lower.
13. Do not overwrite an existing file. If the slug already exists, append a short numeric suffix to the filename and `slug`.

Output expectations:

- Save exactly one new file.
- Use the template structure, but replace all placeholders.
- Omit optional fields that are not provided.
- Keep the response short and report the created file path.
