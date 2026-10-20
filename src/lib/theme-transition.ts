// Circular reveal inspired by https://theme-toggle.rdsx.dev/.
// Theme changes affect the document element, so they use the native snapshot API.
let activeTransition: ViewTransition | null = null;
let activeReveal: Animation | null = null;

export function stopThemeTransition() {
  activeReveal?.cancel();
  activeReveal = null;
  activeTransition?.skipTransition();
  activeTransition = null;
  delete document.documentElement.dataset.viewTransition;
}

export function transitionTheme(
  button: HTMLElement,
  updateTheme: () => void,
  enabled: boolean,
) {
  stopThemeTransition();
  if (!enabled || !document.startViewTransition) {
    updateTheme();
    return;
  }

  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  document.documentElement.dataset.viewTransition = "theme";
  let updated = false;
  const update = () => {
    if (!updated) {
      updated = true;
      updateTheme();
    }
  };
  try {
    const transition = document.startViewTransition(update);
    activeTransition = transition;
    void transition.ready
      .then(async () => {
        if (
          activeTransition !== transition ||
          document.documentElement.dataset.motion === "off"
        )
          return;
        activeReveal = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 640,
            easing: "cubic-bezier(.22, 1, .36, 1)",
            pseudoElement: "::view-transition-new(root)",
            fill: "both",
          },
        );
        await activeReveal.finished;
      })
      .catch(() => {
        /* A newer navigation, toggle, or disabled motion can skip the snapshot. */
      });
    void transition.finished
      .catch(() => {})
      .finally(() => {
        if (activeTransition === transition) {
          activeTransition = null;
          activeReveal?.cancel();
          activeReveal = null;
          delete document.documentElement.dataset.viewTransition;
        }
      });
  } catch {
    delete document.documentElement.dataset.viewTransition;
    update();
  }
}
