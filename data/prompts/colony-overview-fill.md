---
key: colony-overview-fill
title: Colony Overview Auto-Fill
category: Colony Care
order: 11
summary: Generate notes, setup details, and dietary preferences for the colony overview tab.
---

Focus on {{colonyName}} ({{speciesName}}) in {{projectName}}.

Review the colony context and generate comprehensive content for three overview sections:

1. **Colony diary notes** (`notesAppend`) — summarise the colony's current state, recent milestones, and any observations worth recording.
2. **Setup details** (`setupAppend`) — describe the enclosure type, nest material, outworld configuration, and connections between components.
3. **Dietary preferences** (`dietAppend`) — list sugar sources, protein rotation schedule, and hydration provisions.

Base all suggestions on species-specific care guides for {{speciesName}}. Only include information that is realistic for the colony's current size and development stage.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

