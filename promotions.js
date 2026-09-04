const PROMOTIONS = [
  { name: "Save on Services with Garna", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-07-09" },
  { name: "Update your mobile app", segment: "CSP", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-04-16" },
  { name: "Confirm actions faster with Biometrics", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-25" },
  { name: "Confirm actions faster with Biometrics", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-25" },
  { name: "FAQ: Service Update", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-24" },
  { name: "FAQ: Service Update", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-24" },
  { name: "FAQ: Service Update", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-24" },
  { name: "FAQ: Service Update", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-24" },
  { name: "FAQ: Service Update", segment: "Users", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-24" },
  { name: "Help us become better", segment: "CSP", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-11" },
  { name: "Коды подтверждения теперь в приложении", segment: "CSP", countries: "Kazakhstan +2", destination: "Balance", endDate: "", updated: "2026-03-11" },
  { name: "Коды подтверждения теперь в приложении", segment: "CSP", countries: "Russia +2", destination: "Balance", endDate: "", updated: "2026-03-11" },
  { name: "How to create an offer?", segment: "CSP", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-11" },
  { name: "Offers for freelancers", segment: "CSP", countries: "All countries", destination: "Balance", endDate: "", updated: "2026-03-11" },
  { name: "Create your first channel", segment: "Users", countries: "All countries", destination: "Channels", endDate: "2026-04-30", updated: "2026-03-07" },
  { name: "New payout options", segment: "CSP", countries: "Europe +8", destination: "Balance", endDate: "", updated: "2026-02-28" },
  { name: "Welcome to Garna", segment: "Users", countries: "All countries", destination: "Offers", endDate: "", updated: "2026-02-19" },
];

const promotionMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const promotionState = { query: "", sortDirection: "desc" };
const promotionsTable = document.getElementById("promotionsTable");
const promotionsEmpty = document.getElementById("promotionsEmpty");
const promotionSearch = document.getElementById("promotionSearch");
const promotionModal = document.getElementById("promotionModal");
const promotionForm = document.getElementById("promotionForm");
const promotionTitle = document.getElementById("promotionModalTitle");

function formatPromotionDate(iso) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-");
  return `${day} ${promotionMonth[Number(month) - 1]} ${year}`;
}

function filteredPromotions() {
  const query = promotionState.query.trim().toLowerCase();
  const rows = PROMOTIONS.filter((item) =>
    !query || `${item.name} ${item.segment} ${item.countries}`.toLowerCase().includes(query)
  );
  return rows.sort((a, b) =>
    a.updated.localeCompare(b.updated) * (promotionState.sortDirection === "asc" ? 1 : -1)
  );
}

function renderPromotions() {
  const rows = filteredPromotions();
  promotionsTable.innerHTML = `
    <table class="tasks data-table promotions-table">
      <thead>
        <tr>
          <th><span class="th-inner">Banner name <span class="count-chip">${rows.length}</span></span></th>
          <th>Segment</th>
          <th>Countries</th>
          <th>Button leads to</th>
          <th>End date</th>
          <th class="col-num">
            <button class="sort-th is-active ${promotionState.sortDirection === "desc" ? "is-desc" : ""}" id="sortPromotions">
              <span class="sort-arrow">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6.5 11.5 12 5.5l5.5 6"/></svg>
              </span>
              Date of last update
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((item) => `
          <tr tabindex="0" data-promotion="${encodeURIComponent(item.name)}">
            <td class="promotion-name">${item.name}</td>
            <td><span class="tag-role">${item.segment}</span></td>
            <td><span class="tag-role">${item.countries}</span></td>
            <td>${item.destination}</td>
            <td class="task-date">${formatPromotionDate(item.endDate)}</td>
            <td class="col-num task-date">${formatPromotionDate(item.updated)}</td>
          </tr>`).join("")}
      </tbody>
    </table>`;
  promotionsEmpty.hidden = rows.length > 0;
}

function openPromotion(item = null) {
  promotionForm.reset();
  promotionTitle.textContent = item ? "Edit promotion" : "Create a promotion";
  if (item) {
    promotionForm.elements.title.value = item.name;
    promotionForm.elements.label.value = item.segment;
    promotionForm.elements.countries.value = item.countries;
    promotionForm.elements.destination.value = item.destination;
    promotionForm.elements.endDate.value = item.endDate;
  }
  promotionModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => requestAnimationFrame(() => promotionModal.classList.add("is-open")));
  setTimeout(() => promotionForm.elements.title.focus(), 40);
}

function closePromotion() {
  if (promotionModal.hidden) return;
  promotionModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  const drawer = promotionModal.querySelector(".promotion-drawer");
  const onEnd = (e) => {
    if (e.target !== drawer || e.propertyName !== "transform") return;
    drawer.removeEventListener("transitionend", onEnd);
    promotionModal.hidden = true;
  };
  drawer.addEventListener("transitionend", onEnd);
}

promotionsTable.addEventListener("click", (event) => {
  if (event.target.closest("#sortPromotions")) {
    promotionState.sortDirection = promotionState.sortDirection === "desc" ? "asc" : "desc";
    renderPromotions();
    return;
  }
  const row = event.target.closest("tbody tr");
  if (!row) return;
  openPromotion(PROMOTIONS.find((item) => item.name === decodeURIComponent(row.dataset.promotion)));
});

promotionsTable.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const row = event.target.closest("tbody tr");
  if (row) openPromotion(PROMOTIONS.find((item) => item.name === decodeURIComponent(row.dataset.promotion)));
});

promotionSearch.addEventListener("input", () => {
  promotionState.query = promotionSearch.value;
  renderPromotions();
});

document.querySelectorAll("[data-close-promotion]").forEach((button) =>
  button.addEventListener("click", closePromotion)
);

document.querySelectorAll(".language-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".language-tab").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
  });
});

promotionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closePromotion();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !promotionModal.hidden) closePromotion();
});

renderPromotions();
