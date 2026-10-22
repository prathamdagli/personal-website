# Interaction and link audit

Checked against the production build served at localhost:3000 on 2026-10-22.

- Nine routes returned HTTP 200.
- 218 rendered anchor links had nonempty destinations.
- All 40 internal section-anchor references resolved to rendered IDs.
- Resume links returned a valid PDF.
- Four project GitHub repositories, the GitHub profile, LinkedIn profile, and Creditscout live project returned HTTP 200.
- All 11 button declarations in source had a click handler or submit action. These declarations include controls rendered multiple times, such as filters, experience entries, and workflow stages.
- Three draft tests passed: provider URL encoding, matching copyable preview, and topic/name handling. Unicode, line breaks, ampersands, plus signs, and hash characters were preserved.

The contact header previously relied on a mailto link and could appear unresponsive without a configured protocol handler. It now scrolls to the form and focuses its name field. Submitting the form reveals a draft with explicit Gmail, Outlook, email-app, and clipboard actions. Changes to form values clear the old draft. Copy failures select the preview for manual copying.

Source review covered project filters, experience navigation and accordions, skill drawers, workflow stages and restart, mobile navigation, email copy, external links, resume downloads, and section navigation. No placeholder destinations or button declarations without actions were found.

Browser automation was disabled in Work settings. This was an HTTP, source-wiring, build, and draft-logic audit, not a live click or visual browser test. Actual mail delivery remains in the visitor's email provider, under their control.

Reproduce:

```sh
node --test tests/contact-draft.test.mjs
node tests/audit-links.mjs http://localhost:3000
npm run build
```
