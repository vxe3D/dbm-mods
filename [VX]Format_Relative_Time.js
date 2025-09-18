module.exports = {
  name: "Format Relative Time",
  section: "# VX - Time",
  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    return `Format timestamp: ${data.timestamp || "?"}`;
  },

  fields: ["timestamp", "storage", "varName2", 'inputStorage', 'varName'],
  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Format Timestamp"];
  },
  html(data) {
    return `
      <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
        <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
        <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
      </div>
      <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
        <span class="vcstatus-version">v3.4.0</span>
      </div>
      <style>
        .vcstatus-author-label {
          color: #BDBDBD;
        }
        .vcstatus-author-name {
          color: #9040d1ff;
        }
        :root {
          --vcstatus-box-width: 64px;
          --vcstatus-box-height: 28px;
          --vcstatus-box-left-width: 100px;
          --vcstatus-box-left-height: 58px;
          --vcstatus-author-font-size: 14px;
          --vcstatus-discord-font-size: 14px;
          --vcstatus-author-margin-top: 0px;
          --vcstatus-discord-margin-top: -2px;
          --vcstatus-box-left-offset: 16px;
          --vcstatus-author-margin-left: 2px;
          --vcstatus-discord-margin-left: 5px;
        }
        .vcstatus-box-fixed {position:fixed;top:2px;z-index:9999;padding:5px 8px;border-radius:10px;font-size:14px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.10);border:1px solid #23272a;background:linear-gradient(90deg,#23243a 0%,#3a3b5a 100%);color:#fff;min-width:120px;max-width:320px;display:flex;flex-direction:column;margin-top:5px;align-items:flex-start;gap:4px;}
        .vcstatus-box-right {right:18px;justify-content:center;color:#ff4d4d;align-items:center;flex-direction:row;width:var(--vcstatus-box-width);min-width:var(--vcstatus-box-width);max-width:var(--vcstatus-box-width);padding:0;flex-shrink:0;font-size:16px;height:var(--vcstatus-box-height);margin-top:-0.5px;box-sizing:border-box;overflow:hidden;}
        .vcstatus-version {color:#9040d1ff;font-weight:bold;font-size:18px;margin:0;padding:0;line-height:1;letter-spacing:0;white-space:nowrap;min-width:0;max-width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;}
        .vcstatus-box-left {left:var(--vcstatus-box-left-offset);width:var(--vcstatus-box-left-width);min-width:var(--vcstatus-box-left-width);max-width:var(--vcstatus-box-left-width);height:var(--vcstatus-box-left-height);}
        .vcstatus-author {color:#ff4d4d;font-weight:bold;font-size:var(--vcstatus-author-font-size);margin-bottom:2px;margin-top:var(--vcstatus-author-margin-top);margin-left:var(--vcstatus-author-margin-left);}
        .vcstatus-discord {color:#5865F2;background:#23272a;border-radius:5px;padding:2px 10px;text-decoration:none;font-weight:bold;font-size:var(--vcstatus-discord-font-size);margin-top:var(--vcstatus-discord-margin-top);margin-left:var(--vcstatus-discord-margin-left);transition:background 0.2s,color 0.2s;box-shadow:0 1px 4px rgba(88,101,242,0.08);}
        .vcstatus-discord:hover {background:#5865F2;color:#fff;text-decoration:underline;}
        .vcstatus-warning {background:linear-gradient(90deg,#4a3252ff 0%,#885697ff 100%);border:1px solid #140e16ff;color:#222;padding:10px 14px;border-radius:8px;margin-bottom:16px;font-size:13px;box-shadow:0 2px 8px rgba(255,85,85,0.08);margin-top:5px;}
        .dbminputlabel {color:#8754ffff;font-weight:bold;}
        input.round {border-radius:6px;border:1px solid #aaa;padding:6px 10px;font-size:14px;background:#21232B;transition:border-color 0.2s;}
        input.round:focus {border-color:#b595ffff;outline:none;}
      </style>

    <div style="padding-top: 8px; width: 100%;">
      <div style="float: left; width: 40%;">
        <retrieve-from-variable allowSlashParams dropdownLabel="Variable" selectId="inputStorage" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="100%" variableInputWidth="100%"></retrieve-from-variable>
      </div>
      <div style="float: right; width: 48%;">
        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
      </div>
      <div style="clear: both;"></div>
    </div>
    `;
  },
  async action(cache) {
    const data = cache.actions[cache.index];
    let input;
    // Obsługa retrieve-from-variable
    if (data.inputStorage && data.varName) {
      const storage = parseInt(data.inputStorage, 10);
      input = this.getVariable(storage, this.evalMessage(data.varName, cache), cache);
      if (typeof input === "string") input = input.trim();
    } else {
      input = this.evalMessage(data.timestamp, cache)?.trim();
    }
    let timestamp;
    if (input === "now") {
      timestamp = Math.floor(Date.now() / 1000);
    } else if (input && typeof input === "string" && input.startsWith("<t:")) {
      const match = input.match(/<t:(\d+)(?::\w)?>/);
      if (match) {
        timestamp = parseInt(match[1], 10);
      }
    } else {
      timestamp = parseInt(input, 10);
    }
    if (isNaN(timestamp)) {
      this.storeValue("", parseInt(data.storage, 10), this.evalMessage(data.varName2, cache), cache);
      return this.callNextAction(cache);
    }
  // Zawsze licz różnicę względem teraz (absolutna wartość)
  let seconds = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  const d = Math.floor(seconds / 86400);
  seconds %= 86400;
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  let parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  const result = parts.join(" ");
  this.storeValue(result, parseInt(data.storage, 10), this.evalMessage(data.varName2, cache), cache);
  this.callNextAction(cache);
  },
  mod() {},
};
