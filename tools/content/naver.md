---
description: Naver data toolkit via ScraperSocial — blog, cafe article, local business and shopping search across Korea's dominant portal.
tagline: Blog, cafe, local and shopping search across Korea's main portal.
example: blog_search.js "서울 카페"
---

## lede

Read public Naver results as clean JSON. This Naver API skill covers the four searches that matter on Korea's dominant portal: blog posts, cafe articles, local businesses and shopping listings. If you are researching the Korean market, Google data will not represent it — Naver is where the audience and the content actually are.

## when-to-use

- You are researching the Korean market and need sources Google does not index well.
- You are tracking a brand's presence in Naver blogs or cafe communities.
- You need Korean local business listings or shopping prices.

## when-not-to-use

- **You expect Google-equivalent coverage in English.** Results are Korean-language and Korean-market; query accordingly.
- **You need Naver's own account or ad data.** Not covered; Naver publishes its own developer APIs for that.

## faq

### What can I search on Naver?

Four endpoints, 2 credits per result each: `blog_search.js`, `cafearticle_search.js`, `local_search.js` and `shop_search.js`.

### Should I query in Korean?

Yes. Naver indexes Korean-language content, and Korean queries return substantially better results.

### What is a cafe article?

Naver Cafe is a large community forum platform. `cafearticle_search.js` searches posts inside those communities — often the most candid source on a brand in Korea.

### Is this an official Naver API?

No. ScraperSocial is independent and not affiliated with Naver. It returns publicly available data only.
