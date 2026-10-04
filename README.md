# dogs.red

The dogs.red apex site — static build of the DOGS web app.

Deploys to the `dogs-red` Cloudflare Pages project via GitHub Action on every
push to `master`. Never direct-upload; the repo is the source of truth.

To refresh from upstream: `python3 scripts/mirror.py` (re-mirrors into `site/`),
then commit and push.
