---
description: LinkedIn data toolkit via ScraperSocial — profiles and 20 sub-resources, company data, people/company/job search, posts, comments, reactions and ad search.
tagline: Profiles and 20 sub-resources, companies, job and people search, posts and ads.
---

## lede

Read public LinkedIn data as clean JSON. This LinkedIn API skill is the largest surface in the repo: a profile plus twenty sub-resources — experiences, educations, skills, certifications, publications, patents, recommendations, volunteering and more — alongside company data, funding and insights, people search, company search, job search, post reactions and comment threads, and the LinkedIn ad library.

LinkedIn is the hardest mainstream platform to read programmatically and the one most people want most. Each sub-resource is its own endpoint, so you pay for the slice you need instead of pulling a whole profile to read one field.

## when-to-use

- You are enriching a lead or candidate record from a public profile URL or handle.
- You need one slice of a profile — just the work history, just the skills — rather than everything.
- You are researching a company: headcount, funding, insights, open jobs, employees, posts.
- You are sourcing candidates or prospects through people search or job search.
- You are analysing engagement on a post: reactions, comments and replies.

## when-not-to-use

- **Watch the cost.** `get_profile.js --section=contact` costs 25 credits, the most expensive non-video call here. Full profiles and company records cost 10. Fetch the specific section you need instead of the whole profile.
- **You are compiling personal data at scale.** This returns information about real people. GDPR, CCPA and LinkedIn's own terms apply to what you do with it. Have a lawful basis, honour deletion requests, and do not build unsolicited bulk-contact lists where that is restricted.
- **You need to send connection requests or InMail.** Read-only.
- **You need private profile fields** or anything behind a login. Public data only.
- **A LinkedIn link appears in passing** with no question attached.

## faq

### How do I get a LinkedIn profile as JSON?

`get_profile.js` with the profile URL or handle returns the core profile for 10 credits; `--section=full` returns the expanded record. For one slice, use the matching section — `--section=experiences`, `--section=skills`, `--section=educations` and so on.

### How do I get someone's contact details?

`get_profile.js --section=contact`, 25 credits. Passing `--include_email` prices the email separately. Only do this with a lawful basis for processing that person's data.

### Can I search LinkedIn for people, companies or jobs?

Yes: `people_search.js` (with `--section=by-name` or `--section=by-services`), `get_company.js --section=search`, and `job_search.js`. Each costs 5 credits per result returned.

### How do I get company data?

`get_company.js` returns the company for 10 credits. Sections cover `funding`, `insights`, `jobs`, `people` and `posts`.

### Is this an official LinkedIn API?

No. ScraperSocial is independent and not affiliated with LinkedIn or Microsoft. It returns publicly available data only. LinkedIn's own Marketing and Talent APIs are the sanctioned route for partner use cases.
