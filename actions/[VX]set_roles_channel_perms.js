module.exports = {
  name: "Set Roles Channel Perms",
  section: "# VX - Utilities",

  subtitle(data, presets) {
    return `Ustawianie permisji na kanał dla jednej lub kilku ról`;
  },

  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  fields: [
    "channel",
    "varName",
    "varNameContainer",
    "role",
    "permission",
    "state",
    "reason",
  ],

  html(isEvent, data) {
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

    <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

    <br><br><br>

    <div style="padding-top: 8px;">
      <span class="dbminputlabel">Source Roles (ID or Variables, one per line)</span><br>
      <textarea id="role" rows="4" placeholder='123456789012345678\ntempVars("roleID")' class="round" style="width:100%; resize: none;"></textarea>
    </div>

    <br>

    <table style="width:100%;"><tr>
      <td><span class="dbminputlabel">Permission List (comma-separated)
      <help-icon dialogTitle="[Set Role Channel Perms] Settings" dialogWidth="640" dialogHeight="500">
        <div style="padding: 16px;">
          <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
            <u><b><span style="font-size: 15px;">Text Channels Permissions</span></b></u><br>
            <div style="display: flex; gap: 20px;">  
              <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                <li>ViewChannel, SendMessages, SendTTSMessages, EmbedLinks, AttachFiles, ReadMessageHistory, UseExternalStickers, UseExternalEmojis, MentionEveryone</li>
                <li>ManageMessages, ManageThreads, CreatePublicThreads, CreatePrivateThreads, SendMessagesInThreads</li>
              </ul>
            </div>
          </div>
          <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
            <u><b><span style="font-size: 15px;">Voice Channel Permissions</span></b></u><br>
            <div style="display: flex; gap: 20px;">  
              <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                <li>Connect, Speak, Stream, UseVAD, MuteMembers, DeafenMembers, MoveMembers, PrioritySpeaker</li>
              </ul>
            </div>
          </div>
        </div>
      </help-icon>
      </span><br><textarea id="permission" rows="3" placeholder="Example: Connect, ViewChannel, UseVAD" class="round" style="width: 100%; resize: none;"></textarea></td>
    </tr></table>

    <br>
    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px; width: 100%;">
    <br>

    <div style="padding-top: 0px;">
      <div style="float: left; width: calc(50% - 12px);">
        <span class="dbminputlabel">Reason</span>
        <input id="reason" placeholder="Optional" class="round" type="text">
      </div>
      <div style="float: right; width: calc(50% - 12px);">
        <span class="dbminputlabel">Change To</span><br>
        <select id="state" class="round">
          <option value="0" selected>Allow</option>
          <option value="1">Inherit</option>
          <option value="2">Disallow</option>
        </select>
      </div>
    </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM()?.Bot?.bot;
    const channel = await this.getChannelFromData(data.channel, data.varName, cache);

    let roleInputRaw = this.eval(data.role, cache);

    // Jeśli przypadkowo Number, wymuś string
    if (typeof roleInputRaw === "number") roleInputRaw = roleInputRaw.toString();

    const roleInput = roleInputRaw ?? '';
    const roleIDs = roleInput
      .split(/\r?\n|,/)
      .map(line => line.trim())
      .filter(id => id.length > 0);

    const reason = this.evalMessage(data.reason, cache);
    const rawPermissions = this.evalMessage(data.permission, cache);

    const permissionList = rawPermissions
      .split(",")
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const state = parseInt(data.state, 10);
    const finalPermissions = {};
    for (const perm of permissionList) {
      finalPermissions[perm] = [true, null, false][state];
    }

    if (!channel) {
      this.callNextAction(cache);
      return;
    }

    const channels = Array.isArray(channel) ? channel : [channel];
    const guild = channels[0].guild;

    for (const roleIdOrVar of roleIDs) {
      let roleId = roleIdOrVar.toString();
      if (
        roleIdOrVar.startsWith("tempVars(") ||
        roleIdOrVar.startsWith("serverVars(") ||
        roleIdOrVar.startsWith("globalVars(")
      ) {
        roleId = this.eval(roleIdOrVar, cache).toString();
      }

      let role = guild.roles.cache.get(roleId);

      if (!role) {
        try {
          role = await guild.roles.fetch(roleId);
          if (!role) {
            console.warn(`❌ Rola o ID "${roleId}" nie istnieje lub nie została znaleziona przez fetch.`);
            continue;
          }
        } catch (err) {
          console.warn(`❌ Błąd podczas fetchowania roli "${roleId}":`, err.message);
          continue;
        }
      }

      for (const ch of channels) {
        try {
          await ch.permissionOverwrites.edit(role, finalPermissions, reason);
        } catch (e) {
          console.error(`❌ Błąd przy ustawianiu permisji dla roli "${roleId}" na kanale ${ch.id}:`, e);
        }
      }
    }

    this.callNextAction(cache);
  },

  mod() {},
};
