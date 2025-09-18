module.exports = {
  name: "[VX]store_invite_info",
  displayName: "Store Invite Info",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.1.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadURL: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    const info = [
      "Channel Object",
      "Invite Creator",
      "Creation Date",
      "Expiration Date",
      "Guild Object",
      "Max. Uses",
      "Is Temporary?",
      "URL for Invite",
      "Times Used",
      "Invite server member count",
      "Invite code",
    ];
    return `Store ${info[parseInt(data.info, 10)]} from Invite`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "Unknown Type";
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = "Object";
        break;
      case 1:
        dataType = "User";
        break;
      case 2:
        dataType = "date";
        break;
      case 3:
        dataType = "date";
        break;
      case 4:
        dataType = "Guild";
        break;
      case 5:
        dataType = "number";
        break;
      case 6:
        dataType = "boolean";
        break;
      case 7:
        dataType = "string";
        break;
      case 8:
        dataType = "number";
        break;
      case 9:
        dataType = "number";
        break;
      case 10:
        dataType = "number";
        break;
      default:
        break;
    }
    return [data.varName, dataType];
  },

  fields: ["invite", "info", "storage", "varName"],

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
  

      <div style="float: left; padding-top: 14px;">
        <span class="dbminputlabel">Source Invite</span>
        <textarea class="round" id="invite" rows="1" placeholder="Code or URL" style="width: 99%; height: 35px; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
      </div>

      <div style="float: right; padding-top: 16px; width: 60%;">
        <span class="dbminputlabel">Source Info</span>
        <select id="info" class="round">
          <optgroup label="🧩 Objects">
            <option value="0" selected>Channel object</option>
            <option value="4">Guild object</option>
          </optgroup>

          <optgroup label="🔎 Invite info">
            <option value="1">Creator of invite</option>
            <option value="2">Creation date</option>
            <option value="3">Expiration date</option>
            <option value="5">Max. uses</option>
            <option value="6">Is temporary?</option>
            <option value="7">Url for invite</option>
            <option value="10">Invite Code</option>
          </optgroup>

          <optgroup label="📊 Statistics">
            <option value="9">Invite server member count</option>
            <option value="8">Times used</option>
          </optgroup>
        </select>
      </div>
      <br><br><br><br>

    <div>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    </div>`;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const invite = this.evalMessage(data.invite, cache);
    const info = parseInt(data.info, 10);
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);

    function extractInviteCode(inviteString) {
      let code = inviteString;
      if (code.includes("discord.gg/")) {
        code = code.split("discord.gg/")[1].split("/")[0];
      }
      return code.toLowerCase();
    }

    const inviteCode = extractInviteCode(invite);

    let inviteGuild;
    let inviteInfo;

    try {
      inviteGuild = await this.getDBM().Bot.bot.fetchInvite(invite);
      inviteInfo = await inviteGuild.guild.invites.fetch(invite);
    } catch (error) {
      try {
        const guilds = this.getDBM().Bot.bot.guilds.cache;
        inviteGuild = guilds.find(
          (g) => g.vanityURLCode && g.vanityURLCode.toLowerCase() === inviteCode
        );

        if (!inviteGuild) {
          console.error("Vanity URL or Invite not found.");
          return this.callNextAction(cache);
        }

        inviteInfo = {
          channel: null,
          inviter: null,
          createdAt: null,
          expiresAt: null,
          guild: inviteGuild,
          maxUses: null,
          temporary: false,
          url: `https://discord.gg/${inviteGuild.vanityURLCode}`,
          uses: null,
          memberCount: inviteGuild.memberCount,
          code: inviteGuild.vanityURLCode,
        };
      } catch (err) {
        console.error("Error fetching invite or vanity URL:", err);
        return this.callNextAction(cache);
      }
    }

    if (!inviteInfo) return this.callNextAction(cache);

    let result;
    switch (info) {
      case 0:
        result = inviteInfo.channel;
        break;
      case 1:
        result = inviteInfo.inviter;
        break;
      case 2:
        result = inviteInfo.createdAt;
        break;
      case 3:
        result = inviteInfo.expiresAt;
        break;
      case 4:
        result = inviteInfo.guild;
        break;
      case 5:
        result = inviteInfo.maxUses;
        break;
      case 6:
        result = inviteInfo.temporary;
        break;
      case 7:
        result = inviteInfo.url;
        break;
      case 8:
        result = inviteInfo.uses;
        break;
      case 9:
        try {
          const fetchedGuild = await inviteInfo.guild.fetch();

          if (inviteInfo.code === fetchedGuild.vanityURLCode) {
            result = fetchedGuild.vanityURLUses;
          } else {
            result = inviteInfo.uses;
          }
        } catch (err) {
          console.error("❌ Błąd przy pobieraniu danych guilda:", err);
          result = null;
        }
        break;
      case 10:
        result = inviteInfo.code;
        break;
      default:
        break;
    }

    if (result !== undefined) {
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
