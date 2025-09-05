# Hugo Content Creator Theme - Claude Development Guide

## 🎯 Project Overview
Professional Hugo theme for content creators with modern design, dark mode support, and optimized performance. Currently achieving 94/95/100/100 Lighthouse scores with ongoing optimizations to reach 100/100/100/100 target.

## 🏗️ Architecture
- **Framework**: Hugo Static Site Generator (min version 0.112.0)
- **Languages**: HTML, CSS (custom properties), JavaScript (ES6+)
- **Styling**: Modern CSS with custom properties, modular component architecture
- **JavaScript**: Modular vanilla JS with performance optimizations
- **Internationalization**: Hugo i18n with flexible data-driven menu system

## 📁 Current File Structure
```
/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Base template with comprehensive SEO
│   │   ├── single.html           # Individual content pages
│   │   ├── list.html            # Content listing pages
│   │   ├── search.html          # Client-side search functionality
│   │   └── index.json           # JSON search index
│   ├── partials/
│   │   ├── header.html          # Header with responsive navigation
│   │   └── footer.html          # Footer with theme toggle
│   ├── index.html               # Main homepage (newsletter-focused)
│   ├── index-creator.html       # Creator-focused homepage variant
│   ├── index-community.html     # Community-focused homepage variant
│   └── index-newsletter.html    # Newsletter-focused homepage variant
├── assets/
│   ├── css/
│   │   ├── main.css            # Main stylesheet with CSS variables
│   │   ├── theme.css           # Theme-specific styles
│   │   └── components/
│   │       ├── menu.css        # Navigation component styles
│   │       └── search.css      # Search page styles (conditionally loaded)
│   └── js/
│       ├── main.js             # Theme initialization
│       ├── theme.js            # Theme toggle functionality
│       └── components/
│           └── menu.js         # Mobile menu component
├── i18n/                       # Translation files (it.toml, en.toml)
├── data/
│   └── testimonials.yaml       # Testimonials data
├── static/                     # Static assets (icons, manifest)
├── example/                    # Example site configuration
└── archetypes/                 # Content archetypes for different content types
```

## ⚡ Performance Optimizations (Current: 94/95/100/100)
### Achieved Optimizations:
- **Critical CSS**: Inlined in `<head>` for sub-1.5s FCP
- **System Fonts**: Inter Fallback for 0ms font load time
- **Hardware Acceleration**: `translateZ(0)` on key components
- **Resource Hints**: Preconnect and dns-prefetch optimizations
- **Image Optimization**: Lazy loading with aspect-ratio preservation
- **CSS Containment**: Layout/style/paint containment for performance
- **JavaScript Modules**: Deferred loading with requestIdleCallback

### Target Improvements for 100/100/100/100:
- Further CSS optimization and unused style removal
- Additional image optimization strategies
- Bundle size reduction for remaining JavaScript

## 🎨 Theme System
### CSS Custom Properties Architecture
```css
:root {
  /* Colors - Light Theme */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-brand: #2563eb;
  --color-accent: #7c3aed;
  --color-border: #e2e8f0;
  --color-surface: #ffffff;
  
  /* Spacing System */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  
  /* Layout */
  --container-max: 1200px;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  
  /* Transitions */
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-theme: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-brand: #3b82f6;
  --color-accent: #8b5cf6;
  --color-border: #334155;
  --color-surface: #1e293b;
}
```

### Theme Toggle Implementation
- **Location**: Footer (clean UI design)
- **JavaScript**: Modular ThemeToggle class
- **Persistence**: localStorage with system preference detection
- **FOUC Prevention**: Inline script in `<head>` with try/catch error handling
- **Icons**: CSS-only sun/moon icons with smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, focus management

## 🧭 Navigation System
### Desktop Navigation
- **Layout**: Centered horizontal navigation with flexbox
- **Styling**: Hover effects with underline animations
- **Active States**: Visual indicators for current page
- **Accessibility**: ARIA attributes and keyboard navigation

### Mobile Navigation
- **Component**: Hamburger menu with dropdown
- **Animation**: CSS transforms for hamburger-to-X transition
- **JavaScript**: MobileMenu class with event delegation
- **Accessibility**: ARIA expanded states, focus management, ESC key support
- **Auto-close**: Closes on outside click, window resize, and link navigation

## 🌐 Internationalization System
### Menu Hierarchy (Priority Order):
1. **Data Files**: `/data/{lang}/menu.toml` (primary)
2. **i18n Fallback**: `/i18n/{lang}.toml` with `menu_{identifier}` keys
3. **Config Fallback**: `hugo.toml` menu section

### Example Data Structure:
```toml
# /data/it/menu.toml
[[main]]
name = "Home"
url = "/"
weight = 10

[[main]]
name = "Articoli" 
url = "/articles/"
weight = 20
```

### Translation Files:
- **Complete i18n coverage**: 196+ translation keys in it.toml
- **Bilingual support**: Italian (primary) and English
- **Content type badges**: Localized labels for articles, newsletters, podcasts, videos

### Taxonomy System
The theme supports flexible content organization with multiple taxonomy approaches:

#### Built-in Taxonomies
```toml
[taxonomies]
  category = "categories"    # Broad content classification
  tag = "tags"              # Specific topic tags
  keyword = "keywords"      # SEO keywords + content classification
  author = "authors"        # Content authors
```

#### Front Matter Flexibility
**Traditional Hugo Approach (recommended for blogs):**
```yaml
---
title: "Complete Hugo Guide"
tags: ["hugo", "web-development", "performance"]
categories: ["tutorials", "technical"]
author: "developer"
---
```

**Newsletter/SEO-focused Approach:**
```yaml
---
title: "Newsletter #81: Communication"
keywords: ["comunicazione", "coppia", "relazioni", "dialogo"]
author: "ruvido"
date: 2025-07-25
---
```

**Mixed Approach (maximum flexibility):**
```yaml
---
title: "Advanced SEO Strategy"
tags: ["seo", "marketing"]
categories: ["guides"]
keywords: ["search-optimization", "content-strategy"]
author: "seo-expert"
---
```

#### How Taxonomies Function
- **Categories**: Broad content organization → `/categories/` pages
- **Tags**: Specific topics → `/tags/` pages  
- **Keywords**: SEO metadata + browseable content → `/keywords/` pages + HTML `<meta name="keywords">`
- **Authors**: Content attribution → `/authors/` pages
- **Search Integration**: All taxonomy terms are searchable and filterable
- **SEO Benefits**: Keywords automatically generate proper meta tags

## 🔍 Search System
### Client-Side Search:
- **Implementation**: Pure JavaScript with fuzzy search
- **Data Source**: JSON index generated from content
- **Filters**: Content type filtering (all, articles, newsletters, podcasts, videos)
- **Features**: Real-time search, result highlighting, responsive design
- **Performance**: Debounced input with loading states

## 🎭 Content Types & Features
### Supported Content Types:
1. **Articles**: Blog-style content with reading time
2. **Newsletters**: Numbered newsletter content
3. **Podcasts**: Audio content with duration and episode numbers
4. **Videos**: Video content with embedded players

### Content Features:
- **Featured Content**: Manual selection with `featured: true` frontmatter
- **Content Badges**: Type-specific styling and labeling
- **Media Support**: Audio/video players for podcasts/videos
- **Pagination**: Responsive pagination for list pages
- **Related Content**: Previous/next navigation within sections

## 🏠 Homepage Variants
### Available Layouts:
1. **Newsletter-focused** (`index.html`): Default CTA for newsletter signup
2. **Creator-focused** (`index-creator.html`): Journey timeline and resource showcase
3. **Community-focused** (`index-community.html`): Community building emphasis

### Configuration:
```toml
[params]
  cta_type = "newsletter"  # newsletter | community | creator
```

## 🔧 Development Commands
```bash
# Start development server
cd example && hugo server --port=1313

# Build for production with minification
hugo --minify

# Test performance (requires lighthouse CLI)
lighthouse http://localhost:1313/ --chrome-flags="--headless"

# Check responsive navigation
curl -s http://localhost:1313/ | grep -A 20 "nav-desktop"
```

## 🛠️ Common Development Issues & Solutions

### Performance Issues
**Problem**: Lighthouse scores below target
**Solutions**:
1. Check for unused CSS with coverage tools
2. Optimize images with proper sizing and formats
3. Review JavaScript bundle size and loading strategy
4. Use performance profiling tools in browser DevTools

### Theme Toggle Not Working
**Problem**: Theme persistence or FOUC issues
**Solutions**:
1. Verify inline script in `<head>` is error-free
2. Check localStorage access (may fail in incognito/private mode)
3. Ensure CSS custom properties are properly defined
4. Test theme-color meta tag updates

### Menu Localization Issues
**Problem**: Menu items not showing or incorrect language
**Solutions**:
1. Check data file path: `/data/{lang}/menu.toml`
2. Verify i18n fallback keys: `menu_{identifier}` in `/i18n/{lang}.toml`
3. Ensure config fallback menu exists in `hugo.toml`
4. Check language configuration and defaultContentLanguage

### Mobile Menu Not Responsive
**Problem**: Mobile menu not working on touch devices
**Solutions**:
1. Check JavaScript console for MobileMenu initialization errors
2. Verify CSS media queries for mobile breakpoints
3. Test touch event handling vs click events
4. Ensure proper z-index stacking for dropdown

## 📊 Current Performance Metrics
- **Performance**: 94/100 (Target: 100)
- **Accessibility**: 95/100 (Target: 100)
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 ✅
- **JavaScript Bundle**: Modular, deferred loading
- **Critical CSS**: Inlined for optimal FCP/LCP
- **Images**: Lazy loading with aspect-ratio preservation

## 🎯 Quality Standards & Best Practices
### CSS:
- **CSS Custom Properties**: All styling uses CSS variables
- **Component Architecture**: Modular CSS structure
- **Performance**: CSS containment and hardware acceleration
- **Responsive**: Mobile-first approach with proper breakpoints

### JavaScript:
- **Modular Architecture**: Separate components with clear responsibilities
- **Error Handling**: Try/catch blocks for robustness
- **Performance**: requestIdleCallback and deferred loading
- **Accessibility**: ARIA state management and keyboard support

### HTML:
- **Semantic Markup**: Proper HTML5 semantic elements
- **SEO Optimization**: Comprehensive meta tags and structured data
- **Accessibility**: WCAG compliance with proper ARIA attributes
- **Performance**: Optimized resource loading and critical path

### Content:
- **No Hardcoded Text**: All text uses Hugo i18n system
- **Flexible Configuration**: Theme parameters for customization
- **Content Types**: Proper taxonomy and content organization
- **Media Integration**: Responsive audio/video embedding

## 🚀 Production Readiness
✅ **Theme System**: Complete light/dark mode with persistence  
✅ **Navigation**: Responsive desktop/mobile navigation  
✅ **Performance**: 94/95/100/100 Lighthouse scores (targeting 100/100/100/100)  
✅ **Accessibility**: WCAG compliant with comprehensive ARIA support  
✅ **Internationalization**: Full i18n support with flexible menu system  
✅ **Search**: Client-side search with content type filtering  
✅ **SEO**: Comprehensive meta tags, structured data, and semantic markup  
✅ **Content Types**: Support for articles, newsletters, podcasts, videos  
✅ **Customization**: Flexible homepage variants and theme configuration