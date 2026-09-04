const NOTIFICATIONS = [
  {
    id: "n1", sender: "Alina Petrova", email: "alina@techno.co", avatar: "av-violet", segment: "Users", push: true,
    title: "Important Update: Withdrawal Fee Changes Effective July 6, 2026",
    text: "We are writing to inform you of an upcoming change to the fee for fund withdrawals starting next month.",
    sent: "2026-07-02",
  },
  {
    id: "n2", sender: "Dmitry Orlov", email: "dmitry@techno.co", avatar: "av-blue", segment: "Users", push: true,
    title: "Perks and Benefits in Garna",
    text: "We know how much of your budget goes toward work tools, so we've negotiated exclusive discounts for you.",
    sent: "2026-07-01",
  },
  {
    id: "n3", sender: "Maria Sokol", email: "maria@techno.co", avatar: "av-rose", segment: "Users", push: false,
    title: "Hi! We are delighted to welcome you to the Garna platform!",
    text: "Your profile has been successfully registered. Your account is now officially linked to Garna.",
    sent: "2026-06-26",
  },
  {
    id: "n4", sender: "Maria Sokol", email: "maria@techno.co", avatar: "av-rose", segment: "Users", push: false,
    title: "Добрый день! Рады приветствовать вас на платформе Garna!",
    text: "Ваш профиль успешно зарегистрирован. Мы рады сообщить, что ваш аккаунт официально привязан к Garna.",
    sent: "2026-06-26",
  },
  {
    id: "n5", sender: "Alina Petrova", email: "alina@techno.co", avatar: "av-violet", segment: "Users", push: true,
    title: "Scheduled Maintenance",
    text: "On June 24, from 08:00 to 13:00 UTC, crypto withdrawals will be unavailable. This is a routine update.",
    sent: "2026-06-23",
  },
  {
    id: "n6", sender: "Support Bot", email: "support@techno.co", avatar: "av-slate", segment: "Users", push: false,
    title: "test",
    text: "test",
    sent: "2026-05-26",
  },
  {
    id: "n7", sender: "Dmitry Orlov", email: "dmitry@techno.co", avatar: "av-blue", segment: "Users", push: true,
    title: "Your Advance is waiting — check it now",
    text: "Get an Advance for up to 12 months — calculate the amount in MC Pay.",
    sent: "2026-05-14",
  },
  {
    id: "n8", sender: "Alina Petrova", email: "alina@techno.co", avatar: "av-violet", segment: "Users", push: true,
    title: "Crypto wallet terms update",
    text: "Starting May 15, 2026, an inactivity fee of 200 USD/month will apply to wallets with no activity.",
    sent: "2026-05-12",
  },
  {
    id: "n9", sender: "Oleg Bykov", email: "oleg@techno.co", avatar: "av-mint", segment: "CSP", push: false,
    title: "YouTube payout information update",
    text: "Due to temporary delays in receiving funds from YouTube and completing the required verification.",
    sent: "2026-05-08",
  },
  {
    id: "n10", sender: "Alina Petrova", email: "alina@techno.co", avatar: "av-violet", segment: "Users", push: true,
    title: "Изменения выплат в RUB",
    text: "В связи с санкционными ограничениями с 14 мая прекращаются выплаты на счета в рублях.",
    sent: "2026-05-06",
  },
  {
    id: "n11", sender: "Alina Petrova", email: "alina@techno.co", avatar: "av-violet", segment: "Users", push: true,
    title: "Crypto withdrawal fee update",
    text: "Starting May 1, 2026, the crypto withdrawal fee will increase by a fixed 5 USD on top of the network fee.",
    sent: "2026-05-05",
  },
  {
    id: "n12", sender: "Nikita Frolov", email: "nikita@techno.co", avatar: "av-brown", segment: "Users", push: false,
    title: "We'd like to share a few important updates with you",
    text: "Changes in the list of banks available for withdrawals in Russia and crypto withdrawal fee update.",
    sent: "2026-05-05",
  },
  {
    id: "n13", sender: "Nikita Frolov", email: "nikita@techno.co", avatar: "av-brown", segment: "Users", push: false,
    title: "We'd like to share a few important updates with you",
    text: "Changes in Belarusian banking operations and crypto withdrawal fee update.",
    sent: "2026-05-05",
  },
];

const notificationMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const notificationState = { query: "", sortDirection: "desc" };
const notificationsTable = document.getElementById("notificationsTable");
const notificationsEmpty = document.getElementById("notificationsEmpty");
const notificationSearch = document.getElementById("notificationSearch");
const notificationModal = document.getElementById("notificationModal");
const notificationForm = document.getElementById("notificationForm");
const notificationTitle = document.getElementById("notificationModalTitle");
const notificationSubmit = document.getElementById("notificationSubmit");

const notifSvg = (path, size = 15, width = 1.8) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

function formatNotificationDate(iso) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-");
  return `${day} ${notificationMonth[Number(month) - 1]} ${year}`;
}

function filteredNotifications() {
  const query = notificationState.query.trim().toLowerCase();
  const rows = NOTIFICATIONS.filter((item) =>
    !query || `${item.sender} ${item.email}`.toLowerCase().includes(query)
  );
  return rows.sort((a, b) =>
    a.sent.localeCompare(b.sent) * (notificationState.sortDirection === "asc" ? 1 : -1)
  );
}

function renderNotifications() {
  const rows = filteredNotifications();
  notificationsTable.innerHTML = `
    <table class="tasks data-table notifications-table">
      <thead>
        <tr>
          <th><span class="th-inner">Sender <span class="count-chip">${rows.length}</span></span></th>
          <th>Segment</th>
          <th>Push</th>
          <th>Message</th>
          <th class="col-num">
            <button class="sort-th is-active ${notificationState.sortDirection === "desc" ? "is-desc" : ""}" id="sortNotifications">
              <span class="sort-arrow">${notifSvg('<path d="M12 19V5M6.5 11.5 12 5.5l5.5 6"/>', 13, 1.8)}</span>
              Sent
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((item) => `
          <tr tabindex="0" data-notification="${item.id}">
            <td>
              <div class="user-cell">
                <span class="avatar avatar-user ${item.avatar}">${item.sender.charAt(0).toUpperCase()}</span>
                <span class="user-cell-meta">
                  <strong>${item.sender}</strong>
                  <em>${item.email}</em>
                </span>
              </div>
            </td>
            <td><span class="tag-role">${item.segment}</span></td>
            <td>${item.push ? `<span class="push-check">${notifSvg('<path d="m5 12.6 4.4 4.4L19 7"/>', 14, 2.2)}</span>` : ""}</td>
            <td class="message-cell">
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </td>
            <td class="col-num task-date">${formatNotificationDate(item.sent)}</td>
          </tr>`).join("")}
      </tbody>
    </table>`;
  notificationsEmpty.hidden = rows.length > 0;
}

function setContentType(type) {
  notificationForm.querySelectorAll(".content-type-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.contentType === type);
  });
}

function updateTextareaCount(textarea) {
  const counter = textarea.closest(".textarea-counter")?.querySelector(".textarea-count");
  if (counter) counter.textContent = `${textarea.value.length}/${textarea.maxLength}`;
}

function openNotification(item = null) {
  notificationForm.reset();
  notificationTitle.textContent = item ? "Edit notification or article" : "Create a notification or article";
  notificationSubmit.textContent = item ? "Save" : "Create";
  setContentType("notification");
  if (item) {
    notificationForm.elements.label.value = item.segment;
    notificationForm.elements.title.value = item.title;
    notificationForm.elements.text.value = item.text;
    if (item.push) setContentType("push");
  }
  notificationForm.querySelectorAll("textarea").forEach(updateTextareaCount);
  notificationModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => requestAnimationFrame(() => notificationModal.classList.add("is-open")));
  setTimeout(() => notificationForm.elements.title.focus(), 40);
}
window.openNotification = openNotification;

function closeNotification() {
  if (notificationModal.hidden) return;
  notificationModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  const drawer = notificationModal.querySelector(".promotion-drawer");
  const onEnd = (e) => {
    if (e.target !== drawer || e.propertyName !== "transform") return;
    drawer.removeEventListener("transitionend", onEnd);
    notificationModal.hidden = true;
  };
  drawer.addEventListener("transitionend", onEnd);
}

notificationsTable.addEventListener("click", (event) => {
  if (event.target.closest("#sortNotifications")) {
    notificationState.sortDirection = notificationState.sortDirection === "desc" ? "asc" : "desc";
    renderNotifications();
    return;
  }
  const row = event.target.closest("tbody tr");
  if (!row) return;
  openNotification(NOTIFICATIONS.find((item) => item.id === row.dataset.notification));
});

notificationsTable.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const row = event.target.closest("tbody tr");
  if (row) openNotification(NOTIFICATIONS.find((item) => item.id === row.dataset.notification));
});

notificationSearch.addEventListener("input", () => {
  notificationState.query = notificationSearch.value;
  renderNotifications();
});

document.querySelectorAll("[data-close-notification]").forEach((button) =>
  button.addEventListener("click", closeNotification)
);

notificationForm.querySelectorAll(".content-type-tab").forEach((tab) => {
  tab.addEventListener("click", () => setContentType(tab.dataset.contentType));
});

notificationForm.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("input", () => updateTextareaCount(textarea));
});

notificationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closeNotification();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !notificationModal.hidden) closeNotification();
});

renderNotifications();
