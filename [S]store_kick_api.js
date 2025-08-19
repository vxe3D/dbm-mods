// kick_api_MOD.js
// Module for Kick.com API integration using @nekiro/kick-api
// Provides: isStreamerLive, getStreamInfo, getChannelInfo

module.exports = {
  name: "Store Kick API",
  section: "# SHDZ - Utilities",
  meta: {
    version: "3.2.0",
    author: "vxed_",
    authorUrl: "https://github.com/yourprofile",
    downloadURL: "https://www.npmjs.com/package/@nekiro/kick-api",
  },

  fields: ["option", "username", "infoKey", "storage", "varName", "client_id", "client_secret", "reUse", "debugMode"],

  subtitle(data) {
    let optLabel = '';
    if (data.option === 'isStreamerLive') optLabel = 'Is Streamer Live';
    else if (data.option === 'getStreamInfo') optLabel = 'Stream Info';
    else if (data.option === 'getChannelInfo') optLabel = 'Channel Info';
    else if (data.option === 'getChatroomInfo') optLabel = 'Chatroom Info';
    else optLabel = data.option || '';

    const infoKeyText = {
      id: 'ID', username: 'Username', avatar: 'Avatar', bio: 'Bio', followers: 'Followers',
      verified: 'Verified', vod_enabled: 'Vod Enabled?', can_host: 'Can Host?', is_banned: 'Is Banned?',
      subscription_enabled: 'Subscription Enabled?', title: 'Title', category: 'Category',
      startedAt: 'Started At', url: 'URL', isLive: 'Store (true/false)', has_mature_content: 'Has Mature Content?', 
      channel_id: 'Channel ID', started_at: 'Started At', stream_title: 'Stream Title', 
      viewer_count: 'Viewer Count', thumbnail: 'Thumbnail', language: 'Language',
    };

    let keyLabel = data.infoKey ? ` | ${infoKeyText[data.infoKey] || data.infoKey}` : '';
    let varLabel = data.varName ? ` | ${data.varName}` : '';
    return `${optLabel}${keyLabel}${varLabel}`;
  },

  html() {
    return `
    <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
      <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
      <a href="https://discord.gg/9HYB4n3Dz4" class="vcstatus-discord" target="_blank">Discord</a>
    </div>
    <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
      <span class="vcstatus-version">v3.2.0</span>
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
      .vcstatus-warning {
        background: linear-gradient(90deg, #4a3252ff 0%, #885697ff 100%);
        border: 1px solid #140e16ff;
        color: #222;
        padding: 10px 14px 10px 14px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 13px;
        box-shadow: 0 2px 8px rgba(255,85,85,0.08);
        margin-top: 5px;
      }
      .dbminputlabel {
        color: #8754ffff;
        font-weight: bold;
        margin-bottom: 4px;
        display: inline-block;
      }
      input.round {
        border-radius: 6px;
        border: 1px solid #aaa;
        padding: 6px 10px;
        font-size: 14px;
        margin-top: 2px;
        background: #21232B;
        transition: border-color 0.2s;
      }
      input.round:focus {
        border-color: #b595ffff;
        outline: none;
      }
    </style>

    <tab-system id="tabs" style="margin-top: 10px;">
      <tab label="Main" icon="cogs">
        <div style="padding:0 0 0 0;">
          <div style="width:48%;float:left;">
            <span class="dbminputlabel">Option</span>
            <select id="option" class="round" style="width:100%;">
              <option value="isStreamerLive">Is Streamer Live?</option>
              <option value="getStreamInfo">Get Stream Info</option>
              <option value="getChannelInfo">Get Channel Info</option>
            </select>
          </div>
          <div style="width:48%;float:right;">
            <span class="dbminputlabel">Info Key</span>
            <select id="infoKey" class="round" style="width:100%;"></select>
          </div>
          <div style="clear:both;"></div><br>
          <div style="width:48%;float:left;">
            <span class="dbminputlabel">KICK.com | Username</span>
            <input id="username" class="round" type="text" placeholder="Insert your KICK Username">
          </div>
          <div style="width:48%;float:right;">
            <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
          </div>
          <div style="clear:both;"></div>
          <div style="width:48%;float:left; margin-top: -50px;">
            <label for="reUse"><span class="dbminputlabel">Re-Use Previously Stored</span></label>
            <select id="reUse" class="round">
              <option value="1" selected>Allow</option>
              <option value="0">Disallow</option>
            </select>
            <p style="margin-left: 4px;">Toggles re-use of previously stored API result for the same parameters.</p>
          </div>
          <div style="clear:both;"></div>
        </div>
      </tab>
      <tab label="Settings" icon="settings">
        <div style="width:48%;float:left;margin-top: 0px;">
          <span class="dbminputlabel">Kick Client ID</span>
          <input id="client_id" class="round" type="password" placeholder="Insert your Kick Client ID">
        </div>
        <div style="width:48%;float:right;margin-top: 0px;">
          <span class="dbminputlabel">Kick Client Secret</span>
          <input id="client_secret" class="round" type="password" placeholder="Insert your Kick Client Secret">
        </div>
        <div style="clear:both;"></div>
        <div style="width:48%;float:left;margin-top: 10px;">
          <label for="debugMode"><span class="dbminputlabel">Debug Mode</span></label>
          <select id="debugMode" class="round">
            <option value="1">Enabled</option>
            <option value="0" selected>Disabled</option>
          </select>
          <p style="margin-left: 4px;">Enables printing to console, disable to remove all messages. Turn on to see errors.</p>
        </div>
        <div style="clear:both;"></div>
      </tab>
    </tab-system><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div class="vcstatus-warning">
      <span style="color:#ff0000">⚠️ <b>Uwaga!</b></span> <span style="color:#ffffff">Jeśli nie działa ci ta funkcja, spróbuj ponownie zainstalować moduły!</span><br>
      <span style="color: #00ffd5ff">🧩 <b>@johannmorales/kick.js</b></span> <span style="color: #ffffff">|</span> <span style="color: #00ffd5ff"><b>@nekiro/kick-api</b></span> <span style="color:#ffffff">| To moduły do zainstalowania!</span><br>
      <span style="color:#ffffff">🆘 Jeśli dalej ci akcja nie działa, zgłoś się do </span><span style="color: #ffa600ff"><b>vxed_</b></span>
    </div>
`;
  },

  init() {
    const { document } = this;
    function kickApiUpdateInfoKeyOptions() {
      const option = document.getElementById('option').value;
      const infoKey = document.getElementById('infoKey');
      infoKey.innerHTML = '';
      let opts = [];
      if(option === 'isStreamerLive') {
        opts = [{ value: 'isLive', text: 'Store (true/false)' }];
      } else if(option === 'getStreamInfo') {
        opts = [
          { value: 'category', text: 'Category' },
          { value: 'channel_id', text: 'Channel ID' },
          { value: 'has_mature_content', text: 'Has Mature Content?' },
          { value: 'language', text: 'Language' },
          { value: 'started_at', text: 'Started At' },
          { value: 'stream_title', text: 'Stream Title' },
          { value: 'thumbnail', text: 'Thumbnail' },
          { value: 'viewer_count', text: 'Viewer Count' }
        ];
      } else if(option === 'getChannelInfo') {
        opts = [
          { value: 'id', text: 'ID' },
          { value: 'username', text: 'Username' },
          { value: 'avatar', text: 'Avatar' },
          { value: 'bio', text: 'Bio' },
          { value: 'followers', text: 'Followers' },
          { value: 'verified', text: 'Verified' },
          { value: 'vod_enabled', text: 'Vod Enabled?' },
          { value: 'can_host', text: 'Can Host?' },
          { value: 'subscription_enabled', text: 'Subscription Enabled?' },
          { value: 'is_banned', text: 'Is Banned?' }
        ];
      }
      opts.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.text = opt.text;
        infoKey.appendChild(o);
      });
    }
    document.getElementById('option')?.addEventListener('change', kickApiUpdateInfoKeyOptions);
    kickApiUpdateInfoKeyOptions();
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Kick API Result"];
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const { Actions } = this.getDBM();
    const option = data.option;
    const username = this.evalMessage(data.username, cache);
    const infoKey = data.infoKey;
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const client_id = this.evalMessage(data.client_id, cache);
    const client_secret = this.evalMessage(data.client_secret, cache);
    const reUse = parseInt(data.reUse, 10);
    const debugMode = parseInt(data.debugMode, 10);

    // Uproszczony cacheKey: tylko option+username (jak w DBM Mods: url)
    function normalizeKey(str) {
      return String(str || "").replace(/\s+/g, "_").toLowerCase().trim();
    }
    const cacheKey = normalizeKey(`kickapi_${username}`); // cache na usera, całość danych

    // Logowanie wszystkich kluczy globalnych (tylko w debugMode)
    if (debugMode) {
      try {
        const globals = this.getDBM().Files.data.globals || {};
        console.log('[KickAPI] Global variable keys:', Object.keys(globals));
      } catch (e) {
        console.log('[KickAPI] Błąd przy pobieraniu kluczy globalnych:', e);
      }
    }

    // Odczyt cache: jeśli istnieje, użyj i nie rób requesta, wyciągnij infoKey z obiektu
    if (reUse === 1) {
      let cachedObj;
      let cacheError;
      try {
        cachedObj = this.getVariable(1, cacheKey, cache);
      } catch (err) {
        cacheError = err;
      }
      if (typeof cachedObj !== 'undefined') {
        if (debugMode) console.log(`[KickAPI] Using cached object for ${cacheKey}`);
        let value = cachedObj;
        if (option === "isStreamerLive") {
          value = !!cachedObj?.stream?.is_live;
        } else if (option === "getStreamInfo") {
          const mapped = {
            category: cachedObj.category?.name || null,
            channel_id: cachedObj.broadcaster_user_id || null,
            has_mature_content: cachedObj.stream?.is_mature || false,
            language: cachedObj.stream?.language || null,
            started_at: cachedObj.stream?.start_time || null,
            stream_title: cachedObj.stream_title || null,
            thumbnail: cachedObj.stream?.thumbnail || null,
            viewer_count: cachedObj.stream?.viewer_count || 0
          };
          value = infoKey ? infoKey.split('.').reduce((obj,key)=>obj?.[key], mapped) : mapped;
          if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
        } else if (option === "getChannelInfo") {
          if(infoKey) {
            switch(infoKey) {
              case 'id': value = cachedObj.id; break;
              case 'username': value = cachedObj.slug; break;
              case 'is_banned': value = cachedObj.is_banned; break;
              case 'vod_enabled': value = cachedObj.vod_enabled; break;
              case 'subscription_enabled': value = cachedObj.subscription_enabled; break;
              case 'followers': value = cachedObj.followers_count; break;
              case 'verified': value = cachedObj.verified; break;
              case 'can_host': value = cachedObj.can_host; break;
              case 'bio': value = cachedObj.user?.bio; break;
              case 'avatar': value = cachedObj.user?.profile_pic; break;
              default: value = infoKey.split('.').reduce((obj,key)=>obj?.[key], cachedObj);
            }
          } else value = cachedObj;
          if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
        }
        Actions.storeValue(value, storage, varName, cache);
        Actions.callNextAction(cache);
        return;
      } else if (debugMode) {
        console.log(`[KickAPI] No cached result found for ${cacheKey}`);
      }
    }

    const { client: KickClient } = require('@nekiro/kick-api');
    let apiError500 = false;
    let apiObj = undefined;
    let value = undefined;
    try {
      const api = new KickClient({
        clientId: client_id,
        clientSecret: client_secret,
      });
      if(option === "isStreamerLive" || option === "getStreamInfo") {
        if (debugMode) console.log(`[KickAPI] Request: getChannel | username: ${username}`);
        apiObj = await api.channels.getChannel(username);
      } else if(option === "getChannelInfo") {
        if (debugMode) console.log(`[KickAPI] Request: getProfile | username: ${username}`);
        const { getProfile } = require("@johannmorales/kick.js");
        apiObj = await getProfile(username);
      }
      // Wyciągnij value z apiObj
      if(option === "isStreamerLive") {
        value = !!apiObj?.stream?.is_live;
        if (debugMode) console.log(`[KickAPI] isStreamerLive for ${username}:`, value);
      } else if(option === "getStreamInfo") {
        const mapped = {
          category: apiObj.category?.name || null,
          channel_id: apiObj.broadcaster_user_id || null,
          has_mature_content: apiObj.stream?.is_mature || false,
          language: apiObj.stream?.language || null,
          started_at: apiObj.stream?.start_time || null,
          stream_title: apiObj.stream_title || null,
          thumbnail: apiObj.stream?.thumbnail || null,
          viewer_count: apiObj.stream?.viewer_count || 0
        };
        value = infoKey ? infoKey.split('.').reduce((obj,key)=>obj?.[key], mapped) : mapped;
        if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
        if (debugMode) console.log(`[KickAPI] getStreamInfo for ${username}:`, value);
      } else if(option === "getChannelInfo") {
        if(infoKey) {
          switch(infoKey) {
            case 'id': value = apiObj.id; break;
            case 'username': value = apiObj.slug; break;
            case 'is_banned': value = apiObj.is_banned; break;
            case 'vod_enabled': value = apiObj.vod_enabled; break;
            case 'subscription_enabled': value = apiObj.subscription_enabled; break;
            case 'followers': value = apiObj.followers_count; break;
            case 'verified': value = apiObj.verified; break;
            case 'can_host': value = apiObj.can_host; break;
            case 'bio': value = apiObj.user?.bio; break;
            case 'avatar': value = apiObj.user?.profile_pic; break;
            default: value = infoKey.split('.').reduce((obj,key)=>obj?.[key], apiObj);
          }
        } else value = apiObj;
        if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
        if (debugMode) console.log(`[KickAPI] getChannelInfo for ${username}:`, value);
      }
    } catch(err) {
      if (debugMode) {
        console.error('[KickAPI] Error:', err?.stack || err);
        if (err && err.message && err.message.includes('500')) {
          apiError500 = true;
          console.error('[KickAPI] 500 Internal Server Error details:');
          console.error('  Option:', option);
          console.error('  Username:', username);
          console.error('  InfoKey:', infoKey);
          console.error('  Client ID:', client_id);
          console.error('  Client Secret:', client_secret ? '[provided]' : '[not set]');
          console.error('  Full error object:', err);
        }
      }
      // Jeśli jest 500, spróbuj użyć cache jeśli istnieje
      if (apiError500 && reUse === 1) {
        let cachedObj;
        try {
          cachedObj = this.getVariable(1, cacheKey, cache);
        } catch (e) {}
        if (typeof cachedObj !== 'undefined') {
          if (debugMode) console.log(`[KickAPI] Using cached object after 500 for ${cacheKey}`);
          let value = cachedObj;
          if (option === "isStreamerLive") {
            value = !!cachedObj?.stream?.is_live;
          } else if (option === "getStreamInfo") {
            const mapped = {
              category: cachedObj.category?.name || null,
              channel_id: cachedObj.broadcaster_user_id || null,
              has_mature_content: cachedObj.stream?.is_mature || false,
              language: cachedObj.stream?.language || null,
              started_at: cachedObj.stream?.start_time || null,
              stream_title: cachedObj.stream_title || null,
              thumbnail: cachedObj.stream?.thumbnail || null,
              viewer_count: cachedObj.stream?.viewer_count || 0
            };
            value = infoKey ? infoKey.split('.').reduce((obj,key)=>obj?.[key], mapped) : mapped;
            if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
          } else if (option === "getChannelInfo") {
            if(infoKey) {
              switch(infoKey) {
                case 'id': value = cachedObj.id; break;
                case 'username': value = cachedObj.slug; break;
                case 'is_banned': value = cachedObj.is_banned; break;
                case 'vod_enabled': value = cachedObj.vod_enabled; break;
                case 'subscription_enabled': value = cachedObj.subscription_enabled; break;
                case 'followers': value = cachedObj.followers_count; break;
                case 'verified': value = cachedObj.verified; break;
                case 'can_host': value = cachedObj.can_host; break;
                case 'bio': value = cachedObj.user?.bio; break;
                case 'avatar': value = cachedObj.user?.profile_pic; break;
                default: value = infoKey.split('.').reduce((obj,key)=>obj?.[key], cachedObj);
              }
            } else value = cachedObj;
            if(typeof value === 'object' && value !== null) value = JSON.stringify(value);
          }
          Actions.storeValue(value, storage, varName, cache);
          Actions.callNextAction(cache);
          return;
        }
      }
      Actions.storeValue('KickAPI error: ' + (err?.message || String(err)), storage, varName, cache);
      Actions.callNextAction(cache);
      return;
    }
    Actions.storeValue(value, storage, varName, cache);
    // Zapisz do global cache tylko jeśli nie było 500
    if (reUse === 1 && !apiError500 && typeof apiObj !== 'undefined') {
      Actions.storeValue(apiObj, 1, cacheKey, cache);
      if (debugMode) {
        const globals = this.getDBM().Files.data.globals || {};
        console.log(`[KickAPI] Saved to global cache: ${cacheKey}`);
        console.log('[KickAPI] Global variable keys after save:', Object.keys(globals));
      }
    }
    Actions.callNextAction(cache);
  },

  mod() {},
};
