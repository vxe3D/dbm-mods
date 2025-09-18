module.exports = {
  name: "Control Music",
  section: "# VX - Music",
  meta: {
    version: "3.2.0",
    actionVersion: "3.3.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadURL:
      "https://github.com/vxe3D/dbm-mods",
  },
  fields: ["action", "volume", "bitrate"],

  subtitle(data) {
    const actions = [
      "Stop Playing",
      "Pause Music",
      "Resume Music",
      "Skip Music",
      "Play Previous Music",
      "Clear Queue",
      "Shuffle Queue",
      "Set Volume",
      "Set Bitrate",
      "Loop Queue",
      "Loop One",
    ];
    return `${actions[parseInt(data.action, 10)]}`;
  },

  html() {
    return `
      <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
        <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
        <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
      </div>
      <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
        <span class="vcstatus-version">v3.3.0</span>
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
  
  <div style="float: left; width: calc(50% - 8px);">
      <span class="dbminputlabel">Music Action</span>
      <select id="action" class="round" onchange="glob.onChange(this)">
          <option value="0" selected>Stop Playing</option>
          <option value="1">Pause Music</option>
          <option value="2">Resume Music</option>
      <option value="3">Skip Music</option>
      <option value="4">Play Previous Music</option>
      <option value="5">Clear Queue</option>
      <option value="6">Shuffle Queue</option>
      <option value="7">Set Volume</option>
      <option value="8">Set Bitrate</option>
      <option value="9">Loop Queue</option>
      <option value="10">Loop One</option>
      </select>
  </div>
  
  <div id="volumeDiv" style="float: right; display: none; width: calc(50% - 8px);">
    <span class="dbminputlabel">Volume Level</span>
    <input id="volume" class="round" type="text">
  </div>
  
  <div id="bitrateDiv" style="float: right; display: none; width: calc(50% - 8px);">
    <span class="dbminputlabel">Bitrate</span>
    <input id="bitrate" class="round" type="text" value="auto">
  </div>
  `;
  },

  init() {
    const { glob, document } = this;

    const volume = document.getElementById("volumeDiv");
    const bitrate = document.getElementById("bitrateDiv");

    glob.onChange = function onChange(event) {
      switch (parseInt(event.value, 10)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 9:
        case 10:
          volume.style.display = "none";
          bitrate.style.display = "none";
          break;
        case 7:
          volume.style.display = null;
          bitrate.style.display = "none";
          break;
        case 8:
          volume.style.display = "none";
          bitrate.style.display = null;
          break;
        default:
          break;
      }
    };

    glob.onChange(document.getElementById("action"));
  },

  action(cache) {
    const { Bot } = this.getDBM();
    const data = cache.actions[cache.index];
    const server = cache.server;
    const action = parseInt(data.action, 10);
    const volume = parseInt(this.evalMessage(data.volume, cache), 10);
    const bitrate = this.evalMessage(data.bitrate, cache);

    if (volume && isNaN(volume)) {
      console.log("Invalid volume number in Control Music");
      return this.callNextAction(cache);
    }

    if (!Bot.bot.queue) return this.callNextAction(cache);

    const queue = Bot.bot.queue.get(server.id);
    if (!queue) return this.callNextAction(cache);

    // Ensure loop properties exist
    if (typeof queue.loopQueue === "undefined") queue.loopQueue = false;
    if (typeof queue.loopOne === "undefined") queue.loopOne = false;

    try {
      // Add error listeners to player and connection if not already present
      if (queue.player && !queue.player._errorListenerAdded) {
        queue.player.on('error', (err) => {
          console.error('[control_music_MOD] Player error:', err);
        });
        queue.player._errorListenerAdded = true;
      }
      if (queue.connection && !queue.connection._errorListenerAdded) {
        queue.connection.on('error', (err) => {
          console.error('[control_music_MOD] Connection error:', err);
        });
        queue.connection._errorListenerAdded = true;
      }
      switch (action) {
        case 0:
          if (queue.player) {
            try { queue.player.stop(); } catch (e) { /* ignore */ }
          }
          if (queue.connection && queue.connection.state && queue.connection.state.status !== 'disconnected') {
            try { queue.connection.disconnect(); } catch (e) { /* ignore */ }
          }
          break;
        case 1:
          if (queue.player) queue.player.pause();
          break;
        case 2:
          if (queue.player) queue.player.unpause();
          break;
        case 3:
          queue.player.stop();
          break;
        case 4:
          queue.currentIndex -= 2;
          if (queue.player) {
            try { queue.player.stop(); } catch (e) { /* ignore */ }
          }
          break;
        case 5:
          queue.songs = [];
          break;
        case 6: {
          const currentIndex = queue.currentIndex + 1;
          for (let i = queue.songs.length - 1; i > currentIndex; i--) {
            const j =
              Math.floor(Math.random() * (i - currentIndex + 1)) + currentIndex;
            [queue.songs[i], queue.songs[j]] = [queue.songs[j], queue.songs[i]];
          }
          break;
        }
        case 7:
          if (queue.player && queue.player.state && queue.player.state.resource && queue.player.state.resource.volume) {
            queue.player.state.resource.volume.setVolume(volume / 100);
          }
          break;
        case 8:
          if (queue.player && queue.player.state && queue.player.state.resource && queue.player.state.resource.encoder) {
            queue.player.state.resource.encoder.setBitrate(bitrate);
          }
          break;
        case 9: // Loop Queue
          queue.loopQueue = !queue.loopQueue;
          queue.loopOne = false;
          break;
        case 10: // Loop One
          queue.loopOne = !queue.loopOne;
          queue.loopQueue = false;
          break;
      }
    } catch (err) {
      console.error('[control_music_MOD] Action error:', err);
      return this.callNextAction(cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
