# BillBuddy Static Preview

This folder contains a standalone HTML/CSS mock of the BillBuddy experience so you can review the interface without running the Next.js application or installing npm dependencies.

## How to open

### Option 1: Open the file directly

- macOS: `open index.html`
- Linux: `xdg-open index.html`
- Windows: double-click `index.html` in File Explorer

### Option 2: Run a lightweight local server

From this directory, start a static server and load the preview in your browser:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000/index.html>.

The preview mirrors the layout, section guidance, and AI-assisted interactions from the main prototype, making it ideal for quick demos or sharing the experience when the full stack cannot be launched.
