# Antai Tasks

## 1. Purpose

This document tracks TODO work from the current implemented state of `Antai`.

It intentionally separates active product reality from deferred or incomplete work.

## 2. Documentation Alignment

- Keep docs aligned with the implemented app, not only the original product vision.
- Update architecture, design, and specification docs whenever major flows change.
- Keep `README.md` and docs consistent about run modes and current capabilities.

## 3. Product Hardening

- Add tests for core auth, project, colony, reminder, and event flows.
- Reduce logic concentration in `public/app.js` and `src/server.js`.
- Tighten validation around file-backed record writes and deletes.
- Improve consistency between project, colony, map, zone, and reminder linking rules.
- Review public/private visibility rules for projects and colonies.

## 4. Deferred Core Auth Work

- Add email verification.
- Add optional social login.
- Improve account state handling beyond the current local credential flow.

## 5. Deferred Media Work

- Add video upload support.
- Add playlist-oriented media browsing if still justified.
- Expand photo management beyond the current gallery and primary-photo workflows.

## 6. Deferred Device and Display Work

- Evaluate whether a passive TV/dashboard mode is still worth building.
- Expand mobile UX only where the current responsive shell proves insufficient.

## 7. Deferred AI and LLM Work

- Decide whether Gemini support should stay as a prompt/key workflow or become a fuller integration.
- Define whether ChatGPT and Claude should be supported as real product integrations.
- Improve AI output persistence and reuse if the current prompt workflow is not enough.

## 8. Deferred Sensors and Automation Work

- Add real sensor ingestion and historical recording.
- Define stable sensor-source and sensor-reading models.
- Add meaningful threshold alerts backed by real data.
- Decide which automation connector targets are worth supporting.
- Implement real connector flows only after the data model is stable.

## 9. Deferred Community Work

- Evaluate whether moderation roles are needed.
- Clarify how far public content and community workflows should go.
- Keep broader social features deferred unless they clearly support the product.

## 10. Current UX and Content Enhancements

- Refine project management workflows.
- Improve colony detail tab UX where tabs exist but behavior is still shallow.
- Improve map and zone authoring ergonomics.
- Improve news feed editing and sync feedback.
- Continue refining public pages and marketing copy based on the live UI direction.
