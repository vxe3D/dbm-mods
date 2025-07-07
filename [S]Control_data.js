const fs = require("fs");
const path = require("path");

module.exports = {
  name: "Control Data",
  section: "# SHDZ - Utilities",

  subtitle(data) {
    const controlMap = { "0": "Set", "1": "Add", "2": "Delete" };
    return `${data.dataName} ${controlMap[data.changeType] || "?"} ${data.value} [${data.fileName || "null"}]`;
  },

  meta: { version: "1.2.0", preciseCheck: true, author: "ShadowZ / ChatGPT" },

  fields: ["dataName", "changeType", "value", "fileName"],

  html() {
    return `
<div style="padding-top: 8px; display: flex; gap: 12px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">Data Name</span><br>
    <input id="dataName" class="round" type="text" placeholder="np. user123">
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">File Name (bez .json)</span><br>
    <input id="fileName" class="round" type="text" placeholder="recruitment">
  </div>
</div>
<br>
<div style="padding-top: 8px;">
  <span class="dbminputlabel">Control Type</span><br>
  <select id="changeType" class="round">
    <option value="0" selected>Set (replace all)</option>
    <option value="1">Add (push value)</option>
    <option value="2">Delete</option>
  </select>
</div>
<br>
<div style="padding-top: 8px;">
  <span class="dbminputlabel">Value</span><br>
  <input id="value" class="round" type="text" name="is-eval">
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const dataName = this.evalMessage(data.dataName, cache)?.trim();
    const fileName = this.evalMessage(data.fileName, cache)?.trim() || "null";
    const controlType = data.changeType;
    let val = this.evalMessage(data.value, cache);

    try {
      val = this.eval(val, cache);
    } catch (err) {
      this.displayError(data, cache, err);
      return this.callNextAction(cache);
    }

    const filePath = path.resolve(__dirname, `../data/${fileName}.json`);
    let fileData = {};

    try {
      if (fs.existsSync(filePath)) {
        fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      }
    } catch (err) {
      console.error(`[Control Data] Błąd odczytu pliku: ${fileName}.json`, err);
    }

    if (controlType === "0") {
      // Set (replace all)
      fileData[dataName] = Array.isArray(val) ? val : [val];
    } else if (controlType === "1") {
      // Add (push value)
      if (!fileData[dataName]) fileData[dataName] = [];
      if (!fileData[dataName].includes(val)) fileData[dataName].push(val);
    } else if (controlType === "2") {
      // Delete
      if (!val) {
        // Usuń cały wpis
        delete fileData[dataName];
      } else {
        // Usuń tylko konkretną wartość
        if (Array.isArray(fileData[dataName])) {
          fileData[dataName] = fileData[dataName].filter((item) => item !== val);
          if (fileData[dataName].length === 0) delete fileData[dataName]; // Opcjonalne: usuń, jeśli pusta
        }
      }
    }

    try {
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    } catch (err) {
      console.error(`[Control Data] Błąd zapisu do pliku: ${fileName}.json`, err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
