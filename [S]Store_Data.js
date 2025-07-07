const fs = require("fs");
const path = require("path");

module.exports = {
  name: "Store Data",
  section: "# SHDZ - Utilities",

  meta: { version: "1.1.0", preciseCheck: true, author: "ShadowZ / ChatGPT" },

  fields: ["dataName", "defaultVal", "fileName", "storage", "varName2"],

  subtitle(data, presets) {
    return `Get text from ${data.dataName} in ${data.fileName || "null"}.json → ${presets.getVariableText(data.storage, data.varName2)}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Text"];
  },

  html() {
    return `
<div style="padding-top: 8px; display: flex; gap: 12px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">Data Name</span><br>
    <input id="dataName" class="round" type="text">
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">Default Value</span><br>
    <input id="defaultVal" class="round" type="text">
  </div>
</div>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">File Name (bez .json)</span><br>
  <input id="fileName" class="round" type="text" placeholder="recruitment">
</div>

<br>

<store-in-variable style="padding-top: 8px;" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const dataName = this.evalMessage(data.dataName, cache);
    const defVal = this.evalMessage(data.defaultVal, cache) || "";
    const fileName = this.evalMessage(data.fileName, cache) || "null";

    const filePath = path.resolve(__dirname, `../data/${fileName}.json`);

    let result = defVal;
    if (fs.existsSync(filePath)) {
      try {
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (Array.isArray(fileData[dataName]) && fileData[dataName].length > 0) {
          result = fileData[dataName][0];
        }
      } catch (err) {
        console.error(`[Store Recruitment] Błąd podczas odczytu pliku ${fileName}.json`, err);
      }
    }

    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(result, storage, varName2, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
