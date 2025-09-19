module.exports = {
  name: "[VX]store_time_info",
  displayName: "Store Time Info",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.1.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    const input = data.input || "";
    const lang = data.lang === "pl" ? "PL" : "EN";
    const variable = data.varName || "";
    return `${input} | ${lang} | ${variable}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let result = "Time";
    return [data.varName, result];
  },

  fields: ["input", "lang", "storage", "varName"],

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
        </style>

      <div style="padding-bottom: 8px;">
        <div style="width: 100%;">
          <span class="dbminputlabel">Format daty (Builder)</span><br>
          <input id="input" class="round" type="text" placeholder="Np. DD.MM.YYYY - HH:mm" style="width: 100%;" value="DD.MM.YYYY - HH:mm">
        </div>
        <div style="margin-top: 8px; width: 100%;">
          <span class="dbminputlabel">Język / Language</span><br>
          <select id="lang" class="round" style="width: 100%;">
            <option value="pl">Polski (PL)</option>
            <option value="en" selected>Angielski (EN)</option>
          </select>
        </div>
        <div id="guide_box" style="margin-top: 12px; padding: 8px; background: #222; color: #fff; border-radius: 6px;"></div>
      </div>
      <br>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const guideBox = document.getElementById("guide_box");
    const langSelect = document.getElementById("lang");
    function setGuide(lang) {
      if (lang === "pl") {
        guideBox.innerHTML = `
          <b>Poradnik:</b><br>
          <ul style="margin: 0 0 0 18px; padding: 0; font-size: 12px;">
            <li><b>DD</b> - dzień (np. 19)</li>
            <li><b>MM</b> - miesiąc (np. 09)</li>
            <li><b>MT</b> - miesiąc tekst (np. września)</li>
            <li><b>YYYY</b> - rok (np. 2025)</li>
            <li><b>HH</b> - godzina (np. 19)</li>
            <li><b>mm</b> - minuta (np. 42)</li>
            <li><b>ss</b> - sekunda (np. 05)</li>
          </ul>
          <span style="font-size: 11px; color: #aaa;">Przykład: <b>DD MT YYYY - HH:mm</b> → 19 września 2025 - 19:42</span>
        `;
      } else {
        guideBox.innerHTML = `
          <b>Guide:</b><br>
          <ul style="margin: 0 0 0 18px; padding: 0; font-size: 12px;">
            <li><b>DD</b> - day (e.g. 19)</li>
            <li><b>MM</b> - month (e.g. 09)</li>
            <li><b>MT</b> - month text (e.g. September)</li>
            <li><b>YYYY</b> - year (e.g. 2025)</li>
            <li><b>HH</b> - hour (e.g. 19)</li>
            <li><b>mm</b> - minute (e.g. 42)</li>
            <li><b>ss</b> - second (e.g. 05)</li>
          </ul>
          <span style="font-size: 11px; color: #aaa;">Example: <b>DD MT YYYY - HH:mm</b> → 19 September 2025 - 19:42</span>
        `;
      }
    }
    if (guideBox && langSelect) {
      setGuide(langSelect.value);
      langSelect.addEventListener("change", function() {
        setGuide(this.value);
      });
    }
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const format = this.evalMessage(data.input, cache) || "DD.MM.YYYY - HH:mm";
    const lang = data.lang || "en";
    const date = new Date();
    // Miesiące PL i EN
    const monthsText = {
      pl: [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
      ],
      en: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };
    // Zamienniki
    let result = format
      .replace(/DD/g, String(date.getDate()).padStart(2, "0"))
      .replace(/MM/g, String(date.getMonth() + 1).padStart(2, "0"))
      .replace(/MT/g, monthsText[lang][date.getMonth()])
      .replace(/YYYY/g, String(date.getFullYear()))
      .replace(/HH/g, String(date.getHours()).padStart(2, "0"))
      .replace(/mm/g, String(date.getMinutes()).padStart(2, "0"))
      .replace(/ss/g, String(date.getSeconds()).padStart(2, "0"));
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
