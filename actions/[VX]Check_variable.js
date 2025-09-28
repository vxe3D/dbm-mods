module.exports = {
  name: "[VX]Check_variable",
  displayName: "Check Variable",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.0.1",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "varName", "comparison", "value", "branch"],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
  const actionFilename = (this.name ? this.name + ".js" : "[VX]store_server_info.js");
  window.__VX_ACTION_VERSION = actionVersion;
  window.__VX_ACTION_FILENAME = actionFilename;
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
          <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
        </div>
        <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
          <span class="vcstatus-version">v${actionVersion}</span>
        </div>
        <div id="vx-version-warning" style="position:fixed; top:52px; right:218px; min-width:120px; max-width:320px; z-index:9999;"></div>
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
          .vcstatus-warning {background: linear-gradient(90deg, #890000 0%, #B57070 100%);border: 1px solid #5a2323;color: #fff;padding: 1px 2px;border-radius: 8px;margin-bottom: 8px;font-size: 11px;font-weight:bold;box-shadow: 0 2px 8px rgba(137,0,0,0.10);margin-top: 4px;text-align: center;}
          .dbminputlabel {color:#8754ffff;font-weight:bold;}
          input.round {border-radius:6px;border:1px solid #aaa;padding:6px 10px;font-size:14px;background:#21232B;transition:border-color 0.2s;}
          input.round:focus {border-color:#b595ffff;outline:none;}
          #comparison.round {background-color: #1e1e1e;color: #eee;}
          #comparison.round option {background-color: #2c2f33;color: #eee;padding: 6px;}
          optgroup {margin-top: 10px;font-weight: bold;color: #ddd;}
        </style>

      <retrieve-from-variable allowSlashParams dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

      <br><br><br>

      <div style="padding-top: 8px;">
        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Comparison Type</span><br>
          <select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
            <optgroup label="Existence">
              <option value="0">Exists</option>
            </optgroup>
            <optgroup label="Equality">
              <option value="1" selected>Equals</option>
              <option value="2">Equals Exactly</option>
            </optgroup>
            <optgroup label="Numbers">
              <option value="3">Less Than</option>
              <option value="4">Greater Than</option>
            </optgroup>
            <optgroup label="Text/String">
              <option value="5">Includes</option>
              <option value="6">Matches Regex</option>
              <option value="7">Starts With</option>
              <option value="8">Ends With</option>
            </optgroup>
            <optgroup label="Length">
              <option value="9">Length Equals</option>
              <option value="10">Length is Greater Than</option>
              <option value="11">Length is Less Than</option>
            </optgroup>
          </select>
        </div>
        <div style="float: right; width: 60%;" id="directValue">
          <span class="dbminputlabel">Value to Compare to</span><br>
          <input id="value" class="round" type="text" name="is-eval">
        </div>
      </div>

      <br><br><br>

      <hr class="subtlebar">

      <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("directValue").style.display = "none";
      } else {
        document.getElementById("directValue").style.display = null;
      }
    };

    glob.onComparisonChanged(document.getElementById("comparison"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(type, varName, cache);
    let result = false;

    let val1 = variable;
    const compare = parseInt(data.comparison, 10);
    let val2 = data.value;

    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);

    if (typeof val2 === "string") {
      if (val2.toLowerCase() === "true") val2 = true;
      if (val2.toLowerCase() === "false") val2 = false;
    }

    function toStr(val) {
      if (val == null) return "";
      if (typeof val === "object") return JSON.stringify(val);
      return String(val);
    }
    function toNum(val) {
      if (typeof val === "number") return val;
      if (typeof val === "boolean") return val ? 1 : 0;
      if (typeof val === "string" && val.trim() !== "") return Number(val);
      if (Array.isArray(val)) return val.length;
      return 0;
    }
    function toArr(val) {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return val.split("");
      if (val != null) return [val];
      return [];
    }

    switch (compare) {
      case 0: // Exists
        result = typeof val1 !== "undefined";
        break;
      case 1: // Equals (loose)
        result = toStr(val1) == toStr(val2);
        break;
      case 2: // Equals Exactly (strict)
        result = toStr(val1) === toStr(val2);
        break;
      case 3: // Less Than
        result = toNum(val1) < toNum(val2);
        break;
      case 4: // Greater Than
        result = toNum(val1) > toNum(val2);
        break;
      case 5: // Includes
        {
          let arr = Array.isArray(val1) ? val1 : toStr(val1);
          if (Array.isArray(arr)) {
            result = arr.includes(val2);
          } else {
            result = arr.includes(toStr(val2));
          }
        }
        break;
      case 6: // Matches Regex
        {
          try {
            const regex = new RegExp(val2, "i");
            result = regex.test(toStr(val1));
          } catch {
            result = false;
          }
        }
        break;
      case 7: // Starts With
        result = toStr(val1).startsWith(toStr(val2));
        break;
      case 8: // Ends With
        result = toStr(val1).endsWith(toStr(val2));
        break;
      case 9: // Length Equals
        {
          let len = Array.isArray(val1) ? val1.length : toStr(val1).length;
          result = len === toNum(val2);
        }
        break;
      case 10: // Length Greater Than
        {
          let len = Array.isArray(val1) ? val1.length : toStr(val1).length;
          result = len > toNum(val2);
        }
        break;
      case 11: // Length Less Than
        {
          let len = Array.isArray(val1) ? val1.length : toStr(val1).length;
          result = len < toNum(val2);
        }
        break;
    }
    this.executeResults(result, data?.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() {},
};
