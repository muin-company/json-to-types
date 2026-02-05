# Deployment Guide

## Local Testing

```bash
cd ~/muin/projects/json-to-types
open index.html
```

Or with a local server:

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

## Static Hosting

This is a single HTML file - deploy anywhere:

### GitHub Pages

```bash
# Push to GitHub
git remote add origin <your-repo>
git push -u origin main

# Enable GitHub Pages in repo settings
# Select: main branch / root
```

### Netlify

```bash
# Drag and drop the folder into Netlify
# Or connect GitHub repo
# Build settings: None needed (static HTML)
```

### Vercel

```bash
vercel
# Follow prompts
```

### Cloudflare Pages

1. Connect GitHub repo
2. Build settings: None
3. Output directory: /

### Custom Domain

Point your domain to any of the above hosts. The tool has proper SEO meta tags for indexing.

## SEO Optimization

Already included in index.html:

- Title tag with keywords
- Meta description
- Keywords meta tag
- Semantic HTML structure
- Fast loading (single file, no dependencies)
- Mobile responsive

### Additional SEO Steps

1. **Submit to Google Search Console**
   - Add sitemap.xml
   - Request indexing

2. **Create sitemap.xml** (optional)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

3. **robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Performance

- No external dependencies
- Single file load
- Minimal CSS/JS
- Fast initial render
- No network requests after load

Perfect for SEO and user experience.
