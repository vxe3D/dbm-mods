module.exports = {
  name: "[VX]Store_member_info",
  displayName: "Store Member Info",
  section: "# VX - Member(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  fields: ["member", "varName", "info", "storage", "varName2", "debugMode"],

  subtitle(data, presets) {
    const info = [
      "Avatar URL",
      "Avatar Decoration URL",
      "Banner URL",
      "ID",
      "Display Name",
      "Nickname",
      "Joined At",
      "Joined Timestamp",
      "Timeout At",
      "Timeout Timestamp",
      "Color",
      "Hex Color",
      "Status",
      "Bannable?",
      "Kickable?",
      "Moderatable?",
      "Manageable?",
      "Muted?",
      "Deafen?",
      "Server Mute?",
      "Server Deafen?",
      "Voice Channel",
      "Voice Channel ID",
      "Camera?",
      "Streaming?",
      "Stage Channel Suppress?",
      "Request To Speak Timestamp",
      "Request To Speak At",
      "Highest Role",
      "Highest Role Color",
      "Highest Role Color HEX",
      "List Role (Inline)"
    ];
    return `${presets.getMemberText(data.member, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0: dataType = "Image URL"; break; // Avatar URL
      case 1: dataType = "Image URL"; break; // Avatar Decoration URL
      case 2: dataType = "Image URL"; break; // Banner URL
      case 3: dataType = "String"; break; // ID
      case 4: dataType = "String"; break; // Display Name
      case 5: dataType = "String"; break; // Nickname
      case 6: dataType = "Date"; break; // Joined At
      case 7: dataType = "Number"; break; // Joined Timestamp
      case 8: dataType = "Date"; break; // Timeout At
      case 9: dataType = "Number"; break; // Timeout Timestamp
      case 10: dataType = "Number"; break; // Color
      case 11: dataType = "String"; break; // Hex Color
      case 12: dataType = "String"; break; // Status
      case 13: dataType = "Boolean"; break; // Bannable?
      case 14: dataType = "Boolean"; break; // Kickable?
      case 15: dataType = "Boolean"; break; // Moderatable?
      case 16: dataType = "Boolean"; break; // Manageable?
      case 17: dataType = "Boolean"; break; // Muted?
      case 18: dataType = "Boolean"; break; // Deafen?
      case 19: dataType = "Boolean"; break; // Server Mute?
      case 20: dataType = "Boolean"; break; // Server Deafen?
      case 21: dataType = "String"; break; // Voice Channel
      case 22: dataType = "String"; break; // Voice Channel ID
      case 23: dataType = "Boolean"; break; // Camera?
      case 24: dataType = "Boolean"; break; // Streaming?
      case 25: dataType = "Boolean"; break; // Stage Channel Suppress?
      case 26: dataType = "Date"; break; // Request To Speak Timestamp
      case 27: dataType = "Date"; break; // Request To Speak At
      case 28: dataType = "String"; break; // Highest Role
      case 29: dataType = "Number"; break; // Highest Role Color
      case 30: dataType = "String"; break; // Highest Role Color HEX
      case 31: dataType = "String"; break; // List Role (Inline)
      default: dataType = "Unknown Type";
    }
    return [data.varName2, dataType];
  },

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

      <dbm-checkbox id="debugMode" selectWidth="100%" variableInputWidth="100%" label="Debug Mode"></dbm-checkbox><br>
      <member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
      <br><br><br>
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Source Info</span><br>
        <select id="info" class="round">
          <optgroup label="👤 Member Info">
            <option value="3">🆔 ID</option>
            <option value="4">🏷️ Display Name</option>
            <option value="5">🏷️ Nickname</option>
            <option value="6">👋 Joined At</option>
            <option value="7">🕓 Joined Timestamp</option>
            <option value="8">⌛ Timeout At</option>
            <option value="9">🕓 Timeout Timestamp</option>
            <option value="10">🎨 Color</option>
            <option value="11">#️⃣ Hex Color</option>
            <option value="12">🟣 Status</option>
          </optgroup>
          <optgroup label="🛡️ Permissions/Moderation">
            <option value="13">🚫 Bannable?</option>
            <option value="14">💥 Kickable?</option>
            <option value="15">🔰 Moderatable?</option>
            <option value="16">⚙️ Manageable?</option>
          </optgroup>
          <optgroup label="😎 Avatar/Banner">
            <option value="0">🔗 Avatar URL</option>
            <option value="1">🔗 Avatar Decoration URL</option>
            <option value="2">🔗 Banner URL</option>
          </optgroup>
          <optgroup label="🎙️ Voice Info">
            <option value="17">🤐 Muted?</option>
            <option value="18">🔇 Deafen?</option>
            <option value="19">🤐 Server Mute?</option>
            <option value="20">🔇 Server Deafen?</option>
            <option value="21">🔊 Voice Channel</option>
            <option value="22">🆔 Voice Channel ID</option>
            <option value="23">📸 Camera?</option>
            <option value="24">🎬 Streaming?</option>
            <option value="25">🤫 Stage Channel Suppress?</option>
            <option value="27">🙋‍♂️ Request To Speak At</option>
            <option value="26">🕓 Request To Speak Timestamp</option>
          </optgroup>
          <optgroup label="🎭 Role Info">
            <option value="28">🔝 Highest Role</option>
            <option value="29">🎨 Highest Role Color</option>
            <option value="30">#️⃣ Highest Role Color HEX</option>
            <option value="31">📜 List Role (Inline)</option>
          </optgroup>
        </select>
      </div>
      <br>
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const debugMode = data.debugMode;
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    if (!member) {
      if (debugMode) {
        console.log(`[VX]Store_member_info: Member not found for varName:`, data.varName);
      }
      this.callNextAction(cache);
      return;
    }
    const info = parseInt(data.info, 10);
    let result = null;
    switch (info) {
      case 0:
        if (member.user && typeof member.user.displayAvatarURL === 'function') {
          result = member.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        } else if (member.user && member.user.avatar) {
          let format = 'png';
          if (typeof member.user.avatar === 'string' && member.user.avatar.startsWith('a_')) {
            format = 'gif';
          }
          result = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.${format}?size=4096`;
        } else if (member.avatar && member.id) {
          // Fallback: member is a User object, not GuildMember
          let format = 'png';
          if (typeof member.avatar === 'string' && member.avatar.startsWith('a_')) {
            format = 'gif';
          }
          result = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.${format}?size=4096`;
        } else {
          result = null;
        }
        break;
      case 1:
        result = member.user?.avatarDecorationURL?.({ format: "png", size: 4096 }) ?? null;
        break;
      case 2:
        result = member.user?.bannerURL?.({ dynamic: true, format: "png", size: 4096 }) ?? null;
        break;
      case 3:
        result = member.id;
        break;
      case 4:
        result = member.displayName ?? null;
        break;
      case 5:
        result = member.nickname ?? null;
        break;
      case 6:
        result = member.joinedAt ?? null;
        break;
      case 7:
        result = member.joinedTimestamp ?? null;
        break;
      case 8:
        result = member.communicationDisabledUntil ?? null;
        break;
      case 9:
        result = member.communicationDisabledUntilTimestamp ?? null;
        break;
      case 10:
        result = member.displayColor ?? null;
        break;
      case 11:
        result = member.displayHexColor ?? null;
        break;
      case 12:
        result = member.presence?.status ?? "offline";
        break;
      case 13:
        result = member.bannable;
        break;
      case 14:
        result = member.kickable;
        break;
      case 15:
        result = member.moderatable;
        break;
      case 16:
        result = member.manageable;
        break;
      case 17:
        result = member.voice?.mute ?? null;
        break;
      case 18:
        result = member.voice?.deaf ?? null;
        break;
      case 19:
        result = member.voice?.serverMute ?? null;
        break;
      case 20:
        result = member.voice?.serverDeaf ?? null;
        break;
      case 21:
        result = member.voice?.channel ?? null;
        break;
      case 22:
        result = member.voice?.channelId ?? null;
        break;
      case 23:
        result = member.voice?.selfVideo ?? null;
        break;
      case 24:
        result = member.voice?.streaming ?? null;
        break;
      case 25:
        result = member.voice?.suppress ?? null;
        break;
      case 26:
        result = member.voice?.requestToSpeakTimestamp ?? null;
        break;
      case 27:
        result = member.voice?.requestToSpeakAt ?? null;
        break;
      case 28:
        result = member.roles?.highest ?? null;
        break;
      case 29:
        result = member.roles?.highest?.color ?? null;
        break;
      case 30:
        result = member.roles?.highest?.hexColor ?? null;
        break;
      case 31:
        result = member.roles?.cache?.map(r => r.name).join(", ") ?? null;
        break;
      default:
        result = null;
    }
    if (debugMode) {
      console.log(`[VX]Store_member_info: info=${info}, member=`, member);
      console.log(`[VX]Store_member_info: result=`, result);
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      if (debugMode) {
        console.log(`[VX]Store_member_info: Storing result in varType=${storage}, varName2=${varName2}`);
      }
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
