# UCP Enablement Hub

Internal training and enablement resource for Shopify's Universal Commerce Protocol (UCP) and Agentic Commerce capabilities.

## Overview

This hub provides Solutions Engineers and Sales teams with:

- **UCP Protocol Overview** - Understanding the open standard for agentic commerce
- **Core Capabilities** - Checkout, Identity, Catalog, and Order capabilities
- **Agentic Plan** - Technical integration guide for non-Shopify brands
- **Mental Models** - Frameworks for positioning UCP to enterprise merchants
- **Enterprise Playbook** - Discovery questions, objection handling, and talk tracks
- **FAQ** - Key questions and answers for internal enablement

## Quick Links

- **Live Site**: [ucp-enablement-hub.quick.shopify.io](https://ucp-enablement-hub.quick.shopify.io)
- **UCP Developer Docs**: [shopify.dev/docs/agents](https://shopify.dev/docs/agents)
- **UCP Protocol Spec**: [ucp.dev](https://ucp.dev)
- **Slack**: #agentic-plan-enterprise-gtm, #help-agentic-storefronts

## Local Development

```bash
# Start local server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## Deployment

This project uses GitHub Actions to automatically deploy to [quick.shopify.io](https://quick.shopify.io).

### Automatic Deployment

- **Push to `main`**: Auto-deploys to production
- **Pull Request**: Creates preview deployment (optional)
- **Manual**: Use workflow_dispatch for ad-hoc deploys

### Manual Deployment

If you need to deploy manually:

```bash
# Using Quick CLI (requires Shopify dev environment)
quick deploy --site-name ucp-enablement-hub --dir .
```

## Content Update Process

1. Create a feature branch: `git checkout -b feature/your-change`
2. Make changes locally
3. Test with `python3 -m http.server 8080`
4. Commit and push: `git push origin feature/your-change`
5. Create Pull Request for review
6. Merge to main → Auto-deploys to Quick
7. Verify at [ucp-enablement-hub.quick.shopify.io](https://ucp-enablement-hub.quick.shopify.io)

## Project Structure

```
ucp-enablement-hub/
├── .github/
│   └── workflows/
│       └── deploy-to-quick.yml    # GitHub Action for auto-deploy
├── assets/
│   ├── diagrams/                  # SVG architecture diagrams
│   ├── graphics/                  # Images and graphics
│   └── icons/                     # UI icons
├── scripts/
│   └── app.js                     # Interactive functionality
├── styles/
│   └── main.css                   # Polaris-aligned styling
├── index.html                     # Main application
├── DEPLOYMENT.md                  # Detailed deployment docs
├── CHANGELOG.md                   # Version history
└── README.md                      # This file
```

## Key Features

- **Dark Mode**: Toggle for accessibility and preference
- **Interactive Quizzes**: Knowledge check functionality
- **Readiness Calculator**: 8-question assessment tool
- **Print Stylesheet**: Optimized for PDF export
- **Responsive Design**: Works on all screen sizes

## Contributing

1. Check existing issues and PRs
2. Follow Shopify's code style guidelines
3. Test all changes locally before PR
4. Include clear commit messages
5. Update CHANGELOG.md for significant changes

## Support

- **Slack**: #enterprise-solutions-eng
- **Product Team**: #agentic-plan-enterprise-gtm
- **Technical Issues**: #help-agentic-storefronts

---

Built by SE Assistant for Shopify Enterprise Solutions Engineering
