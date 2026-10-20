import { startTransition, addTransitionType } from "react";

let reveal: Animation | null = null;
let revealFrame = 0;
let generation = 0;

export function finishLanguageTransition() {
  generation++;
  cancelAnimationFrame(revealFrame);
  revealFrame = 0;
  reveal?.cancel();
  reveal = null;
  const root = document.documentElement;
  if (root.dataset.viewTransition === "language")
    delete root.dataset.viewTransition;
}

function finishEntryAnimations() {
  for (const animation of document.getAnimations()) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName.startsWith("entry-")
    ) {
      animation.finish();
    }
  }
}

export function revealLanguageTransition() {
  const root = document.documentElement;
  if (root.dataset.viewTransition !== "language") return;
  const currentGeneration = generation;
  finishEntryAnimations();
  const playFallback = () => {
    if (
      root.dataset.viewTransition !== "language" ||
      currentGeneration !== generation ||
      root.dataset.motion === "off"
    )
      return;
    reveal = (document.querySelector("#content") ?? document.body).animate(
      { transform: ["translateY(2px)", "translateY(0px)"] },
      { duration: 180, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" },
    );
    const current = reveal;
    void current.finished
      .catch(() => {})
      .finally(() => {
        if (reveal === current) finishLanguageTransition();
      });
  };
  const transition = document.activeViewTransition;
  if (transition) {
    // CSS owns the native timeline. Starting WAAPI here restarted the same
    // movement after the browser had already presented its first frame.
    void transition.ready
      .then(() => {
        void transition.finished
          .catch(() => {})
          .finally(() => {
            if (currentGeneration === generation) finishLanguageTransition();
          });
      })
      .catch(playFallback);
  } else {
    revealFrame = requestAnimationFrame(() => {
      revealFrame = 0;
      playFallback();
    });
  }
}

export function transitionLanguage(navigate: () => void, enabled: boolean) {
  finishLanguageTransition();
  if (enabled) {
    finishEntryAnimations();
    const root = document.documentElement;
    root.dataset.viewTransition = "language";
  }
  startTransition(() => {
    if (enabled) addTransitionType("language");
    navigate();
  });
}
