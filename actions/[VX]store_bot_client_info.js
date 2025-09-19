module.exports = {
  name: '[VX]store_bot_client_info',
  displayName: 'Store Bot Client Info',
  section: '# VX - Utilities',
  meta: {
    version: "3.2.0",
    actionVersion: "3.5.0",
    preciseCheck: false,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    const info = [
      'Uptime in Milliseconds',
      'Ready At?',
      'Ping',
      'Guild Amount',
      'User Amount',
      'Rounded Ping',
      'Uptime in Seconds',
      'Uptime in Minutes',
      "Bots' Token",
      'Voice Connections Amount',
      'Total Amount of Channels',
      'Total Amount of Emojis',
      'This option has been removed',
      'Uptime in Days',
      'Uptime in Days (Rounded)',
      'Memory (RAM) Usage',
      'Bot Guilds Objects',
      'Bot Guilds Names',
      'Bot Guilds IDs',
      'Bot Current Prefix',
      'Bot Client ID',
      'Discord JS Version',
      'Uptime in Hours',
      'Refreshing Uptime in Days',
      'Refreshing Uptime in Hours',
      'Refreshing Uptime in Minutes',
      'Refreshing Uptime in Seconds',
      'Memory (RAM) Usage in MB',
      "Bots' OS (Process Platform)",
      'CPU Usage in MB',
      "Bots' Directory",
      'Node JS Version',
      'Total Amount of Commands',
      'Total Amount of Events',
      'Ready At ? [timestamp]',
      'CPU Core Count',
      'Total Memory (GB)',
      'Total Memory (MB)',
      'Available Memory (GB)',
      'Available Memory (MB)',
      'Available Memory (%)',
      'Used Memory (GB)',
      'Used Memory (MB)',
      'Used Memory (%)',
      'Bot Owner ID',
      'Are Commands Case Sensitive?',
      'Last Message ID',
      'Average CPU Average (1m ,5m, 15m)',
      'Current CPU Usage',
    ];
    return `Bot Client - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0: // Uptime in Milliseconds
      case 22: // Uptime in Hours
      case 27: // Memory (RAM) Usage in MB
      case 29: // CPU Usage in MB
      case 32: // Amount of Commands
      case 33: // Amount of Events
      case 34: // Ready At ? [Timestamp]
      case 35: // CPU Core Amount
      case 36: // Total Memory (GB)
      case 37: // Total Memory (MB)
      case 38: // Available Memory (GB)
      case 39: // Available Memory (MB)
      case 40: // Available Memory (%)
      case 41: // Used Memory (GB)
      case 42: // Used Memory (MB)
      case 43: // Used Memory (%)
      case 48: // CPU Usage (%)
      case 2: // Ping
      case 3: // Guild Amount
      case 4: // User Amount
      case 5: // Rounded Ping
      case 6: // Uptime in Seconds
      case 7: // Uptime in Minutes
      case 9: // Voice Connections Amount
      case 10: // Total Amount of Channels
      case 11: // Total Amount of Emojis
      case 15: // Memory (Ram) Usage
        dataType = 'Number';
        break;
      case 1: // Ready At
        dataType = 'Date';
        break;
      case 8: // Bots' Token
        dataType = 'Token';
        break;
      case 16: // Bot Guilds Objects
        dataType = 'Guild';
        break;
      case 17: // Bot Guilds Names
        dataType = 'Guild Name';
        break;
      case 18: // Bot Guilds IDs
        dataType = 'Guild ID';
        break;
      case 19: // Bot Current Prefix
        dataType = 'Bot Tag';
        break;
      case 20: // Bot Client ID
        dataType = 'Bot ID';
        break;
      case 13: // Uptime in Days
      case 14: // Uptime in Days (Rounded)
      case 23: // Refreshing Uptime in Days
      case 24: // Refreshing Uptime in Hours
      case 25: // Refreshing Uptime in Minutes
      case 26: // Refreshing Uptime in Seconds
        dataType = 'Time';
        break;
      case 28: // Bots' OS (Process Platform)
        dataType = 'OS Name';
        break;
      case 30: // Bots' Directory
        dataType = 'Directory';
        break;
      case 21: // Discord JS Version
      case 31: // Node JS Version
        dataType = 'Version Number';
        break;
      case 44: // Bot Owner ID
        dataType = 'Bot Owner ID';
        break;
      case 45: // Are Commands Case Sensitive?
        dataType = 'Boolean';
        break;
      case 46: // Last Message ID
        dataType = 'Last Message ID';
        break;
      case 47: // CPU Load Average
        dataType = 'Average CPU Usage Array';
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ['info', 'storage', 'varName2'],

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

      <div style="float: left; width: 80%; padding-top: 8px;">
        <span class="dbminputlabel">Source Info</span><br>
        <select id="info" class="round">
          <optgroup label="Uptimes">
            <option value="23">Refreshing Uptime in Days</option>
            <option value="24">Refreshing Uptime in Hours</option>
            <option value="25">Refreshing Uptime in Minutes</option>
            <option value="26">Refreshing Uptime in Seconds</option>
            <option value="0">Uptime in Milliseconds</option>
          </optgroup>
          <optgroup label="Values">
            <option value="3">Total Amount of Guilds</option>
            <option value="4">Total Amount of Users</option>
            <option value="10">Total Amount of Channels</option>
            <option value="11">Total Amount of Emojis</option>
            <option value="32">Total Amount of Commands</option>
            <option value="33">Total Amount of Events</option>
            <option value="9">Total Voice Connections</option>
          </optgroup>
          <optgroup label="Guilds Arrays">
            <option value="16">Bot Guilds Objects</option>
            <option value="17">Bot Guilds Names</option>
            <option value="18">Bot Guilds IDs</option>
          <optgroup label="Bot Information">
            <option value="19">Bot Current Prefix</option>
            <option value="20">Bot Client ID</option>
            <option value="44">Bot Owner ID</option>
            <option value="28">Bot OS (Process Platform)</option>
            <option value="30">Bot Directory</option>
            <option value="8">Bot Token (be careful)</option>
            <option value="45">Are Commands Case Sensitive?</option>
            <option value="46">Last Message ID</option>
          </optgroup>
          <optgroup label="System Measurements">
            <option value="29">CPU Usage (MB)</option>
            <option value="47">Average CPU Usage [1m, 5m, 15m] (%)</option>
            <option value="48">CPU Usage (%)</option>
            <option value="35">CPU Core Count</option>
            <option value="36">Total Memory (GB)</option>
            <option value="37">Total Memory (MB)</option>
            <option value="38">Available Memory (GB)</option>
            <option value="39">Available Memory (MB)</option>
            <option value="40">Available Memory (%)</option>
            <option value="41">Used Memory (GB)</option>
            <option value="42">Used Memory (MB)</option>
            <option value="43">Used Memory (%)</option>
          </optgroup>
          <optgroup label="Bot Measurements">
            <option value="27">Memory (RAM) Usage in MB</option>
            <option value="1">Ready at</option>
            <option value="34">Ready at [unix timestamp]</option>
            <option value="2">Ping</option>
            <option value="5">Ping Rounded</option>
          </optgroup>
          <optgroup label="Versions">
            <option value="21">Discord JS Version</option>
            <option value="31">Node JS Version</option>
          </optgroup>
        </select>
      </div>
      <br><br><br>

    <div style="padding-top: 8px;">
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    </div>`;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const botClient = this.getDBM().Bot.bot;
    const { Bot } = this.getDBM();
    const { Client } = require('discord.js');
    const os = require('os');
    if (process.platform === 'win32') this.getMods().require('loadavg-windows'); // Make loadavg work on windows.
    const DBM = this.getDBM();
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const msToDay = 1000 * 60 * 60 * 24;

    if (!botClient) return this.callNextAction(cache);

    let result;
    switch (info) {
      case 0:
        result = botClient.uptime;
        break;
      case 1:
        result = botClient.readyAt;
        break;
      case 2:
        result = botClient.ws.ping;
        break;
      case 3: // Guild Amount
        result = botClient.guilds.cache.size;
        break;
      case 4: // User Amount
        result = botClient.users.cache.size;
        break;
      case 5:
        result = Math.round(botClient.ws.ping);
        break;
      case 6: // Uptime in Seconds // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000);
        break;
      case 7: // Uptime in Minutes // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000 / 60);
        break;
      case 8: // Bots' Token
        result = botClient.token;
        break;
      case 9: // Voice Connections Amount
        result = botClient.voice.adapters.size;
        break;
      case 10: // Total Amount of Channels
        result = botClient.channels.cache.size;
        break;
      case 11: // Total Amount of Emojis
        result = botClient.emojis.cache.size;
        break;
      case 13: // Uptime in Days // Deprecated in 1.8.5
        result = botClient.uptime / msToDay;
        break;
      case 14: // Uptime in Days (Rounded) // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / msToDay);
        break;
      case 15: // Memory (Ram) Usage // Deprecated in 1.8.8
        result = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`;
        break;
      case 16: // Bot Guilds Objects
        result = botClient.guilds.cache.array();
        break;
      case 17: // Bot Guilds Names
        result = botClient.guilds.cache.map((g) => g.name);
        break;
      case 18: // Bot Guilds IDs
        result = botClient.guilds.cache.map((g) => g.id);
        break;
      case 19: // Bot Current Prefix
        result = DBM.Files.data.settings.tag;
        break;
      case 20: // Bot Client ID
        result = DBM.Files.data.settings.client;
        break;
      case 21: // Discord JS Version
        result = require('discord.js').version;
        break;
      case 22: // Uptime in Hours // Deprecated in 1.8.5
        result = Math.floor(botClient.uptime / 1000 / 60 / 60);
        break;
      case 23: // Refreshing Uptime in Days
        result = Math.floor((process.uptime() % 31536000) / 86400);
        break;
      case 24: // Refreshing Uptime in Hours
        result = Math.floor((process.uptime() % 86400) / 3600);
        break;
      case 25: // Refreshing Uptime in Minutes
        result = Math.floor((process.uptime() % 3600) / 60);
        break;
      case 26: // Refreshing Uptime in  Seconds
        result = Math.round(process.uptime() % 60);
        break;
      case 27: // Memory (RAM) Usage in MB
        result = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        break;
      case 28: // Bots' OS (Process Platform)
        if (process.platform) {
          const { platform } = process;
          if (platform === 'win32') result = 'Windows';
          else if (platform === 'aix') result = 'Aix';
          else if (platform === 'linux') result = 'Linux';
          else if (platform === 'darwin') result = 'Darwin';
          else if (platform === 'openbsd') result = 'OpenBSD';
          else if (platform === 'sunos') result = 'Solaris';
          else if (platform === 'freebsd') result = 'FreeBSD';
        }
        break;
      case 29: // CPU Usage in MB
        result = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
        break;
      case 30: // Bots' Directory
        result = process.cwd();
        break;
      case 31: // Node JS Version
        result = process.versions.node;
        break;
      case 32: // Amount of Commands
        result = DBM.Files.data.commands.length;
        break;
      case 33: // Amount of Events
        result = DBM.Files.data.events.length;
        break;
      case 34: // Ready At ? [Timestamp]
        result = botClient.readyTimestamp;
        break;
      case 35: // CPU Core Amount
        result = os.cpus().length;
        break;
      case 36: // Total Memory (GB)
        result = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        break;
      case 37: // Total Memory (MB)
        result = (os.totalmem() / 1024 / 1024).toFixed(0);
        break;
      case 38: // Available Memory (GB)
        result = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        break;
      case 39: // Available Memory (MB)
        result = (os.freemem() / 1024 / 1024).toFixed(0);
        break;
      case 40: // Available Memory (%)
        result = Math.floor((os.freemem() / os.totalmem()) * 100);
        break;
      case 41: // Used Memory (GB)
        result = ((os.totalmem() - os.freemem() / 1024) / 1024 / 1024).toFixed(2);
        break;
      case 42: // Used Memory (MB)
        result = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(0);
        break;
      case 43: // Used Memory (%)
        result = Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);
        break;
      case 44: // Bot Owner ID
        result = DBM.Files.data.settings.ownerId;
        break;
      case 45: // Are Commands Case Sensitive?
        result = Bot._caseSensitive;
        break;
      case 46: // Last Message ID
        result = botClient.user.lastMessageID;
        break;
      case 47: // CPU Usage Average [1m, 5m, 15m]
        result = os.loadavg();
        break;
      case 48: // Current CPU Usage
        result = os.loadavg()[0];
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
