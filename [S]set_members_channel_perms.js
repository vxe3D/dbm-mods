module.exports = {
  name: "Set Members Channel Perms",
  section: "# SHDZ - Utilities",

  subtitle(data, presets) {
    return `${presets.getChannelText(data.channel, data.varName)}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/set_member_channel_perms_MOD.js",
  },

  fields: [
    "channel",
    "varName",
    "member",
    "varName2",
    "permission",
    "state",
    "reason",
    "guildId",
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
  <span class="dbminputlabel">Source Members (ID or Variables, one per line)</span><br>
  <textarea id="member" rows="4" placeholder='123...\ntempVars("userID")' class="round" style="width:100%; resize: none;"></textarea>
</div>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">Guild ID (opcjonalnie)</span><br>
  <input id="guildId" class="round" type="text" placeholder="Wpisz ręcznie ID gildii (jeśli inna niż domyślna)" style="width: 100%;">
</div>
<br>

      <table style="width:100%;"><tr>
      <td><span class="dbminputlabel">Permission List (comma-separated)
      <help-icon dialogTitle="[Set Members Channel Perms] Settings" dialogWidth="640" dialogHeight="500">
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

<hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px; width: 100%;">

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
    const rawGuildId = this.evalMessage(data.guildId, cache);
    const guildId = rawGuildId || (channel?.guild?.id ?? "");

    const memberInputRaw = data.member;
    const memberInput = this.eval(memberInputRaw, cache);
    const memberIDs = memberInput
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

    if (!client) {
      console.error("[Set Members Channel Perms] ❌ Brak klienta Discord.");
      this.callNextAction(cache);
      return;
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      console.error(`[Set Members Channel Perms] ❌ Nie znaleziono gildii o ID ${guildId}`);
      this.callNextAction(cache);
      return;
    }

    await guild.members.fetch().catch(err => {
      console.error("[Set Members Channel Perms] Błąd podczas fetchowania członków:", err);
    });

    const members = [];

    for (const id of memberIDs) {
      const fetched = await guild.members.fetch(id).catch((err) => {
        console.error(`[Set Members Channel Perms] ❌ Nie udało się pobrać członka ID ${id}:`, err.message);
        return null;
      });
      if (fetched) {
        members.push(fetched);
      } else {
        console.error(`[Set Members Channel Perms] ❌ Członek nie został znaleziony dla ID: ${id}`);
      }
    }

    if (members.length === 0) {
      console.error("[Set Members Channel Perms] ❌ Nie znaleziono żadnych członków do ustawienia permisji.");
      this.callNextAction(cache);
      return;
    }

    const applyPerms = (target) =>
      Promise.all(
        members.map((m) => {
          return target.permissionOverwrites.edit(m, finalPermissions, { reason, type: 1 })
            .then(() => {
            })
            .catch((err) => {
              console.error(`[Set Members Channel Perms] ❌ Błąd dla ${m.user.tag || m.id} na ${target.name || target.id}:`, err.message);
              throw err;
            });
        })
      );

    if (Array.isArray(channel)) {
      Promise.all(channel.map(applyPerms))
        .then(() => this.callNextAction(cache))
        .catch((err) => {
          console.error("[Set Members Channel Perms] ❌ Błąd dla wielu kanałów:", err);
          this.displayError(data, cache, err);
        });
    } else if (channel?.permissionOverwrites) {
      applyPerms(channel)
        .then(() => this.callNextAction(cache))
        .catch((err) => {
          console.error("[Set Members Channel Perms] ❌ Błąd:", err);
          this.displayError(data, cache, err);
        });
    } else {
      console.error("[Set Members Channel Perms] ❌ Nieprawidłowy kanał.");
      this.callNextAction(cache);
    }
  },

mod() {},
}