# Antigravity News-to-Draft Pipeline

This folder contains the setup to run the **"Speed-to-Market" AI pipeline**.

## The Architecture
1. **The Hunter (Exa.ai)**: Scans for 24-hr volatile keywords (ex: "iPhone 17e leak").
2. **The Architect (Claude 3.7 Sonnet)**: Writers the post matching our specific format (Hook, Deep Dive, Antigravity Verdict, Tech Pilot JSON summary).
3. **The System (Ghost CMS)**: Draft gets uploaded via Admin API for human review.

## Import to n8n
1. Open your n8n or Make.com dashboard.
2. Click **Import from File**.
3. Select `tech-hunter-workflow.json`.
4. Configure Credentials:
   - `Exa API Key`
   - `Anthropic API Key`
   - `Ghost Admin API Key` & `URL`
5. Set the CRON trigger to every 3 hours as requested.
