<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `apps/<web-app>/node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Monorepo layout

Each app is independent: its own dependencies and lockfile, no shared workspace. Always run commands from inside the app folder.

| Folder | What it is | Deploys to | Trigger |
| --- | --- | --- | --- |
| `apps/web-apsrtc` | APSRTC portal (Next.js), apsnew.vercel.app | Vercel, Root Directory `apps/web-apsrtc` | push to `main` |
| `apps/web-union` | APPTD Union site (Next.js + Firebase), apptdunion.me | Vercel, Root Directory `apps/web-union` (region `bom1` in `vercel.json`) | push to `main` |
| `apps/mobile-union` | APPTD Union Android app (Flutter) | GitHub Releases (APK) | tag `vX.Y.Z` |
| `firebase/` | Firestore and Storage rules shared by the site and the app | `firebase deploy --only firestore:rules,storage` from this folder | manual |

Each Vercel project skips a build when nothing inside its own `apps/<name>` folder changed (`ignoreCommand` in its `vercel.json`).

## Releasing the Android app
`git tag v1.2.3 && git push origin v1.2.3`. `.github/workflows/app-release.yml` derives the version name (`1.2.3`) and build number from the tag, signs the APK, and publishes it to GitHub Releases. The app's updater (`lib/services/updater_service.dart`) reads `/releases/latest` of this repo, so only create `v*` tags for app releases.

Required GitHub Actions secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_PASSWORD`, `KEY_ALIAS`, `GOOGLE_SERVICES_JSON_BASE64`. The keystore and `google-services.json` are never committed.

## Web env vars
`apps/web-union` reads the Firebase web config from `FIREBASE_*` variables (names in `apps/web-union/.env.example`). Set them in its Vercel project for Production, Preview and Development. `next.config.ts` maps them into browser code at build time, so they are needed at build, not just runtime. Pages also query Firestore during the build.
