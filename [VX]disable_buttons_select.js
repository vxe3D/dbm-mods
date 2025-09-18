module.exports = {
  name: "Disable Buttons and Selects",
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
    return `${presets.getMessageText(data.storage, data.varName)}`;
  },

  fields: ["storage", "varName", "type", "disable", "searchValue"],

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

    <message-input dropdownLabel="Source Message" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

    <br><br><br><br>

    <div style="float: left; width: calc(50% - 12px);">
      <span class="dbminputlabel">Components to Disable</span><br>
      <select id="type" class="round" onchange="glob.onButtonSelectTypeChange(this)">
        <option value="all" selected>All Buttons and Select Menus</option>
        <option value="allButtons">All Buttons</option>
        <option value="allSelects">All Select Menus</option>
        <option value="sourceButton">Source Button</option>
        <option value="sourceSelect">Source Select Menu</option>
        <option value="findButton">Specific Button</option>
        <option value="findSelect">Specific Select Menu</option>
      </select>
    </div>

    <div style="float: right; width: calc(50% - 12px);">
      <span class="dbminputlabel">Disable or Re-enable</span><br>
      <select id="disable" class="round">
        <option value="disable" selected>Disable</option>
        <option value="reenable">Re-Enable</option>
      </select>
    </div>

    <br><br><br><br>

    <div id="nameContainer" style="width: calc(50% - 12px)">
      <span class="dbminputlabel">Component Label/ID</span><br>
      <input id="searchValue" class="round" type="text">
    </div>`;
  },

  init() {
    const { glob } = this;

    glob.onButtonSelectTypeChange = function (event) {
      const input = document.getElementById("nameContainer");
      input.style.display =
        event.value === "findButton" || event.value === "findSelect"
          ? null
          : "none";
    };

    glob.onButtonSelectTypeChange(document.getElementById("type"));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const message = await this.getMessageFromData(
      data.storage,
      data.varName,
      cache
    );

    const type = data.type;
    const disable = (data.disable ?? "disable") === "disable";
    let searchValue = null;

    let sourceButton = cache.interaction?.isButton() ? cache.interaction.customId : null;
    let sourceSelect = cache.interaction?.isStringSelectMenu() ? cache.interaction.customId : null;

    /**
     * Rekurencyjnie ustawia disabled dla Buttonów i Selectów w komponentach Discord
     * @param {Array} components - tablica komponentów (message.components)
     * @param {Object} options
     * @param {string|null} options.targetId - custom_id lub placeholder do zmiany, null = wszystkie
     * @param {"all"|"buttons"|"selects"} options.mode - które typy edytować
     * @param {boolean} options.disable - true = disable, false = enable
     */
    
    function setDisabledOnly(components, { targetId = null, mode = "all", disable = true }) {
      if (!Array.isArray(components)) return;

      for (const comp of components) {
        const compType = comp.data?.type;
        const customId = comp.data?.custom_id;
        const placeholder = comp.data?.placeholder;
        const label = comp.data?.label;

        if (Array.isArray(comp.components)) {
          setDisabledOnly(comp.components, { targetId, mode, disable });
        }

        if ((mode === "all" || mode === "buttons") && compType === 2) {
          if (!targetId || customId === targetId || label === targetId) {
            comp.data.disabled = disable;
          }
        }

        if ((mode === "all" || mode === "selects") && compType === 5) {
          if (!targetId || customId === targetId || placeholder === targetId) {
            comp.data.disabled = disable;
          }
        }

        if (comp.accessory) {
          const accType = comp.accessory.data?.type;
          const accId = comp.accessory.data?.custom_id;
          const accPlaceholder = comp.accessory.data?.placeholder;

          if ((mode === "all" || mode === "buttons") && accType === 2) {
            if (!targetId || accId === targetId) comp.accessory.data.disabled = disable;
          }
          if ((mode === "all" || mode === "selects") && accType === 5) {
            if (!targetId || accId === targetId || accPlaceholder === targetId) {
              comp.accessory.data.disabled = disable;
            }
          }
        }
      }
    }

    let components = null;
    if (message?.components) {
      const oldComponents = message.components.map(c =>
        typeof c.toJSON === "function" ? c.toJSON() : c
      );

      switch (type) {
        case "all":
          setDisabledOnly(oldComponents, { mode: "all", disable });
          break;
        case "allButtons":
          setDisabledOnly(oldComponents, { mode: "buttons", disable });
          break;
        case "allSelects":
          setDisabledOnly(oldComponents, { mode: "selects", disable });
          break;
        case "sourceButton":
          setDisabledOnly(oldComponents, { targetId: sourceButton, mode: "buttons", disable });
          break;
        case "sourceSelect":
          setDisabledOnly(oldComponents, { targetId: sourceSelect, mode: "selects", disable });
          break;
        case "findButton":
          if (searchValue === null) searchValue = this.evalMessage(data.searchValue, cache);
          setDisabledOnly(oldComponents, { targetId: searchValue, mode: "buttons", disable });
          break;
        case "findSelect":
          if (searchValue === null) searchValue = this.evalMessage(data.searchValue, cache);
          setDisabledOnly(oldComponents, { targetId: searchValue, mode: "selects", disable });
          break;
      }

      function debugComponents(components) {
        return components.map(c => {
          const obj = { data: { ...c.data } };

          if (c.components) obj.components = debugComponents(c.components);

          if (c.data?.disabled !== undefined) {
            obj.data.disabled = c.data.disabled;
          }

          if (c.accessory) {
            obj.accessory = { data: { ...c.accessory.data } };
            if (c.accessory.data?.disabled !== undefined) {
              obj.accessory.data.disabled = c.accessory.data.disabled;
            }
          }

          return obj;
        });
      }

      if (Array.isArray(message)) {
        this.callListFunc(message, "edit", [{ components: oldComponents }]).then(() => this.callNextAction(cache));
      } else if (message?.edit) {
        message.edit({ components: oldComponents }).then(() => this.callNextAction(cache))
          .catch(err => this.displayError(data, cache, err));
      } else {
        if (message.components) message.components = oldComponents;
        this.callNextAction(cache);
      }
  } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
