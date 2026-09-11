const TOTAL_PARTNERS = 1002;

/* Footer figures are the whole-dataset totals from the source, not the sum of
   these rows, so they are stated rather than computed. */
const PARTNER_TOTALS = {
  volume: 786627744.47,
  network: 32572405.86,
  partner: 23174358.35,
  requests: 23972,
  connected: 26107,
  members: 3551,
};

const PARTNERS = [
  { name: "Recruiting", email: "rk@mediacube.io", avatar: "av-slate", link: "chain", status: "approved", volume: 368948843.05, network: 24853789.6, partner: 99474.15, requests: 7947, connected: 9230, members: 2273 },
  { name: "MediaCube Recruiters", email: "root@mediacube.io", avatar: "av-violet", link: "sync", status: "approved", volume: 61355111.81, network: 2445802.98, partner: 2964.42, requests: 1197, connected: 1480, members: 126 },
  { name: "Marketing", email: "sol@mediacube.io", avatar: "av-brown", link: null, status: "approved", volume: 58728849.46, network: 3590723.84, partner: 912.14, requests: 1668, connected: 1876, members: 268 },
  { name: "Magic Find (UFG)", email: "david@magicfind.us", avatar: "av-violet", link: "sync", status: "approved", volume: 56995130.51, network: 3858.22, partner: 3245480.01, requests: 1449, connected: 1560, members: 113 },
  { name: "2btube", email: "fabienne@2btube.com", avatar: "av-violet", link: "sync", status: "approved", volume: 51690913.17, network: 638.67, partner: 3627186.22, requests: 1420, connected: 1493, members: 109 },
  { name: "Pavel Kadyrov", email: "kad@mediacube.io", avatar: "av-slate", link: null, status: "approved", volume: 25948558.52, network: 732702.09, partner: 731802.57, requests: 134, connected: 240, members: 1 },
  { name: "Zoomin", email: "instant.games@azerion.com", avatar: "av-violet", link: "sync", status: "approved", volume: 21141191.67, network: 142.99, partner: 1547162.55, requests: 1394, connected: 1547, members: 65 },
  { name: "Genesis", email: "info@akatria.com", avatar: "av-violet", link: "sync", status: "approved", volume: 19434816.34, network: 3270.49, partner: 1810297.21, requests: 966, connected: 980, members: 66 },
  { name: "THINKBIG", email: "thinkbigcsp@gmail.com", avatar: "av-blue", link: "sync", status: "approved", volume: 19219836.96, network: 1662.87, partner: 4271151.73, requests: 2311, connected: 2299, members: 40 },
  { name: "Diwan Videos", email: "osama@diwangroup.com", avatar: "av-violet", link: "sync", status: "approved", volume: 13637190.83, network: 9018.71, partner: 1974467.13, requests: 897, connected: 987, members: 21 },
  { name: "KNOT", email: "knot@2btube.com", avatar: "av-violet", link: null, status: "approved", volume: 13422807.67, network: 0, partner: 1039266.33, requests: 254, connected: 289, members: 8 },
  { name: "Splay One", email: "martin.sadik@splayone.com", avatar: "av-violet", link: "sync", status: "approved", volume: 13085241.35, network: 2163.63, partner: 360557.62, requests: 634, connected: 826, members: 157 },
  { name: "Thumb Media", email: "miguel.sabino@thumbmedia.net", avatar: "av-violet", link: "sync", status: "approved", volume: 12166689.97, network: 13270.14, partner: 479754.66, requests: 705, connected: 714, members: 96 },
  { name: "Dot Republic Media", email: "president.sophep@gmail.com", avatar: "av-violet", link: "sync", status: "approved", volume: 7561377.58, network: 0, partner: 8868.63, requests: 211, connected: 218, members: 2 },
  { name: "WildJam", email: "ceo@wildjam.ru", avatar: "av-violet", link: null, status: "approved", volume: 6159878.71, network: 307315.26, partner: 307314.46, requests: 35, connected: 55, members: 1 },
  { name: "Vitaly Yaroshevich", email: "vy@mediacube.io", avatar: "av-brown", link: null, status: "approved", volume: 5252135.95, network: 240939.68, partner: 239731.55, requests: 95, connected: 124, members: 7 },
  { name: "Bzzz Entertainment", email: "bzzztvonline@gmail.com", avatar: "av-violet", link: null, status: "approved", volume: 4398986.68, network: 0, partner: 1078018.25, requests: 463, connected: 450, members: 29 },
  { name: "Dughero", email: "paolo.dughero@gmail.com", avatar: "av-violet", link: "sync", status: "approved", volume: 3444358.95, network: 0, partner: 493046.08, requests: 70, connected: 85, members: 0 },
  { name: "GT Channel", email: "adrian@gtchannel.com", avatar: "av-violet", link: "sync", status: "approved", volume: 3349453.21, network: 165.16, partner: 113306.24, requests: 180, connected: 196, members: 6 },
  { name: "IN-SANE", email: "hello@in-sane.tv", avatar: "av-violet", link: "sync", status: "approved", volume: 3128788.02, network: 0, partner: 655849.99, requests: 220, connected: 249, members: 9 },
];

const partnerState = { query: "", sortBy: "volume", dir: "desc" };
const partnersTable = document.getElementById("partnersTable");
const partnersEmpty = document.getElementById("partnersEmpty");
const partnerSearch = document.getElementById("partnerSearch");

const partnerSvg = (path, size = 15, width = 1.7) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const partnerEscape = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

const money = (v) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const count = (v) => v.toLocaleString("en-US");

const LINK_ICONS = {
  chain: '<path d="M9.5 14.5 14.5 9.5"/><path d="M12.7 7.6l1.4-1.4a3.2 3.2 0 0 1 4.5 4.5l-1.4 1.4"/><path d="M11.3 16.4l-1.4 1.4a3.2 3.2 0 0 1-4.5-4.5l1.4-1.4"/>',
  sync: '<path d="M4.8 9.4h14.4"/><path d="m16.2 6.4 3 3-3 3"/><path d="M19.2 14.6H4.8"/><path d="m7.8 11.6-3 3 3 3"/>',
};

const partnerFilter = createFilter({
  toggle: document.getElementById("partnerFilterToggle"),
  panel: document.getElementById("partnerFilterPanel"),
  presets: document.getElementById("partnerFilterPresets"),
  active: document.getElementById("partnerActiveFilters"),
  fields: [
    { key: "status", label: "Status", options: () => filterUnique(PARTNERS.map((p) => p.status)) },
    { key: "link", label: "Connection", options: () => ["chain", "sync"] },
  ],
  getValue: (item, key) => item[key],
  onApply: () => renderPartners(),
});

function visiblePartners() {
  const q = partnerState.query.trim().toLowerCase();
  const rows = PARTNERS.filter(
    (p) => partnerFilter.matches(p) && (!q || `${p.name} ${p.email}`.toLowerCase().includes(q))
  );

  const factor = partnerState.dir === "asc" ? 1 : -1;
  return rows.sort((a, b) => (a[partnerState.sortBy] - b[partnerState.sortBy]) * factor);
}

function partnerSortHeader(label, key) {
  const active = partnerState.sortBy === key;
  const classes = ["sort-th", active ? "is-active" : "", active && partnerState.dir === "desc" ? "is-desc" : ""]
    .filter(Boolean)
    .join(" ");

  return `<th class="col-num">
    <button class="${classes}" data-partner-sort="${key}">
      <span class="sort-arrow">${partnerSvg(
        active ? '<path d="M12 19V5M6.5 11.5 12 5.5l5.5 6"/>' : '<path d="M9 8.5 12 5.5l3 3M9 15.5l3 3 3-3"/>',
        13,
        1.8
      )}</span>
      ${label}
    </button>
  </th>`;
}

function renderPartners() {
  const rows = visiblePartners();

  partnersTable.innerHTML = `
    <table class="tasks data-table partners-table">
      <thead>
        <tr>
          <th><span class="th-inner">Partner <span class="count-chip">${count(TOTAL_PARTNERS)}</span></span></th>
          <th>Status</th>
          ${partnerSortHeader("Volume, $", "volume")}
          ${partnerSortHeader('Share<br />of the network, $', "network")}
          ${partnerSortHeader('Share<br />of the partner, $', "partner")}
          <th class="col-num">Requests</th>
          <th class="col-num">Connected</th>
          <th class="col-num">Community<br />members</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (p) => `
          <tr tabindex="0" data-partner="${encodeURIComponent(p.name)}">
            <td class="partner-cell">
              <span class="user-cell">
                <span class="avatar avatar-user ${avatarTone(p.name, p.avatar)}">${avatarContent(p.name)}</span>
                <span class="user-cell-meta">
                  <strong>${partnerEscape(p.name)}</strong>
                  <em>${partnerEscape(p.email)}</em>
                </span>
              </span>
              <span class="partner-cell-side">
                ${p.link ? `<span class="partner-link" title="${p.link === "chain" ? "Linked" : "Synced"}">${partnerSvg(LINK_ICONS[p.link], 17, 1.7)}</span>` : ""}
                <span class="row-actions">
                  <button type="button" class="row-action" data-action="archive" title="Archive" aria-label="Archive ${partnerEscape(p.name)}">${partnerSvg(
                    '<rect x="4.5" y="8.4" width="15" height="11.1" rx="2"/><path d="M4 4.5h16v3.9H4z"/><path d="M10 12.2h4"/>',
                    16,
                    1.7
                  )}</button>
                </span>
              </span>
            </td>
            <td><span class="status-pill is-confirmed">Approved</span></td>
            <td class="col-num task-date">${money(p.volume)}</td>
            <td class="col-num task-date">${money(p.network)}</td>
            <td class="col-num task-date">${money(p.partner)}</td>
            <td class="col-num">${count(p.requests)}</td>
            <td class="col-num">${count(p.connected)}</td>
            <td class="col-num">${count(p.members)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td></td>
          <td class="col-num">${money(PARTNER_TOTALS.volume)}</td>
          <td class="col-num">${money(PARTNER_TOTALS.network)}</td>
          <td class="col-num">${money(PARTNER_TOTALS.partner)}</td>
          <td class="col-num">${count(PARTNER_TOTALS.requests)}</td>
          <td class="col-num">${count(PARTNER_TOTALS.connected)}</td>
          <td class="col-num">${count(PARTNER_TOTALS.members)}</td>
        </tr>
      </tfoot>
    </table>`;

  partnersEmpty.hidden = rows.length > 0;
}

partnersTable.addEventListener(
  "click",
  (e) => {
    if (e.target.closest("[data-action]")) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    const sort = e.target.closest("[data-partner-sort]");
    if (!sort) return;
    const key = sort.dataset.partnerSort;
    if (partnerState.sortBy === key) partnerState.dir = partnerState.dir === "asc" ? "desc" : "asc";
    else {
      partnerState.sortBy = key;
      partnerState.dir = "desc";
    }
    renderPartners();
  },
  true
);

partnerSearch.addEventListener("input", () => {
  partnerState.query = partnerSearch.value;
  renderPartners();
});

renderPartners();
