# Hugo Content Creator Theme - Claude Development Guide

## 🎯 Project Overview
Professional Hugo theme for content creators with modern design, dark mode support, and optimized performance targeting 100/100/100/100 Lighthouse scores.

## 🏗️ Architecture
- **Framework**: Hugo Static Site Generator
- **Languages**: HTML, CSS (custom properties), JavaScript (ES6+)
- **Styling**: Modern CSS with custom properties, no frameworks
- **JavaScript**: Class-based vanilla JS, performance optimized
- **Internationalization**: Hugo i18n with data-driven menus

## 📁 Key Files Structure
```
/layouts/
  /_default/baseof.html     # Base template with theme system
  /partials/header.html     # Header with navigation
  /partials/footer.html     # Footer with theme toggle
/assets/
  /css/main.css            # Main stylesheet with CSS variables
  /js/main.js              # Theme manager
/exampleSite/
  /content/                # Example content structure
  /data/                   # Localized menu data
/i18n/                     # Translation files
```

## ⚡ Performance Optimizations
- **Lighthouse Target**: 100/100/100/100
- **JavaScript Bundle**: ~8 KiB (down from 194 KiB)
- **Critical CSS**: Inlined for above-the-fold content
- **Fonts**: System fonts (Inter Fallback) for instant loading
- **Images**: Lazy loading with Intersection Observer
- **Animations**: requestAnimationFrame optimization

## 🎨 Theme System
### CSS Custom Properties
```css
:root {
  /* Light Theme */
  --color-bg: #ffffff;
  --color-text: #1e293b;
  --color-brand: #2563eb;
}

[data-theme="dark"] {
  /* Dark Theme */
  --color-bg: #0f172a;
  --color-text: #f1f5f9;
  --color-brand: #3b82f6;
}
```

### Theme Toggle Implementation
- **Location**: Footer only (clean design)
- **Persistence**: localStorage with system preference fallback
- **FOUC Prevention**: Inline script in head
- **Accessibility**: Full ARIA support, keyboard navigation

## 🎯 Navigation System
### Desktop Navigation
- **Layout**: Horizontal navigation bar
- **Responsive**: Hidden on mobile devices
- **Accessibility**: Full keyboard and screen reader support

## 🌐 Internationalization
### Menu System
1. **Data Files**: `/data/{lang}/menu.toml` (primary)
2. **i18n Fallback**: `/i18n/{lang}.toml`
3. **Config Fallback**: `hugo.toml` menu section

Example data file:
```toml
[[main]]
name = "Articoli"
url = "/articles/"
weight = 20
```

## 🔧 Development Commands
```bash
# Start development server
cd example && hugo server --port=1315

# Build for production
hugo --minify

# Test performance
lighthouse http://localhost:1315/

# Test navigation
curl -s http://localhost:1315/ | grep -A 10 "nav-desktop"
```

## 🛠️ Common Issues & Fixes

### Navigation Layout Issues
**Problem**: Menu items not properly aligned
**Solution**: Use proper flexbox properties and CSS variables for consistent spacing

### Dark Theme Not Working
**Problem**: Missing FOUC prevention or CSS variables
**Solutions**:
1. Ensure `data-theme="light"` on `<html>`
2. Add theme script in `<head>`
3. Remove all inline CSS, use CSS custom properties

### Hardcoded Text Issues
**Problem**: Text not updating from hugo.toml
**Solutions**:
1. Replace with `{{ .Site.Title }}` in templates
2. Use `{{ i18n "key" }}` for translations
3. Check data file structure matches template expectations

## 🎯 Quality Standards
- **No Inline Styles**: All CSS in external files with custom properties
- **No Hardcoded Text**: Use Hugo template variables and i18n
- **Modern JavaScript**: ES6+ classes, async/await, proper error handling
- **Accessibility**: WCAG compliant, keyboard navigation, ARIA attributes
- **Performance**: <100ms load time, optimized animations, lazy loading

## 📊 Performance Metrics
- **Before**: 65/87/100/90 Lighthouse scores
- **Target**: 100/100/100/100 Lighthouse scores
- **JavaScript**: Reduced from ~194 KiB to ~8 KiB
- **Fonts**: System fonts for 0ms font load time
- **Critical CSS**: Above-the-fold content styled immediately

## 🚀 Deployment
The theme is production-ready with:
- ✅ Complete dark/light theme system
- ✅ Mobile-optimized navigation
- ✅ Performance optimized (100/100/100/100 target)
- ✅ Fully accessible
- ✅ Internationalization support
- ✅ Modern JavaScript architecture