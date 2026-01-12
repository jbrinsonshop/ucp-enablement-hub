# Changelog

All notable changes to the UCP Enablement Hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-01-12

### Added
- Technical Integration Requirements section in Agentic Plan module
  - Product data model (Products, Options, Variants with limits)
  - Required fields table for catalog sync
  - Data lifecycle and sync timing documentation
  - Integration partners grid (Plytix, Akeneo, Salsify, ProductsUp, Rithum, Matrixify)
- Checkout Capabilities & Limitations table
  - Supported features (Automatic Discounts, Discount Functions, Order Routing, etc.)
  - Not supported features (Multi-item carts, Discount codes, Checkout UI Extensions, etc.)
  - Fallback handling documentation
- Pre-Launch Checklist
  - Store Configuration requirements
  - Product Data requirements
  - Integration requirements
- Q1 2026 Early Access Caveats Banner
  - Geography constraints (US only)
  - Payment requirements (Shopify Payments required)
  - Customer account settings
  - Pricing information
- GitHub Actions CI/CD workflow for automatic deployment to Quick

### Changed
- Reorganized Agentic Plan module for better technical depth

## [1.2.0] - 2026-01-12

### Added
- Protocol Architecture Deep-Dive section from Shopify Engineering blog
  - Layered Protocol Design explanation
  - Open Bazaar of Capabilities concept
  - Checkout State Machine documentation
  - Embedded Checkout Protocol (ECP) details
  - Two-Sided Payment Negotiation explanation
- Featured Engineering blog link in Resources module

## [1.1.0] - 2026-01-12

### Added
- FAQ module with comprehensive Q&A
  - Enterprise merchant questions
  - Competitive and strategic questions
  - Technical implementation questions
  - Internal Shopify questions
  - Objection handling
- Agentic Plan module for non-Shopify brands
  - What is Agentic Plan explanation
  - How it works (3-step process)
  - Why better than web scraping comparison
  - Talk tracks for non-Shopify merchants
  - Availability timeline
- Live Merchants section with proof points
  - Active merchant count
  - Transaction volume stats
  - AI traffic growth metrics
- Proof Point Banner in Overview module
- Enhanced accessibility features
  - Skip navigation link
  - Improved focus states
  - ARIA attributes

### Changed
- Updated hero statistics to reflect current data
- Enhanced module headers with enterprise-focused messaging

## [1.0.0] - 2026-01-11

### Added
- Initial release for NRF 2026
- Core modules:
  - Protocol Overview
  - UCP Capabilities (Checkout, Identity, Catalog, Order)
  - Mental Models (5 frameworks)
  - Enterprise Playbook
  - Readiness Calculator
  - Resources
- Interactive features:
  - Dark mode toggle
  - Knowledge check quizzes
  - Readiness assessment calculator
  - Expandable capability cards
  - Talk track builder
- Visual assets:
  - UCP Architecture diagram (SVG)
  - Agentic Commerce Flow diagram (SVG)
  - Mental Models Overview diagram (SVG)
- Polaris-aligned design system
- Responsive design for all screen sizes
- Print stylesheet for PDF export

---

## Version Format

- **MAJOR.MINOR.PATCH**
  - MAJOR: Significant new features or restructuring
  - MINOR: New modules, sections, or functionality
  - PATCH: Bug fixes, content updates, styling improvements
