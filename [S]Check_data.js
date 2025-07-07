const fs = require("fs");
const path = require("path");

module.exports = {
  name: "Check Data",
  section: "# SHDZ - Utilities",

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  meta: {
    version: "1.2.2",
    preciseCheck: true,
    author: "ChatGPT (modified for ShadowZ)",
  },

  fields: ["dataName", "value", "fileName", "comparison", "branch"],

  html(isEvent, data) {
    return `
<div style="padding-top: 8px; display: flex; gap: 12px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">Data Name</span><br>
    <input id="dataName" class="round" type="text" placeholder="np. available-forms">
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">File Name (bez .json)</span><br>
    <input id="fileName" class="round" type="text" placeholder="recruitment">
  </div>
</div>

<div style="padding-top: 8px; display: flex; gap: 12px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">Comparison Type</span><br>
    <select id="comparison" class="round">
      <option value="0">Exists</option>
      <option value="1" selected>Equals</option>
      <option value="2">Equals Exactly</option>
      <option value="3">Less Than</option>
      <option value="4">Greater Than</option>
      <option value="5">Includes</option>
      <option value="6">Matches Regex</option>
      <option value="7">Not Equals</option>
      <option value="8">Length Greater Than</option>
      <option value="9">Length Less Than</option>
    </select>
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">Wartość do sprawdzenia</span><br>
    <input id="value" class="round" type="text" placeholder="np. user123">
  </div>
</div>

<hr class="subtlebar">
<conditional-input id="branch" style="padding-top: 16px;"></conditional-input>`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const dataName = this.evalMessage(data.dataName, cache)?.trim();
    let val2 = this.evalMessage(data.value, cache)?.trim();
    const fileName = this.evalMessage(data.fileName, cache)?.trim();
    const compare = parseInt(data.comparison, 10);
    let result = false;
    
    if (!fileName) {
      console.warn("[Check Data] ❌ Nie podano File Name.");
      this.executeResults(result, data.branch ?? data, cache);
      return;
    }

    const filePath = path.resolve(__dirname, "../data", `${fileName}.json`);

    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`[Check Data] ❌ Plik nie istnieje: ${fileName}.json`);
      } else {
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let rawValue = fileData[dataName];
        if (rawValue === undefined) {
          console.warn(`[Check Data] ⚠️ Nie znaleziono wartości pod kluczem "${dataName}", ustawiam na 0.`);
          rawValue = 0;
        }

        const values = Array.isArray(rawValue) ? rawValue : [rawValue];
        for (const val1 of values) {
          let pass = false;
          let v2 = val2;

          if (compare !== 6) v2 = this.eval(val2, cache);
          if (v2 === false) v2 = val2;

          switch (compare) {
            case 0: pass = val1 !== undefined; break;
            case 1: pass = val1 == v2; break;
            case 2: pass = val1 === v2; break;
            case 3: pass = val1 < v2; break;
            case 4: pass = val1 > v2; break;
            case 5: pass = typeof val1?.includes === "function" && val1.includes(v2); break;
            case 6: pass = Boolean(val1?.toString().match(new RegExp("^" + v2 + "$", "i"))); break;
            case 7: pass = val1 != v2; break;
            case 8: pass = typeof val1 === "string" && val1.length > Number(v2); break;
            case 9: pass = typeof val1 === "string" && val1.length < Number(v2); break;
            default:
              console.warn(`[Check Data] ❓ Nieznany typ porównania: ${compare}`);
              break;
          }

          if (pass) {
            result = true;
            break;
          }
        }
      }
    } catch (err) {
      console.error(`[Check Data] ❌ Błąd przy sprawdzaniu pliku "${fileName}.json":`, err);
    }

    this.executeResults(result, data.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() {},
};
