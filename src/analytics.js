(function () {
  const config = window.WONDER_SITE?.analytics || {};
  const gaMeasurementId = config.gaMeasurementId || "";
  const debug = config.debug !== false;
  const sessionKey = "wonderSessionId";
  const countKey = "wonderAnalyticsCounts";

  function getSessionId() {
    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem(sessionKey);
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        sessionStorage.setItem(sessionKey, sessionId);
      }
    } catch {
      sessionId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
    return sessionId;
  }

  function loadCounts() {
    try {
      return JSON.parse(localStorage.getItem(countKey)) || {};
    } catch {
      return {};
    }
  }

  function saveLocalCount(name) {
    const counts = loadCounts();
    counts[name] = (counts[name] || 0) + 1;
    try {
      localStorage.setItem(countKey, JSON.stringify(counts));
    } catch {
      // Analytics must never break gameplay.
    }
  }

  function loadGoogleAnalytics() {
    if (!gaMeasurementId || document.querySelector("[data-wonder-ga]")) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.wonderGa = "true";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.append(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaMeasurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }

  function track(name, params = {}) {
    const payload = {
      page_path: location.pathname,
      page_title: document.title,
      session_id: getSessionId(),
      ...params,
    };

    saveLocalCount(name);

    if (window.gtag) {
      window.gtag("event", name, payload);
    }

    if (debug) {
      console.info("[WonderAnalytics]", name, payload);
    }
  }

  loadGoogleAnalytics();

  window.WonderAnalytics = {
    track,
    counts: loadCounts,
    hasGoogleAnalytics: () => Boolean(gaMeasurementId),
  };

  track("page_view");
})();
