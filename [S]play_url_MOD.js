let globalPlayer = null;
let globalConnection = null;

function reloadAudioWithEQ(data, cache, eqBands) {
  const {
    createAudioResource,
    StreamType,
  } = require("@discordjs/voice");
  const ffmpeg = require("fluent-ffmpeg");
  const fs = require('fs');
  const path = require('path');
  let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
  if (!fs.existsSync(ffmpegPath)) {
    ffmpegPath = require('ffmpeg-static');
  }
  let eqFilter = "";
  if (Array.isArray(eqBands) && eqBands.length > 0) {
    eqFilter = eqBands.map(b => `equalizer=f=${b.freq}:width_type=o:width=2:g=${b.gain}`).join(",");
  }
  let volume = data.volume ? parseFloat(data.volume) / 100 : 1;
  let ffmpegInstance = ffmpeg({ source: data.url }).setFfmpegPath(ffmpegPath);
  if (eqFilter) ffmpegInstance = ffmpegInstance.audioFilters(eqFilter);
  const ffmpegStream = ffmpegInstance
    .format("ogg")
    .on("error", (err) => {
      console.error("FFmpeg error:", err);
    })
    .pipe();
  const audioResource = createAudioResource(ffmpegStream, {
    inputType: StreamType.OggOpus,
    inlineVolume: true,
  });
  if (audioResource.volume) {
    audioResource.volume.setVolume(volume);
  }
  if (globalPlayer) {
    globalPlayer.stop();
    globalPlayer.play(audioResource);
  }
}

module.exports = {
  name: "Play URL",
  section: "# SHDZ - Music",
  requiresAudioLibraries: true,

  subtitle: function (data) {
    return "Play media from URL";
  },

  meta: {
    version: "3.0.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
  },

  fields: ["url", "volume", "bitrate", "seek", "type", "channel", "varName"],

fields: ["url", "volume", "bitrate", "seek", "type", "channel", "varName", "eqBandsVar", "eqBandsStorage"],
  html: function () {
    return `
    <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
      <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-editor-name">vxed_</span></div>
      <a href="https://discord.gg/9HYB4n3Dz4" class="vcstatus-discord" target="_blank">Discord</a>
    </div>
    <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
      <span class="vcstatus-version">v3.0.0</span>
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

<div style="width: 100%; margin-bottom: 8px;">
  <div style="float: left; width: 38%; min-width: 220px;">
    <retrieve-from-variable dropdownLabel="EQ Bands" selectId="eqBandsStorage" selectWidth="100%" variableInputWidth="100%" variableContainerId="eqBandsVarContainer" variableInputId="eqBandsVar"></retrieve-from-variable>
  </div>
  <div style="float: right; width: 54%; min-width: 220px;">
    <voice-channel-input dropdownLabel="Voice Channel" selectId="channel" selectWidth="100%" variableInputWidth="100%"></voice-channel-input>
  </div>
  <div style="clear: both;"></div>
</div>
<div style="margin-top: 8px;">
    <span class="dbminputlabel">Web URL</span><br>
    <input id="url" class="round" type="text" value="http://"><br>
</div>
<div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Volume (0 = min; 100 = max)</span><br>
    <input id="volume" class="round" type="text" placeholder="Leave blank for automatic..."><br>
    <span class="dbminputlabel">Bitrate</span><br>
    <input id="bitrate" class="round" type="text" placeholder="Leave blank for automatic...">
</div>
<div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Seek Position</span><br>
    <input id="seek" class="round" type="text" value="0"><br>
</div>

<br><br><br><br><br><br><br>

<div>
    <span class="dbminputlabel">Play Type</span><br>
    <select id="type" class="round" style="width: 90%;">
        <option value="0" selected>Add to Queue</option>
        <option value="1">Play Immediately</option>
    </select>
</div>
`;
  },

  init() {},

  action: async function (cache) {
    const data = cache.actions[cache.index];
    const {
      joinVoiceChannel,
      createAudioPlayer,
      createAudioResource,
      AudioPlayerStatus,
      StreamType,
    } = require("@discordjs/voice");
    const { VoiceConnectionStatus } = require("@discordjs/voice");
    const ffmpeg = require("fluent-ffmpeg");
    const fs = require('fs');
    const path = require('path');
    let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
    if (!fs.existsSync(ffmpegPath)) {
      ffmpegPath = require('ffmpeg-static');
    }
    const { Readable } = require("stream");
    const { client } = cache;

    let guild = cache.guild || cache.server;
    if (!guild) {
      console.warn('[play_url_MOD] Brak guild/server w cache!');
      return;
    }

    let voiceChannel = await this.getVoiceChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    if (!voiceChannel) {
      console.warn('[play_url_MOD] Nie znaleziono voiceChannel!');
      return;
    }

    if (data.eqBandsVar && data.eqBandsStorage && !cache._eqReloaded) {
      const Actions = this.getDBM().Actions;
      let eqBandsRaw = Actions.getVariable(parseInt(data.eqBandsStorage, 10), data.eqBandsVar, cache);
      let eqBands = [];
      if (typeof eqBandsRaw === 'string') {
        try { eqBands = JSON.parse(eqBandsRaw); } catch { eqBands = []; }
      } else if (Array.isArray(eqBandsRaw)) {
        eqBands = eqBandsRaw;
      }
      if (Array.isArray(eqBands) && eqBands.length > 0 && eqBands.every(b => b && typeof b.freq !== 'undefined' && typeof b.gain !== 'undefined')) {
        const playData = Object.assign({}, data, {
          eqBandsVar: data.eqBandsVar,
          eqBandsStorage: data.eqBandsStorage
        });
        const { Bot } = this.getDBM();
        let queue = Bot.bot.queue && Bot.bot.queue.get(guild.id);
        if (queue && queue.player) {
          queue.player.stop(true);
          queue.player = null;
        }
        if (queue && queue.connection && queue.connection.state && queue.connection.state.status !== 'destroyed') {
          queue.connection.destroy();
          queue.connection = null;
          if (Bot.bot.queue && Bot.bot.queue.delete) {
            Bot.bot.queue.delete(guild.id);
          }
          queue = null;
          await new Promise(r => setTimeout(r, 500));
        }
        const newCache = Object.assign({}, cache, { _eqReloaded: true, actions: [playData], index: 0 });
        await module.exports.action.call(this, newCache);
        return;
      } else {
      }
    }

    let eqBands = [];
    if (data.eqBandsVar && data.eqBandsStorage) {
      const storageType = parseInt(data.eqBandsStorage, 10);
      eqBands = this.getVariable(storageType, data.eqBandsVar, cache);
      if (typeof eqBands === "string") {
        try {
          eqBands = JSON.parse(eqBands);
        } catch { console.warn('[play_url_MOD] Nie udało się sparsować eqBands (string)'); }
      }
    }
    if (typeof eqBands === "string") {
      try {
        eqBands = JSON.parse(eqBands);
      } catch { console.warn('[play_url_MOD] Nie udało się sparsować eqBands (input string)'); }
    }
    if (Array.isArray(eqBands) && eqBands.length === 1 && typeof eqBands[0] === "string" && eqBands[0].trim().startsWith("[") && eqBands[0].trim().endsWith("]")) {
      try {
        eqBands = JSON.parse(eqBands[0]);
      } catch (err) {
        console.warn('[play_url_MOD] eqBands could not be parsed from single string:', eqBands[0]);
      }
    }
    let eqFilter = "";
    if (Array.isArray(eqBands) && eqBands.length > 0 && eqBands.every(b => b && typeof b.freq !== 'undefined' && typeof b.gain !== 'undefined')) {
      eqFilter = eqBands.map(b => `equalizer=f=${b.freq}:width_type=o:width=2:g=${b.gain}`).join(",");
    }

    try {
      const { Bot } = this.getDBM();
      let queue = Bot.bot.queue && Bot.bot.queue.get(guild.id);

      let connection = null;
      let isNewConnection = false;
      if (!queue || !queue.connection) {
        connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfDeaf: false
        });
        isNewConnection = true;
      } else {
        connection = queue.connection;
      }

      let volume = data.volume ? parseFloat(data.volume) / 100 : 1;

      let ffmpegInstance = ffmpeg({ source: data.url }).setFfmpegPath(ffmpegPath);
      if (!isNaN(parseFloat(data.seek)) && parseFloat(data.seek) > 0) {
        ffmpegInstance = ffmpegInstance.seekInput(parseFloat(data.seek));
      }
      if (eqFilter) {
        ffmpegInstance = ffmpegInstance.audioFilters(eqFilter);
      }
      let ffmpegChild = null;
      const ffmpegStream = ffmpegInstance
        .format("ogg")
        .on("start", (cmd, proc) => {
          if (ffmpegInstance && ffmpegInstance.ffmpegProc) {
            ffmpegChild = ffmpegInstance.ffmpegProc;
          }
        })
        .on("error", (err) => {
          if (err && err.outputStreamError && err.outputStreamError.code === 'ERR_STREAM_PREMATURE_CLOSE') {
          } else {
            console.error("[play_url_MOD] FFmpeg error:", err);
          }
        })
        .pipe();
      if (ffmpegInstance && ffmpegInstance.ffmpegProc) {
        global._lastFfmpegChild = ffmpegInstance.ffmpegProc;
      } else if (ffmpegChild) {
        global._lastFfmpegChild = ffmpegChild;
      }

      const audioResource = createAudioResource(ffmpegStream, {
        inputType: StreamType.OggOpus,
        inlineVolume: true,
        metadata: {
          url: data.url,
          title: data.title || null,
          requestedBy: cache.getUser ? (cache.getUser() ? cache.getUser().id : null) : null,
        }
      });

      if (audioResource.volume) {
        audioResource.volume.setVolume(volume);
      }

      const songObj = {
        title: data.title || null,
        url: data.url,
        requestedBy: cache.getUser ? (cache.getUser() ? cache.getUser().id : null) : null,
      };
      if (!queue) {
        queue = {
          player: createAudioPlayer(),
          connection: connection,
          songs: [songObj],
          currentIndex: 0,
          loopQueue: false,
          loopOne: false
        };
        if (!Bot.bot.queue) Bot.bot.queue = new Map();
        Bot.bot.queue.set(guild.id, queue);
      } else {
        queue.player = createAudioPlayer();
        queue.connection = connection;
        queue.songs = [songObj];
        queue.currentIndex = 0;
      }

      if (queue.connection && queue.player) {
        queue.connection.subscribe(queue.player);
      }

      queue.player.play(audioResource);
    } catch (err) {
      console.error('[play_url_MOD] Error joining voice channel:', err);
    }

    this.callNextAction(cache);
  },

  mod() {}
};
