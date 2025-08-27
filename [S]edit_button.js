module.exports = {
  name: "Edit Button",
  section: "Message Control",
  meta: {
    version: "3.5.0",
    preciseCheck: true,
    author: "Shadow & vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl:
      "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    if (data.sourceButton === "current") {
      return "Edit Current Button";
    } else if (data.sourceButton === "byId") {
      return `Edit Button by ID (${data.buttonId || "No ID"})`;
    } else {
      return "Edit button";
    }
  },

  fields: [
    "sourceButton",
    "buttonId",
    "newLabel",
    "newStyle",
    "newEmoji",
    "newURL",
    "disabled",
  ],

  html(isEvent, data) {
    return `
    <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
      <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">Shadow</span> <span class="vcstatus-author-label">&</span> <span class="vcstatus-editor-name">vxed_</span></div>
      <a href="https://discord.gg/9HYB4n3Dz4" class="vcstatus-discord" target="_blank">Discord</a>
    </div>
    <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
      <span class="vcstatus-version">v3.5.0</span>
    </div>
    <style>
      .vcstatus-author-label {
        color: #BDBDBD;
      }
      .vcstatus-author-name {
        color: #d14040ff;
      }
      .vcstatus-editor-name {
        color: #9040d1ff;
      }
      :root {
        --vcstatus-box-width: 64px;
        --vcstatus-box-height: 28px;
        --vcstatus-box-left-width: 165px;
        --vcstatus-box-left-height: 58px;
        --vcstatus-author-font-size: 14px;
        --vcstatus-discord-font-size: 14px;
        --vcstatus-author-margin-top: 0px;
        --vcstatus-discord-margin-top: -2px;
        --vcstatus-box-left-offset: 16px;
        --vcstatus-author-margin-left: 2px;
        --vcstatus-discord-margin-left: 35px;
      }
      .vcstatus-box-fixed {
        position: fixed;
        top: 2px;
        z-index: 9999;
        padding: 5px 8px 5px 8px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.10);
        border: 1px solid #23272a;
        background: linear-gradient(90deg, #23243a 0%, #3a3b5a 100%);
        color: #fff;
        min-width: 120px;
        max-width: 320px;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        align-items: flex-start;
        gap: 4px;
      }
      .vcstatus-box-right {
        right: 18px;
        justify-content: center;
        color: #ff4d4d;
        align-items: center;
        flex-direction: row;
        width: var(--vcstatus-box-width);
        min-width: var(--vcstatus-box-width);
        max-width: var(--vcstatus-box-width);
        padding: 0;
        flex-shrink: 0;
        font-size: 16px;
        height: var(--vcstatus-box-height);
        margin-top: -0.5px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .vcstatus-version {
        color: #9040d1ff;
        font-weight: bold;
        font-size: 18px;
        margin: 0;
        padding: 0;
        line-height: 1;
        letter-spacing: 0;
        white-space: nowrap;
        min-width: 0;
        max-width: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .vcstatus-box-left {
        left: var(--vcstatus-box-left-offset);
        width: var(--vcstatus-box-left-width);
        min-width: var(--vcstatus-box-left-width);
        max-width: var(--vcstatus-box-left-width);
        height: var(--vcstatus-box-left-height);
      }
      .vcstatus-author {
        color: #ff4d4d;
        font-weight: bold;
        font-size: var(--vcstatus-author-font-size);
        margin-bottom: 2px;
        margin-top: var(--vcstatus-author-margin-top);
        margin-left: var(--vcstatus-author-margin-left);
      }
      .vcstatus-discord {
        color: #5865F2;
        background: #23272a;
        border-radius: 5px;
        padding: 2px 10px;
        text-decoration: none;
        font-weight: bold;
        font-size: var(--vcstatus-discord-font-size);
        margin-top: var(--vcstatus-discord-margin-top);
        margin-left: var(--vcstatus-discord-margin-left);
        transition: background 0.2s, color 0.2s;
        box-shadow: 0 1px 4px rgba(88,101,242,0.08);
      }
      .vcstatus-discord:hover {
        background: #5865F2;
        color: #fff;
        text-decoration: underline;
      }
      .dbminputlabel {
        color: #8754ffff;
        font-weight: bold;
        margin-bottom: 1px;
        display: inline-block;
      }
      input.round, select.round {
        border-radius: 6px;
        border: 1px solid #aaa;
        padding: 6px 10px;
        font-size: 14px;
        margin-top: 0px;
        background: #21232B;
        transition: border-color 0.3s;
        color: #fff;
      }
      select.round {
        font-size: 13px;
        line-height: normal;
        padding: 4px 10px;
      }
      select.round:focus {
        border-color: #b595ffff;
        outline: none;
      }
      input.round:focus {
        border-color: #b595ffff;
        outline: none;
      }
    </style>
  

        <div>
          <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px; width: 100%;">
            <div style="width: 200px;">
              <span class="dbminputlabel">Source Button</span>
              <select id="sourceButton" class="round" style="width: 100%;">
                <option value="current">Current Button</option>
                <option value="byId">Button by ID</option>
              </select>
            </div>
        
            <div id="buttonIdContainer" style="display: none; width: 300px;">
              <span class="dbminputlabel">Button ID</span>
              <input id="buttonId" class="round" type="text" style="width: 100%; padding: 5px;">
            </div>
          </div>
        
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

        
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">New Button Style</span>
            <select id="newStyle" class="round" style="width: 100%; padding: 5px;">
              <option value="PRIMARY">Primary</option>
              <option value="SECONDARY">Secondary</option>
              <option value="SUCCESS">Success</option>
              <option value="DANGER">Danger</option>
              <option value="LINK">Link</option>
            </select>
          </div>
        
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">New Link button (optional, only for LINK style)</span>
            <input id="newURL" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="https://example.com">
          </div>
          
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">Enable/Disable Button</span>
            <select id="disabled" class="round" style="width: 100%; padding: 5px;">
              <option value="false" selected>Enable</option>
              <option value="true">Disable</option>
            </select>
          </div>
        </div>
      `;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {
    const sourceButton = document.getElementById("sourceButton");
    const buttonIdContainer = document.getElementById("buttonIdContainer");

    function toggleButtonIdField() {
      if (sourceButton.value === "byId") {
        buttonIdContainer.style.display = "block";
      } else {
        buttonIdContainer.style.display = "none";
      }
    }

    sourceButton.addEventListener("change", toggleButtonIdField);
    toggleButtonIdField();
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    // Kompatybilność z Discord.js v13 i v14
    let djsVersion = null;
    try {
      djsVersion = require('discord.js').version;
    } catch (e) {}

    let ActionRowClass, ButtonClass, styleMap, fromButton;
    if (djsVersion && djsVersion.startsWith('13')) {
      // v13
      const { MessageActionRow, MessageButton } = require('discord.js');
      ActionRowClass = MessageActionRow;
      ButtonClass = MessageButton;
      styleMap = {
        PRIMARY: 'PRIMARY',
        SECONDARY: 'SECONDARY',
        SUCCESS: 'SUCCESS',
        DANGER: 'DANGER',
        LINK: 'LINK',
      };
      fromButton = (btn) => MessageButton.from(btn);
    } else {
      // v14+
      const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      ActionRowClass = ActionRowBuilder;
      ButtonClass = ButtonBuilder;
      styleMap = {
        PRIMARY: ButtonStyle.Primary,
        SECONDARY: ButtonStyle.Secondary,
        SUCCESS: ButtonStyle.Success,
        DANGER: ButtonStyle.Danger,
        LINK: ButtonStyle.Link,
      };
      fromButton = (btn) => ButtonBuilder.from(btn);
    }

    const data = cache.actions[cache.index];
    const sourceButton = this.evalMessage(data.sourceButton, cache);
    const buttonId = this.evalMessage(data.buttonId, cache);
    const newLabel = this.evalMessage(data.newLabel, cache);
    const newStyle = this.evalMessage(data.newStyle, cache);
    const newEmoji = this.evalMessage(data.newEmoji, cache);
    const newURL = this.evalMessage(data.newURL, cache);
    const disabled = this.evalMessage(data.disabled, cache);

    const interaction = cache.interaction;
    if (interaction) {
      if (djsVersion && djsVersion.startsWith('13')) {
        await interaction.deferReply().catch(() => {});
      } else {
        await interaction.deferReply({ flags: 64 }).catch(() => {});
      }
    }

    const guild = interaction?.guild || cache.message?.guild;
    if (!guild) {
      this.callNextAction(cache);
      return;
    }

    try {
      let foundMessage = null;

      if (sourceButton === "current" && interaction) {
        const message = interaction.message;
        const newComponents = message.components.map((row) => {
          // --- 1. Najpierw sprawdzamy accessory ---
          if (row.accessory && row.accessory.customId === interaction.customId) {
            const buttonBuilder = new ButtonClass()
              .setLabel(newLabel?.trim() ? newLabel : row.accessory.label || "Button")
              .setStyle(styleMap[newStyle?.toUpperCase()] || styleMap.PRIMARY)
              .setDisabled(disabled === "true");

            if (newEmoji) buttonBuilder.setEmoji(newEmoji);
            if (newStyle === "LINK" && newURL) buttonBuilder.setURL(newURL);
            else buttonBuilder.setCustomId(row.accessory.customId);

            row.accessory = buttonBuilder;
            return row;
          }

          // --- 2. Jeśli accessory nie ma, mapujemy zwykłe components ---
          if (row.components && row.components.length > 0) {
            const updatedComponents = row.components.map((btn) => {
              if (btn.customId === interaction.customId) {
                const buttonBuilder = ButtonClass.from(btn)
                  .setLabel(newLabel?.trim() ? newLabel : btn.label || "Button")
                  .setStyle(styleMap[newStyle?.toUpperCase()] || styleMap.PRIMARY)
                  .setDisabled(disabled === "true");

                if (newEmoji) buttonBuilder.setEmoji(newEmoji);
                if (newStyle === "LINK" && newURL) buttonBuilder.setURL(newURL);
                else buttonBuilder.setCustomId(btn.customId);

                return buttonBuilder;
              }
              return ButtonClass.from(btn);
            });

            return new ActionRowClass().addComponents(updatedComponents);
          }

          // --- 3. Jeśli nic nie pasuje, zwracamy row bez zmian ---
          return row;
        });

        // Log po zakończeniu map
        console.log("/-------------------------------------------------------");
        console.log("[Edit Button] current label:", interaction.message.components.map(r => r.components.map(b => b.label)));
        console.log("[Edit Button] current accessory:", interaction.message.components.map(r => r.accessory?.label));
        console.log("[Edit Button] newLabel:", newLabel);
        console.log("[Edit Button] newEmoji:", newEmoji);
        console.log("[Edit Button] disabled:", disabled);
        console.log("[Edit Button] newStyle:", newStyle);
        console.log("[Edit Button] newURL:", newURL);
        console.log("[Edit Button] Components ready to send:", newComponents.map(c => c.toJSON()));
        console.log("/-------------------------------------------------------");

        await message.edit({ components: newComponents });
      } else if (sourceButton === "byId") {
        const channels = guild.channels.cache.filter((ch) => ch.isTextBased ? ch.isTextBased() : ch.type === 'GUILD_TEXT');
        for (const channel of channels.values()) {
          const messages = await channel.messages
            .fetch({ limit: 50 })
            .catch(() => null);
          if (!messages) continue;

          foundMessage = messages.find((msg) =>
            msg.components.some((row) =>
              // sprawdzamy accessory lub components
              (row.accessory && row.accessory.customId === buttonId) ||
              row.components.some((button) => button.customId === buttonId)
            )
          );

          if (foundMessage) break;
        }
      }

      if (!foundMessage) {
        this.callNextAction(cache);
        return;
      }

      const newComponents = foundMessage.components.map((row) => {
        // --- 1. Najpierw sprawdzamy accessory ---
        if (row.accessory && row.accessory.customId === buttonId) {
          const buttonBuilder = new ButtonClass()
            .setLabel(newLabel?.trim() ? newLabel : row.accessory.label || "Button")
            .setStyle(styleMap[newStyle?.toUpperCase()] || styleMap.PRIMARY)
            .setDisabled(disabled === "true");

          if (newEmoji) buttonBuilder.setEmoji(newEmoji);
          if (newStyle === "LINK" && newURL) buttonBuilder.setURL(newURL);
          else buttonBuilder.setCustomId(row.accessory.customId);

          row.accessory = buttonBuilder;
          return row;
        }

        // --- 2. Jeśli accessory nie ma, mapujemy zwykłe components ---
        if (row.components && row.components.length > 0) {
          const updatedComponents = row.components.map((btn) => {
            if (btn.customId === buttonId) {
              const buttonBuilder = ButtonClass.from(btn)
                .setLabel(newLabel?.trim() ? newLabel : btn.label || "Button")
                .setStyle(styleMap[newStyle?.toUpperCase()] || styleMap.PRIMARY)
                .setDisabled(disabled === "true");

              if (newEmoji) buttonBuilder.setEmoji(newEmoji);
              if (newStyle === "LINK" && newURL) buttonBuilder.setURL(newURL);
              else buttonBuilder.setCustomId(btn.customId);

              return buttonBuilder;
            }
            return ButtonClass.from(btn);
          });

          return new ActionRowClass().addComponents(updatedComponents);
        }

        // --- 3. Jeśli nic nie pasuje, zwracamy row bez zmian ---
        return row;
      });

      // Log po zakończeniu map
      console.log("/-------------------------------------------------------");
      console.log("[Edit Button] current label:", foundMessage.components.map(r => r.components.map(b => b.label)));
      console.log("[Edit Button] current accessory:", foundMessage.components.map(r => r.accessory?.label));
      console.log("[Edit Button] newLabel:", newLabel);
      console.log("[Edit Button] newEmoji:", newEmoji);
      console.log("[Edit Button] disabled:", disabled);
      console.log("[Edit Button] newStyle:", newStyle);
      console.log("[Edit Button] newURL:", newURL);
      console.log("[Edit Button] Components ready to send:", newComponents.map(c => c.toJSON()));
      console.log("/-------------------------------------------------------");

      await foundMessage.edit({ components: newComponents });

      this.callNextAction(cache);
    } catch (err) {
      if (err.message && err.message.includes("Link buttons must have a URL")) {
        console.error("[Edit Button] LINK buttons must have a URL set.");
      } else if (
        err.message &&
        (err.message.includes("expected to match a URL") ||
          err.message.includes("Invalid URL") ||
          err.message.includes("s.string().url()"))
      ) {
        console.error(
          "[Edit Button] The URL provided is incorrect. Please make sure you are entering the correct URL."
        );
      } else {
        console.error("[Edit Button] Error when editing button:", err);
      }

      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
