module.exports = {
  name: "Store Server Info",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.3.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    const info = [
      "Server Object",
      "Server ID",
      "Roles List (Inline)",
      "Roles Count",
      "Text Channels List (Inline)",
      "Text Channels Count",
      "Voice Channels List (Inline)",
      "Voice Channels Count",
      "Created At",
      "Emojis List (Inline)",
      "Emojis Count",
      "Icon URL",
      "Members Count (no bots)",
      "Bots Count",
      "Boost Progress Bar",
      "Boost Count",
      "Boost Tier",
      "Boosts User List (Inline)",
      "Stickers Count",
      "Verification Level",
      "Bans List (Inline)",     // NEW
      "Bans Count",             // NEW
    ];
    return `${presets.getServerText(data.server, data.varName)} - ${
      info[parseInt(data.info, 10)]
    }`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Server";
        break;
      case 1:
        dataType = "Server ID";
        break;
      case 2:
      case 4:
      case 6:
      case 9:
      case 17:
      case 20: // bans list
        dataType = "List";
        break;
      case 3:
      case 5:
      case 7:
      case 10:
      case 12:
      case 13:
      case 15:
      case 16:
      case 18:
      case 19:
      case 21: // bans count
        dataType = "Number";
        break;
      case 8:
        dataType = "Date";
        break;
      case 11:
        dataType = "URL";
        break;
      case 14:
        dataType = "String";
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ["server", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `v${this.meta.actionVersion}` : "???";
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
          <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
        </div>
        <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
          <span class="vcstatus-version">${actionVersion}</span>
        </div>
        <div id="vx-version-warning"></div>
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
          #info.round {background-color: #1e1e1e;color: #eee;}
          #info.round option {background-color: #2c2f33;color: #eee;padding: 6px;}
          optgroup {margin-top: 10px;font-weight: bold;color: #ddd;}
        </style>

      <div style="float: left; display: inline-block; padding-top: 10px; width: 43%;">
        <server-input dropdownLabel="Source Server" selectId="server" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="100%" variableInputWidth="100%"></server-input>
      </div>
      <div style="float: right; display: inline-block; padding-top: 10px; width: 46%;">
        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
      </div>

    <br><br><br><br><br>

      <div>
        <div style="padding-top: 20px; width: 100%;">
          <span class="dbminputlabel">Source Info</span>
          <select id="info" class="round">

            <optgroup label="⚙️ General Info">
              <option value="0">Server Object</option>
              <option value="1">Server ID</option>
              <option value="8">Created At</option>
              <option value="11">Icon URL</option>
              <option value="12">Members Count (no bots)</option>
              <option value="13">Bots Count</option>
              <option value="19">Verification Level</option>
              <option value="18">Stickers Count</option>
            </optgroup>

            <optgroup label="🚀 Boosts">
              <option value="14">Boost Progress Bar</option>
              <option value="15">Boost Count</option>
              <option value="16">Boost Tier</option>
              <option value="17">Boosts User List (Inline)</option>
            </optgroup>

            <optgroup label="⭐ Roles">
              <option value="3">Roles Count</option>
              <option value="2">Roles List (Inline)</option>
            </optgroup>

            <optgroup label="💬 Text & Voice Channels">
              <option value="5">Text Channels Count</option>
              <option value="4">Text Channels List (Inline)</option>
              <option value="7">Voice Channels Count</option>
              <option value="6">Voice Channels List (Inline)</option>
            </optgroup>

            <optgroup label="📋 Emojis">
              <option value="10">Emojis Count</option>
              <option value="9">Emojis List (Inline)</option>
            </optgroup>

            <optgroup label="🚫 Bans">
              <option value="21">Bans Count</option>
              <option value="20">Bans List (Inline)</option>
            </optgroup>
          </select>
        </div>
      </div>`;
  },

  init() {
    const select = document.getElementById("info");

    // --- Wersja sprawdzania ---
    const fileName = "store_server_info.js";
    const localVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? this.meta.actionVersion : "0.0.0";
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json")
      .then(res => res.json())
      .then(json => {
        const remoteVersion = json[fileName]?.version;
        if (remoteVersion && compareVersions(localVersion, remoteVersion) < 0) {
          document.getElementById("vx-version-warning").innerHTML = "<div style='color:#ff4d4d;font-weight:bold;'>Masz nieaktualną wersję</div>";
        }
      });

    function compareVersions(v1, v2) {
      const a = v1.split('.').map(Number);
      const b = v2.split('.').map(Number);
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const n1 = a[i] || 0, n2 = b[i] || 0;
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
      }
      return 0;
    }

    // --- Pozostałe ---
    const updateCheck = () => {
      for (let option of select.options) {
        option.text = option.text.replace(/^📍\s*/, "");
      }
      if (select.selectedIndex > 0) {
        select.options[select.selectedIndex].text = "📍 " + select.options[select.selectedIndex].text;
      }
    };
    select.addEventListener("change", updateCheck);
    updateCheck();
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const targetServer = await this.getServerFromData(
      data.server,
      data.varName,
      cache
    );
    if (!targetServer) return this.callNextAction(cache);

    const fetchMembers = async () => {
      if (targetServer.memberCount !== targetServer.members.cache.size) {
        await targetServer.members.fetch();
      }
    };

    const info = parseInt(data.info, 10);
    let result;

    switch (info) {
      case 0:
        result = targetServer;
        break;
      case 1:
        result = targetServer.id;
        break;
      case 2:
        result = targetServer.roles.cache.map((r) => r.name).join(", ");
        break;
      case 3:
        result = targetServer.roles.cache.size;
        break;
      case 4:
        result = targetServer.channels.cache
          .filter((c) => c.type === 0)
          .map((c) => c.name)
          .join(", ");
        break;
      case 5:
        result = targetServer.channels.cache.filter((c) => c.type === 0).size;
        break;
      case 6:
        result = targetServer.channels.cache
          .filter((c) => c.type === 2)
          .map((c) => c.name)
          .join(", ");
        break;
      case 7:
        result = targetServer.channels.cache.filter((c) => c.type === 2).size;
        break;
      case 8:
        result = targetServer.createdAt;
        break;
      case 9:
        result = targetServer.emojis.cache.map((e) => e.toString()).join(" ");
        break;
      case 10:
        result = targetServer.emojis.cache.size;
        break;
      case 11:
        result = targetServer.iconURL({ dynamic: true, size: 4096 });
        break;
      case 12:
        await fetchMembers();
        result = targetServer.members.cache.filter((m) => !m.user.bot).size;
        break;
      case 13:
        await fetchMembers();
        result = targetServer.members.cache.filter((m) => m.user.bot).size;
        break;
      case 14: {
        const count = targetServer.premiumSubscriptionCount;
        const tier = targetServer.premiumTier;
        const maxBoosts = [0, 2, 7, 14][tier] || 0;
        const filled = Math.min(count, maxBoosts);
        const totalBars = 10;
        const progress = Math.round((filled / maxBoosts) * totalBars) || 0;
        result =
          "🟪".repeat(progress) +
          "⬛".repeat(totalBars - progress) +
          ` (${count}/${maxBoosts})`;
        break;
      }
      case 15:
        result = targetServer.premiumSubscriptionCount;
        break;
      case 16:
        result = targetServer.premiumTier;
        break;
      case 17: {
        await fetchMembers();
        result = targetServer.members.cache
          .filter((m) => m.premiumSince)
          .map((m) => m.user.tag)
          .join(", ");
        break;
      }
      case 18:
        result = targetServer.stickers.cache.size;
        break;
      case 19:
        result = targetServer.verificationLevel;
        break;
      case 20: { // bans list
        const bans = await targetServer.bans.fetch();
        result = bans.map((ban) => `<@${ban.user.id}>`).join(", ");
        break;
      }
      case 21: { // bans count
        const bans = await targetServer.bans.fetch();
        result = bans.size;
        break;
      }
      default:
        break;
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
