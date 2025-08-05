module.exports = {
  name: "Find Channel",
  section: "Channel Control",

  subtitle(data, presets) {
    const info = [
      "Channel ID",
      "Channel Name",
      "Channel Topic",
      "Channel Position",
      "Channel Category ID",
    ];
    return `Find Channel by ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Channel"];
  },

  meta: {
    version: "4.0.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
  },

  fields: ["info", "find", "storage", "varName"],

  html(isEvent, data) {
    return `
<div>
  <div style="float: left; width: 40%;">
    <span class="dbminputlabel">Source Field</span><br>
    <select id="info" class="round">
      <option value="0" selected>Channel ID</option>
      <option value="1">Channel Name</option>
      <option value="2">Channel Topic</option>
      <option value="3">Channel Position</option>
      <option value="4">Channel Category ID</option>
    </select>
  </div>
  <div style="float: right; width: 55%;">
    <span class="dbminputlabel">Search Value</span><br>
    <input id="find" class="round" type="text">
  </div>
</div>

<br><br><br>

<store-in-variable style="padding-top: 8px;" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="40%" variableInputWidth="55%"></store-in-variable>`;
  },

  init() {},

  action(cache) {
    const server = cache.server;
    if (!server?.channels) {
      this.callNextAction(cache);
      return;
    }
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const find = this.evalMessage(data.find, cache);

    // Kompatybilność v13/v14
    let ChannelType, TEXT, NEWS;
    try {
      ChannelType = require('discord.js').ChannelType;
    } catch (e) {
      ChannelType = undefined;
    }
    if (ChannelType) {
      // v14
      TEXT = ChannelType.GuildText;
      NEWS = ChannelType.GuildAnnouncement ? ChannelType.GuildAnnouncement : ChannelType.GuildNews;
    } else {
      // v13
      TEXT = 'GUILD_TEXT';
      NEWS = 'GUILD_NEWS';
    }

    const channels = server.channels.cache.filter(
      (c) => c.type === TEXT || c.type === NEWS
    );
    let result;
    switch (info) {
      case 0:
        result = channels.get(find);
        break;
      case 1:
        result = channels.find((c) => c.name === find);
        break;
      case 2:
        result = channels.find((c) => c.topic === find);
        break;
      case 3:
        const position = parseInt(find, 10);
        result = channels.find((c) => c.position === position);
        break;
      case 4:
        result = channels.find((c) => c.parentId === find);
        break;
      default:
        break;
    }
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    if (result !== undefined) {
      this.storeValue(result, storage, varName, cache);
    } else {
      this.storeValue(false, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
