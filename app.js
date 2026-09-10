document.querySelectorAll("[data-group-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => btn.closest("[data-group]").classList.toggle("is-open"));
});

const CRUMBS = {
  users: ["Administrator", "Users"],
  promotions: ["Administrator", "Promotions"],
  notifications: ["Administrator", "Notifications"],
  labels: ["Administrator", "Labels"],
  transactions: ["Payments", "Transactions"],
};

const crumbs = document.getElementById("crumbs");

function setCrumbs(parts, actionHtml = "") {
  crumbs.innerHTML =
    parts
      .map((part, i) =>
        i === parts.length - 1 ? `<span class="current">${part}</span>` : `<a href="#">${part}</a>`
      )
      .join('<span class="sep">/</span>') + actionHtml;
}

const CRUMB_ACTIONS = {
  promotions: `<button class="crumb-add" id="createPromotion" title="Create promotion" aria-label="Create promotion">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5v13M5.5 12h13"/></svg>
  </button>`,
  notifications: `<button class="crumb-add" id="createNotification" title="Create notification" aria-label="Create notification">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5v13M5.5 12h13"/></svg>
  </button>`,
};

crumbs.addEventListener("click", (e) => {
  if (e.target.closest("#createPromotion")) window.openPromotion?.();
  if (e.target.closest("#createNotification")) window.openNotification?.();
});

function showView(name, options = {}) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.dataset.view !== name;
  });

  const navName = options.navView || name;
  document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === navName);
  });

  document.querySelectorAll(".nav-parent").forEach((parent) => {
    const group = parent.closest("[data-group]");
    const childActive = group?.querySelector(`.nav-item[data-view="${navName}"]`);
    parent.classList.toggle("is-active", Boolean(childActive));
    if (childActive) group.classList.add("is-open");
  });

  setCrumbs(options.crumbs || CRUMBS[name], CRUMB_ACTIONS[navName] || "");
  window.scrollTo({ top: 0 });
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const view = item.dataset.view;
    if (!view) return;
    showView(view);
    history.replaceState(null, "", `#${view}`);
  });
});

window.addEventListener("hashchange", () => {
  const name = location.hash.slice(1);
  if (CRUMBS[name]) showView(name);
});

showView(CRUMBS[location.hash.slice(1)] ? location.hash.slice(1) : "users");

const media = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(choice) {
  const resolved = choice === "system" ? (media.matches ? "dark" : "light") : choice;
  document.documentElement.dataset.theme = resolved;
}

document.querySelectorAll(".theme-opt").forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".theme-opt").forEach((o) => {
      o.classList.remove("is-active");
      o.removeAttribute("aria-selected");
    });
    opt.classList.add("is-active");
    opt.setAttribute("aria-selected", "true");
    applyTheme(opt.dataset.theme);
  });
});

media.addEventListener("change", () => {
  const active = document.querySelector(".theme-opt.is-active");
  if (active?.dataset.theme === "system") applyTheme("system");
});
