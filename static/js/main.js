(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero: the hardware lifts as chapters, climbing from the empty bar to 45 lb and looping.
  const hero = document.querySelector(".hero-video");
  const tabs = [...document.querySelectorAll(".chapter")];
  const kg = document.querySelector(".load-kg");
  const lb = document.querySelector(".load-lb");
  let current = 0;
  let frame = 0;

  function show(i, autoplay = true) {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((tab, j) => {
      tab.classList.toggle("is-active", j === current);
      tab.classList.toggle("is-done", j < current);
      tab.setAttribute("aria-selected", String(j === current));
      tab.style.setProperty("--p", j < current ? 1 : 0);
    });
    const tab = tabs[current];
    kg.textContent = tab.dataset.kg;
    lb.textContent = tab.dataset.lb;
    hero.poster = tab.dataset.poster;
    hero.src = tab.dataset.src;
    if (autoplay) hero.play().catch(() => {});
  }

  function tick() {
    if (hero.duration) tabs[current].style.setProperty("--p", hero.currentTime / hero.duration);
    frame = requestAnimationFrame(tick);
  }

  hero.addEventListener("ended", () => show(current + 1));
  hero.addEventListener("play", () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(tick); });
  hero.addEventListener("pause", () => cancelAnimationFrame(frame));
  tabs.forEach((tab, j) => tab.addEventListener("click", () => show(j)));

  if (reduceMotion) {
    show(tabs.length - 1, false);
    hero.controls = true;
  } else {
    show(0);
  }

  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("in-hero", entry.isIntersecting);
    if (reduceMotion) return;
    if (entry.isIntersecting) hero.play().catch(() => {});
    else hero.pause();
  }, { threshold: 0.2 }).observe(document.querySelector(".hero"));

  // Gallery videos load when they come near the viewport and only play while visible.
  const lazy = new IntersectionObserver((entries) => {
    for (const { target: video, isIntersecting } of entries) {
      if (isIntersecting) {
        if (!video.getAttribute("src")) video.src = video.dataset.src;
        if (!reduceMotion) video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, { rootMargin: "200px 0px" });

  document.querySelectorAll("video.lazy").forEach((video) => {
    if (reduceMotion) video.controls = true;
    lazy.observe(video);
    video.addEventListener("click", () => {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });
  });

  // Side navigation follows the section in the middle of the screen.
  const links = new Map([...document.querySelectorAll(".toc a")].map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((a) => a.classList.remove("is-active"));
      links.get(entry.target.id)?.classList.add("is-active");
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });

  document.querySelectorAll(".copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = document.getElementById(button.dataset.target).textContent;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select to copy";
      }
      setTimeout(() => { button.textContent = "Copy"; }, 1600);
    });
  });
})();
