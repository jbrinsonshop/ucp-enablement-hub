# UCP Enablement Hub - Deployment Guide

## Overview

This document provides instructions for deploying the UCP Enablement Hub to **quick.shopify.io** for SE/Sales Leadership enablement.

---

## Pre-Deployment Checklist

- [ ] All content reviewed and approved by stakeholders
- [ ] Interactive elements tested (dark mode, quizzes, calculator, tabs)
- [ ] Responsive design verified (desktop, tablet, mobile)
- [ ] Internal links verified (Vault project/mission links)
- [ ] External links verified (ucp.dev, shopify.dev, shopify.com/ucp)
- [ ] Screenshots/recordings captured for demo purposes

---

## Deployment to quick.shopify.io

### Option 1: Direct Upload (Recommended)

1. **Access quick.shopify.io**
   ```
   https://quick.shopify.io/
   ```

2. **Create New Quick Site**
   - Click "New Site" or "Create"
   - Choose "Upload Files" option

3. **Upload Files**
   Upload the following structure:
   ```
   ucp-enablement-hub/
   ├── index.html
   ├── styles/
   │   └── main.css
   ├── scripts/
   │   └── app.js
   └── assets/
       ├── diagrams/
       │   ├── ucp-architecture.svg
       │   ├── agentic-commerce-flow.svg
       │   └── mental-models-overview.svg
       ├── icons/
       │   ├── shopify-logo.svg
       │   ├── shopify-favicon.svg
       │   └── moon-icon.svg
       └── graphics/
           └── ucp-hero-graphic.svg
   ```

4. **Configure Settings**
   - **Site Name**: `ucp-enablement-hub`
   - **Access**: Internal (Shopify employees only)
   - **Category**: Enablement / Training

5. **Publish**
   - Click "Publish" to make the site live
   - Share URL: `https://quick.shopify.io/ucp-enablement-hub`

### Option 2: Using Shopp-E Integration

1. **Access Shopp-E**
   ```
   https://shopp-e.shopify.io/
   ```

2. **Create Training Module**
   - Navigate to "Create Training" or "New Module"
   - Select "External Content" or "HTML Upload"

3. **Configure as UCP Training**
   - Title: "Universal Commerce Protocol (UCP) Enablement"
   - Category: Agentic Commerce / New Features
   - Audience: SE/Sales Leadership
   - Duration: Self-paced (estimated 30-45 minutes)

4. **Link to Quick Site**
   - After publishing to quick.shopify.io
   - Add the quick.shopify.io URL to Shopp-E training

---

## Post-Deployment Verification

### Functionality Testing

| Feature | Test Action | Expected Result |
|---------|-------------|-----------------|
| Navigation | Click each nav link | Smooth scroll to section |
| Dark Mode | Click moon/sun icon | Theme toggles, persists |
| Knowledge Check | Select answer | Feedback displays |
| Capability Cards | Click "View Details" | Card expands with content |
| Readiness Calculator | Answer questions | Score updates, recommendations shown |
| Talk Track Builder | Click tabs | Content switches |
| FAQ Accordion | Click question | Answer expands/collapses |
| FAQ Category Tabs | Click category | FAQs filter by category |
| FAQ Search | Type search term | FAQs filter in real-time |
| External Links | Click documentation links | Opens in new tab |

### Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Responsive Breakpoints

- [ ] Desktop (1280px+)
- [ ] Tablet (768px - 1279px)
- [ ] Mobile (320px - 767px)

---

## Content Updates

### Updating Content

1. **Edit Local Files**
   - Modify `index.html` for content changes
   - Modify `styles/main.css` for styling
   - Modify `scripts/app.js` for interactivity

2. **Test Locally**
   ```bash
   cd ucp-enablement-hub
   python3 -m http.server 8080
   # Visit http://localhost:8080
   ```

3. **Re-upload to quick.shopify.io**
   - Navigate to your site settings
   - Replace files or upload updated versions
   - Publish changes

### Key Files Reference

| File | Purpose |
|------|---------|
| `index.html` | All HTML content and structure |
| `styles/main.css` | Polaris-aligned styling, dark mode |
| `scripts/app.js` | Interactivity, calculator, quizzes |
| `assets/diagrams/*.svg` | Architecture and flow diagrams |
| `assets/icons/*.svg` | Shopify branding, UI icons |

---

## Internal Resource Links

The following internal links are included in the Resources Hub:

| Resource | URL | Notes |
|----------|-----|-------|
| UCP Checkout Project | vault.shopify.io/gsd/projects/48453 | Build status |
| Agentic Commerce Mission | vault.shopify.io/gsd/missions/8590 | Strategic context |
| Engineering Blog: Building UCP | shopify.engineering/ucp | Architecture deep-dive by Ilya Grigorik |
| #agentic-commerce Slack | Internal Slack | Q&A channel |
| #help-agentic-storefronts | Internal Slack | Technical support |
| #agentic-plan-enterprise-gtm | Internal Slack | Enterprise GTM coordination |
| #proj-universal-commerce-protocol | Internal Slack | UCP project updates |

**Note**: Internal Slack channels and Vault links require Shopify VPN/SSO access.

---

## Support & Feedback

### Questions
- Slack: #agentic-commerce
- Slack: #se-enablement

### Reporting Issues
- Create Vault issue in SE Enablement project
- Tag with `ucp-enablement-hub`

### Feature Requests
- Submit via SE feedback channels
- Include specific use case and merchant context

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial release for NRF 2026 |
| 1.1 | January 12, 2026 | Added FAQ module, Agentic Plan module, live merchant proof points |
| 1.2 | January 12, 2026 | Added UCP architecture deep-dive from Engineering blog, enhanced resources |

---

## Architecture Reference

```
┌─────────────────────────────────────────────────────────────┐
│                    UCP Enablement Hub                       │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Static Files)                                    │
│  ├── HTML5 Single Page Application                         │
│  ├── CSS3 (Polaris Design System)                          │
│  ├── Vanilla JavaScript (No frameworks)                    │
│  └── SVG Graphics (Animated diagrams)                      │
├─────────────────────────────────────────────────────────────┤
│  Interactive Features                                       │
│  ├── Dark Mode Toggle (localStorage persistence)           │
│  ├── Knowledge Check Quizzes                               │
│  ├── Readiness Calculator (8-question assessment)          │
│  ├── Expandable Capability Cards                           │
│  ├── Talk Track Builder (Tabbed interface)                 │
│  └── Smooth Scroll Navigation                              │
├─────────────────────────────────────────────────────────────┤
│  Hosting                                                    │
│  ├── quick.shopify.io (Static hosting)                     │
│  └── Internal access only (SSO required)                   │
└─────────────────────────────────────────────────────────────┘
```

---

*Built by SE Assistant for Shopify Enterprise Solutions Engineering*
