(function () {
  const version = window.WONDER_SITE?.version || "";
  if (!version || document.querySelector("[data-weightplay-version]")) return;

  const style = document.createElement("style");
  style.textContent = `
    .weightplay-version-badge {
      position: fixed;
      z-index: 80;
      left: max(10px, env(safe-area-inset-left));
      bottom: max(10px, env(safe-area-inset-bottom));
      min-width: 52px;
      padding: 4px 8px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      background: rgba(8, 12, 18, 0.62);
      color: rgba(255, 255, 255, 0.72);
      font: 800 11px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      letter-spacing: 0;
      text-align: center;
      pointer-events: none;
      backdrop-filter: blur(8px);
    }
    @media (max-width: 420px) {
      .weightplay-version-badge {
        font-size: 10px;
        opacity: 0.72;
      }
    }
    body:not(.lobby-page) .weightplay-version-badge {
      top: max(8px, env(safe-area-inset-top));
      bottom: auto;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      min-width: 0;
      padding: 3px 7px;
      opacity: 0.58;
      font-size: 10px;
    }
  `;
  document.head.append(style);

  const badge = document.createElement("div");
  badge.className = "weightplay-version-badge";
  badge.dataset.weightplayVersion = "true";
  badge.textContent = version;
  document.body.append(badge);
})();
