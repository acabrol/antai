# Prompt Library

This directory stores the prepared prompt library for the AI workbench.

Structure:
- `index.md` is the manifest read by the web app.
- `common.md` contains shared output rules.
- Each other `*.md` file is one prompt.

Maintenance rules:
- Keep one task per file.
- Keep `key` stable so buttons and references do not break.
- Use frontmatter for `title`, `category`, `order`, and `summary`.
- Use `{{colonyName}}`, `{{speciesName}}`, and `{{projectName}}` tokens in the body when needed.

This allows offline interaction: the user clicks a button to copy the prompt, pastes it into an LLM, gets a JSON block back, and uploads that JSON back into AntAI.
