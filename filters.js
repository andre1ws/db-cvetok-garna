/* Reusable filter builder: one instance per section.

   Two lists, deliberately separate:
     staged  -- what the popover is editing
     applied -- what the table is actually filtered by
   Confirm copies staged into applied. Keeping them apart is what stops an
   unconfirmed filter from leaking into the table when something else
   (typing in search, sorting) triggers a re-render.

   Ids are avoided on purpose -- several popovers live on the same page, so
   every control is addressed through data-role scoped to its own panel. */

const filterUnique = (list) => [...new Set(list.filter(Boolean))].sort();

const filterEscape = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

const sameFilter = (a, b) =>
  a.fieldKey === b.fieldKey && a.condition === b.condition && a.value === b.value;

function createFilter({ toggle, panel, presets, active, fields, getValue, onApply }) {
  const state = { staged: [], applied: [], presets: [] };
  let draft = { fieldKey: "", condition: "is", value: "" };
  let editingPresetId = null;

  const fieldLabel = (key) => fields.find((f) => f.key === key)?.label || key;
  const conditionLabel = (c) => (c === "empty" ? "is empty" : c === "isnot" ? "is not" : "is");
  const q = (role) => panel.querySelector(`[data-role="${role}"]`);

  const describe = (f) =>
    `<b>${filterEscape(fieldLabel(f.fieldKey))}</b> ${conditionLabel(f.condition)}${
      f.condition !== "empty" ? ` <em>${filterEscape(f.value)}</em>` : ""
    }`;

  function updateToggleState() {
    toggle.classList.toggle("is-active", state.applied.length > 0);
    const count = toggle.querySelector("[data-role='count']");
    if (state.applied.length) {
      if (count) count.textContent = state.applied.length;
      else toggle.insertAdjacentHTML("beforeend", `<span class="filter-count" data-role="count">${state.applied.length}</span>`);
    } else if (count) {
      count.remove();
    }
  }

  /* ---------- popover ---------- */

  /* Flip to the trigger's right edge when opening left-aligned would run
     off screen -- the toolbar wraps below 1024px and pushes the trigger right. */
  function position() {
    panel.classList.remove("is-right");
    if (panel.getBoundingClientRect().right > window.innerWidth - 12) {
      panel.classList.add("is-right");
    }
  }

  function open() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    state.staged = state.applied.map((f) => ({ ...f }));
    draft = { fieldKey: "", condition: "is", value: "" };
    renderPanel();
    position();
    panel.querySelector("[data-role='field']")?.focus();
  }

  window.addEventListener("resize", () => {
    if (!panel.hidden) position();
  });

  function close() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.hidden ? open() : close();
  });

  document.addEventListener("click", (e) => {
    if (panel.hidden) return;
    if (panel.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      close();
      toggle.focus();
    }
  });

  /* ---------- rendering ---------- */

  function renderPanel() {
    const field = fields.find((f) => f.key === draft.fieldKey);
    const needsValue = draft.condition !== "empty";
    const dirty = state.staged.length !== state.applied.length ||
      state.staged.some((f, i) => !sameFilter(f, state.applied[i] || {}));

    panel.innerHTML = `
    <div class="pop-head">
      <span class="pop-title">Filter</span>
      <button type="button" class="pop-close" data-role="close" aria-label="Close">&times;</button>
    </div>

    <div class="pop-body">
      <label class="pop-field">
        <span>Field</span>
        <select class="field-control" data-role="field">
          <option value="">Choose a field</option>
          ${fields
            .map((f) => `<option value="${f.key}"${f.key === draft.fieldKey ? " selected" : ""}>${f.label}</option>`)
            .join("")}
        </select>
      </label>

      ${
        field
          ? `<div class="pop-field">
        <span>Condition</span>
        <div class="condition-tabs" role="tablist">
          ${["is", "isnot", "empty"]
            .map(
              (c) =>
                `<button type="button" class="condition-tab${draft.condition === c ? " is-active" : ""}" data-condition="${c}">${
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
          ? `<label class="pop-field">
        <span>Value</span>
        <select class="field-control" data-role="value">
          <option value="">Choose a value</option>
          ${field
            .options()
            .map((o) => `<option value="${filterEscape(o)}"${o === draft.value ? " selected" : ""}>${filterEscape(o)}</option>`)
            .join("")}
        </select>
      </label>`
          : ""
      }

      ${
        field
          ? `<button type="button" class="pop-add" data-role="add"${draftReady() ? "" : " disabled"}>
        Add filter
      </button>`
          : ""
      }

      ${
        state.staged.length
          ? `<div class="pop-list">
        <div class="pop-list-head">
          <span>Added${dirty ? ' <em class="pop-dirty">not applied</em>' : ""}</span>
          <button type="button" class="filter-clear" data-role="clear">Clear all</button>
        </div>
        ${state.staged
          .map(
            (f, i) => `<span class="filter-chip">
          ${describe(f)}
          <button type="button" class="filter-chip-remove" data-remove-filter="${i}" aria-label="Remove filter">&times;</button>
        </span>`
          )
          .join("")}
      </div>`
          : '<p class="pop-empty">No filters yet. Build one above, then press Add filter.</p>'
      }

      <div class="pop-preset">
        <input type="text" class="field-control" data-role="preset-name" placeholder="Save as preset" />
        <button type="button" class="filter-btn" data-role="create-preset"${state.staged.length ? "" : " disabled"}>Save</button>
      </div>
      ${editingPresetId ? '<button type="button" class="danger-btn pop-delete" data-role="delete-preset">Delete this preset</button>' : ""}
    </div>

    <div class="pop-foot">
      <button type="button" class="primary-btn pop-confirm" data-role="confirm">Confirm</button>
    </div>`;
  }

  function renderPresets() {
    presets.innerHTML = state.presets
      .map((p) => {
        const name = filterEscape(p.name);
        const id = filterEscape(p.id);
        return `<span class="preset-chip${p.id === editingPresetId ? " is-active" : ""}">
        <button type="button" class="preset-chip-label" data-preset="${id}">${name}</button>
        <button type="button" class="preset-chip-remove" data-preset-remove="${id}" aria-label="Delete preset ${name}" title="Delete preset">&times;</button>
      </span>`;
      })
      .join("");
  }

  /* Toolbar chips mirror what the table is actually filtered by, never the draft. */
  function renderActive() {
    if (!active) return;
    active.innerHTML = state.applied
      .map(
        (f, i) => `<span class="filter-chip">
      ${describe(f)}
      <button type="button" class="filter-chip-remove" data-drop-applied="${i}" aria-label="Remove filter">&times;</button>
    </span>`
      )
      .join("");
  }

  const draftReady = () =>
    Boolean(draft.fieldKey) && (draft.condition === "empty" || Boolean(draft.value));

  function addDraftFilter() {
    if (!draftReady()) return;
    state.staged.push({ ...draft });
    draft = { fieldKey: "", condition: "is", value: "" };
    editingPresetId = null;
    renderPanel();
    renderPresets();
  }

  function apply() {
    state.applied = state.staged.map((f) => ({ ...f }));
    updateToggleState();
    renderActive();
    onApply();
  }

  /* ---------- panel events ---------- */

  panel.addEventListener("change", (e) => {
    const role = e.target.dataset.role;
    if (role === "field") {
      draft = { fieldKey: e.target.value, condition: "is", value: "" };
      renderPanel();
    } else if (role === "value") {
      draft.value = e.target.value;
      renderPanel();
    }
  });

  panel.addEventListener("click", (e) => {
    e.stopPropagation();

    const condBtn = e.target.closest("[data-condition]");
    if (condBtn) {
      draft.condition = condBtn.dataset.condition;
      draft.value = "";
      renderPanel();
      return;
    }

    const removeBtn = e.target.closest("[data-remove-filter]");
    if (removeBtn) {
      state.staged.splice(Number(removeBtn.dataset.removeFilter), 1);
      editingPresetId = null;
      renderPanel();
      renderPresets();
      return;
    }

    const role = e.target.closest("[data-role]")?.dataset.role;

    if (role === "add") return addDraftFilter();

    if (role === "close") return close();

    if (role === "clear") {
      state.staged = [];
      editingPresetId = null;
      renderPanel();
      renderPresets();
      return;
    }

    if (role === "confirm") {
      apply();
      close();
      return;
    }

    if (role === "create-preset") {
      const name = q("preset-name").value.trim();
      if (!name || !state.staged.length) return;
      const preset = { id: `preset-${Date.now()}-${state.presets.length}`, name, filters: state.staged.map((f) => ({ ...f })) };
      state.presets.push(preset);
      editingPresetId = preset.id;
      renderPresets();
      renderPanel();
      return;
    }

    if (role === "delete-preset") {
      state.presets = state.presets.filter((p) => p.id !== editingPresetId);
      editingPresetId = null;
      renderPresets();
      renderPanel();
    }
  });

  /* ---------- toolbar chips: these act on applied state, so they take effect at once ---------- */

  if (active) {
    active.addEventListener("click", (e) => {
      const drop = e.target.closest("[data-drop-applied]");
      if (!drop) return;
      const i = Number(drop.dataset.dropApplied);
      const removed = state.applied[i];
      state.applied.splice(i, 1);
      const s = state.staged.findIndex((f) => sameFilter(f, removed));
      if (s > -1) state.staged.splice(s, 1);
      updateToggleState();
      renderActive();
      if (!panel.hidden) renderPanel();
      onApply();
    });
  }

  presets.addEventListener("click", (e) => {
    const remove = e.target.closest("[data-preset-remove]");
    if (remove) {
      // Dropping a saved shortcut must not change what the table shows.
      const id = remove.dataset.presetRemove;
      state.presets = state.presets.filter((p) => p.id !== id);
      if (editingPresetId === id) editingPresetId = null;
      renderPresets();
      if (!panel.hidden) renderPanel();
      return;
    }

    const btn = e.target.closest("[data-preset]");
    if (!btn) return;

    if (btn.dataset.preset === editingPresetId) {
      state.staged = [];
      editingPresetId = null;
    } else {
      const preset = state.presets.find((p) => p.id === btn.dataset.preset);
      if (!preset) return;
      state.staged = preset.filters.map((f) => ({ ...f }));
      editingPresetId = preset.id;
    }

    draft = { fieldKey: "", condition: "is", value: "" };
    renderPresets();
    if (!panel.hidden) renderPanel();
    apply();
  });

  return {
    matches(item) {
      return state.applied.every((f) => {
        const value = getValue(item, f.fieldKey);
        // multi-value columns (a row carrying several tags) match on contains
        if (Array.isArray(value)) {
          if (f.condition === "empty") return value.length === 0;
          const has = value.includes(f.value);
          return f.condition === "isnot" ? !has : has;
        }
        if (f.condition === "empty") return !value;
        if (f.condition === "isnot") return value !== f.value;
        return value === f.value;
      });
    },
    hasFilters: () => state.applied.length > 0,
  };
}
