const LABELS = [
  { name: "Horyx", csp: ["Horyx"], more: 0, domain: "app.horyx.com", app: false },
  { name: "2btube", csp: ["2BTUBE"], more: 0, domain: "mcpay2btube.com", app: true },
  { name: "Garna", csp: ["SMART SYSTEMS - FZCO | Garna", "IT-SKILLS SRL | Garna"], more: 937, domain: "app.garna.io", app: true },
  { name: "Unite.ad", csp: ["THINKBIG"], more: 0, domain: "pay.thinkbigcsp.com", app: true },
  { name: "POPSync", csp: ["POPS"], more: 0, domain: "popssync.com", app: true },
  { name: "UFG Pay", csp: ["UFG"], more: 0, domain: "app.unionforgamers.com", app: true },
  { name: "CentroFlex", csp: ["Fansly", "Clips4Sale | Centroflex", "CentroFlex | Garna"], more: 0, domain: "centroflex.com", app: true },
  { name: "RHEI Pay Pro", csp: ["RHEI"], more: 0, domain: "paypro.rhei.com", app: false },
  { name: "Shft", csp: ["Diwan"], more: 0, domain: "weareshft.com", app: false },
  { name: "MC Pay", csp: ["Meltechmusic", "mediacube", "Play Network", "Divo", "ZoyaTech Limited"], more: 42, domain: "mcpay.io", app: true },
];

const labelState = { query: "" };
const labelsTable = document.getElementById("labelsTable");
const labelsEmpty = document.getElementById("labelsEmpty");
const labelSearch = document.getElementById("labelSearch");

const labelSvg = (path, size = 15, width = 1.8) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const labelEscape = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

const LABEL_ACTIONS = {
  edit: '<path d="M5 19h3l9.6-9.6a2.1 2.1 0 0 0-3-3L5 16v3Z"/><path d="m14.3 6.8 2.9 2.9"/>',
  open: '<path d="M13.8 4.5h5.7v5.7"/><path d="m19.5 4.5-7.6 7.6"/><path d="M18 13.6V18a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5h4.4"/>',
  archive: '<rect x="4.5" y="8.4" width="15" height="11.1" rx="2"/><path d="M4 4.5h16v3.9H4z"/><path d="M10 12.2h4"/>',
};

const rowAction = (kind, label, name) =>
  `<button type="button" class="row-action" data-action="${kind}" data-name="${labelEscape(name)}" title="${label}" aria-label="${label} ${labelEscape(name)}">${labelSvg(
    LABEL_ACTIONS[kind],
    16,
    1.7
  )}</button>`;

const labelFilter = createFilter({
  toggle: document.getElementById("labelFilterToggle"),
  panel: document.getElementById("labelFilterPanel"),
  presets: document.getElementById("labelFilterPresets"),
  active: document.getElementById("labelActiveFilters"),
  fields: [
    { key: "csp", label: "CSP", options: () => filterUnique(LABELS.flatMap((l) => l.csp)) },
    { key: "app", label: "Presence of app", options: () => ["Yes", "No"] },
  ],
  getValue: (item, key) => (key === "app" ? (item.app ? "Yes" : "No") : item[key]),
  onApply: () => renderLabels(),
});

function filteredLabels() {
  const query = labelState.query.trim().toLowerCase();
  return LABELS.filter(
    (item) =>
      labelFilter.matches(item) &&
      (!query || `${item.name} ${item.domain} ${item.csp.join(" ")}`.toLowerCase().includes(query))
  );
}

function renderLabels() {
  const rows = filteredLabels();

  labelsTable.innerHTML = `
    <table class="tasks data-table labels-table">
      <thead>
        <tr>
          <th><span class="th-inner">Label name <span class="count-chip">${rows.length}</span></span></th>
          <th>CSP</th>
          <th>Domain name</th>
          <th>Presence of app</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (item) => `
          <tr tabindex="0" data-label="${encodeURIComponent(item.name)}">
            <td class="label-name">
              <span>${labelEscape(item.name)}</span>
              <span class="row-actions">
                ${rowAction("edit", "Edit", item.name)}
                ${rowAction("open", "Open", item.name)}
                ${rowAction("archive", "Archive", item.name)}
              </span>
            </td>
            <td>
              <span class="csp-group">
                ${item.csp.map((c) => `<span class="tag-role">${labelEscape(c)}</span>`).join("")}
                ${item.more ? `<span class="csp-more">+${item.more}</span>` : ""}
              </span>
            </td>
            <td class="label-domain">${labelEscape(item.domain)}</td>
            <td>${item.app ? `<span class="app-check">${labelSvg('<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.3 2.6 2.6 5-5.4"/>', 17, 1.7)}</span>` : ""}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  labelsEmpty.hidden = rows.length > 0;
}

// Capture phase on purpose: a bubbling guard here would run after the row's
// own handler, so an action click would also open the row once one exists.
labelsTable.addEventListener(
  "click",
  (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    e.stopPropagation();
    e.preventDefault();
    // the actions have no destination yet
  },
  true
);

labelSearch.addEventListener("input", () => {
  labelState.query = labelSearch.value;
  renderLabels();
});

renderLabels();
