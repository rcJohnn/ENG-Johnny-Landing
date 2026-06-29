# Public CV — regeneration

The downloadable CV (`Johnny_Rodriguez_CV.pdf`) is generated from `cv.html`, a
one-page, print-optimized source that lives in this folder. The QR code in the
header (`qr-portfolio.svg`) links to the live portfolio.

> Public version only — no phone number or home address. Uses the public email
> `eng.johnnrc@gmail.com` to stay consistent with the site.

## 1. Regenerate the QR (only if the portfolio URL changes)

```bash
npx --yes qrcode -t svg -o public/qr-portfolio.svg --qzone 1 "https://eng-johnny-landing.vercel.app"
```

Also update the `href` in `cv.html` (`.qr` link) and the `og:url` / portfolio
URL anywhere it is referenced.

## 2. Regenerate the PDF from cv.html

Renders `cv.html` to a single-page A4 PDF using headless Chrome:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="C:/landings/ENGJohnnyRodriguez/public/Johnny_Rodriguez_CV.pdf" \
  "file:///C:/landings/ENGJohnnyRodriguez/public/cv.html"
```

> Keep it to **one page**. If content overflows, tighten the vertical spacing in
> `cv.html` (`.page` padding, `section`/`.entry` margins, body `line-height`).

## Notes

- The "Download CV" button in `src/sections/Hero.tsx` points to
  `/Johnny_Rodriguez_CV.pdf` with a `download` attribute.
- The QR target is the default Vercel URL. If a custom domain is added later, the
  printed QR keeps pointing to the old URL — regenerate (step 1 + 2) and reprint.
