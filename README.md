# ContentCreator Hugo Theme

Un tema Hugo moderno, responsive e ad alte prestazioni progettato specificamente per content creator che pubblicano articoli, newsletter, podcast e video.

## 🚀 Installazione Rapida (Hugo Modules - Raccomandato)

**Metodo più semplice e aggiornabile:**

```bash
# Crea un nuovo sito
hugo new site mio-sito
cd mio-sito

# Inizializza come modulo Hugo
hugo mod init github.com/user/mio-sito

# Crea hugo.toml con configurazione moduli
cat > hugo.toml << 'EOF'
baseURL = "http://localhost:1313"
languageCode = "it"
defaultContentLanguage = "it"
title = "Il Mio Sito"

[module]
  [[module.imports]]
    path = "github.com/ruvido/hugo-theme-content-creator"

[params]
  description = "Il tuo sito di contenuti creativi"
  cta_type = "newsletter"
  enable_search = true
  enable_dark_mode = true

[outputs]
  home = ["HTML", "JSON"]

[taxonomies]
  category = "categories"
  tag = "tags"
  keyword = "keywords"
  author = "authors"
EOF

# Scarica il tema e avvia
hugo mod get github.com/ruvido/hugo-theme-content-creator@v0.1.0
hugo server
```

**Per aggiornamenti futuri:**
```bash
hugo mod get -u  # Aggiorna all'ultima versione
hugo mod get github.com/ruvido/hugo-theme-content-creator@v0.2.0  # Versione specifica
```

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

## 🚀 Content Creator Shortcodes

Il tema include una potente collezione di shortcodes per content creator, ispirati a Ghost CMS:

### 📧 Newsletter Signup
```html
{{< newsletter 
   title="Iscriviti alla Newsletter" 
   description="Contenuti esclusivi ogni settimana"
   button="Iscriviti Gratis" >}}
```

### 📚 Book Download (Lead Magnet)
```html
{{< book-download 
   title="📚 Il Mio Libro Gratuito"
   cover="/images/book-cover.jpg"
   description="Scarica la guida completa in PDF"
   file="/downloads/libro.pdf"
   pages="150 pagine"
   email_required="true" >}}
```

### 💬 Callout Boxes
```html
{{< callout type="info" >}}
💡 **Pro Tip**: Contenuto importante qui
{{< /callout >}}

{{< callout type="warning" title="Attenzione!" >}}
Questo è un avviso importante
{{< /callout >}}
```
Tipi disponibili: `info`, `warning`, `success`, `error`, `tip`, `note`

### ⭐ Testimonials
```html
{{< testimonial 
   quote="I suoi contenuti hanno cambiato il mio business!"
   author="Maria Rossi"
   role="Content Creator"
   avatar="/images/maria.jpg"
   rating="5" >}}
```

### 📖 Book Showcase (Vendita)
```html
{{< book-showcase 
   title="Il Mio Bestseller"
   cover="/images/book.jpg"
   price="€19.99"
   description="Una guida completa per content creators"
   amazon="https://amazon.it/..."
   gumroad="https://gumroad.com/..."
   rating="4.8"
   reviews="127" >}}
```

### 🎥 Video Embed
```html
{{< video 
   youtube="dQw4w9WgXcQ"
   title="Tutorial Completo"
   description="Impara in 20 minuti"
   privacy="true" >}}
```

### 🎙️ Podcast Player
```html
{{< podcast 
   title="Episodio #15: Mindset Vincente"
   file="/audio/ep15.mp3"
   duration="32:45"
   episode="15"
   cover="/images/podcast-cover.jpg" >}}
```

### 🔗 Social Sharing
```html
{{< social-share 
   platforms="twitter,facebook,linkedin,whatsapp"
   text="Condividi questo contenuto" >}}
```

### 👤 Author Bio
```html
{{< author-bio 
   name="Il Tuo Nome"
   bio="Content Creator e Digital Strategist"
   avatar="/images/avatar.jpg"
   website="https://tuosito.com"
   twitter="@username"
   instagram="@username" >}}
```

### 📝 Shortcode con Contenuto
Molti shortcodes supportano contenuto interno:

```html
{{< book-download title="La Mia Guida" file="/guide.pdf" >}}
**Cosa imparerai:**
- Strategia di contenuto
- Crescita organica
- Monetizzazione
{{< /book-download >}}
```

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