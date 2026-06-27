---
key: common
title: Shared Prompt Contract
category: Shared
order: 0
summary: Instructions applied to every prepared prompt.
---

Use the uploaded colony context file as the source of truth.

Rules:
- Do not invent facts that are not present in the context.
- Prefer concrete actions tied to the colony data.
- If the data is insufficient, say what is missing before suggesting changes.
- Return only updates that can be encoded in the AntAI import schema.

Output contract:
- Start with a short human-readable explanation.
- Then provide one fenced `json` block containing a flat JSON object.
- The structure of the response file schema must map the form field ID to the form value.
- Look at the provided AI context file to see the list of fields to fulfill.
- You MUST include ALL field IDs from the AI context in your JSON output, even if they are empty or unchanged. Do not omit any field IDs.
- Make it a downloadable file.
