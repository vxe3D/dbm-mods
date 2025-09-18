module.exports = {
  name: "Channel Restriction",
  section: "# VX - Message(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    return `${presets.getChannelText(data.channel, data.varName)}`;
  },

  fields: ["mode", "channel", "varName", "multiChannels", "branch"],

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

      <div style="padding: 8px 0;">
        <span class="dbminputlabel">Mode:</span><br>
        <select id="mode" class="round">
          <option value="single" selected>Single Channel</option>
          <option value="multi">Multiple Channel(s)</option>
        </select>
      </div>

      <div id="singleContainer" style="margin-top: 8px; margin-bottom: 40px;">
        <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
      </div>

      <div id="multiContainer" style="margin-top: 8px; display: none;">
        <textarea id="multiChannels" rows="5" class="round" style="width:100%;" placeholder="Enter channel IDs separated by new lines..."></textarea>
      </div>

      <br><hr class="subtlebar"><br>
      <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>
    `;
  },

  init() {
    const modeSelect = document.getElementById("mode");
    const singleContainer = document.getElementById("singleContainer");
    const multiContainer = document.getElementById("multiContainer");

    function refresh() {
      if (modeSelect.value === "single") {
        singleContainer.style.display = "block";
        multiContainer.style.display = "none";
      } else {
        singleContainer.style.display = "none";
        multiContainer.style.display = "block";
      }
    }

    modeSelect.addEventListener("change", refresh);
    refresh(); // od razu ustawia przy otwarciu
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const interaction = cache.interaction?.__originalInteraction ?? cache.interaction;
    if (!interaction) return this.callNextAction(cache);

    const mode = data.mode || "single";
    const interactionChannelId = interaction.channel?.id;
    let sameChannel = false;

    if (mode === "single") {
      const targetChannel = await this.getChannelFromData(data.channel, data.varName, cache);
      if (targetChannel) {
        sameChannel = interactionChannelId === targetChannel.id;
      }
    } else if (mode === "multi") {
      const list = (data.multiChannels || "")
        .split(/[\n,]+/) // enter / przecinek
        .map(c => c.trim())
        .filter(c => c.length > 0);
      sameChannel = list.includes(interactionChannelId);
    }

    this.executeResults(sameChannel, data.branch, cache);
  },


  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
