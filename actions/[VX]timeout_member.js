module.exports = {
  name: "[VX]timeout_member",
  displayName: "Timeout Member",
  section: "# VX - Member(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.1.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  variableStorage(data, varType) {
    if (parseInt(data.resultVarType, 10) !== varType) return;
    return [data.resultVar, "Timeout"];
  },

  subtitle(data, presets) {
    const member = presets.getMemberText(data.member, data.varName);
    const time = data.time || "";
    const reason = data.reason || "";
    const variable = data.resultVar || "";
    const parts = [member, time, reason, variable].filter((v) => v && String(v).trim() !== "");
    return parts.join(" | ");
  },

  fields: ["member", "varName", "time", "reason", "resultVar", "resultVarType"],

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

      <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

      <br><br><br>

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Time</span><br>
        <input id="time" class="round" placeholder="Np. 1d 5m 30s lub 1y 24d 13m 10s" type="text">
        <div style="font-size:11px;color:#aaa;margin-top:2px;">Możesz użyć: <b>d</b> (dni), <b>h</b> (godziny), <b>m</b> (minuty), <b>s</b> (sekundy). Przykład: <b>1d 5m 30s</b> | <b>Limit to 28 dni!</b></div>
      </div>

      <div style="padding-top: 16px;">
        <span class="dbminputlabel">Reason</span><br>
        <textarea id="reason" class="dbm_monospace" rows="5" placeholder="Insert reason here..." style="white-space: nowrap; resize: none;"></textarea>
      </div>
      <br>
      <store-in-variable dropdownLabel="Store Result In" selectId="resultVarType" variableContainerId="resultVarContainer" variableInputId="resultVar"></store-in-variable>
      <div style="font-size:12px;color:#aaa;margin-top:2px;">(<b>invalidtime</b> - Nieprawidłowy czas | <b>nonetime</b> - Brak podanego czasu | <b>noperms</b> - Brak uprawnień)</div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );

    function parseTime(str) {
      if (!str) return null;
      let total = 0;
      const units = {
        d: 24 * 60 * 60,
        h: 60 * 60,
        m: 60,
        s: 1
      };
      const pattern = /([0-9]+)\s*(d|h|m|s)/gi;
      let match;
      while ((match = pattern.exec(str))) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (!units[unit]) return null;
        total += value * units[unit];
      }
      return total > 0 ? total : null;
    }

    let timeStr = this.evalMessage(data.time, cache);
    let timeSec = parseTime(timeStr);
    if (timeSec && timeSec > 2419200) {
      const resultVarType = parseInt(data.resultVarType, 10);
      const resultVar = this.evalMessage(data.resultVar, cache);
      if (resultVar) this.storeValue("invalidtime", resultVarType, resultVar, cache);
      this.callNextAction(cache);
      return;
    }
    let time = timeSec ? Date.now() + timeSec * 1000 : null;
    let reason = this.evalMessage(data.reason, cache);

    if (!reason || String(reason).trim() === "") {
      const now = new Date();
      const pad = (n) => n < 10 ? '0'+n : n;
      const dateStr = `${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()} - ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      let admin = null;
      if (cache.msg && cache.msg.member && cache.msg.member.displayName) {
        admin = cache.msg.member.displayName;
      } else if (cache.msg && cache.msg.author && cache.msg.author.username) {
        admin = cache.msg.author.username;
      }
      reason = admin ? `${dateStr} | ${admin}` : dateStr;
    }

    const resultVarType = parseInt(data.resultVarType, 10);
    const resultVar = this.evalMessage(data.resultVar, cache);
    const storeResult = (val) => {
      if (resultVar) this.storeValue(val, resultVarType, resultVar, cache);
    };

    if (!timeSec) {
      storeResult("nonetime");
      this.callNextAction(cache);
      return;
    }

    const guild = member?.guild;
    const botMember = guild?.me || (guild && guild.members.me);
    if (member && botMember && member.id !== botMember.id) {
      if (member.id === guild.ownerId) {
        storeResult("noperms");
        this.callNextAction(cache);
        return;
      }
      if (botMember.roles && member.roles) {
        const botHighest = botMember.roles.highest?.position || 0;
        const memberHighest = member.roles.highest?.position || 0;
        if (memberHighest >= botHighest) {
          storeResult("noperms");
          this.callNextAction(cache);
          return;
        }
      }
    }

    if (Array.isArray(member)) {
      this.callListFunc(member, "disableCommunicationUntil", [time, reason])
        .then(() => { storeResult(true); this.callNextAction(cache); })
        .catch((err) => {
          if (err && err.code === 50013) {
            storeResult("noperms");
            this.callNextAction(cache);
          } else {
            storeResult(false);
            this.displayError(data, cache, err);
          }
        });
    } else if (member?.disableCommunicationUntil) {
      member
        .disableCommunicationUntil(time, reason)
        .then(() => { storeResult(true); this.callNextAction(cache); })
        .catch((err) => {
          if (err && err.code === 50013) {
            storeResult("noperms");
            this.callNextAction(cache);
          } else {
            storeResult(false);
            this.displayError(data, cache, err);
          }
        });
    } else {
      storeResult(false);
      this.callNextAction(cache);
    }
  },

  mod() {},
};
