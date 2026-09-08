/* Reusable filter builder: one instance per section.
   Ids are avoided on purpose -- several panels live on the same page, so
   every control is addressed through data-role scoped to its own panel. */

const filterUnique = (list) => [...new Set(list.filter(Boolean))].sort();

const filterEscape = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

function createFilter({ toggle, panel, presets, fields, getValue, onApply }) {
  const state = { filters: [], presets: [] };
  let draft = { fieldKey: "", condition: "is", value: "" };
  let editingPresetId = null;

  const fieldLabel = (key) => fields.find((f) => f.key === key)?.label || key;
  const conditionLabel = (c) => (c === "empty" ? "Empty" : c === "isnot" ? "is not" : "is");
  const q = (role) => panel.querySelector(`[data-role="${role}"]`);

  function updateToggleState() {
    toggle.classList.toggle("is-active", state.filters.length > 0);
  }

  function renderPanel() {
    const field = fields.find((f) => f.key === draft.fieldKey);
    const needsValue = draft.condition !== "empty";

    panel.innerHTML = `
    <div class="filter-row">
      <label class="form-field">
        <span>Value</span>
        <select class="field-control" data-role="field">
          <option value="">Choose</option>
          ${fields
            .map((f) => `<option value="${f.key}"${f.key === draft.fieldKey ? " selected" : ""}>${f.label}</option>`)
            .join("")}
        </select>
      </label>
      ${
        field
          ? `<div class="form-field is-auto">
        <span>Condition</span>
        <div class="condition-tabs" role="tablist">
          ${["empty", "is", "isnot"]
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
          ? `<label class="form-field is-grow">
        <span>Choose</span>
        <select class="field-control" data-role="value">
          <option value="">Choose</option>
          ${field
            .options()
            .map((o) => `<option value="${filterEscape(o)}"${o === draft.value ? " selected" : ""}>${filterEscape(o)}</option>`)
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
            <b>${filterEscape(fieldLabel(f.fieldKey))}</b> ${conditionLabel(f.condition)}${
                    f.condition !== "empty" ? ` <em>${filterEscape(f.value)}</em>` : ""
                  }
            <button type="button" class="filter-chip-remove" data-remove-filter="${i}" aria-label="Remove filter">&times;</button>
          </span>`
                )
                .join("") + '<button type="button" class="filter-clear" data-role="clear">Clear</button>'
        }
      </div>
    </div>

    <div class="filter-footer">
      ${editingPresetId ? '<button type="button" class="danger-btn" data-role="delete-preset">Delete preset</button>' : "<span></span>"}
      <div class="filter-footer-right">
        <input type="text" class="field-control filter-preset-input" data-role="preset-name" placeholder="Enter the preset name" />
        <button type="button" class="filter-btn" data-role="create-preset"${state.filters.length ? "" : " disabled"}>Create</button>
        <button type="button" class="primary-btn" data-role="confirm">Confirm</button>
      </div>
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

  function addDraftFilter() {
    state.filters.push({ ...draft });
    draft = { fieldKey: "", condition: "is", value: "" };
    editingPresetId = null;
    renderPanel();
    renderPresets();
  }

  toggle.addEventListener("click", () => {
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    toggle.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) renderPanel();
  });

  panel.addEventListener("change", (e) => {
    const role = e.target.dataset.role;
    if (role === "field") {
      draft = { fieldKey: e.target.value, condition: "is", value: "" };
      renderPanel();
    } else if (role === "value") {
      draft.value = e.target.value;
      if (draft.value) addDraftFilter();
      else renderPanel();
    }
  });

  panel.addEventListener("click", (e) => {
    const condBtn = e.target.closest("[data-condition]");
    if (condBtn) {
      draft.condition = condBtn.dataset.condition;
      if (draft.condition === "empty") addDraftFilter();
      else {
        draft.value = "";
        renderPanel();
      }
      return;
    }

    const removeBtn = e.target.closest("[data-remove-filter]");
    if (removeBtn) {
      state.filters.splice(Number(removeBtn.dataset.removeFilter), 1);
      editingPresetId = null;
      renderPanel();
      renderPresets();
      updateToggleState();
      onApply();
      return;
    }

    const role = e.target.closest("[data-role]")?.dataset.role;

    if (role === "clear") {
      state.filters = [];
      editingPresetId = null;
      renderPanel();
      renderPresets();
      updateToggleState();
      onApply();
      return;
    }

    if (role === "confirm") {
      updateToggleState();
      onApply();
      return;
    }

    if (role === "create-preset") {
      const name = q("preset-name").value.trim();
      if (!name || !state.filters.length) return;
      const preset = { id: `preset-${Date.now()}-${state.presets.length}`, name, filters: state.filters.map((f) => ({ ...f })) };
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

  presets.addEventListener("click", (e) => {
    const remove = e.target.closest("[data-preset-remove]");
    if (remove) {
      // Mirrors "Delete preset": the panel stages filters and the table
      // applies them on Confirm, so dropping a saved shortcut must not
      // re-render the table on its own.
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
      state.filters = [];
      editingPresetId = null;
    } else {
      const preset = state.presets.find((p) => p.id === btn.dataset.preset);
      if (!preset) return;
      state.filters = preset.filters.map((f) => ({ ...f }));
      editingPresetId = preset.id;
    }

    draft = { fieldKey: "", condition: "is", value: "" };
    updateToggleState();
    renderPresets();
    if (!panel.hidden) renderPanel();
    onApply();
  });

  return {
    matches(item) {
      return state.filters.every((f) => {
        const value = getValue(item, f.fieldKey);
        if (f.condition === "empty") return !value;
        if (f.condition === "isnot") return value !== f.value;
        return value === f.value;
      });
    },
    hasFilters: () => state.filters.length > 0,
  };
}
