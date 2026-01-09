# Plan: SEO Improvements

## Overview

Improve search engine optimization with proper meta tags, Open Graph tags, structured data, and sitemap/robots.txt files.

## Issues Addressed

| ID | Severity | Issue |
|----|----------|-------|
| SEO1 | High | Missing meta description |
| SEO2 | High | Missing Open Graph tags |
| SEO3 | High | Missing Twitter Card tags |
| SEO4 | Medium | Missing canonical URL |
| SEO5 | Medium | Missing sitemap.xml |
| SEO6 | Medium | Missing robots.txt |
| SEO7 | Medium | Missing structured data (JSON-LD) |

## Changes

### 1. Update index.html with Meta Tags

**File:** `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/assets/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>M. Bates | Full Stack Engineer</title>
    <meta name="title" content="M. Bates | Full Stack Engineer" />
    <meta name="description" content="Full Stack Engineer with 25+ years of experience building scalable web applications. Specializing in React, TypeScript, Node.js, and AWS. Based in Vancouver, BC." />
    <meta name="keywords" content="Full Stack Engineer, Software Developer, React, TypeScript, Node.js, AWS, Vancouver, Web Development" />
    <meta name="author" content="M. Bates" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://bates-solutions.com" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bates-solutions.com" />
    <meta property="og:title" content="M. Bates | Full Stack Engineer" />
    <meta property="og:description" content="Full Stack Engineer with 25+ years of experience building scalable web applications. Specializing in React, TypeScript, Node.js, and AWS." />
    <meta property="og:image" content="https://bates-solutions.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Bates Solutions" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://bates-solutions.com" />
    <meta name="twitter:title" content="M. Bates | Full Stack Engineer" />
    <meta name="twitter:description" content="Full Stack Engineer with 25+ years of experience building scalable web applications. Specializing in React, TypeScript, Node.js, and AWS." />
    <meta name="twitter:image" content="https://bates-solutions.com/og-image.png" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "M. Bates",
      "jobTitle": "Full Stack Engineer",
      "url": "https://bates-solutions.com",
      "sameAs": [
        "https://github.com/mbates",
        "https://www.linkedin.com/in/m-bates-baab51333/"
      ],
      "knowsAbout": [
        "React",
        "TypeScript",
        "Node.js",
        "AWS",
        "Angular",
        "NestJS",
        "PostgreSQL"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Bates Solutions"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "addressCountry": "CA"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 2. Create robots.txt

**File:** `public/robots.txt`

```txt
# robots.txt for bates-solutions.com
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://bates-solutions.com/sitemap.xml
```

### 3. Create sitemap.xml

**File:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bates-solutions.com</loc>
    <lastmod>2025-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 4. Create Open Graph Image

**File:** `public/og-image.png`

Create a 1200x630px image for social sharing. Should include:
- "M. Bates" name
- "Full Stack Engineer" title
- Bates Solutions branding/logo
- Professional appearance

> **Note:** This can be created with Canva, Figma, or similar tools. For now, use a placeholder or existing logo.

### 5. Ensure Public Files Are Copied During Build

Vite automatically copies files from `public/` to the build output. Verify this by running `npm run build` and checking the `dist/` folder.

## Files to Create/Modify

| File | Action |
|------|--------|
| `index.html` | Add meta tags, OG tags, Twitter cards, JSON-LD |
| `public/robots.txt` | Create new file |
| `public/sitemap.xml` | Create new file |
| `public/og-image.png` | Create social sharing image |

## Implementation Steps

1. [ ] Create `public/` directory if it doesn't exist
2. [ ] Create `public/robots.txt`
3. [ ] Create `public/sitemap.xml`
4. [ ] Update `index.html` with all meta tags
5. [ ] Create or source `public/og-image.png` (1200x630px)
6. [ ] Run `npm run build` to verify files are included
7. [ ] Test with social media debuggers after deployment

## Testing

### Local Testing
```bash
npm run build
ls dist/  # Should include robots.txt, sitemap.xml, og-image.png
```

### Meta Tag Validation
After deployment, test with:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### SEO Validation
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- View page source and verify all meta tags are present
- Check structured data with [Schema.org Validator](https://validator.schema.org/)

## Notes

- The `og-image.png` should be a professional image representing the portfolio
- Update `lastmod` in sitemap.xml when significant content changes
- JSON-LD structured data helps Google understand the page content
- Consider adding more pages to sitemap if the site grows
