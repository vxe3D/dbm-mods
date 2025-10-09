module.exports = {
  name: "[VX]store_message_info",
  displayName: "Store Message Info",
  section: "# VX - Message(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.2.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    const info = [
      "ID",
      "Content",
      "URL",
      "Created Timestamp",
      "Created At (Date)",
      "Edited Timestamp",
      "Edited At (Date)",
      "Author",
      "Member",
      "Guild",
      "Channel",
      "Webhook ID",
      "Application ID",
      "Reactions (Cache)",
      "Mentioned Users",
      "Mentioned Roles",
      "Mentioned Channels",
      "Attachments",
      "Embeds",
      "Stickers",
      "Pinned",
      "TTS",
      "System",
      "Crosspostable",
      "Flags",
      "Editable",
      "Deletable",
      "Pinnable",
      "Message Object",
      "First Attachment",
      "Third Attachment",
      "Second Attachment"
    ];
    return `${presets.getMessageText(data.message, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0: dataType = "String"; break; // ID
      case 1: dataType = "String"; break; // Content
      case 2: dataType = "String"; break; // URL
      case 3: dataType = "Number"; break; // Created Timestamp
      case 4: dataType = "Date"; break; // Created At
      case 5: dataType = "Number"; break; // Edited Timestamp
      case 6: dataType = "Date"; break; // Edited At
      case 7: dataType = "User"; break;
      case 8: dataType = "Member"; break;
      case 9: dataType = "Guild"; break;
      case 10: dataType = "Channel"; break;
      case 11: dataType = "String"; break; // Webhook ID
      case 12: dataType = "String"; break; // Application ID
      case 13: dataType = "Collection"; break; // Reactions
      case 14: dataType = "Collection"; break; // Mentioned Users
      case 15: dataType = "Collection"; break; // Mentioned Roles
      case 16: dataType = "Collection"; break; // Mentioned Channels
      case 17: dataType = "Collection"; break; // Attachments
      case 18: dataType = "Array"; break; // Embeds
      case 19: dataType = "Collection"; break; // Stickers
      case 20: dataType = "Boolean"; break; // Pinned
      case 21: dataType = "Boolean"; break; // TTS
      case 22: dataType = "Boolean"; break; // System
      case 23: dataType = "Boolean"; break; // Crosspostable
      case 24: dataType = "Number"; break; // Flags
      case 25: dataType = "Boolean"; break; // Editable
      case 26: dataType = "Boolean"; break; // Deletable
      case 27: dataType = "Boolean"; break; // Pinnable
      case 28: dataType = "Message"; break; // Message Object
      case 29: dataType = "Attachment"; break; // First Attachment
      case 30: dataType = "Attachment"; break; // Third Attachment
      case 31: dataType = "Attachment"; break; // Second Attachment
    }
    return [data.varName2, dataType];
  },

  fields: ["message", "varName", "info", "storage", "varName2"],

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
          #info.round {background-color: #1e1e1e;color: #eee;}
          #info.round option {background-color: #2c2f33;color: #eee;padding: 6px;}
          optgroup {margin-top: 10px;font-weight: bold;color: #ddd;}
        </style>

      <message-input dropdownLabel="Source Message" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>
      <br><br><br>
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Source Info</span><br>
        <select id="info" class="round">
          <optgroup label="⭐ General">
            <option value="28">⚙️ Msg. Object</option>
            <option value="0">🆔 Msg. ID</option>
            <option value="1">📝 Msg. Content</option>
            <option value="2">🔗 Msg. URL</option>
            <option value="7">✍️ Msg. Author</option>
            <option value="9">🏛️ Msg. Guild</option>
            <option value="10">💬 Msg. Channel</option>
          </optgroup>
          <optgroup label="🕒 Time">
            <option value="3">🕓 Msg. Created Timestamp</option>
            <option value="4">📅 Msg. Created At (Date)</option>
            <option value="5">🕓 Msg. Edited Timestamp</option>
            <option value="6">✏️ Msg. Edited At (Date)</option>
          </optgroup>
          <optgroup label="🖼️ Media Collections">
            <option value="17">🗃️ Msg. Attachments</option>
            <option value="18">💎 Msg. Embeds</option>
            <option value="19">💟 Msg. Stickers</option>
            <option value="29">🖼️ Msg. First Attachment</option>
            <option value="31">🖼️ Msg. Second Attachment</option>
            <option value="30">🖼️ Msg. Third Attachment</option>
          </optgroup>
          <optgroup label="🗂️ Mention/Reaction Collections">
            <option value="13">🥳 Msg. Reactions (Cache)</option>
            <option value="14">👥 Msg. Mentioned Users</option>
            <option value="15">🎭 Msg. Mentioned Roles</option>
            <option value="16">💬 Msg. Mentioned Channels</option>
          </optgroup>
          <optgroup label="⚙️ Properties">
            <option value="20">📌 Msg. Pinned</option>
            <option value="21">🗣️ Msg. TTS</option>
            <option value="24">⚙️ Msg. Flags</option>
            <option value="25">✏️ Msg. Editable?</option>
            <option value="26">🗑️ Msg. Deletable?</option>
            <option value="27">📌 Msg. Pinnable?</option>
          </optgroup>
          <optgroup label="🧩 System Info">
            <option value="22">🛠️ Msg. System</option>
            <option value="23">🧩 Msg. Crosspostable</option>
            <option value="11">🌐 Msg. Webhook ID</option>
            <option value="12">💻 Msg. Application ID</option>
          </optgroup>
        </select>
      </div>
      <br>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const msg = await this.getMessageFromData(data.message, data.varName, cache);
    if (!msg) return this.callNextAction(cache);

    const info = parseInt(data.info, 10);
    let result;
    switch (info) {
      case 0: result = msg.id; break;
      case 1: result = msg.content; break;
      case 2: result = msg.url; break;
      case 3: result = msg.createdTimestamp; break;
      case 4: result = msg.createdAt; break;
      case 5: result = msg.editedTimestamp; break;
      case 6: result = msg.editedAt; break;
      case 7: result = msg.author; break;
      case 9: result = msg.guild; break;
      case 10: result = msg.channel; break;
      case 11: result = msg.webhookId; break;
      case 12: result = msg.applicationId; break;
      case 13: result = msg.reactions?.cache; break;
      case 14: result = msg.mentions?.users; break;
      case 15: result = msg.mentions?.roles; break;
      case 16: result = msg.mentions?.channels; break;
      case 17: result = msg.attachments; break;
      case 18: result = msg.embeds; break;
      case 19: result = msg.stickers; break;
      case 20: result = msg.pinned; break;
      case 21: result = msg.tts; break;
      case 22: result = msg.system; break;
      case 23: result = msg.crosspostable; break;
      case 24: result = msg.flags; break;
      case 25: result = msg.editable; break;
      case 26: result = msg.deletable; break;
      case 27: result = msg.pinnable; break;
      case 28: result = msg; break;
      case 29: result = msg.attachments && msg.attachments.size > 0 ? Array.from(msg.attachments.values())[0]?.url : undefined; break;
      case 31: result = msg.attachments && msg.attachments.size > 1 ? Array.from(msg.attachments.values())[1]?.url : undefined; break;
      case 30: result = msg.attachments && msg.attachments.size > 2 ? Array.from(msg.attachments.values())[2]?.url : undefined; break;
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
