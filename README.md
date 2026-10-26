# Subham Nayak — Portfolio Website (updated version)

A lightweight static portfolio built with plain HTML, CSS and JavaScript. No backend, no build step, no paid services. It works with VS Code Live Server or by double-clicking `index.html`.

## What changed in this update

- **Home:** the About Me section now sits directly under your name and introduction and fades in as you scroll. **View Resume** now opens the Experience page at the resume viewer.
- **Experience page:** your resume PDF is shown in an embedded viewer, with a large **Download Resume** button directly below it. If a browser cannot show PDFs inline (common on phones), a fallback with "Open in a new tab" and "Download" links appears.
- **New Certifications page** (`certifications.html`, also added to the navigation on every page). Each card shows, in this order: certificate name, certificate image, skills learned, Download Certificate button. There is no verification button or credential ID. The certifications moved here from the Experience page; nothing was removed.
- **Design:** new typography (Bricolage Grotesque, Manrope, JetBrains Mono, loaded from Google Fonts with system-font fallbacks), refined teal accent on a dark navy background, calmer gradients, section dividers and consistent cards.
- **Interactions:** animated nav underline with a clear current-page marker, hero entrance animation, fade-up on scroll (`IntersectionObserver`), smooth hover effects, a mobile menu that slides open and closed, and smooth scrolling. All motion is switched off for visitors who prefer reduced motion, and the content stays visible if JavaScript is unavailable.

All your personal details, projects, experience, skills, education and achievements are unchanged.

## Folder structure

```
index.html            Home (hero, About Me, intro video, skills)
about.html            About, education, full skills
projects.html         Project cards
experience.html       Experience timeline, achievements, resume viewer + download
certifications.html   Certificate cards
blog.html             Blog listing with search and category filters
blog-*.html           One file per article (plus blog-article-template.html)
contact.html          Contact details + mailto form
css/styles.css        All styling (colours and fonts are variables at the top)
js/main.js            Menu, animations, image/video fallbacks, certificate downloads
assets/
  profile.jpg         Profile photo
  resume.pdf          Your resume (replaceable)
  intro.mp4           Optional intro video (not included)
  projects/           Project screenshots (not included)
  certifications/     Certificate images (not included)
  blog/               Images used inside blog articles (optional)
```

## Blog

The **Blog** link is in the navigation on every page. `blog.html` lists the articles as cards with category filters (Python, SQL, Data Analytics, Machine Learning, Data Engineering, Microsoft Fabric) and a keyword search that looks at the title, description and categories. If JavaScript is unavailable, all articles are simply listed.

Each article is its own HTML file in the main folder:

| File | Category | Status |
|---|---|---|
| `blog-feature-scaling.html` | Machine Learning, Python | Complete |
| `blog-linear-regression.html` | Machine Learning, Python | Complete |
| `blog-sql-data-analysis.html` | SQL, Data Analytics | Complete |
| `blog-eda-pandas.html` | Python, Data Analytics | Complete |
| `blog-evaluating-ml-models.html` | Machine Learning, Python | Complete |
| `blog-powerbi-dashboard.html` | Data Analytics | **Draft** (add your own dashboard and screenshots) |
| `blog-medallion-architecture-fabric.html` | Data Engineering, Microsoft Fabric | **Draft** (add your own pipeline experience) |
| `blog-article-template.html` | n/a | Reusable template, not listed on the Blog page |

The Python and SQL examples in the complete articles were run and work. The articles are general educational write-ups and do not describe results from your own projects, so read them and edit them into your own voice before you publish. Draft articles show a "Draft" badge. Publication dates are left out because none were provided (see below to add one).

### Add a new article

1. **Copy the template.** Duplicate `blog-article-template.html` and rename the copy, for example `blog-my-topic.html` (lowercase, words separated by hyphens, no spaces).
2. **Edit the copy.** Change the `<title>` and the `description` meta tag in the `<head>`. In the page body change the category tags, the `<h1>` title, the intro paragraph, and the article text. Replace the "Draft template" box (or delete it), and remove the `noindex` meta line when the article is ready.
3. **Set the categories** in the `<ul class="cat-tags">` list near the top. Use these exact names so the filters work: `Python`, `SQL`, `Data Analytics`, `Machine Learning`, `Data Engineering`, `Microsoft Fabric`.
4. **Connect related projects.** At the bottom of the article, edit the "Related in this portfolio" list. Each `<li><a href="projects.html">...</a></li>` is a link; point it at `projects.html`, `experience.html`, `certifications.html` or `about.html#skills`, and change the text.
5. **Add its card to `blog.html`.** Copy any `<article class="card blog-card reveal" ...>` block inside the grid, paste it at the top or bottom, and change: `data-categories` (separate several with `|`, for example `"Python|SQL"`), the category tags, the title, the short description, the reading time, and the `href` (and the `aria-label`) of the Read Article link so they point at your new file.

The search box and filters pick up the new card automatically.

### Useful snippets

- **Code:** `<div class="code-block"><span class="code-lang">Python</span><pre tabindex="0"><code class="language-python">your code</code></pre></div>`. Use `language-python`, `language-sql` or `language-dax` for coloured keywords, strings, numbers and comments. Write `<` as `&lt;` and `&` as `&amp;` inside code.
- **Table:** wrap a `<table>` in `<div class="table-wrap">`, as in the template.
- **Image:** save it in `assets/blog/`, then `<figure class="figure"><img src="assets/blog/your-image.png" alt="What the image shows"><figcaption>Caption</figcaption></figure>`.
- **Note box:** `<div class="callout"><p>Text</p></div>` (use `class="callout draft"` for a draft warning).
- **Publication date:** in an article's meta line and in its card on `blog.html`, there is a commented-out `<time datetime="2026-01-31">31 Jan 2026</time>`. Remove the comment markers and set your date when you publish.
- **Draft badge:** `<span class="badge-draft">Draft</span>`. Delete it when the article is finished.

### Reading time

The "min read" text is written by hand in the article and its card. A rough rule is the word count divided by 200.

## Resume: update only the PDF

Both the viewer and the download button use `assets/resume.pdf`. To update your resume, replace that file with your new PDF, keeping the exact name `resume.pdf`, and commit the change. Publishing can take a few minutes, and your browser may show the old copy until you hard-refresh (Ctrl+Shift+R, or Cmd+Shift+R on Mac). The resume is public for anyone who visits the site; only you and collaborators with write access to the repository can replace it. There is no public upload form.

## Certificates

Save each certificate image in `assets/certifications/` with these names:

- `python-dsa-nptel-certification.png`
- `fabric-dp700-certification.png`

If your image is a `.jpg`, either save it as `.png`, or change the extension in both the `src` and the `href`/`download` of that card in `certifications.html`. Until an image exists, the card shows a placeholder and its download button is disabled, so a broken file is never downloaded.

**Add a certificate:** in `certifications.html`, copy one whole `<article class="card cert-card reveal"> ... </article>` block, paste it below the last one, then change the title, the image path, the alt text, the skills, and the download link (use the same file name everywhere). The skills shown come from your resume; edit them if you want to add more.

## Other media

- **Profile photo:** replace `assets/profile.jpg` (keep the name).
- **Intro video:** put your video at `assets/intro.mp4`. For YouTube/Vimeo, replace the `<video>...</video>` block in `index.html` with `<iframe src="PASTE_EMBED_URL_HERE" title="Introduction video" allowfullscreen></iframe>`.
- **Project screenshots:** save `ml-models.png` and `nlp.png` in `assets/projects/`, or change the names in `projects.html`.
- **Project GitHub links:** the two buttons in `projects.html` still use `href="#"` because the repository URLs are not in your resume. Replace `#` with the real URLs.

## Where content lives

| Content | File |
|---|---|
| Headline, intro, About Me preview | `index.html` |
| About text, education, skills | `about.html` |
| Projects | `projects.html` |
| Experience, achievements, resume | `experience.html` |
| Certifications | `certifications.html` |
| Contact details | `contact.html` (hide one by deleting its `<li>` line) |

The contact form is front-end only: it opens the visitor's email app with the message filled in and does not store or send anything itself.

## Hosting

Hosting has not been chosen and nothing has been deployed. All paths are relative, so the folder can be placed on any static host later.

## Still to provide

- Certificate images for both certifications
- GitHub repository links for the two projects
- Project screenshots
- Intro video (optional)

## Testing note

I ran the Python and SQL code examples, and tested the site in a headless Chromium browser: every page loads with no JavaScript errors; the Blog link is in every menu and marked active on blog pages; category filters, search, combined filtering, the empty state and "clear" work; every Read Article link opens the matching article; there is no sideways scrolling at desktop and phone widths; the phone menu opens; and the pages stay readable with JavaScript off or reduced motion on. The PDF viewer relies on the browser's own PDF support, which headless browsers lack, so please check the Experience page yourself, along with how everything looks on your own phone.
