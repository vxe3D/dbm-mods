module.exports = {
  name: "Set Roles Channel Perms",
  section: "# SHDZ - Utilities",

  subtitle(data, presets) {
    return `Ustawianie permisji na kanał dla jednej lub kilku ról`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/set_role_channel_perms_MOD.js",
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
    <div class="dbmmodsbr1" style="height: 59px">
      <p>Mod Info:</p>
      <p>Created by Shadow, Edited by vxed_</p>
      <p>
        Help:
        <a
          href="https://discord.gg/9HYB4n3Dz4"
          target="_blank"
          style="color: #0077ff; text-decoration: none"
          >discord</a
        >
      </p>
    </div>
    
    <div class="dbmmodsbr dbmmodsbr2">
      <p>Mod Version:</p>
      <p>
        <a
          href="https://github.com/Shadow64gg/DBM-14"
          target="_blank"
          style="color: #0077ff; text-decoration: none"
          >1.1</a
        >
      </p>
    </div>
    
    <style>
      .dbmmodsbr1,
      .dbmmodsbr2 {
        position: absolute;
        bottom: 0px;
        background: rgba(0, 0, 0, 0.7);
        color: #999;
        padding: 5px;
        font-size: 12px;
        z-index: 999999;
        cursor: pointer;
        line-height: 1.2;
        border-radius: 8px;
        transition: transform 0.3s ease, background-color 0.6s ease, color 0.6s ease;
      }
    
      .dbmmodsbr1 {
        left: 0px;
        border: 2px solid rgba(50, 50, 50, 0.7);
      }
    
      .dbmmodsbr2 {
        right: 0px;
        text-align: center;
      }
    
      .dbmmodsbr1:hover,
      .dbmmodsbr2:hover {
        transform: scale(1.01);
        background-color: rgba(29, 29, 29, 0.9);
        color: #fff;
      }
    
      .dbmmodsbr1 p,
      .dbmmodsbr2 p {
        margin: 0;
        padding: 0;
      }
    
      .dbmmodsbr1 a,
      .dbmmodsbr2 a {
        font-size: 12px;
        color: #0077ff;
        text-decoration: none;
      }
    
      .dbmmodsbr1 a:hover,
      .dbmmodsbr2 a:hover {
        text-decoration: underline;
      }
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
    const roleInputRaw = this.eval(data.role, cache);
    const roleInput = String(roleInputRaw ?? '');
    const roleIDs = roleInput
      .split(/\r?\n|,/)
      .map((line) => line.trim())
      .filter((id) => id.length > 0);

    const reason = this.evalMessage(data.reason, cache);
    const rawPermissions = this.evalMessage(data.permission, cache);

    const permissionList = rawPermissions
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

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
      let roleId = roleIdOrVar;

      // Jeśli to jest zmienna, oceń ją
      if (
        roleIdOrVar.startsWith("tempVars(") ||
        roleIdOrVar.startsWith("serverVars(") ||
        roleIdOrVar.startsWith("globalVars(")
      ) {
        roleId = this.eval(roleIdOrVar, cache);
      }

        // Spróbuj pobrać rolę z cache
        let role = guild.roles.cache.get(roleId);

        if (!role) {
        try {
            role = await guild.roles.fetch(String(roleId));
            if (!role) {
            console.warn(`❌ Rola o ID ${roleId} nie istnieje lub nie została znaleziona przez fetch.`);
            continue;
            }
        } catch (err) {
            console.warn(`❌ Błąd podczas fetchowania roli ${roleId}:`, err.message);
            continue;
        }
      }

      for (const ch of channels) {
        try {
          await ch.permissionOverwrites.edit(role, finalPermissions, reason);
        } catch (e) {
        console.error(`❌ Błąd przy ustawianiu permisji dla nieznanej roli (${roleId}) na kanale ${ch.id}:`, e);
        }
      }
    }
    this.callNextAction(cache);
  },

  mod() {},
};
