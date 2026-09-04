const TOTAL_TRANSACTIONS = 350349;

const TRANSACTIONS = [
  { id: "t1", user: "Zakhar M", avatar: "av-violet", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "Tether TRC20 – USDT", linked: false, amount: 420 },
  { id: "t2", user: "Tatsiana Saroka", avatar: "av-rose", info: true, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in BYN (non sanctioned banks)", linked: false, amount: 1250 },
  { id: "t3", user: "Broken Mouse Media LTD", avatar: "av-blue", info: false, status: "confirmed", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in local currency (Airwallex)", linked: true, amount: 1000 },
  { id: "t4", user: "Daniil Parshukov", avatar: "av-mint", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in RUB (non sanctioned banks)", linked: true, amount: 350 },
  { id: "t5", user: "KONTORA GAMES LLC", avatar: "av-plum", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "Tether TRC20 – USDT", linked: false, amount: 2200 },
  { id: "t6", user: "Ilia Egorov", avatar: "av-slate", info: true, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in USD (Airwallex, Payoneer)", linked: true, amount: 180 },
  { id: "t7", user: "Rishabh Singh", avatar: "av-brown", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "PayPal – USD", linked: true, amount: 90 },
  { id: "t8", user: "Aiturgan Abdrazakova", avatar: "av-rose", info: false, status: "confirmed", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To a card in USD (Paysend)", linked: true, amount: 610 },
  { id: "t9", user: "HFL Communication company", avatar: "av-blue", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in USD (Airwallex)", linked: true, amount: 3400 },
  { id: "t10", user: "Hong Jie Lee", avatar: "av-mint", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To a card in USD (Paysend)", linked: true, amount: 275 },
  { id: "t11", user: "SETEL", avatar: "av-violet", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in USD (Airwallex)", linked: true, amount: 1500 },
  { id: "t12", user: "Shine Image Culture Limited", avatar: "av-plum", info: false, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To an account in USD (Airwallex)", linked: true, amount: 4200 },
  { id: "t13", user: "Alikhan Zhapayev", avatar: "av-slate", info: false, status: "confirmed", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "To a card in USD (Paysend)", linked: true, amount: 800 },
  { id: "t14", user: "Van Nghia Le", avatar: "av-brown", info: true, status: "new", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "Tether TRC20 – USDT", linked: false, amount: 60 },
  { id: "t15", user: "Esttik Associate", avatar: "av-rose", info: false, status: "new", expresses: true, created: "2026-09-04", updated: "2026-09-04", method: "To an account in EUR (Payoneer)", linked: true, amount: 990 },
  { id: "t16", user: "Fernando Gabriel Romero", avatar: "av-blue", info: false, status: "confirmed", expresses: false, created: "2026-09-04", updated: "2026-09-04", method: "Tether ERC20 – USDT", linked: false, amount: 340 },
];

const transactionsTable = document.getElementById("transactionsTable");
const transactionsEmpty = document.getElementById("transactionsEmpty");
const transactionSearch = document.getElementById("transactionSearch");

const transactionState = { query: "", sortBy: "created", dir: "desc" };

const txSvg = (path, size = 14, width = 1.7) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const currency = (value) => `$${value.toLocaleString("en-US")}`;

function formatTransactionDate(iso) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m, d] = iso.split("-");
  return `${d} ${months[Number(m) - 1]} ${y}`;
}

function visibleTransactions() {
  const q = transactionState.query.trim().toLowerCase();
  const rows = TRANSACTIONS.filter((t) => !q || t.user.toLowerCase().includes(q));

  const factor = transactionState.dir === "asc" ? 1 : -1;
  return rows.sort((a, b) => {
    const key = transactionState.sortBy;
    const diff = key === "amount" ? a.amount - b.amount : a[key].localeCompare(b[key]);
    return diff * factor || TRANSACTIONS.indexOf(a) - TRANSACTIONS.indexOf(b);
  });
}

function txSortHeader(label, key) {
  const active = transactionState.sortBy === key;
  const classes = ["sort-th", active ? "is-active" : "", active && transactionState.dir === "desc" ? "is-desc" : ""]
    .filter(Boolean)
    .join(" ");

  return `<th class="col-num">
    <button class="${classes}" data-sort="${key}">
      <span class="sort-arrow">${txSvg('<path d="M12 19V5M6.5 11.5 12 5.5l5.5 6"/>', 13, 1.8)}</span>
      ${label}
    </button>
  </th>`;
}

function renderTransactionRow(t) {
  const info = t.info
    ? `<span class="warn" title="Needs review">${txSvg('<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.4M12 15.8h.01"/>', 14)}</span>`
    : "";

  return `
    <tr data-transaction="${t.id}" tabindex="0">
      <td>
        <div class="user-cell">
          <span class="avatar avatar-user ${t.avatar}">${t.user.charAt(0).toUpperCase()}</span>
          <span class="user-cell-meta"><strong>${t.user}</strong></span>
          ${info}
        </div>
      </td>
      <td><span class="status-pill is-${t.status}">${t.status === "new" ? "New" : "Confirmed"}</span></td>
      <td>${t.expresses ? "Yes" : "No"}</td>
      <td class="task-date">${formatTransactionDate(t.created)}</td>
      <td class="task-date">${formatTransactionDate(t.updated)}</td>
      <td class="${t.linked ? "method-link" : "method-plain"}">${t.method}</td>
      <td class="col-num task-date">${currency(t.amount)}</td>
    </tr>`;
}

function renderTransactions() {
  const rows = visibleTransactions();
  const total = rows.reduce((sum, t) => sum + t.amount, 0);

  transactionsTable.innerHTML = `
    <table class="tasks data-table transactions-table">
      <thead>
        <tr>
          <th><span class="th-inner">User <span class="count-chip">${TOTAL_TRANSACTIONS.toLocaleString("en-US")}</span></span></th>
          <th>Status</th>
          <th><span class="th-inner">Expresses ${txSvg('<circle cx="12" cy="12" r="8.5"/><path d="M12 16v.01M12 8v5"/>', 13, 1.6)}</span></th>
          ${txSortHeader("Date of creation", "created")}
          ${txSortHeader("Updated at", "updated")}
          <th><span class="th-inner">Payment method ${txSvg('<circle cx="12" cy="12" r="8.5"/><path d="M12 16v.01M12 8v5"/>', 13, 1.6)}</span></th>
          ${txSortHeader("Amount", "amount")}
        </tr>
      </thead>
      <tbody>${rows.map(renderTransactionRow).join("")}</tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="col-num">${currency(total)}</td>
        </tr>
      </tfoot>
    </table>`;
  transactionsEmpty.hidden = rows.length > 0;
}

transactionsTable.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-sort]");
  if (btn) {
    const key = btn.dataset.sort;
    if (transactionState.sortBy === key) {
      transactionState.dir = transactionState.dir === "desc" ? "asc" : "desc";
    } else {
      transactionState.sortBy = key;
      transactionState.dir = "desc";
    }
    renderTransactions();
  }
});

transactionSearch.addEventListener("input", () => {
  transactionState.query = transactionSearch.value;
  renderTransactions();
});

renderTransactions();
