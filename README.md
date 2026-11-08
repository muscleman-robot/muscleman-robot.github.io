# MuscleMan: Humanoid Whole-Body Control for Heavy-Object Prehensile Interaction

Project page for MuscleMan, served by GitHub Pages at https://muscleman-robot.github.io/.
It is plain HTML, CSS and JavaScript with no build step: `index.html`, `static/css/style.css` and `static/js/main.js`.

## Preview locally

```
python3 serve.py
```

then open http://127.0.0.1:8000/. Unlike `python3 -m http.server`, it answers HTTP range requests, which browsers use to
seek in videos and which GitHub Pages supports.

## Media

- `static/videos/hero/`: one clip per hardware lift (45, 35, 25, 20 and 15 lb), trimmed from the grasp to the overhead hold.
  The hero plays them in the order of the `.chapter` buttons in `index.html`; each button names its clip, poster and load.
- `static/videos/hw/`: the hardware takes shown in the Hardware section, including the failure cases.
- `static/videos/sim/`: Blender renders of simulated rollouts.
- `static/img/posters/`: each video's first frame, shown until it starts playing.
- `static/img/teaser.png`, `static/img/pipeline.png`: paper figures; `static/img/og.jpg`: the link-preview image.

Videos are H.264 with no audio and the index at the front (`-movflags +faststart`) so they start before fully downloading.
To add a video, copy a `<figure class="media card">` block in `index.html`, point `data-src` and `poster` at the new
files, and edit the caption. Gallery videos load when scrolled near and play only while visible.

## Paper link

The Paper button is disabled until the camera-ready PDF is available. Put the PDF in `static/` and replace the
`<span class="btn is-disabled">` next to the comment in `index.html` with a link to it.
