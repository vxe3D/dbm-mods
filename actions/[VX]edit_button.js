module.exports = {
  name: "[VX]edit_button",
  displayName: "Edit Button",
  section: "# VX - Message(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.8.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

subtitle(data) {
  let typeText = "";
  let labelText = data.newLabel ? ` | ${data.newLabel}` : "";
  let emojiText = data.newEmoji ? ` | ${data.newEmoji}` : "";

  if (data.sourceButton === "current") {
    typeText = "Current Button";
  } else if (data.sourceButton === "byId") {
    typeText = `Button by ID (${data.buttonId || "No ID"})`;
  } else {
    typeText = "Button";
  }

  return `${typeText}${labelText}${emojiText}`;
},

  fields: [
    "sourceButton",
    "buttonId",
    "newLabel",
    "newStyle",
    "newEmoji",
    "newURL",
    "disabled",
    "channel",
    "varName",
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

    <div>
      <!-- Wiersz 1: Source Button i Button ID -->
      <div style="margin-top: 20px; width: 100%; display: flex; gap: 4%;">
        <div style="flex: 1;">
          <span class="dbminputlabel">Source Button</span>
          <select id="sourceButton" class="round" style="width: 100%;">
            <option value="current">Current Button</option>
            <option value="byId">Button by ID</option>
          </select>
        </div>

        <div id="buttonIdWrapper" style="flex: 1;">
          <span class="dbminputlabel">Button ID</span>
          <input id="buttonId" class="round" type="text" style="width: 100%; padding: 5px;">
        </div>
      </div>

      <!-- Wiersz 2: Source Channel -->
      <div id="sourceChannelWrapper" style="margin-top: 20px; width: 100%;">
        <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
        <br><br>
      </div>

      <!-- Wiersz 3: Enable/Disable Button i New Button Style -->
      <div style="margin-top: 20px; width: 100%; display: flex; gap: 4%;">
        <div style="flex: 1;">
          <span class="dbminputlabel">Enable/Disable Button</span>
          <select id="disabled" class="round" style="width: 100%; padding: 5px;">
            <option value="false" selected>Enable</option>
            <option value="true">Disable</option>
          </select>
        </div>

        <div style="flex: 1;">
          <span class="dbminputlabel">New Button Style</span>
          <select id="newStyle" class="round" style="width: 100%; padding: 5px;">
            <option value="PRIMARY">Primary</option>
            <option value="SECONDARY">Secondary</option>
            <option value="SUCCESS">Success</option>
            <option value="DANGER">Danger</option>
            <option value="LINK">Link</option>
          </select>
        </div>
      </div>

      <!-- Wiersz 4: New Button Name i Emoji -->
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <div style="flex: 1;">
          <span class="dbminputlabel">New Button Name</span>
          <input id="newLabel" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="Leave blank for none...">
        </div>
        <div style="flex: 1;">
          <span class="dbminputlabel">New Button Emoji</span>
          <input id="newEmoji" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="Leave blank for none...">
        </div>
      </div>

      <!-- Wiersz 5: New Link button -->
      <div id="newLinkWrapper" style="margin-top: 20px; display: none;">
        <span class="dbminputlabel">New Link button</span>
        <input id="newURL" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="https://example.com">
      </div>
    </div>
      `;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const sourceButton = document.getElementById("sourceButton");
    const buttonIdWrapper = document.getElementById("buttonIdWrapper");
    const sourceChannelWrapper = document.getElementById("sourceChannelWrapper");
    const newStyle = document.getElementById("newStyle");
    const newLinkWrapper = document.getElementById("newLinkWrapper");

    // Pokazywanie/ukrywanie Button ID i Source Channel
    function toggleSourceFields() {
      if (sourceButton.value === "current") {
        buttonIdWrapper.style.display = "none";       
        sourceChannelWrapper.style.display = "none";  
      } else {
        buttonIdWrapper.style.display = "block";      
        sourceChannelWrapper.style.display = "block"; 
      }
    }

    // Pokazywanie/ukrywanie New Link button
    function toggleNewLink() {
      if (newStyle.value === "LINK") {
        newLinkWrapper.style.display = "block"; // pokaż pole linku
      } else {
        newLinkWrapper.style.display = "none";  // ukryj pole linku
      }
    }

    // Nasłuchuj zmian
    sourceButton.addEventListener("change", toggleSourceFields);
    newStyle.addEventListener("change", toggleNewLink);

    // Wywołanie przy inicjalizacji
    toggleSourceFields();
    toggleNewLink();
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {

    const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
    const data = cache.actions[cache.index];

    const sourceButton = this.evalMessage(data.sourceButton, cache);
    const buttonId = this.evalMessage(data.buttonId, cache);
    const newLabel = this.evalMessage(data.newLabel, cache);
    const newStyle = this.evalMessage(data.newStyle, cache);
    const newEmoji = this.evalMessage(data.newEmoji, cache);
    const newURL = this.evalMessage(data.newURL, cache);
    const disabled = this.evalMessage(data.disabled, cache);

    const interaction = cache.interaction;
    // If 'Current Button' is selected and interaction or interaction.message is missing, skip action
    if (sourceButton === "current" && (!interaction || !interaction.message)) {
      return this.callNextAction(cache);
    }
    if (interaction) await interaction.deferReply({ flags: 64 }).catch(() => {});

    const guild = interaction?.guild || cache.message?.guild;
    if (!guild) return this.callNextAction(cache);

    const styleMap = {
      PRIMARY: ButtonStyle.Primary,
      SECONDARY: ButtonStyle.Secondary,
      SUCCESS: ButtonStyle.Success,
      DANGER: ButtonStyle.Danger,
      LINK: ButtonStyle.Link,
    };

    // Jedna funkcja do edycji buttona, zachowująca poprzednie wartości jeśli nowe nie są podane
    const editButton = (btn, id) => {
      // Sprawdzenie, czy to zwykły button lub accessory typu 2
      if (btn.type !== 2 && !(btn.accessory && btn.accessory.type === 2)) return btn;

      // Utworzenie obiektu ButtonBuilder z istniejącego buttona
      let buttonObj = btn.type === 2 ? ButtonBuilder.from(btn) : new ButtonBuilder().setCustomId(btn.accessory.custom_id);

      // Sprawdzenie czy to nasz target button
      const targetId = btn.customId ?? btn.accessory?.custom_id;
      if (targetId === id) {
        // Label – jeśli nie podano nowego, zachowaj stary
        const oldLabel = btn.label ?? btn.accessory?.label ?? null;
        if (newLabel && newLabel.trim().length > 0) {
          buttonObj.setLabel(newLabel.trim());
        } else if (oldLabel) {
          buttonObj.setLabel(oldLabel);
        }

        // Style – jeśli nie podano nowego, zachowaj stary
        const currentStyle = btn.style ?? btn.accessory?.style ?? styleMap.PRIMARY;
        const newStyleUpper = newStyle?.toUpperCase();
        buttonObj.setStyle(newStyleUpper && newStyleUpper in styleMap ? styleMap[newStyleUpper] : currentStyle);

        // Emoji – jeśli nie podano nowego, zachowaj stare
        if (newEmoji && newEmoji.trim().length > 0) {
          buttonObj.setEmoji(newEmoji);
        } else if (btn.emoji ?? btn.accessory?.emoji) {
          buttonObj.setEmoji(btn.emoji ?? btn.accessory?.emoji);
        }

        // URL – tylko dla LINK button
        const oldURL = btn.url ?? btn.accessory?.url ?? null;
        if (newStyleUpper === "LINK") {
          if (newURL && newURL.trim().length > 0) {
            buttonObj.setURL(newURL);
          } else if (oldURL) {
            buttonObj.setURL(oldURL);
          }
        }

        // Disabled
        buttonObj.setDisabled(disabled === "true");
      }

      return buttonObj;
    };

    // Funkcja do mapowania komponentów (rekurencyjnie)
    const mapComponents = (components, targetId) => {
      return components.map(row => {
        if (row.accessory && row.accessory.type === 2) row.accessory = editButton(row.accessory, targetId);

        if (row.type === 1 && Array.isArray(row.components)) {
          row.components = row.components.map(child => {
            if (child.accessory && child.accessory.type === 2) child.accessory = editButton(child.accessory, targetId);
            if (child.type === 2) return editButton(child, targetId);
            if (Array.isArray(child.components)) child.components = mapComponents(child.components, targetId);
            return child;
          });
        }

        if (row.type === 17 && Array.isArray(row.components)) {
          row.components.forEach(innerRow => {
            if (innerRow.type === 1 && Array.isArray(innerRow.components)) {
              innerRow.components = innerRow.components.map(child => (child.type === 2 ? editButton(child, targetId) : child));
            }
            if (innerRow.type === 9 && innerRow.accessory && innerRow.accessory.type === 2) innerRow.accessory = editButton(innerRow.accessory, targetId);
          });
        }

        return row;
      });
    };

    try {
      let foundMessage = null;

      if (sourceButton === "current" && interaction) {
        const message = interaction.message;
        const newComponents = mapComponents(message.components, interaction.customId);
        await message.edit({ components: newComponents });
      } else if (sourceButton === "byId") {
        let foundMessage = null;

        const targetChannel = await this.getChannelFromData(
          data.channel,
          data.varName,
          cache
        );

        if (!targetChannel) {
          console.error("[Edit Button] Target channel not found.");
          return this.callNextAction(cache);
        }

        if (!targetChannel.isTextBased?.()) {
          console.error(`[Edit Button] Channel is not text-based.`, { targetChannel });
          return this.callNextAction(cache);
        }

        const channels = [targetChannel];

        for (const channel of channels) {
          const messages = await channel.messages.fetch({ limit: 50 }).catch(() => null);
          if (!messages) {
            console.error(`[Edit Button] Cannot fetch messages in channel ${channel.id}`);
            return this.callNextAction(cache);
          }

          for (const msg of messages.values()) {
            if (!msg.components || msg.components.length === 0) continue;

            let found = false;
            for (const row of msg.components) {
              const rowJSON = row.toJSON ? row.toJSON() : row;

              // 1️⃣ SectionBlock accessory
              if (rowJSON.accessory && rowJSON.accessory.type === 2 && rowJSON.accessory.custom_id === buttonId) {
                found = true;
                break;
              }
              // 2️⃣ ActionRow z buttonami
              if (rowJSON.type === 1 && Array.isArray(rowJSON.components)) {
                for (const child of rowJSON.components) {
                  const childJSON = child.toJSON ? child.toJSON() : child;
                  if (childJSON.type === 2 && childJSON.custom_id === buttonId) {
                    found = true;
                    break;
                  }
                }
              }
              // 3️⃣ Container block / type 17
              if (rowJSON.type === 17 && Array.isArray(rowJSON.components)) {
                for (const innerRow of rowJSON.components) {
                  // type 9 z accessory
                  if (innerRow.type === 9 && innerRow.accessory && innerRow.accessory.type === 2 && innerRow.accessory.custom_id === buttonId) {
                    found = true;
                    break;
                  }
                  // ewentualnie type 1 → ActionRow
                  if (innerRow.type === 1 && Array.isArray(innerRow.components)) {
                    for (const child of innerRow.components) {
                      if (child.type === 2 && child.custom_id === buttonId) {
                        found = true;
                        break;
                      }
                    }
                  }
                  if (found) break;
                }
              }
              if (found) break;
            }

            if (found) {
              foundMessage = msg;
              break;
            }
          }
          if (foundMessage) break;
        }

        if (!foundMessage) {
          console.error(`[DEBUG] Button ${buttonId} not found in messages of channel ${targetChannel.id}.`);
          return this.callNextAction(cache);
        }

        const newComponents = mapComponents(foundMessage.components, buttonId);
        await foundMessage.edit({ components: newComponents });
      }

      this.callNextAction(cache);
    } catch (err) {
      console.error("[Edit Button] Error when editing button:", err);
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
