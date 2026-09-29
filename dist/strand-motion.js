// Progressive navigation is independent of the Canvas engine below.
(() => {
  const toggle = document.querySelector(".strand-menu-toggle");
  const navigation = document.querySelector("#strand-navigation");
  if (!toggle || !navigation) return;
  const mobile = matchMedia("(max-width: 760px)");
  function setOpen(open) {
    navigation.hidden = mobile.matches && !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  function syncLayout() {
    const active = document.activeElement;
    if (mobile.matches) {
      toggle.hidden = false;
      if (navigation.contains(active)) toggle.focus();
      setOpen(false);
    } else {
      setOpen(false);
      if (active === toggle) navigation.querySelector("a")?.focus();
      toggle.hidden = true;
    }
  }
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobile.matches && !navigation.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const destination = document.getElementById(link.hash.slice(1));
      if (destination) {
        destination.setAttribute("tabindex", "-1");
        destination.focus({ preventScroll: true });
      }
      setOpen(false);
      // Keep the anchor's native hash navigation and scrolling.
    });
  });
  document.addEventListener("click", (event) => {
    if (
      mobile.matches && !navigation.hidden &&
      !navigation.contains(event.target) && !toggle.contains(event.target)
    ) {
      if (navigation.contains(document.activeElement)) toggle.focus();
      setOpen(false);
    }
  });
  mobile.addEventListener("change", syncLayout);
  document.documentElement.classList.add("strand-nav-ready");
  syncLayout();
})();

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduce.matches;
  let time = 0;
  let lastFrame = 0;
  let animationFrame = 0;
  const segments = 22;
  const strandCount = 320;
  const tau = Math.PI * 2;
  const alphaLevels = 24;
  const strokeColors = Array.from(
    { length: alphaLevels },
    (_, level) => `rgba(205,201,190,${(level + 0.5) / alphaLevels})`,
  );
  // Segment geometry never changes. Cache it once rather than repeating
  // powers, division and trigonometry for every node of every frame.
  const segmentGeometry = Array.from({ length: segments + 1 }, (_, j) => {
    const u = j / segments;
    const tail = 1 - u;
    return {
      u,
      tail,
      curl: tail * tail,
      sinX: Math.sin(tail * 3.8),
      cosX: Math.cos(tail * 3.8),
      sinY: Math.sin(tail * 4.2),
      cosY: Math.cos(tail * 4.2),
    };
  });
  // Each component has its own closed outline: no filaments bridge the
  // negative space between the head, body and arms. All samples are cached.
  const robotParts = [
    { x: 0, y: -0.29, width: 0.46, height: 0.30, radius: 0.065, count: 128 },
    { x: 0, y: 0.17, width: 0.40, height: 0.38, radius: 0.055, count: 96 },
    { x: -0.30, y: 0.10, width: 0.075, height: 0.28, radius: 0.03, count: 24 },
    { x: 0.30, y: 0.10, width: 0.075, height: 0.28, radius: 0.03, count: 24 },
    { x: 0, y: -0.075, width: 0.09, height: 0.065, radius: 0.015, count: 12 },
    { x: -0.115, y: 0.425, width: 0.12, height: 0.065, radius: 0.02, count: 14 },
    { x: 0.115, y: 0.425, width: 0.12, height: 0.065, radius: 0.02, count: 14 },
    { x: 0, y: -0.49, width: 0.012, height: 0.065, radius: 0.006, count: 8 },
  ];
  function random(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }
  function sampleRobot() {
    return robotParts.flatMap(({ x, y, width, height, radius, count }) => {
      const left = -width / 2;
      const right = width / 2;
      const top = -height / 2;
      const bottom = height / 2;
      const horizontal = width - radius * 2;
      const vertical = height - radius * 2;
      const corner = (Math.PI * radius) / 2;
      const edges = [
        { length: horizontal, x: left + radius, y: top, dx: 1, dy: 0 },
        { length: corner, x: right - radius, y: top + radius, angle: -Math.PI / 2 },
        { length: vertical, x: right, y: top + radius, dx: 0, dy: 1 },
        { length: corner, x: right - radius, y: bottom - radius, angle: 0 },
        { length: horizontal, x: right - radius, y: bottom, dx: -1, dy: 0 },
        { length: corner, x: left + radius, y: bottom - radius, angle: Math.PI / 2 },
        { length: vertical, x: left, y: bottom - radius, dx: 0, dy: -1 },
        { length: corner, x: left + radius, y: top + radius, angle: Math.PI },
      ];
      const perimeter = horizontal * 2 + vertical * 2 + corner * 4;
      return Array.from({ length: count }, (_, i) => {
        let distance = (i / count) * perimeter;
        let edge = edges[0];
        for (const candidate of edges) {
          edge = candidate;
          if (distance <= edge.length) break;
          distance -= edge.length;
        }
        if (edge.angle !== undefined) {
          const angle = edge.angle + distance / radius;
          return {
            x: x + edge.x + Math.cos(angle) * radius,
            y: y + edge.y + Math.sin(angle) * radius,
          };
        }
        return {
          x: x + edge.x + edge.dx * distance,
          y: y + edge.y + edge.dy * distance,
        };
      });
    });
  }
  const outline = sampleRobot();
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
            moving: false,
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
    if (scene.host.dataset.particleScene === "robot") {
      const { x, y } = outline[i];
      return [x, y + Math.sin(time * 0.85) * 0.004, 0];
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
    const robot = scene.host.dataset.particleScene === "robot";
    const damping = Math.exp(-delta * 7);
    const glowBlend = 1 - Math.exp(-delta * 9);
    // Two widths and a small alpha palette preserve fine strands while
    // batching thousands of segments into at most 48 Canvas strokes.
    const paths = new Array(alphaLevels * 2);
    ctx.lineCap = "round";
    for (let i = 0; i < strandCount; i += step) {
      const fiber = scene.fibers[i];
      const { seed, brightness, nodes } = fiber;
      const tip = tipPosition(scene, i);
      const reveal = paused
        ? 1
        : Math.min(1, Math.max(0, (time - seed * 0.55) / 1.3));
      const wave = time * (0.48 + seed * 0.3);
      const sinX = Math.sin(tip[1] * 14 + wave);
      const cosX = Math.cos(tip[1] * 14 + wave);
      const sinY = Math.sin(tip[0] * 13 - wave * 0.8);
      const cosY = Math.cos(tip[0] * 13 - wave * 0.8);
      const pulseAt = (time * (0.13 + seed * 0.09) + seed) % 1;
      const widthBand = brightness < 0.5 ? 0 : 1;
      let previousX = 0;
      let previousY = 0;
      for (let j = 0; j <= segments; j++) {
        const geometry = segmentGeometry[j];
        const { u, tail, curl } = geometry;
        // Correlated waves keep adjacent fibers flowing together; each fiber
        // also bends independently along its length, like a fine optic cable.
        const rippleX = sinX * geometry.cosX + cosX * geometry.sinX;
        const rippleY = cosY * geometry.cosY - sinY * geometry.sinY;
        const x =
          tip[0] * (1 - tail * (robot ? 0.03 : 0.08)) +
          rippleX * (robot ? 0.003 + curl * 0.012 : 0.013 + curl * 0.052) +
          curl * (seed - 0.5) * (robot ? 0.015 : 0.07);
        const y =
          tip[1] + tail * (robot ? 0.045 : 0.065) +
          rippleY * (robot ? 0.003 + curl * 0.009 : 0.008 + curl * 0.034);
        const z = tip[2] + tail * (robot ? 0.025 : 0.24);
        const perspective = 1.8 / (1.8 - z);
        const baseX = width * 0.48 + x * scale * perspective;
        const baseY = height * 0.47 + y * scale * perspective;
        const node = nodes[j];
        if (delta && (scene.pointer.active || node.moving)) {
          let influence = 0;
          let forceX = 0;
          let forceY = 0;
          if (scene.pointer.active) {
            const dx = baseX + node.x * scale - scene.pointer.x;
            const dy = baseY + node.y * scale - scene.pointer.y;
            const distance = Math.hypot(dx, dy);
            influence = Math.max(0, 1 - distance / radius);
            const force = influence * influence * 3.8 * (0.3 + u * 0.7);
            forceX = (dx / Math.max(distance, 1)) * force;
            forceY = (dy / Math.max(distance, 1)) * force;
          }
          // Damped springs give the pointer a local push and let fibers settle
          // back naturally. Bounded timesteps keep a resumed tab stable.
          node.vx = (node.vx + (forceX - node.x * 48) * delta) * damping;
          node.vy = (node.vy + (forceY - node.y * 48) * delta) * damping;
          node.x += node.vx * delta;
          node.y += node.vy * delta;
          node.glow += (influence - node.glow) * glowBlend;
          node.moving =
            Math.abs(node.x) + Math.abs(node.y) + Math.abs(node.vx) +
              Math.abs(node.vy) + node.glow > 0.00001;
        }
        const px = baseX + node.x * scale;
        const py = baseY + node.y * scale;
        if (j > 0 && u <= reveal) {
          const pulse = Math.max(0, 1 - Math.abs(u - pulseAt) * 12);
          const alpha =
            (0.035 +
              u * u * (0.09 + brightness * 0.08) +
              pulse * pulse * 0.28 +
              node.glow * 0.56) *
            reveal;
          const level = Math.min(alphaLevels - 1, Math.floor(alpha * alphaLevels));
          const bucket = widthBand * alphaLevels + level;
          const path = (paths[bucket] ??= new Path2D());
          path.moveTo(previousX, previousY);
          path.lineTo(px, py);
        }
        previousX = px;
        previousY = py;
        if (j === segments) {
          fiber.tipX = px;
          fiber.tipY = py;
          fiber.reveal = reveal;
        }
      }
    }
    paths.forEach((path, bucket) => {
      ctx.strokeStyle = strokeColors[bucket % alphaLevels];
      ctx.lineWidth = bucket < alphaLevels ? 0.54 : 0.69;
      ctx.stroke(path);
    });
    for (let i = 0; i < strandCount; i += step) {
      const fiber = scene.fibers[i];
      const { seed, brightness, tipX, tipY, reveal } = fiber;
      const glow = fiber.nodes[segments].glow;
      const shimmer = 0.7 + Math.sin(time * 0.8 + seed * tau) * 0.15;
      const alpha =
        (0.4 + brightness * 0.7 + glow * 0.5) *
        shimmer * (0.38 + reveal * 0.62);
      const size =
        Math.max(0.55, Math.min(1.45, scale * 0.0022)) *
        (0.5 + brightness * 0.8);
      // Keep the warm/blue fringes without allocating per-tip RGBA strings.
      ctx.fillStyle = "rgb(111,154,247)";
      ctx.globalAlpha = Math.min(1, alpha * 0.45);
      ctx.fillRect(tipX + size, tipY - size * 0.4, size * 1.5, size);
      ctx.fillStyle = "rgb(225,166,106)";
      ctx.globalAlpha = Math.min(1, alpha * 0.35);
      ctx.fillRect(tipX - size * 2, tipY, size * 1.6, size);
      ctx.fillStyle = "rgb(245,242,231)";
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.beginPath();
      ctx.arc(tipX, tipY, size * (1 + glow * 0.45), 0, tau);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (robot) drawRobotFace(scene, scale);
  }
  function drawRobotFace(scene, scale) {
    const { ctx, width, height } = scene;
    const centerX = width * 0.48;
    const centerY = height * 0.47 + Math.sin(time * 0.85) * scale * 0.004;
    for (const side of [-1, 1]) {
      const x = centerX + side * scale * 0.1;
      const y = centerY - scale * 0.29;
      // Small solid cores make the eyes legible even with motion disabled.
      // The surrounding fine strands still provide the local pointer response.
      ctx.fillStyle = "rgba(111,154,247,0.16)";
      ctx.beginPath();
      ctx.ellipse(x, y, scale * 0.043, scale * 0.026, 0, 0, tau);
      ctx.fill();
      ctx.fillStyle = "rgba(224,237,250,0.86)";
      ctx.beginPath();
      ctx.roundRect(
        x - scale * 0.026,
        y - scale * 0.014,
        scale * 0.052,
        scale * 0.028,
        scale * 0.01,
      );
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(225,166,106,0.55)";
    ctx.lineWidth = Math.max(1, scale * 0.003);
    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.052, centerY - scale * 0.205);
    ctx.lineTo(centerX + scale * 0.052, centerY - scale * 0.205);
    ctx.stroke();
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
