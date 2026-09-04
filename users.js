const TOTAL_USERS = 500097;

const USERS = [
  {
    name: "Playkot LTD", email: "finance@playkot.com", role: "Garna Partner (CY)", kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2025-01-21",
    profile: { country: "Cyprus", ica: "2025-01-24", position: "Garna Partner (CY)", org: { channel: "Playkot", partner: "Garna" } },
  },
  {
    name: "INTELEO", email: "alex@careerswift.ai", role: "Garna Partner (CY)", kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-03-23",
    profile: { country: "Cyprus", ica: "2026-03-25", position: "Garna Partner (CY)", org: { channel: "CareerSwift", partner: "Garna" } },
  },
  {
    name: "Yeison Cuero romero", email: "yiinson0526@gmail.com", role: null, kyc: "checking",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-08-19",
    profile: { gender: "Male", birth: "1994-11-02", country: "Colombia", socials: ["google"], appAction: "2026-08-25" },
  },
  {
    name: "Lizaveta Aleksiyevich", email: "liz.aleksievich@gmail.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-03-02", warning: true,
    profile: { gender: "Female", birth: "1998-03-19", country: "Belarus", ica: "2026-03-05", position: "Motion Design Services", socials: ["google"], phone: "+375291447021" },
  },
  {
    name: "Natalya Syomina", email: "natsyo@mediacube.io", role: "Community manager 2.0", kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2021-04-13", avatar: "av-brown",
    profile: { gender: "Female", birth: "1990-09-12", country: "Poland", ica: "2021-04-15", position: "Community manager 2.0", org: { channel: "Mediacube", partner: "Garna" }, socials: ["google"], phone: "+48512340988" },
  },
  {
    name: "Vladislav Bylinskiy", email: "bylinskiy1995@mail.ru", role: null, kyc: "checking",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-08-25",
    profile: { gender: "Male", birth: "1995-06-08", country: "Kazakhstan", appAction: "2026-08-25" },
  },
  {
    name: "INXYTECH LTD", email: "finance@inxytech.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-08-25",
    profile: { country: "Cyprus", ica: "2026-08-25", position: "Garna Partner (CY)", org: { channel: "Inxytech", partner: "Garna" } },
  },
  {
    name: "Kseniya Shevchuk", email: "k.shevchuk@swag42.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "mobile", registered: "2026-02-09",
    profile: { gender: "Female", birth: "1996-05-07", country: "Belarus", ica: "2026-02-09", position: "UX/UI Design Services", org: { channel: "SWAG42", partner: "Garna" }, socials: ["google"], phone: "+375291826407", appAction: "2026-08-25" },
  },
  {
    name: "Katsiaryna Zoryna", email: "katzo@mediacube.io", role: null, kyc: "checking",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-08-03",
    profile: { gender: "Female", birth: "1993-01-27", country: "Poland", position: "Support Services", org: { channel: "Mediacube", partner: "Garna" }, socials: ["google"] },
  },
  {
    name: "Konstantin Markovsky", email: "konstantin.markovskiy@gmail.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "mobile", registered: "2026-07-29",
    profile: { gender: "Male", birth: "1988-10-05", country: "Georgia", ica: "2026-07-30", position: "Frontend Development Services", socials: ["google"], phone: "+995555102030", appAction: "2026-08-25" },
  },
  {
    name: "Albina Timerbaeva", email: "sarmatbulatov.ru@gmail.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-07-03",
    profile: { gender: "Female", birth: "1997-12-14", country: "Kazakhstan", ica: "2026-07-06", position: "Support Services", socials: ["google"] },
  },
  {
    name: "Darya Kavalchuk", email: "daryakavalchuk@okaytube.co", role: "Channels View", kyc: "checking",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-05-28",
    profile: { gender: "Female", birth: "1999-04-23", country: "Belarus", position: "Channels View", org: { channel: "OkayTube", partner: "Garna" } },
  },
  {
    name: "Lizok lizok", email: "lizokkkkk@gmail.com", role: null, kyc: "checking",
    lastAction: "2026-08-25", device: "mobile", registered: "2026-08-24",
    profile: { gender: "Female", birth: "2001-07-30", country: "Georgia", appAction: "2026-08-24" },
  },
  {
    name: "Manoj Kumar", email: "kamal237696@gmail.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "mobile", registered: "2026-02-05", warning: true,
    profile: { gender: "Male", birth: "1992-02-18", country: "India", ica: "2026-02-10", position: "Video Editing Services", socials: ["google"], phone: "+919845012233", appAction: "2026-08-25" },
  },
  {
    name: "Carlos Lozano", email: "ray.dermalio@gmail.com", role: null, kyc: "approved",
    lastAction: "2026-08-25", device: "mobile", registered: "2025-06-11", warning: true,
    profile: { gender: "Male", birth: "1991-08-09", country: "Spain", ica: "2025-06-15", position: "Design Services", socials: ["google"], appAction: "2026-08-25" },
  },
  {
    name: "Archive Explorer", email: "sosiska228dub@gmail.com", role: null, kyc: "checking",
    lastAction: "2026-08-25", device: "desktop", registered: "2026-02-04",
    profile: { gender: "Male", birth: "1996-09-03", country: "Ukraine", socials: ["google"] },
  },
];

const PROFILE_DEFAULTS = {
  gender: null,
  birth: null,
  country: null,
  ica: null,
  position: null,
  org: null,
  socials: [],
  password: "Created",
  phone: null,
  appAction: null,
  accounts: { garna: "$0.00/€0.00", internal: "$0.00", funds: "$0.00", expresses: "$0.00" },
  fintech: {
    expresses: "Unavailable",
    earlyPayout: "Unavailable",
    p2p: "1%",
    advances: "9.9%",
    autoPayout: "Unavailable",
    additional: "Enabled",
  },
};

const PROFILE_TABS = ["Summary", "Verification", "Channels", "Advance", "Communication", "Transactions", "Revenue"];

const DEVICE_ICONS = {
  desktop: '<rect x="3.5" y="4.5" width="17" height="11.5" rx="2"/><path d="M9.5 19.5h5M12 16v3.5"/>',
  mobile: '<rect x="7.5" y="3" width="9" height="18" rx="2.5"/><path d="M11 18.2h2"/>',
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const svg = (path, size = 14, width = 1.7) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

const usersTable = document.getElementById("usersTable");
const usersEmpty = document.getElementById("usersEmpty");
const userSearch = document.getElementById("userSearch");
const kycFilter = document.getElementById("kycFilter");
const userFilterToggle = document.getElementById("userFilterToggle");
const userFilterPanel = document.getElementById("userFilterPanel");
const userFilterPresets = document.getElementById("userFilterPresets");

const uniqueValues = (list) => [...new Set(list.filter(Boolean))].sort();

const FILTER_FIELDS = [
  { key: "role", label: "Role", options: () => uniqueValues(USERS.map((u) => u.role)) },
  { key: "kyc", label: "KYC status", options: () => ["approved", "checking"] },
  { key: "country", label: "Country", options: () => uniqueValues(USERS.map((u) => u.profile?.country)) },
  { key: "device", label: "Device", options: () => ["desktop", "mobile"] },
];

function fieldValue(user, key) {
  if (key === "role") return user.role;
  if (key === "kyc") return user.kyc;
  if (key === "country") return user.profile?.country;
  if (key === "device") return user.device;
  return undefined;
}

const state = { query: "", onlyChecking: false, sortBy: "lastAction", dir: "desc", filters: [], presets: [] };
let filterDraft = { fieldKey: "", condition: "is", value: "" };
let editingPresetId = null;

function matchesFilters(user) {
  return state.filters.every((f) => {
    const val = fieldValue(user, f.fieldKey);
    if (f.condition === "empty") return !val;
    if (f.condition === "isnot") return val !== f.value;
    return val === f.value;
  });
}

function visibleUsers() {
  const q = state.query.trim().toLowerCase();

  const rows = USERS.filter((u) => {
    if (state.onlyChecking && u.kyc !== "checking") return false;
    if (!matchesFilters(u)) return false;
    if (!q) return true;
    return `${u.name} ${u.email} ${u.role || ""}`.toLowerCase().includes(q);
  });

  const factor = state.dir === "asc" ? 1 : -1;
  return rows.sort((a, b) => {
    const diff = a[state.sortBy].localeCompare(b[state.sortBy]) * factor;
    return diff || USERS.indexOf(a) - USERS.indexOf(b);
  });
}

function renderRow(user) {
  const initial = user.name.charAt(0).toUpperCase();
  const email = user.email;
  const warning = user.warning
    ? `<span class="warn" title="Documents need attention">${svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.4M12 15.8h.01"/>', 15)}</span>`
    : "";

  return `
    <tr data-email="${email}" tabindex="0">
      <td>
        <div class="user-cell">
          <span class="avatar avatar-user ${user.avatar || "av-violet"}">${initial}</span>
          <span class="user-cell-meta">
            <strong>${user.name}</strong>
            <em>${user.email}</em>
          </span>
          ${warning}
        </div>
      </td>
      <td class="user-email">${user.email}</td>
      <td>${user.role ? `<span class="tag-role">${user.role}</span>` : ""}</td>
      <td>${user.kyc === "approved" ? '<span class="kyc-badge">Approved</span>' : ""}</td>
      <td class="col-num">
        <span class="last-action">
          ${formatDate(user.lastAction)}
          ${svg(DEVICE_ICONS[user.device], 14, 1.6)}
        </span>
      </td>
      <td class="col-num task-date">${formatDate(user.registered)}</td>
    </tr>`;
}

function sortHeader(label, key) {
  const active = state.sortBy === key;
  const classes = ["sort-th", active ? "is-active" : "", active && state.dir === "desc" ? "is-desc" : ""]
    .filter(Boolean)
    .join(" ");

  return `<th class="col-num">
    <button class="${classes}" data-sort="${key}">
      <span class="sort-arrow">${svg('<path d="M12 19V5M6.5 11.5 12 5.5l5.5 6"/>', 13, 1.8)}</span>
      ${label}
    </button>
  </th>`;
}

function render() {
  const rows = visibleUsers();
  const filtering = state.onlyChecking || state.query.trim() !== "";
  const count = filtering ? rows.length : TOTAL_USERS;

  usersTable.innerHTML = `
    <table class="tasks data-table users-table">
      <thead>
        <tr>
          <th><span class="th-inner">User <span class="count-chip">${count}</span></span></th>
          <th>email</th>
          <th>Role</th>
          <th>KYC status</th>
          ${sortHeader("Last action", "lastAction")}
          ${sortHeader("Registration date", "registered")}
        </tr>
      </thead>
      <tbody>${rows.map(renderRow).join("")}</tbody>
    </table>`;

  usersEmpty.hidden = rows.length > 0;
}

usersTable.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-sort]");
  if (btn) {
    const key = btn.dataset.sort;
    if (state.sortBy === key) {
      state.dir = state.dir === "desc" ? "asc" : "desc";
    } else {
      state.sortBy = key;
      state.dir = "desc";
    }
    render();
    return;
  }

  const row = e.target.closest("tbody tr");
  if (row) openProfile(row.dataset.email);
});

usersTable.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const row = e.target.closest("tbody tr");
  if (row) openProfile(row.dataset.email);
});

userSearch.addEventListener("input", () => {
  state.query = userSearch.value;
  render();
});

kycFilter.addEventListener("click", () => {
  state.onlyChecking = !state.onlyChecking;
  kycFilter.setAttribute("aria-pressed", String(state.onlyChecking));
  render();
});

/* ---------- Filter panel & presets ---------- */

const fieldLabel = (key) => FILTER_FIELDS.find((f) => f.key === key)?.label || key;
const conditionLabel = (c) => (c === "empty" ? "Empty" : c === "isnot" ? "is not" : "is");

function updateFilterToggleState() {
  userFilterToggle.classList.toggle("is-active", state.filters.length > 0);
}

function renderFilterPanel() {
  const field = FILTER_FIELDS.find((f) => f.key === filterDraft.fieldKey);
  const needsValue = filterDraft.condition !== "empty";

  userFilterPanel.innerHTML = `
    <div class="filter-row">
      <label class="form-field">
        <span>Value</span>
        <select class="field-control" id="filterField">
          <option value="">Choose</option>
          ${FILTER_FIELDS.map(
            (f) => `<option value="${f.key}"${f.key === filterDraft.fieldKey ? " selected" : ""}>${f.label}</option>`
          ).join("")}
        </select>
      </label>
      ${
        field
          ? `<div class="form-field">
        <span>Condition</span>
        <div class="condition-tabs" role="tablist">
          ${["empty", "is", "isnot"]
            .map(
              (c) =>
                `<button type="button" class="condition-tab${filterDraft.condition === c ? " is-active" : ""}" data-condition="${c}">${
                  c === "empty" ? "Empty" : c === "is" ? "It is" : "It is not"
                }</button>`
            )
            .join("")}
        </div>
      </div>`
          : ""
      }
      ${
        field && needsValue
          ? `<label class="form-field is-grow">
        <span>Choose</span>
        <select class="field-control" id="filterValue">
          <option value="">Choose</option>
          ${field
            .options()
            .map((o) => `<option value="${o}"${o === filterDraft.value ? " selected" : ""}>${o}</option>`)
            .join("")}
        </select>
      </label>`
          : ""
      }
    </div>

    <div class="filter-chips-block">
      <span class="filter-chips-label">Added filters</span>
      <div class="filter-chips">
        ${
          state.filters.length === 0
            ? '<span class="filter-chips-empty">No filters added yet</span>'
            : state.filters
                .map(
                  (f, i) => `
          <span class="filter-chip">
            <b>${fieldLabel(f.fieldKey)}</b> ${conditionLabel(f.condition)}${f.condition !== "empty" ? ` <em>${f.value}</em>` : ""}
            <button type="button" class="filter-chip-remove" data-remove-filter="${i}" aria-label="Remove filter">×</button>
          </span>`
                )
                .join("") + '<button type="button" class="filter-clear" id="clearFilters">Clear</button>'
        }
      </div>
    </div>

    <div class="filter-footer">
      ${editingPresetId ? '<button type="button" class="danger-btn" id="deletePreset">Delete preset</button>' : "<span></span>"}
      <div class="filter-footer-right">
        <input type="text" class="field-control filter-preset-input" id="presetName" placeholder="Enter the preset name" />
        <button type="button" class="filter-btn" id="createPreset"${state.filters.length ? "" : " disabled"}>Create</button>
        <button type="button" class="primary-btn" id="confirmFilters">Confirm</button>
      </div>
    </div>`;
}

function renderPresets() {
  userFilterPresets.innerHTML = state.presets
    .map(
      (p) =>
        `<button type="button" class="preset-chip${p.id === editingPresetId ? " is-active" : ""}" data-preset="${p.id}">${p.name}</button>`
    )
    .join("");
}

userFilterToggle.addEventListener("click", () => {
  const willOpen = userFilterPanel.hidden;
  userFilterPanel.hidden = !willOpen;
  userFilterToggle.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) renderFilterPanel();
});

function addDraftFilter() {
  state.filters.push({ ...filterDraft });
  filterDraft = { fieldKey: "", condition: "is", value: "" };
  editingPresetId = null;
  renderFilterPanel();
  renderPresets();
}

userFilterPanel.addEventListener("change", (e) => {
  if (e.target.id === "filterField") {
    filterDraft = { fieldKey: e.target.value, condition: "is", value: "" };
    renderFilterPanel();
  } else if (e.target.id === "filterValue") {
    filterDraft.value = e.target.value;
    if (filterDraft.value) addDraftFilter();
    else renderFilterPanel();
  }
});

userFilterPanel.addEventListener("click", (e) => {
  const condBtn = e.target.closest("[data-condition]");
  if (condBtn) {
    filterDraft.condition = condBtn.dataset.condition;
    if (filterDraft.condition === "empty") {
      addDraftFilter();
    } else {
      filterDraft.value = "";
      renderFilterPanel();
    }
    return;
  }

  const removeBtn = e.target.closest("[data-remove-filter]");
  if (removeBtn) {
    state.filters.splice(Number(removeBtn.dataset.removeFilter), 1);
    editingPresetId = null;
    renderFilterPanel();
    renderPresets();
    updateFilterToggleState();
    render();
    return;
  }

  if (e.target.id === "clearFilters") {
    state.filters = [];
    editingPresetId = null;
    renderFilterPanel();
    renderPresets();
    updateFilterToggleState();
    render();
    return;
  }

  if (e.target.id === "confirmFilters") {
    updateFilterToggleState();
    render();
    return;
  }

  if (e.target.id === "createPreset") {
    const nameInput = document.getElementById("presetName");
    const name = nameInput.value.trim();
    if (!name || !state.filters.length) return;
    const preset = { id: `preset-${state.presets.length}-${name}`, name, filters: state.filters.map((f) => ({ ...f })) };
    state.presets.push(preset);
    editingPresetId = preset.id;
    renderPresets();
    renderFilterPanel();
    return;
  }

  if (e.target.id === "deletePreset") {
    state.presets = state.presets.filter((p) => p.id !== editingPresetId);
    editingPresetId = null;
    renderPresets();
    renderFilterPanel();
  }
});

userFilterPresets.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-preset]");
  if (!btn) return;

  if (btn.dataset.preset === editingPresetId) {
    state.filters = [];
    editingPresetId = null;
  } else {
    const preset = state.presets.find((p) => p.id === btn.dataset.preset);
    if (!preset) return;
    state.filters = preset.filters.map((f) => ({ ...f }));
    editingPresetId = preset.id;
  }

  filterDraft = { fieldKey: "", condition: "is", value: "" };
  updateFilterToggleState();
  renderPresets();
  if (!userFilterPanel.hidden) renderFilterPanel();
  render();
});

document.getElementById("kycCount").textContent = USERS.filter((u) => u.kyc === "checking").length;
render();

/* ---------- Profile card ---------- */

const profileCard = document.getElementById("profileCard");
const profileModal = document.getElementById("profileModal");

const ACTION_ICONS = {
  "To company": '<path d="M20 11.5a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4h-4"/>',
  "Add channel": '<path d="M12 5.5v13M5.5 12h13"/>',
  "Edit data": '<path d="M4.5 19.5h4l10-10a2.1 2.1 0 0 0-3-3l-10 10v3Z"/><path d="m14.5 6.5 3 3"/>',
  History: '<path d="M4 12a8 8 0 1 0 8-8 8 8 0 0 0-6.9 4"/><path d="M4.5 4.5v3.6h3.6M12 8v4.4l3 1.8"/>',
  Chat: '<path d="M20 12.2c0 3.5-3.6 6.3-8 6.3-.9 0-1.7-.1-2.5-.3L5 20.5l1-3.2A6.4 6.4 0 0 1 4 12.2C4 8.7 7.6 6 12 6s8 2.7 8 6.2Z"/>',
};

function age(iso) {
  const born = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - born.getFullYear();
  const months = now.getMonth() - born.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < born.getDate())) years -= 1;
  return years;
}

function formatDotted(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

const field = (label, value) => `
  <div class="info-tile">
    <span class="field-label">${label}</span>
    <span class="field-value">${value || '<span class="field-empty">—</span>'}</span>
  </div>`;

const dateWithDevice = (iso, device) =>
  iso ? `${svg(DEVICE_ICONS[device], 14, 1.6)} ${formatDate(iso)}` : "";

const statusTone = (value) => {
  if (!value) return "";
  const v = String(value).toLowerCase();
  if (v === "enabled" || v === "created") return "is-ok";
  if (v === "unavailable") return "is-muted";
  if (/%$/.test(v)) return "is-accent";
  return "";
};

const statusValue = (value) =>
  value ? `<span class="status-chip ${statusTone(value)}">${value}</span>` : "";

function renderProfile(user) {
  const p = { ...PROFILE_DEFAULTS, ...(user.profile || {}) };
  const initial = user.name.charAt(0).toUpperCase();

  const actions = Object.entries(ACTION_ICONS)
    .map(([label, path]) => `<button class="ghost-btn profile-action">${svg(path, 14, 1.7)}<span>${label}</span></button>`)
    .join("");

  const stats = [
    ["Garna Internal account", p.accounts.garna],
    ["Internal account", p.accounts.internal],
    ["Funds", p.accounts.funds],
    ["Expresses", p.accounts.expresses],
  ]
    .map(([label, value]) => `<div class="balance-tile"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  const tabs = PROFILE_TABS.map((tab, i) => {
    const external = tab === "Revenue" ? svg('<path d="M14 4.5h5.5V10"/><path d="m19 5-7.5 7.5"/><path d="M17.5 14.5v4a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V8.5A1.5 1.5 0 0 1 6 7h4"/>', 13) : "";
    return `<button class="tab${i === 0 ? " is-active" : ""}" data-tab="${tab}">
      <span>${tab}</span>${external}
    </button>`;
  }).join("");

  const socials = p.socials.length
    ? p.socials.map(() => '<span class="social-chip" title="Google">G</span>').join("")
    : "";

  const twoFa = p.phone
    ? `<span class="two-fa">${svg('<circle cx="12" cy="12" r="8.5" fill="currentColor" stroke="none"/><path d="m8.6 12.3 2.3 2.3 4.5-4.8" stroke="#fff" stroke-width="2"/>', 15)} ${p.phone}</span>`
    : "";

  const editBtn = (label) => `
    <button class="icon-btn is-bordered edit-btn" title="Edit ${label}" aria-label="Edit ${label}">
      ${svg('<path d="M4.5 19.5h4l10-10a2.1 2.1 0 0 0-3-3l-10 10v3Z"/><path d="m14.5 6.5 3 3"/>', 14)}
    </button>`;

  const section = (title, tiles, action = "") => `
    <section class="profile-block">
      <header class="profile-block-head">
        <span class="group-title">${title}</span>
        ${action}
      </header>
      ${tiles}
    </section>`;

  profileCard.innerHTML = `
    <div class="profile-bar">
      <button class="ghost-btn back-btn" id="backToList">
        ${svg('<path d="m14 6-6 6 6 6"/>', 14, 2.2)}
        <span>Close</span>
      </button>
      <div class="profile-actions">${actions}</div>
    </div>

    <div class="profile-hero">
      <div class="profile-identity">
        <span class="avatar avatar-profile ${user.avatar || "av-violet"}">${initial}</span>
        <div class="profile-ident">
          <div class="profile-name-row">
            <h1>${user.name}</h1>
            ${user.kyc === "approved" ? '<span class="kyc-badge">Approved</span>' : '<span class="kyc-badge is-pending">Checking</span>'}
          </div>
          <div class="profile-sub">
            <span class="verified">
              ${svg('<circle cx="12" cy="12" r="8.5" fill="currentColor" stroke="none"/><path d="m8.6 12.3 2.3 2.3 4.5-4.8" stroke="#fff" stroke-width="2"/>', 14)}
              ${user.email}
            </span>
            ${p.org ? `<span class="profile-org">${svg('<path d="M10 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L11 7.5"/><path d="M14 10.5a3.5 3.5 0 0 0-5 0L6.5 13a3.5 3.5 0 0 0 5 5l1.5-1.5"/>', 14)} <strong>${p.org.channel}</strong> | ${p.org.partner}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="balance-grid">${stats}</div>
    </div>

    <div class="tabs profile-tabs" role="tablist">${tabs}</div>

    <div class="profile-panel" data-panel="Summary">
      ${section("Personal information", `
        ${field("Gender", p.gender)}
        ${field("Birth date", p.birth ? `${formatDate(p.birth)} (${age(p.birth)} years old)` : "")}
        ${field("Country", p.country)}
        ${field("Date of ICA signing", p.ica ? formatDotted(p.ica) : "")}
        ${field("Position", p.position)}
      `)}

      ${section("Account details and settings", `
        ${field("Authorization via social networks", socials)}
        ${field("Account password", statusValue(p.password))}
        ${field("Two-Factor Authentication", twoFa)}
        ${field("Registration date", formatDate(user.registered))}
        ${field("Last action", dateWithDevice(user.lastAction, "desktop"))}
        ${field("Last action in the app", dateWithDevice(p.appAction, "mobile"))}
      `, p.phone ? '<button class="danger-btn">Disable 2FA</button>' : "")}

      ${section("Roles", user.role
        ? field("Role", `<span class="tag-role">${user.role}</span>`)
        : '<p class="roles-empty">No roles assigned yet</p>', editBtn("roles"))}

      ${section("Fintech", `
        ${field("Expresses", statusValue(p.fintech.expresses))}
        ${field("Early payout", statusValue(p.fintech.earlyPayout))}
        ${field("P2P transfers", statusValue(p.fintech.p2p))}
        ${field("Advances", statusValue(p.fintech.advances))}
        ${field("Auto Payout", statusValue(p.fintech.autoPayout))}
        ${field("Additional amount", statusValue(p.fintech.additional))}
      `, editBtn("fintech"))}
    </div>

    <p class="empty-note profile-placeholder" hidden>Nothing to show on this tab yet.</p>`;
}

function openProfile(email) {
  const user = USERS.find((u) => u.email === email);
  if (!user) return;

  renderProfile(user);
  profileModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => requestAnimationFrame(() => profileModal.classList.add("is-open")));
}

function closeProfile() {
  if (profileModal.hidden) return;
  profileModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  const drawer = profileModal.querySelector(".profile-drawer");
  const onEnd = (e) => {
    if (e.target !== drawer || e.propertyName !== "transform") return;
    drawer.removeEventListener("transitionend", onEnd);
    profileModal.hidden = true;
  };
  drawer.addEventListener("transitionend", onEnd);
}

profileCard.addEventListener("click", (e) => {
  if (e.target.closest("#backToList")) {
    closeProfile();
    return;
  }

  const tab = e.target.closest(".profile-tabs .tab");
  if (!tab) return;

  profileCard.querySelectorAll(".profile-tabs .tab").forEach((t) => t.classList.remove("is-active"));
  tab.classList.add("is-active");

  const isSummary = tab.dataset.tab === "Summary";
  profileCard.querySelector(".profile-panel").hidden = !isSummary;
  profileCard.querySelector(".profile-placeholder").hidden = isSummary;
});

document.querySelector("[data-close-profile]").addEventListener("click", closeProfile);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !profileModal.hidden) closeProfile();
});
