# Robot animation verification — complete, with recorded initial timeout

2026-09-23. T2 verification is complete: the final full suite passed 76/76,
the unchanged benchmark shows substantially less Canvas stroke work, and actual
desktop/mobile screenshots show a recognizable robot. The initial Strand run's
pointer timeout remains recorded below; its cause is not established. No
production, test or configuration bytes were changed during T2. Parent-owned
T3 independent checking and review remain separate and pending.

## Observed commands

All commands used the existing local project and installed Chrome/Playwright.

| Stage | Command | Observed result |
| --- | --- | --- |
| T1 | `npm test -- tests/motion-performance.spec.js` | Initial budget RED: 7,040 strokes against a maximum of 64. Grouping GREEN, then separate desktop/mobile robot-region RED and GREEN. Final 4/4 passed in 17.3 s. |
| T1 | `npm run check` | PASS, exit 0. |
| T1 | `git diff --check` | PASS, exit 0. |
| T2 | `npm test -- tests/strand.spec.js` | FAIL, exit 1: 43 passed, 1 failed, 2.1 min. |
| T2 continuation | `npm test -- tests/strand.spec.js -g "el puntero ilumina"` | PASS, exit 0: 1/1, 13.7 s total; pointer test 9.8 s. One authorized diagnostic run. |
| T2 continuation | `npm test` | PASS, exit 0: 76/76, 2.4 min; includes all 44 Strand tests and pointer test (8.5 s). One full run. |
| T2 continuation | `git diff --check` | PASS, exit 0; existing CRLF-to-LF advisories only, no whitespace errors. |
| T2 continuation | `node .sites-runtime/motion-benchmark-20260923.mjs` | PASS, exit 0; one unchanged run, distinct before/after JSON retained, original baseline restored and hash verified. |
| T2 continuation | `node .sites-runtime/robot-visual-check-20260923.mjs` | PASS, exit 0; two local viewport screenshots captured and visually inspected. No page or console errors. |

The failing test is `tests/strand.spec.js:84`, “Strand: el puntero ilumina las
fibras cercanas sin iluminar toda la figura”. Reported error:

```text
Test timeout of 30000ms exceeded.
```

The existing assertion thresholds and timeout were not changed. A bounded
read-only trace inspection found both render/clock sequences completed and
three illumination expectation `after` events without an error field. This
does **not** override the failed overall test result or prove its root cause.
Historical pointer timeouts and earlier passing runs remain separate evidence.
The first attempt stopped immediately. The parent then authorized exactly one
focused diagnostic, one full suite, one benchmark and two screenshots. Both
subsequent test runs passed with the normal trace settings and unchanged
assertions/timeouts. No correction was made. Those observations establish final
coverage, not a proven explanation or permanent resolution of the initial
timing failure.

The original failure log and trace were copied and verified before Playwright
could overwrite `test-results`: `.sites-runtime/robot-t2-initial-failure/`
contains `robot-strand-tests.log` and `trace.zip`. Later logs are
`.sites-runtime/robot-pointer-diagnostic.log`, `.sites-runtime/robot-full-tests.log`
and `.sites-runtime/robot-t2-diff-check.log`.

## Rendering work and measurement limits

T1's deterministic Canvas-boundary test observed a complete static hero draw
fall from **7,040 to 22 stroke calls** (99.69% fewer); the secondary figure used
21 calls. The renderer retains 320 fibers and 22 segments, batches compatible
paths/styles, caches invariant geometry and skips settled pointer physics.
The new tests also passed robot-region checks at 1440/390 px and
pause/reduced-motion/offscreen stop/resume checks.

The exact saved harness used one headless Chrome instance, sequential desktop
(1440×1000, DPR 1) and mobile (390×844, DPR 2) contexts and two-second phases.
The renderer caps mobile DPR at 1.75. No CPU/network throttling was applied.
The parent paused its separate preview before this run. The original baseline
and harness were hash-verified before execution and the baseline was restored
after preserving the generated result under a distinct name.

| Hero-active sample | Desktop before → after | Mobile before → after |
| --- | ---: | ---: |
| Draws (`clearRect`) | 17 → 61 | 38 → 61 |
| Stroke calls | 101,851 → 1,371 | 133,486 → 1,342 |
| Mean stroke calls per sampled draw | 5,991.2 → 22.5 | 3,512.8 → 22.0 |
| Instrumented RAF callback p50 | 45.2 → 3.0 ms | 11.5 → 1.7 ms |
| Instrumented RAF callback p95 | 85.2 → 5.7 ms | 22.6 → 2.8 ms |
| RAF callbacks | 18 → 122 | 69 → 122 |
| Observed long tasks | 4 → 0 | 0 → 0 |
| Paused, offscreen, reduced-motion draws/RAF | 0 / 0 before and after | 0 / 0 before and after |

Both benchmark contexts reported no page errors or blocked external requests.
The exact saved harness is `.sites-runtime/motion-benchmark-20260923.mjs`; results
are `.sites-runtime/motion-before-robot-20260923.json` and
`.sites-runtime/motion-after-robot-20260923.json`.

**Limits:** wrappers perform per-call instrumentation and add material overhead.
Path2D internal operations are not counted by the Canvas-prototype `lineTo`
wrapper, so the drop in that counter is not evidence of fewer geometric segments.
The `stroke` calls are directly counted. Callback timing includes throttled
callbacks that do not draw; sampled reveal progress and host scheduling differ.
These single-run measurements are **not FPS**, a controlled native CPU/GPU
profile, device-fleet evidence or Web Vitals. The operation-budget test is the
deterministic regression proof; the timed samples are supporting evidence.

## Visual and behavioral evidence

Two actual screenshots were captured after normal motion and explicit pause,
then opened with `view_image`:

- `.sites-runtime/robot-desktop-20260923.png`: 1440×1000 CSS px, DPR 1.
- `.sites-runtime/robot-mobile-20260923.png`: 390×844 CSS px, DPR 2 (780×1688 PNG).

Both show a recognizable frontal robot with rounded head, two luminous eyes,
torso, short arms, feet and antenna. Fine filaments retain the restrained dark
palette; the mobile figure is small but its parts remain distinguishable.
This is visual inspection, not a claim of tested physical-device readability.
The capture harness reported zero page/console errors and no external requests;
its state and bounds are in `.sites-runtime/robot-visual-check-20260923.json`.

The final suite preserves pointer-local illumination, stable pause, reduced
motion, offscreen stop/resume, decorative `aria-hidden`, keyboard/mobile
navigation, contact mailto/fallback and assistant data isolation. Benchmark
pause/offscreen/reduced-motion phases all recorded zero drawing/RAF callbacks.
No email links or remote demonstrations were activated by the added diagnostics.

## Scope, preservation and remaining work

- T1 changed only `dist/strand-motion.js`, the hero's scene marker in
  `dist/strand.html`, and new `tests/motion-performance.spec.js`. T2 adds this
  report plus ignored diagnostic files only.
- Eleven source/test/config hashes matched before and after both T2 attempts. Records:
  `.sites-runtime/robot-t2-source-hashes.json` and
  `.sites-runtime/robot-t2-verification-state.json`; final comparison and artifact
  fingerprints: `.sites-runtime/robot-t2-final-state.json`.
- Renderer SHA-256: `50840afb4f9489f5ff65e813890513d76db3d5fbca3d452e83f183579e79fccb`.
- Original benchmark JSON SHA-256:
  `c63ff7d2af7dcc8ac75f3d991b5cb33a89be5a22bfb7d8548e7029a5d197eade`.
- Exact harness SHA-256:
  `1437fd32f4e7abdaae648bca26083e1ac0b56fab1344732e5c4aa2c5256d7b0c`.
- Distinct after JSON SHA-256:
  `df7f3569c59216f8967ec87b940128d2583be88004a2b22333c2e0dac22581b4`.
- Rollback snapshot: `.sites-runtime/robot-before/manifest.json` and complete
  pre-edit files. Restore only this feature's delta, never reset the worktree
  and lose pre-existing renewal/email work.
- The unknown-owned listener on loopback port 4180 was reused, not restarted
  or stopped. No dependencies, Git delivery, external services, Chapas changes
  or native review operations occurred.
- Logo and favicon still total 1,762,330 bytes. Binary assets were not changed;
  initial resource weight remains a separate limitation. The motion script grew
  from 16,551 to 20,500 bytes; sampled decoded resource bodies after scrolling
  grew from 2,659,977 to 2,663,926 bytes. Runtime efficiency did not reduce download
  weight, and these totals include the lazily loaded demonstration image.
- Manual screen-reader and real-device testing, cross-browser profiling, Web
  Vitals and parent-owned T3 final review were not performed by this worker.

## Security assessment boundary

The earlier limited local audit reported no demonstrated high/medium finding,
with textContent/value rendering, bounds checks, loopback containment and
encoded email links observed. Low-priority preview Host allowlisting/security
headers remain recommendations. This task performed no new security audit;
public hosting headers/TLS and dependency advisories remain unassessed. There
is no security certification or authorization for unrelated remediation.

## Next step

Parent: read back this evidence and screenshots, update the root task file/full
Engram mirror, run its independent spot check and handle the native review
boundary. Preserve the initial timeout as a limitation rather than erasing it
from the record. No commit, push or deployment is authorized by these results.
