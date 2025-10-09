module.exports = {
  name: "[VX]Copy_Emoji_To_Server",
  displayName: "Copy Emoji To Server",
  section: "# VX - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "1.0.0",
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  fields: [
    "emojiName",
    "storage", "varName",
    "debugMode", "emojiMarkdown"
  ],

  subtitle(data, presets) {
    return `Copy emoji "${data.emojiName}" to server`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let result = "Emoji Result";
    return [data.varName, result];
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
      
      <dbm-checkbox id="debugMode" label="Debug Mode"></dbm-checkbox><br>
      <span class="dbminputlabel">Emoji Markdown (e.g. &lt;:osucum:1421711705888788511&gt)</span><br>
      <input id="emojiMarkdown" class="round" type="text" placeholder="<:emoji:123456789012345678>" style="width:100%"><br>
      <span class="dbminputlabel">Emoji Name (optional)</span><br>
      <input id="emojiName" class="round" type="text" placeholder="New emoji name (optional)" style="width:100%">
      <br>
      <store-in-variable dropdownLabel="Store result in" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    `;
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const debugMode = data.debugMode;
    let emojiMarkdownRaw = this.evalMessage(data.emojiMarkdown, cache);
    if (typeof emojiMarkdownRaw !== "string") {
      if (emojiMarkdownRaw == null) emojiMarkdownRaw = "";
      else emojiMarkdownRaw = String(emojiMarkdownRaw);
    }
    emojiMarkdownRaw = emojiMarkdownRaw.trim();
    let emojiNameRaw = this.evalMessage(data.emojiName, cache);
    if (typeof emojiNameRaw !== "string") {
      if (emojiNameRaw == null) emojiNameRaw = "";
      else emojiNameRaw = String(emojiNameRaw);
    }
    emojiNameRaw = emojiNameRaw.trim();
    let emojiNameFinal = (emojiNameRaw && emojiNameRaw.length >= 2) ? emojiNameRaw : undefined;
    const storeType = parseInt(data.storage, 10);
    const storeVar = this.evalMessage(data.varName, cache);

    const server = cache.server;
    let result = null;

    if (!server) {
      result = "No server context!";
      if (debugMode) console.log("[VX]Copy_Emoji_To_Server: No server context!");
      this.storeValue(result, storeType, storeVar, cache);
      return this.callNextAction(cache);
    }

    if (debugMode) {
      console.log("[VX]Copy_Emoji_To_Server: emojiMarkdownRaw (typeof):", typeof emojiMarkdownRaw, "value:", emojiMarkdownRaw);
    }
    if (!emojiMarkdownRaw || emojiMarkdownRaw.length < 5) {
      const msg = "❌ Failed: Emoji markdown is empty or too short. Value: '" + emojiMarkdownRaw + "'";
      if (debugMode) console.log("[VX]Copy_Emoji_To_Server: " + msg);
      this.storeValue(msg, storeType, storeVar, cache);
      return this.callNextAction(cache);
    }

    if (!server.members.me.permissions.has("ManageEmojisAndStickers") && !server.members.me.permissions.has("Administrator")) {
      result = "Missing permission: Manage Emojis and Stickers";
      if (debugMode) console.log("[VX]Copy_Emoji_To_Server: Missing permission!");
      this.storeValue("❌ Failed: Missing permission to add emoji (Manage Emojis and Stickers)", storeType, storeVar, cache);
      return this.callNextAction(cache);
    }

    let emojiId = null;
    let isAnimated = false;
    let emojiMatch = emojiMarkdownRaw.match(/^<(a?):([a-zA-Z0-9_]+):(\d+)>$/);

    if (debugMode) {
      console.log("[VX]Copy_Emoji_To_Server: emojiMarkdownRaw =", emojiMarkdownRaw);
      console.log("[VX]Copy_Emoji_To_Server: emojiMatch =", emojiMatch);
    }

    if (emojiMatch) {
      isAnimated = emojiMatch[1] === "a";
      emojiId = emojiMatch[3];
    }

    if (!emojiId) {
      result = "❌ Failed: Could not parse emoji markdown";
      if (debugMode) {
        console.log("[VX]Copy_Emoji_To_Server: Could not parse emoji markdown!", emojiMarkdownRaw);
        console.log("[VX]Copy_Emoji_To_Server: Regex result:", emojiMatch);
      }
      this.storeValue(result, storeType, storeVar, cache);
      return this.callNextAction(cache);
    }

    const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? "gif" : "png"}?v=1`;

    try {
      let emojiNameToUse = emojiNameFinal;
      if (
        !emojiNameToUse ||
        typeof emojiNameToUse !== "string" ||
        emojiNameToUse.length < 2 ||
        emojiNameToUse === "null" ||
        emojiNameToUse === "undefined"
      ) {
        emojiNameToUse = emojiMatch[2];
      }
      if (debugMode) console.log("[VX]Copy_Emoji_To_Server: emojiNameToUse =", emojiNameToUse);
      server.emojis.create({ attachment: emojiURL, name: emojiNameToUse })
        .then(emoji => {
          result = `✅ Emoji added successfully as :${emoji.name}: (${emoji.id})`;
          if (debugMode) console.log("[VX]Copy_Emoji_To_Server: Emoji added!", emoji);
          this.storeValue(result, storeType, storeVar, cache);
          this.callNextAction(cache);
        })
        .catch(err => {
          result = `❌ Failed to add emoji: ${err.message}`;
          if (debugMode) console.log("[VX]Copy_Emoji_To_Server: Error adding emoji!", err);
          this.storeValue(result, storeType, storeVar, cache);
          this.callNextAction(cache);
        });
    } catch (err) {
      result = `❌ Error: ${err.message}`;
      if (debugMode) console.log("[VX]Copy_Emoji_To_Server: Exception!", err);
      this.storeValue(result, storeType, storeVar, cache);
      this.callNextAction(cache);
    }
  },

  mod() {},
};