# MuscleMan anonymous project page

Static, single-page site for double-blind review. No external requests, no analytics,
`noindex` set so search engines skip it.

## Deploy on GitHub Pages anonymously

1. Create a **new GitHub account** with an email not tied to any author or institution.
2. Create a public repo in that account, e.g. `muscleman`.
3. From this folder (git identity is already set to `Anonymous <anonymous@example.com>`):

   ```
   git add -A && git commit -m "Project page"
   git branch -M main
   git remote add origin https://github.com/<anon-account>/muscleman.git
   git push -u origin main
   ```

4. In the repo: Settings -> Pages -> Source: `main` branch, `/ (root)`.
5. The site appears at `https://<anon-account>.github.io/muscleman/`. Put that link in the paper.

## Anonymity checklist before pushing

- [ ] Teaser and videos: blur faces of team members, lab signage, logos, and any visible names.
- [ ] Strip video metadata: `ffmpeg -i in.mp4 -map_metadata -1 -c copy out.mp4`.
- [ ] Images: re-save without metadata (assets/pipeline.png is already clean).
- [ ] No author names, institutions, acknowledgments, or personal links anywhere.
- [ ] Commit author is `Anonymous` (`git log --format='%an %ae'`).
- [ ] Do not link the anonymous account from any personal profile.

## Adding videos

Replace a `<div class="placeholder">` in `index.html` with:

```html
<video controls muted playsinline preload="metadata" src="./static/videos/FILE.mp4"></video>
```

GitHub rejects files over 100 MB; keep each clip small (H.264, ~720p).
