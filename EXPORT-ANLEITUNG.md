# Statischer Export für All-Inkl Hosting

Diese Anleitung erklärt, wie Sie die Website als statische HTML-Dateien exportieren und auf All-Inkl hochladen.

## Schnellstart

```bash
# 1. Umgebungsvariablen setzen
export STATIC_EXPORT=true
export NEXT_PUBLIC_WEBHOOK_URL=https://ai.light-dm.de/webhook/73be0480-8d81-44d9-abe3-52cacf0f95e4

# 2. Build erstellen
npm run build

# 3. out/ Ordner per FTP zu All-Inkl hochladen
```

---

## Ausführliche Anleitung

### Schritt 1: Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei:

```env
STATIC_EXPORT=true
NEXT_PUBLIC_WEBHOOK_URL=https://ai.light-dm.de/webhook/73be0480-8d81-44d9-abe3-52cacf0f95e4
```

**Wichtig für Kontaktformular:**
- Der n8n Workflow muss **aktiviert** sein (Toggle oben rechts in n8n)
- In n8n müssen **CORS-Header** hinzugefügt werden (siehe unten)

### Schritt 2: n8n CORS konfigurieren

Fügen Sie in n8n nach dem Webhook-Node einen **Respond to Webhook** Node hinzu:

1. Webhook Node → Response Mode: "Using Respond to Webhook Node"
2. Respond to Webhook Node:
   - Response Headers hinzufügen:
     - `Access-Control-Allow-Origin`: `*` (oder Ihre Domain)
     - `Access-Control-Allow-Methods`: `POST, OPTIONS`
     - `Access-Control-Allow-Headers`: `Content-Type, Accept`

### Schritt 3: Build erstellen

```bash
npm run build
```

Die statischen Dateien werden im Ordner `out/` generiert.

### Schritt 4: Hochladen zu All-Inkl

1. Verbinden Sie sich per FTP (FileZilla, Cyberduck, etc.)
   - Server: Ihre All-Inkl FTP-Adresse
   - Benutzer: Ihr FTP-Benutzername
   - Passwort: Ihr FTP-Passwort
   
2. Navigieren Sie zum Webverzeichnis: `www/` oder `public_html/`

3. Laden Sie alle Dateien aus dem `out/` Ordner hoch

4. Laden Sie zusätzlich diese Dateien hoch:
   - `.htaccess` (aus `public/.htaccess`)
   - `robots.txt` (aus `public/robots.txt`)
   - `sitemap.xml` (aus `public/sitemap.xml`)

---

## .htaccess Konfiguration

Die `.htaccess` Datei in `public/.htaccess` enthält:

- **GZIP Kompression** - Reduziert Dateigröße um 60-80%
- **Browser Caching** - Schnellere Ladezeiten für wiederkehrende Besucher
- **Security Headers** - XSS-Schutz, Clickjacking-Schutz
- **MIME-Typen** - WebP/AVIF Unterstützung

### HTTPS erzwingen (optional)

Entkommentieren Sie in `.htaccess`:

```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### www zu non-www (oder umgekehrt)

Entkommentieren Sie in `.htaccess`:

```apache
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

---

## SEO Konfiguration

### Google Search Console

1. Gehen Sie zu [Google Search Console](https://search.google.com/search-console)
2. Fügen Sie Ihre Domain hinzu
3. Verifizieren Sie per HTML-Tag oder DNS
4. Ersetzen Sie in `app/layout.tsx`:
   ```tsx
   verification: {
     google: "YOUR_GOOGLE_VERIFICATION_CODE",
   },
   ```
5. Reichen Sie die Sitemap ein: `https://ihre-domain.de/sitemap.xml`

### Domain anpassen

Ersetzen Sie `light-dm.de` mit Ihrer Domain in:
- `app/layout.tsx` (metadataBase)
- `public/sitemap.xml`
- `public/robots.txt`
- `components/structured-data.tsx`

---

## Performance-Checkliste

### Quick Wins (sofort umsetzen)

1. ✅ GZIP aktiviert (.htaccess)
2. ✅ Browser Caching aktiviert (.htaccess)
3. ✅ Next.js optimiert bereits CSS/JS automatisch
4. ✅ Lazy Loading für Bilder (Next.js Image)

### Weitere Optimierungen

- [ ] Bilder in WebP konvertieren (z.B. mit squoosh.app)
- [ ] Google Fonts lokal hosten (optional)
- [ ] CDN verwenden (Cloudflare, optional)

---

## Verzeichnisstruktur nach Export

```
out/
├── index.html
├── .htaccess          ← Kopieren von public/.htaccess
├── robots.txt         ← Automatisch kopiert
├── sitemap.xml        ← Automatisch kopiert
├── projekte/
│   ├── index.html
│   ├── score4impact/
│   │   └── index.html
│   ├── mowomind/
│   │   └── index.html
│   └── modernworkaward/
│       └── index.html
├── blog/
│   ├── index.html
│   └── [artikel-slug]/
│       └── index.html
├── kontakt/
│   └── index.html
├── leistungen/
│   └── index.html
├── support/
│   └── index.html
├── about/
│   └── index.html
├── 404.html
├── images/
│   └── [Bilder]
└── _next/
    └── static/
        └── [Assets]
```

---

## Troubleshooting

### Kontaktformular funktioniert nicht

1. Prüfen Sie, ob der n8n Workflow aktiviert ist
2. Prüfen Sie die Browser-Konsole auf CORS-Fehler
3. Stellen Sie sicher, dass CORS-Header in n8n konfiguriert sind

### 404 Fehler bei Unterseiten

Stellen Sie sicher, dass die `.htaccess` korrekt hochgeladen wurde.

### Bilder werden nicht geladen

Prüfen Sie die Pfade - alle Bilder sollten relativ verlinkt sein.

---

## Support

Bei Fragen kontaktieren Sie uns: info@light-dm.de
