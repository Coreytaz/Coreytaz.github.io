// Canvas fallback for the React Bits glow when WebGL is unavailable.
export function startGlowFallback(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  settings: {
    current: {
      color: string;
      enabled: boolean;
      trailWidth: number;
      linger: number;
    };
  },
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  container.dataset.renderState = "fallback";
  let points: { x: number; y: number; time: number }[] = [];
  let raf = 0;
  const resize = () => {
    canvas.width = Math.max(1, container.clientWidth);
    canvas.height = Math.max(1, container.clientHeight);
    points = [];
  };
  const clear = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    points = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const paint = (now: number) => {
    raf = 0;
    const life = Math.min(1200, settings.current.linger * 500);
    points = points.filter((point) => now - point.time < life);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (document.hidden || !settings.current.enabled) {
      clear();
      return;
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const color = settings.current.color;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1],
        b = points[i];
      const opacity = Math.max(0, 1 - (now - a.time) / life);
      ctx.globalAlpha = opacity * 0.45;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.lineWidth = settings.current.trailWidth * opacity;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    canvas.dataset.painted = points.length > 1 ? "true" : "false";
    if (points.length) raf = requestAnimationFrame(paint);
  };
  const move = (event: PointerEvent) => {
    if (
      event.pointerType !== "mouse" ||
      document.documentElement.dataset.customCursor !== "on"
    )
      return;
    const bounds = container.getBoundingClientRect();
    points.push({
      x: event.clientX - bounds.x,
      y: event.clientY - bounds.y,
      time: performance.now(),
    });
    if (points.length > 100) points.shift();
    if (!raf) raf = requestAnimationFrame(paint);
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", clear);
  return () => {
    clear();
    observer.disconnect();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("blur", clear);
    document.removeEventListener("visibilitychange", clear);
  };
}
