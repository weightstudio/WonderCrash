(function () {
  const edgeSize = 28;
  const minSwipe = 8;
  let gesture = null;

  function isEditable(target) {
    return Boolean(target?.closest?.("input, textarea, select, [contenteditable='true']"));
  }

  function start(event) {
    if (event.touches.length !== 1 || isEditable(event.target)) {
      gesture = null;
      return;
    }

    const touch = event.touches[0];
    const width = window.innerWidth || document.documentElement.clientWidth || 0;
    const fromEdge = touch.clientX <= edgeSize || touch.clientX >= width - edgeSize;

    gesture = fromEdge
      ? { x: touch.clientX, y: touch.clientY, blocking: false }
      : null;
  }

  function move(event) {
    if (!gesture || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const dx = touch.clientX - gesture.x;
    const dy = touch.clientY - gesture.y;
    const horizontal = Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe;

    if (horizontal) gesture.blocking = true;
    if (gesture.blocking) event.preventDefault();
  }

  function end() {
    gesture = null;
  }

  document.documentElement.style.overscrollBehaviorX = "none";
  document.body?.style.setProperty("overscroll-behavior-x", "none");
  window.addEventListener("touchstart", start, { passive: true, capture: true });
  window.addEventListener("touchmove", move, { passive: false, capture: true });
  window.addEventListener("touchend", end, { passive: true, capture: true });
  window.addEventListener("touchcancel", end, { passive: true, capture: true });
})();
