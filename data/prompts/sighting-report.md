---
key: sighting-report
title: Nuptial Flight Report
category: Community
order: 51
summary: Help draft a nuptial flight sighting report with species identification.
---

Help the user document a nuptial flight sighting.

Based on the location, time of year, observed ant size, color, and behavior, suggest a likely species identification with a confidence level (low / medium / high). Explain the reasoning behind the identification.

Provide recommended next steps for catching and founding a colony, including equipment needed and initial care instructions for the identified species.

This prompt works independently of colony context. If no structured colony updates apply, return a valid `antai.ai.result/v1` JSON with an empty `colonies` array.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

