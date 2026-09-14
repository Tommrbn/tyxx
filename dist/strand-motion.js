(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduce.matches;
  let time = 0;
  let lastFrame = 0;
  let animationFrame = 0;
  const segments = 22;
  const strandCount = 320;
  const tau = Math.PI * 2;
  // A closed, folded silhouette, drawn independently for TYXX. Each sample
  // grows a separate filament; it is not a mesh stretched across the figure.
  const contour = [
    [
      [0.1, -0.28],
      [0.18, -0.35],
      [0.12, -0.56],
      [0.3, -0.55],
    ],
    [
      [0.3, -0.55],
      [0.51, -0.53],
      [0.44, -0.32],
      [0.28, -0.25],
    ],
    [
      [0.28, -0.25],
      [0.18, -0.2],
      [0.36, -0.17],
      [0.45, -0.08],
    ],
    [
      [0.45, -0.08],
      [0.62, 0.07],
      [0.46, 0.22],
      [0.29, 0.19],
    ],
    [
      [0.29, 0.19],
      [0.14, 0.18],
      [0.1, 0.3],
      [0.01, 0.41],
    ],
    [
      [0.01, 0.41],
      [-0.16, 0.61],
      [-0.36, 0.46],
      [-0.25, 0.3],
    ],
    [
      [-0.25, 0.3],
      [-0.17, 0.18],
      [0, 0.24],
      [0.09, 0.16],
    ],
    [
      [0.09, 0.16],
      [0.16, 0.11],
      [-0.32, 0.01],
      [-0.4, -0.13],
    ],
    [
      [-0.4, -0.13],
      [-0.52, -0.32],
      [-0.16, -0.3],
      [0, -0.28],
    ],
    [
      [0, -0.28],
      [0.07, -0.26],
      [0.1, -0.25],
      [0.1, -0.28],
    ],
  ];
  function random(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }
  function sampleContour() {
    const samples = [];
    let length = 0;
    for (const curve of contour) {
      for (let i = 0; i < 80; i++) {
        const t = i / 80;
        const v = 1 - t;
        const point = [0, 1].map(
          (axis) =>
            v ** 3 * curve[0][axis] +
            3 * v * v * t * curve[1][axis] +
            3 * v * t * t * curve[2][axis] +
            t ** 3 * curve[3][axis],
        );
        const previous = samples.at(-1);
        if (previous)
          length += Math.hypot(point[0] - previous.x, point[1] - previous.y);
        samples.push({ x: point[0], y: point[1], length });
      }
    }
    let cursor = 0;
    return Array.from({ length: strandCount }, (_, i) => {
      const distance = ((i + random(i) * 0.8) / strandCount) * length;
      while (cursor < samples.length - 1 && samples[cursor].length < distance)
        cursor++;
      return samples[cursor];
    });
  }
  const outline = sampleContour();
  const scenes = [...document.querySelectorAll("[data-particle-scene]")]
    .map((host) => {
      const canvas = host.querySelector("canvas");
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return null;
      const scene = {
        host,
        canvas,
        ctx,
        width: 0,
        height: 0,
        visible: true,
        current: 0,
        target: 0,
        pointer: { x: 0, y: 0, active: false },
        fibers: Array.from({ length: strandCount }, (_, i) => ({
          seed: random(i + 12),
          brightness: random(i + 830),
          nodes: Array.from({ length: segments + 1 }, () => ({
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            glow: 0,
          })),
        })),
      };
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        scene.width = width;
        scene.height = height;
        const dpr = Math.min(devicePixelRatio || 1, 1.75);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(scene);
      };
      new ResizeObserver(resize).observe(host);
      host.classList.add("scene-ready");
      host.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = host.getBoundingClientRect();
        scene.pointer.x = event.clientX - bounds.left;
        scene.pointer.y = event.clientY - bounds.top;
        scene.pointer.active = true;
      });
      host.addEventListener("pointerleave", () => {
        scene.pointer.active = false;
      });
      return scene;
    })
    .filter(Boolean);
  function networkShape(stage, t, u, phase) {
    const a = t + Math.PI;
    if (stage === 0) {
      const r = 1.03 + 0.27 * Math.cos(4 * a);
      return [
        Math.cos(a) * r * (1 + u * 0.13),
        Math.sin(a) * r * (1 + u * 0.13),
        u * 0.35 + Math.sin(3 * a + phase) * 0.1,
      ];
    }
    if (stage === 1) {
      const radius = 1.05 + 0.13 * Math.sin(3 * a + phase);
      return [
        Math.cos(a) * radius,
        Math.sin(a) * radius * 0.88,
        u * 0.6 + Math.cos(a + phase) * 0.15,
      ];
    }
    return [
      Math.cos(a) * (1.05 + u * 0.17),
      Math.sin(a) * (0.85 + u * 0.12),
      u * 0.65 + Math.cos(a * 4 + phase) * 0.15,
    ];
  }
  function tipPosition(scene, i) {
    if (scene.host.dataset.particleScene === "ribbon") {
      const { x, y } = outline[i];
      return [x, y, 0.045 * Math.sin((i / strandCount) * tau * 3)];
    }
    const t = -Math.PI + (i / strandCount) * tau;
    const from = Math.floor(scene.current);
    const to = Math.min(2, from + 1);
    const ratio = scene.current - from;
    const a = networkShape(from, t, 0, time * 0.19),
      b = networkShape(to, t, 0, time * 0.19);
    return a.map((value, index) => (value + (b[index] - value) * ratio) * 0.36);
  }
  function draw(scene, delta = 0) {
    const { ctx, width, height } = scene;
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    scene.current +=
      (scene.target - scene.current) * (1 - Math.exp(-delta * 4));
    const scale = Math.min(width * 0.83, height * 0.7);
    const radius = scale * 0.19;
    const step = width < 420 ? 2 : 1;
    ctx.lineCap = "round";
    for (let i = 0; i < strandCount; i += step) {
      const fiber = scene.fibers[i];
      const { seed, brightness, nodes } = fiber;
      const tip = tipPosition(scene, i);
      const reveal = paused
        ? 1
        : Math.min(1, Math.max(0, (time - seed * 0.55) / 1.3));
      let previous;
      for (let j = 0; j <= segments; j++) {
        const u = j / segments;
        const tail = 1 - u;
        const wave = time * (0.48 + seed * 0.3);
        // Correlated waves keep adjacent fibers flowing together; each fiber
        // also bends independently along its length, like a fine optic cable.
        const rippleX = Math.sin(tip[1] * 14 + wave + tail * 3.8);
        const rippleY = Math.cos(tip[0] * 13 - wave * 0.8 + tail * 4.2);
        const curl = tail * tail;
        const x =
          tip[0] * (1 - tail * 0.08) +
          rippleX * (0.013 + curl * 0.052) +
          curl * (seed - 0.5) * 0.07;
        const y = tip[1] + tail * 0.065 + rippleY * (0.008 + curl * 0.034);
        const z = tip[2] + tail * 0.24;
        const perspective = 1.8 / (1.8 - z);
        const baseX = width * 0.48 + x * scale * perspective;
        const baseY = height * 0.47 + y * scale * perspective;
        const node = nodes[j];
        if (delta) {
          const dx = baseX + node.x * scale - scene.pointer.x;
          const dy = baseY + node.y * scale - scene.pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = scene.pointer.active
            ? Math.max(0, 1 - distance / radius)
            : 0;
          const force = influence * influence * 3.8 * (0.3 + u * 0.7);
          // Damped springs give the pointer a local push and let fibers settle
          // back naturally. Bounded timesteps keep a resumed tab stable.
          node.vx =
            (node.vx +
              ((dx / Math.max(distance, 1)) * force - node.x * 48) * delta) *
            Math.exp(-delta * 7);
          node.vy =
            (node.vy +
              ((dy / Math.max(distance, 1)) * force - node.y * 48) * delta) *
            Math.exp(-delta * 7);
          node.x += node.vx * delta;
          node.y += node.vy * delta;
          node.glow += (influence - node.glow) * (1 - Math.exp(-delta * 9));
        }
        const p = { x: baseX + node.x * scale, y: baseY + node.y * scale };
        if (previous && u <= reveal) {
          const pulseAt = (time * (0.13 + seed * 0.09) + seed) % 1;
          const pulse = Math.exp(-(((u - pulseAt) * 19) ** 2));
          const alpha =
            (0.035 +
              u * u * (0.09 + brightness * 0.08) +
              pulse * 0.28 +
              node.glow * 0.56) *
            reveal;
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(205,201,190,${alpha})`;
          ctx.lineWidth = 0.48 + brightness * 0.25;
          ctx.stroke();
        }
        previous = p;
        if (j === segments) {
          const shimmer = 0.7 + Math.sin(time * 0.8 + seed * tau) * 0.15;
          const alpha =
            (0.4 + brightness * 0.7 + node.glow * 0.5) *
            shimmer *
            (0.38 + reveal * 0.62);
          const size =
            Math.max(0.55, Math.min(1.45, scale * 0.0022)) *
            (0.5 + brightness * 0.8);
          // Small warm/blue fringes create the refracted tip seen in the reference.
          ctx.fillStyle = `rgba(111,154,247,${alpha * 0.45})`;
          ctx.fillRect(p.x + size, p.y - size * 0.4, size * 1.5, size);
          ctx.fillStyle = `rgba(225,166,106,${alpha * 0.35})`;
          ctx.fillRect(p.x - size * 2, p.y, size * 1.6, size);
          ctx.fillStyle = `rgba(245,242,231,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * (1 + node.glow * 0.45), 0, tau);
          ctx.fill();
        }
      }
    }
  }
  function tick(now) {
    animationFrame = 0;
    if (paused || document.hidden || !scenes.some((scene) => scene.visible))
      return;
    if (now - lastFrame >= 1000 / 40) {
      const delta = Math.min((now - lastFrame) / 1000, 0.035);
      time += delta;
      lastFrame = now;
      scenes
        .filter((scene) => scene.visible)
        .forEach((scene) => draw(scene, delta));
      const query = document.querySelector(".scan-query");
      if (
        query &&
        activeStage === 1 &&
        scenes.some(
          (scene) =>
            scene.visible && scene.host.dataset.particleScene === "network",
        )
      ) {
        const phrase = "¿Qué consultas necesitan seguimiento?";
        const count = Math.min(phrase.length, Math.floor((time % 10) * 12));
        const next = phrase.slice(0, count);
        if (query.textContent !== next) query.textContent = next;
      }
    }
    animationFrame = requestAnimationFrame(tick);
  }
  function start() {
    if (!paused && !document.hidden && !animationFrame) {
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(tick);
    }
  }
  function sync() {
    document.documentElement.classList.toggle("motion-paused", paused);
    document.querySelectorAll(".motion-toggle").forEach((button) => {
      button.hidden = scenes.length === 0;
      button.setAttribute("aria-pressed", String(paused));
      button.setAttribute(
        "aria-label",
        paused ? "Reanudar animación" : "Pausar animación",
      );
      button.querySelector(".motion-label").textContent = paused
        ? "Reanudar animación"
        : "Pausar animación";
      button.firstElementChild.textContent = paused ? "▷" : "Ⅱ";
    });
    if (paused) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    } else start();
  }
  document.querySelectorAll(".motion-toggle").forEach((button) =>
    button.addEventListener("click", () => {
      paused = !paused;
      sync();
    }),
  );
  reduce.addEventListener("change", () => {
    paused = reduce.matches;
    sync();
  });
  document.addEventListener("visibilitychange", start);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const scene = scenes.find((scene) => scene.host === entry.target);
      scene.visible = entry.isIntersecting;
    });
    start();
  });
  scenes.forEach((scene) => observer.observe(scene.host));
  let activeStage = 0;
  const sceneChoices = document.querySelector(".story-index");
  if (sceneChoices) sceneChoices.hidden = false;
  const steps = [...document.querySelectorAll("[data-story-step]")];
  const mobile = matchMedia("(max-width: 760px)");
  const storyArt = document.querySelector(".story-art");
  const isPinned = () =>
    storyArt && getComputedStyle(storyArt).position === "sticky";
  function selectStage(index) {
    activeStage = index;
    document
      .querySelectorAll("[data-story-visual]")
      .forEach((el) =>
        el.classList.toggle(
          "is-active",
          Number(el.dataset.storyVisual) === index,
        ),
      );
    document.querySelectorAll("[data-scene-choice]").forEach((button) => {
      const active = Number(button.dataset.sceneChoice) === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    scenes
      .filter((scene) => scene.host.dataset.particleScene === "network")
      .forEach((scene) => {
        scene.target = index;
        if (paused) {
          scene.current = index;
          draw(scene);
        }
      });
  }
  document.querySelectorAll("[data-scene-choice]").forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.sceneChoice);
      selectStage(index);
      if (isPinned())
        steps[index]?.scrollIntoView({
          block: "center",
          behavior: reduce.matches ? "instant" : "smooth",
        });
    }),
  );
  let scrollQueued = false;
  function selectFromScroll() {
    scrollQueued = false;
    if (!isPinned() || !steps.length) return;
    const middle = innerHeight * 0.5;
    const closest = steps.reduce(
      (best, step) => {
        const bounds = step.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - middle);
        return distance < best.distance ? { step, distance } : best;
      },
      { step: steps[0], distance: Infinity },
    );
    const index = Number(closest.step.dataset.storyStep);
    if (index !== activeStage) selectStage(index);
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(selectFromScroll);
      }
    },
    { passive: true },
  );
  mobile.addEventListener("change", selectFromScroll);
  selectFromScroll();
  sync();
})();
