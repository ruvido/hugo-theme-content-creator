# ContentCreator Hugo Theme

Un tema Hugo moderno, responsive e ad alte prestazioni progettato specificamente per content creator che pubblicano articoli, newsletter, podcast e video.

## ✨ Caratteristiche

- **🚀 Performance-First**: Ottimizzato per Lighthouse 100/100/100/100
- **📱 Responsive Design**: Mobile-first con design pulito e moderno
- **🎨 Typography Excellence**: Inter font con peso 900 per heading professionali
- **🌙 Dark/Light Mode**: Cambio tema automatico e manuale
- **🔍 Search Avanzata**: Ricerca filtrata per tipo di contenuto con breadcrumb
- **📝 Multi-Content Type**: Supporto nativo per articoli, newsletter, podcast, video
- **⭐ Featured System**: Sistema manuale di contenuti in evidenza via YAML frontmatter
- **💬 Social Proof**: Sezione testimonial integrata
- **🎯 CTA Customizzabili**: 3 varianti di landing page (newsletter, community, creator)
- **🇮🇹 Italian-First**: Lingua italiana come priorità con supporto multilingua
- **⚡ Zero Build Dependencies**: CSS e JS vanilla, nessun preprocessing necessario

## 🧪 Testing del Tema

Per testare il tema localmente prima dell'installazione:

### Metodo Rapido (Raccomandato)
```bash
# Clona il tema
git clone https://github.com/user/hugo-theme-content-creator.git
cd hugo-theme-content-creator

# Crea un sito test
cd .. && mkdir test-site && cd test-site
hugo new site . --force

# Copia configurazione di esempio
cp ../hugo-theme-content-creator/exampleSite/hugo.toml ./

# Crea link al tema
mkdir themes
cd themes && ln -s ../../hugo-theme-content-creator content-creator && cd ..

# Copia contenuti di esempio
cp -r ../hugo-theme-content-creator/exampleSite/content/* content/
cp -r ../hugo-theme-content-creator/exampleSite/data/* data/

# Avvia il server
hugo server --buildDrafts
```

Il tema sarà disponibile su **http://localhost:1313**

### Test Landing Page Variants
Cambia `cta_type` in `hugo.toml` per testare le 3 varianti:
- `cta_type = "newsletter"` - Focus su iscrizioni newsletter
- `cta_type = "community"` - Focus su community building  
- `cta_type = "creator"` - Focus su crescita come creator

## 🏗️ Installazione

### Metodo 1: Git Submodule
```bash
git submodule add https://github.com/user/hugo-theme-content-creator.git themes/content-creator
```

### Metodo 2: Download Diretto
1. Scarica il tema dal repository
2. Estrai nella cartella `themes/content-creator`

### Configurazione
Copia il contenuto di `exampleSite/hugo.toml` nel tuo `hugo.toml`:

```toml
theme = "content-creator"

[params]
  # CTA Configuration - Cambia per diverse landing page
  cta_type = "newsletter"  # newsletter | community | creator
  
  # Theme customization
  brand_color = "#2563eb"
  accent_color = "#7c3aed"
  
  # Features
  enable_search = true
  enable_dark_mode = true
  show_reading_time = true
  featured_limit = 6

[outputs]
  home = ["HTML", "JSON"]  # Necessario per la ricerca
```

## 📁 Struttura Contenuti

### Tipi di Contenuto Supportati

**Articoli** (`content/articles/`)
```markdown
---
title: "Il Tuo Articolo"
date: 2024-01-15
featured: true  # Per apparire in homepage
categories: ["Guide"]
tags: ["content-creation"]
---
```

**Newsletter** (`content/newsletters/`)
```markdown
---
title: "Newsletter #1"
date: 2024-01-15
newsletter_number: 1
featured: true
---
```

**Podcast** (`content/podcasts/`)
```markdown
---
title: "Episodio #1"
date: 2024-01-15
duration: "30 min"
audio_url: "https://example.com/audio.mp3"
episode_number: 1
featured: true
---
```

**Video** (`content/videos/`)
```markdown
---
title: "Tutorial Video"
date: 2024-01-15
duration: "15 min"
video_url: "https://youtube.com/embed/VIDEO_ID"
featured: true
---
```

## 🎨 Personalizzazione

### Landing Page Variants

Cambia il tipo di CTA in `hugo.toml`:

```toml
[params]
  cta_type = "newsletter"   # Focus su iscrizioni newsletter
  # cta_type = "community"  # Focus su community building  
  # cta_type = "creator"    # Focus su crescita come creator
```

### Testimonial

Aggiungi testimonial in `data/testimonials.yaml`:

```yaml
- quote: "Un contenuto fantastico!"
  name: "Mario Rossi"
  role: "Content Creator"
```

### Colori e Typography

```toml
[params]
  brand_color = "#2563eb"     # Colore primario
  accent_color = "#7c3aed"    # Colore accento
  font_family = "Inter"       # Font famiglia
  heading_weight = 900        # Peso heading
```

## 🔧 Funzionalità Avanzate

### Search

La ricerca è automaticamente disponibile su `/index.json`. Include:
- Ricerca full-text su titoli e contenuti
- Filtri per tipo di contenuto (articoli, newsletter, podcast, video)
- Risultati con badge colorati per categoria
- Debouncing per performance

### Featured Content System

Marca contenuti come featured nel frontmatter:
```yaml
featured: true
```

I contenuti featured appaiono:
- Nella sezione "Contenuti in Evidenza" della homepage
- Con badge speciale nelle liste
- Priorità nei risultati di ricerca

### Performance Optimization

Il tema include:
- CSS custom properties per theming efficiente
- Lazy loading immagini automatico
- Font preloading
- Minificazione automatica asset
- Transizioni fluide ottimizzate

## 🎯 Lighthouse Performance

Il tema è ottimizzato per raggiungere:
- **Performance**: 100/100
- **Accessibility**: 100/100  
- **Best Practices**: 100/100
- **SEO**: 100/100

### Best Practices Implementate

- Preconnect per Google Fonts
- Inline critical CSS (theme toggle)
- Lazy loading per immagini
- Semantic HTML
- Proper ARIA labels
- Mobile-first responsive design

## 📱 Mobile Experience

- Navigation responsive con collasso automatico
- Search ottimizzata per mobile
- Touch-friendly buttons e link
- Typography scalabile con `clamp()`
- Grid responsivi con `auto-fit`

## 🌙 Dark Mode

- Toggle manuale nel header
- Salvataggio preferenza in localStorage
- Transizioni fluide tra temi
- Zero flash durante caricamento
- CSS custom properties per facile manutenzione

## 🔗 Social Integration

Configura i link social in `hugo.toml`:
```toml
[params.social]
  twitter = "https://twitter.com/username"
  instagram = "https://instagram.com/username"
  youtube = "https://youtube.com/channel/username"
  linkedin = "https://linkedin.com/in/username"
```

## 📊 Analytics & Tracking

Il tema supporta:
- Google Analytics (configura in `hugo.toml`)
- Custom tracking events per CTA
- Performance monitoring pronto

## 🤝 Contribuire

1. Fork del repository
2. Crea feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -am 'Add awesome feature'`)
4. Push al branch (`git push origin feature/awesome-feature`)
5. Crea Pull Request

## 📝 License

MIT License - vedi `LICENSE` file per dettagli.

## 🆘 Supporto

- **Issues**: [GitHub Issues](https://github.com/user/hugo-theme-content-creator/issues)
- **Documentazione**: [Wiki del progetto](https://github.com/user/hugo-theme-content-creator/wiki)
- **Community**: [Discord Server](https://discord.gg/example)

## 🚀 Roadmap

- [ ] Integrazione newsletter providers (Mailchimp, ConvertKit)
- [ ] Sistema commenti integrato
- [ ] PWA support
- [ ] AMP templates
- [ ] Multi-author support
- [ ] Advanced analytics dashboard

---

Creato con ❤️ per la community italiana dei content creator.