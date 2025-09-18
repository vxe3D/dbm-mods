module.exports = {
  name: "[VX]set_members_channel_perms",
  displayName: "Set Members Channel Perms",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.5.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    return `${presets.getChannelText(data.channel, data.varName)}`;
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

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },
  
  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM()?.Bot?.bot;
    const channel = await this.getChannelFromData(data.channel, data.varName, cache);
    const rawGuildId = this.evalMessage(data.guildId, cache);
    const guildId = rawGuildId || (channel?.guild?.id ?? "");

    const rawMemberInput = data.member; 
    let memberIDs = [];

    try {
      // jeśli JSON np. ["id1","id2"]
      const parsed = JSON.parse(rawMemberInput);
      if (Array.isArray(parsed)) {
        memberIDs = parsed
          .map(id => String(this.eval(id, cache)).trim())
          .filter(Boolean);
      } else {
        throw new Error("Not an array");
      }
    } catch (e) {
    const evaluated = this.eval(rawMemberInput, cache);

    memberIDs = String(evaluated)
      .split(/[\s,]+/) 
      .map(id => id.trim())
      .filter(Boolean);
    }

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
      const fetched = await guild.members.fetch(String(id)).catch((err) => {
        console.error(`[Set Members Channel Perms] ❌ Nie udało się pobrać członka ID ${id}:`, err.message);
        return null;
      });
      if (fetched?.user) {  // <-- dodaj tutaj check
        members.push(fetched);
      } else {
        console.error(`[Set Members Channel Perms] ❌ Członek nie został znaleziony dla ID: ${id}`);
      }
    }

    if (members.length === 0) {
      this.callNextAction(cache);
      return;
    }

    const applyPerms = (target) =>
      Promise.all(
        members.map((m) => {
          return target.permissionOverwrites.edit(m, finalPermissions, { reason, type: 1 })
            .catch((err) => {
              console.error(`[Set Members Channel Perms] ❌ Błąd dla ${m.user.tag || m.id} na ${target.name || target.id}:`, err.message);
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