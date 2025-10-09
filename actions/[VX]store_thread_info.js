module.exports = {
  name: "[VX]store_thread_info",
  displayName: "Store Thread Info",
  section: "# VX - Channel(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "1.0.1",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    const info = [
      "Thread Object",
      "Thread ID",
      "Thread Owner ID",
      "Thread Parent ID",
      "Thread Archived",
      "Thread Auto Archive Duration",
      "Thread Locked",
      "Thread Rate Limit Per User",
      "Thread Member Count",
      "Thread Message Count",
      "Thread Metadata",
      "Archiver ID (Metadata)",
      "Archive Timestamp (Metadata)",
      "Invitable (Metadata)",
      "Create Timestamp (Metadata)"
    ];
    return `${presets.getChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0: dataType = "ThreadChannel"; break;
      case 1: dataType = "String"; break;
      case 2: dataType = "String"; break;
      case 3: dataType = "String"; break;
      case 4: dataType = "Boolean"; break;
      case 5: dataType = "Number"; break;
      case 6: dataType = "Boolean"; break;
      case 7: dataType = "Number"; break;
      case 8: dataType = "Number"; break;
      case 9: dataType = "Number"; break;
      case 10: dataType = "ThreadMetadata"; break;
      case 11: dataType = "String"; break;
      case 12: dataType = "Number"; break;
      case 13: dataType = "Boolean"; break;
      case 14: dataType = "Number"; break;
    }
    return [data.varName2, dataType];
  },

  fields: ["channel", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
    const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
    const actionFilename = (this.name ? this.name + ".js" : "[VX]store_thread_info.js");
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
        .vcstatus-author-label { color: #BDBDBD; }
        .vcstatus-author-name { color: #9040d1ff; }
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
        #info.round {background-color: #1e1e1e;color: #eee;}
        #info.round option {background-color: #2c2f33;color: #eee;padding: 6px;}
        optgroup {margin-top: 10px;font-weight: bold;color: #ddd;}
      </style>

      <channel-input dropdownLabel="Source Thread Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
      <br><br><br>
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Source Info</span><br>
        <select id="info" class="round">
          <optgroup label="⭐ General">
            <option value="0">⚙️ Thread Object</option>
            <option value="1">🆔 Thread ID</option>
            <option value="2">👑 Thread Owner ID</option>
            <option value="3">🗂️ Thread Parent ID</option>
          </optgroup>
          <optgroup label="⚙️ Thread Properties">
            <option value="4">🗃️ Thread Archived</option>
            <option value="5">⏳ Thread Auto Archive Duration</option>
            <option value="6">🔒 Thread Locked</option>
            <option value="7">🛡️ Thread Rate Limit Per User</option>
            <option value="8">👥 Thread Member Count</option>
            <option value="9">💬 Thread Message Count</option>
          </optgroup>
          <optgroup label="🧩 Thread Metadata">
            <option value="10">⚙️ Thread Metadata Object</option>
            <option value="11">🗃️ Archiver ID (Metadata)</option>
            <option value="12">🕓 Archive Timestamp (Metadata)</option>
            <option value="13">📩 Invitable (Metadata)</option>
            <option value="14">🕓 Create Timestamp (Metadata)</option>
          </optgroup>
        </select>
      </div>
      <br>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_thread_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const thread = await this.getChannelFromData(data.channel, data.varName, cache);
    if (!thread) return this.callNextAction(cache);

    const info = parseInt(data.info, 10);
    let result;
    switch (info) {
      case 0: result = thread; break;
      case 1: result = thread.id; break;
      case 2: result = thread.ownerId ?? null; break;
      case 3: result = thread.parentId ?? null; break;
      case 4: result = thread.archived ?? null; break;
      case 5: result = thread.autoArchiveDuration ?? null; break;
      case 6: result = thread.locked ?? null; break;
      case 7: result = thread.rateLimitPerUser ?? null; break;
      case 8: result = thread.memberCount ?? null; break;
      case 9: result = thread.messageCount ?? null; break;
      case 10: result = thread.metadata ?? null; break;
      case 11: result = thread.metadata?.archiverId ?? null; break;
      case 12: result = thread.metadata?.archiveTimestamp ?? null; break;
      case 13: result = thread.metadata?.invitable ?? null; break;
      case 14: result = thread.metadata?.createTimestamp ?? null; break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
