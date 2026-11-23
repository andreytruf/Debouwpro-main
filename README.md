# DE BOUW PRO — Main

Independent production candidate for the Dutch V2 static HTML/CSS/JavaScript website. Source is Playground `3e179343ab99b9fa2aecb28763c269a562e9b032`, validated in Test at `db0929c12886741a980de9dfdbf0ccf7fd27fb55`. See [Test PR #1](https://github.com/andreytruf/Debouwpro-test/pull/1).

## Build and check

Use Node.js 22 or newer. Run `npm ci`, `npm run check`, `npx playwright install chromium`, then `npm test`. GitHub Actions checks builds, internal links and assets, responsive layouts, accessibility, routing and browser privacy behavior.

## Promote Playground → Test → Main

1. Pin the Playground SHA in the Test PR, review the diff and require successful checks. Verify the selected Test build at its separate workers.dev URL, including the robots header, assets, links and the browser privacy audit.
2. Open a Main PR from the verified Test revision. Keep the Main Worker configuration and review any environment-specific changes. Record the Test SHA, GitHub Actions results and remaining launch issues in the PR.
3. Obtain explicit owner approval of the exact Main commit before releasing it. The manual workflow requires the repository owner to dispatch the full approved SHA and checks it against the selected main branch revision. Use the protected GitHub `production` environment with an owner reviewer, a scoped Workers credential and the verified Cloudflare account ID. Provide those credentials only through environment settings.
4. Keep the Main Worker private during preparation. Both workers.dev and version URLs are disabled in Wrangler. The Cloudflare Worker has been provisioned without an active deployment, custom domains or routes. Approval and domain setup are separate launch decisions.

## SEO and privacy at launch

The build includes production canonical URLs and a sitemap covering the generated pages. Pre-launch pages carry `noindex, nofollow`, responses carry the same directive, and robots.txt disallows crawling. After approval of domain attachment and the indexing change, verify redirects, TLS, canonicals and sitemap on the live domain, then remove pre-launch indexing controls from the launched version and submit the live sitemap. Test retains its independent noindex policy.

Run `PRIVACY_AUDIT_BASE=<approved-URL> node scripts/audit-privacy.mjs` after each environment goes live. Verify Cloudflare reporting and service settings separately. Resolve legal entity details, retention, service agreements and AI photo processing before launch. The legal documents remain CONCEPT. The proposed 24/60-month guarantee requires approval before promotional use.

## Rollback

Before promotion, record the current Worker version ID from Cloudflare Deployments, the matching Git SHA, the target Worker and public URL settings. To restore a previous version, use Cloudflare Deployments for that Worker or authenticate with the project's Wrangler and run `npx wrangler rollback <known-good-version-id>` in the corresponding repository. Production rollback requires owner approval. Then check the active version, response status, robots settings, key pages and asset links. Worker rollback restores code and static assets. Domain, route and other account settings need separate reconciliation. If a first deployment has no previous version, keep its public endpoints disabled and deploy a corrected, approved revision.

Public contacts are **hallo@debouwpro.nl**, **info@debouwpro.nl** and **+31 6 12350850**.
