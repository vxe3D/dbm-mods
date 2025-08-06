module.exports = {
  name: "Play Music",
  section: "# SHDZ - Music",
  meta: {
    version: "3.0.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
  },
  fields: [
    "query",
    "voiceChannel",
    "varName",
    "storage",
    "varName2",
    "type",
    "volume",
    "leaveOnEmpty",
    "leaveOnEnd",
    "useCookies",
    "cookies",
    "eqBands",
  ],

  subtitle(data) {
    return `${data.query}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, "Music Track"];
  },

  html() {
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
  
  <tab-system>
  <tab label="General" icon="cogs">
  <div style="max-height: 350px;">
    <div style="width:100%; min-height: 40px;">
      <div style="float:left; width:48%; padding-top:8px; padding-bottom:12px;">
        <span class="dbminputlabel">YouTube URL</span><br>
        <input id="query" class="round" type="text" placeholder="YouTube Video/Playlist URL">
      </div>
      <div style="float:right; width:48%; padding-top:8px; padding-bottom:12px;">
        <span class="dbminputlabel">Equalizer Bands (JSON)</span><br>
        <input id="eqBands" class="round" type="text" placeholder='[{"freq":60,"gain":0},...]'>
      </div>
      <div style="clear:both;"></div>
    </div>
  
    <div>
      <voice-channel-input dropdownLabel="Voice Channel" selectId="voiceChannel" variableContainerId="varNameContainer" variableInputId="varName"></voice-channel-input>
    </div>
    <br><br><br>
  
    <div style="padding-top: 4px; width: 100%;">
        <span class="dbminputlabel">Play Type</span><br>
        <select id="type" class="round" style="width: 35%;">
            <option value="0" selected>Add to Queue</option>
            <option value="1">Play Immediately</option>
        </select>
    </div>
    <br>
  
    <div style="padding-top: -5px; width: 100%; height: 50px; display: flex;">
      <div style="width: 35%; height: 100%; padding-top: -5px;">
        <span class="dbminputlabel">Default Volume</span><br>
        <input id="volume" class="round" type="text" placeholder="Leave blank for 80">
      </div>
      <div style="width: 60%; height: 100%; padding-top: 25px; padding-left: 5%;">
        <dbm-checkbox style="float: left;" id="leaveOnEmpty" label="Leave On Empty" checked></dbm-checkbox>
        <dbm-checkbox style="float: right;" id="leaveOnEnd" label="Leave On End" checked></dbm-checkbox>
      </div>
    </div>
    <br>

    <div style="float: left; width: 100%; padding-top: -5px;">
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    </div>
   </div>
  </tab>

    <tab label="Advanced" icon="sliders">
      <dbm-checkbox style="padding-top: 8px;" id="useCookies" label="Use Cookies (Optional)"></dbm-checkbox>
    <div style="padding-top: 8px; display: none;" id="cookiesSection">
      <span class="dbminputlabel">Cookies</span><br>
      <textarea id="cookies" rows="6" name="cookiesarea" style="white-space: nowrap; resize: none;"></textarea>
  <br>
    <p>
      <u><b><span style="color: white;">How to get cookies:</span></b></u><br>
      &#x2022; Install <span class="wrexlink" id="link" data-url="https://www.editthiscookie.com/">EditThisCookie</span> extension for your browser.<br>
      &#x2022; Go to YouTube.<br>
      &#x2022; Log in to your account. (You should use a new account for this purpose)<br>
      &#x2022; Click on the extension icon and click "Export" icon.<br>
      &#x2022; Your cookie will be added to your clipboard and paste it into cookies area above.
    </p>

  </tab>
  </tab-system>
  `;
  },

  init() {
    const { document } = this;

    const cookiesCheckbox = document.getElementById("useCookies");
    const checkboxId2 = document.getElementById("checkboxId2");
    const cookiesSection = document.getElementById("cookiesSection");

    const checkCookiesCheckbox = (checkbox) => {
      if (checkbox.checked) {
        cookiesSection.style.display = "block";
      } else {
        cookiesSection.style.display = "none";
      }
    };

    checkCookiesCheckbox(checkboxId2);

    cookiesCheckbox.addEventListener("change", (event) => {
      checkCookiesCheckbox(event.target);
    });

    const specificSpan = document.getElementById("link");

    if (specificSpan) {
      const url = specificSpan.getAttribute("data-url");
      if (url) {
        specificSpan.setAttribute("title", url);
        specificSpan.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          try {
            require("child_process").execSync(`start ${url}`);
          } catch (err) {
            console.error("Error launching URL:", err);
          }
        });
      }
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];

    const server = cache.server;
    const { Bot, Files } = this.getDBM();
    const Mods = this.getMods();
    const ytpl = Mods.require("@distube/ytpl");
    const {
      joinVoiceChannel,
      createAudioPlayer,
      createAudioResource,
      AudioPlayerStatus,
      VoiceConnectionStatus,
    } = require("@discordjs/voice");
    const { spawn } = require("child_process");
    const path = require("path");
    const ytdlpPath = path.join(__dirname, "..", "resources", "yt-dlp_x86.exe");
    const ffmpeg = require("fluent-ffmpeg");
    const fs = require("fs");
    // EQ: pobierz pasma z pola eqBands (JSON)
    let eqBands = [];
    if (data.eqBands) {
      try {
        eqBands = JSON.parse(this.evalMessage(data.eqBands, cache));
      } catch (e) {
        eqBands = [];
      }
    }
    function buildEqFilter(bands) {
      if (!Array.isArray(bands) || bands.length === 0) return null;
      return bands
        .map(
          (b) =>
            `equalizer=f=${b.freq || b.f || 60}:width_type=o:width=2:g=${b.gain || b.g || 0}`
        )
        .join(",");
    }
    const eqFilter = buildEqFilter(eqBands);

    if (cache.interaction) {
      try {
        await cache.interaction.deferReply({ flags: 64 });
      } catch (err) {
        return this.displayError(data, cache, err);
      }
    }

    let agent;
    if (data.useCookies) {
      const cookiesarray = JSON.parse(this.evalMessage(data.cookies, cache));
      agent = ytdl.createAgent(cookiesarray);
    }
    const voiceChannel = await this.getVoiceChannelFromData(
      data.voiceChannel,
      data.varName,
      cache
    );

    if (!Bot.bot.queue) Bot.bot.queue = new Map();

    const volume = parseInt(this.evalMessage(data.volume, cache), 10) || 80;
    const leaveOnEnd = data.leaveOnEnd;
    const leaveOnEmpty = data.leaveOnEmpty;
    const autoDeafen = (Files.data.settings.autoDeafen ?? "true") === "true";
    const leaveVoiceTimeout = Files.data.settings.leaveVoiceTimeout ?? "10";
    let seconds = parseInt(leaveVoiceTimeout, 10);
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    if (leaveVoiceTimeout === "" || !isFinite(seconds)) seconds = 0;
    if (seconds > 0) seconds *= 1000;

    const query = this.evalMessage(data.query, cache);

    const serverQueue = Bot.bot.queue.get(server.id);

    let songs = [];

    if (ytpl.validateID(query, { agent })) {
      let playlist;
      try {
        playlist = await ytpl(query, { agent });
      } catch (error) {
        console.log(error);
        return this.callNextAction(cache);
      }

      songs = playlist.items.map((item) => ({
        title: item.title,
        thumbnail: item.thumbnail,
        url: item.shortUrl,
        author: item.author.name,
        duration: item.duration
          .split(":")
          .reduce((acc, time) => 60 * acc + Number(time)),
        requestedBy: cache.getUser && cache.getUser() ? cache.getUser().id : null,
      }));
    } else {
      const getInfo = () => {
        return new Promise((resolve, reject) => {
          const ytDlp = spawn(ytdlpPath, ["--dump-json", "--no-playlist", query]);
          let json = "";
          ytDlp.stdout.on("data", (data) => {
            json += data.toString();
          });
          ytDlp.stderr.on("data", (data) => {
          });
          ytDlp.on("close", (code) => {
            if (code === 0) {
              try {
                const info = JSON.parse(json);
                resolve(info);
              } catch (e) {
                reject(e);
              }
            } else {
              reject(new Error("yt-dlp exited with code " + code));
            }
          });
        });
      };
      let songInfo;
      try {
        songInfo = await getInfo();
      } catch (error) {
        console.log(error);
        return this.callNextAction(cache);
      }

      songs.push({
        title: songInfo.title,
        thumbnail: songInfo.thumbnail,
        url: songInfo.webpage_url,
        author: songInfo.uploader,
        duration: songInfo.duration,
        description: songInfo.description,
        views: songInfo.view_count,
        requestedBy: cache.getUser && cache.getUser() ? cache.getUser().id : null,
      });
    }

    if (!serverQueue) {
      const queueData = {
        connection: null,
        player: createAudioPlayer(),
        songs: [],
        currentIndex: 0,
        repeatMode: 0,
      };

      Bot.bot.queue.set(server.id, queueData);
      queueData.songs.push(...songs);

      let connection;
      try {
        connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: server.id,
          adapterCreator: server.voiceAdapterCreator,
          selfDeaf: autoDeafen,
        });
      } catch {
        console.log("Could not join voice channel");
        queueData.player.stop();
        queueData.player.removeAllListeners();
        Bot.bot.queue.delete(server.id);
        return this.callNextAction(cache);
      }

      queueData.connection = connection;
      connection.subscribe(queueData.player);

      const ytDlpStream = spawn(ytdlpPath, [
        "--no-playlist",
        "-f",
        "bestaudio[ext=webm]/bestaudio",
        "--quiet",
        "-o",
        "-",
        queueData.songs[queueData.currentIndex].url,
      ]);
      let stream = ytDlpStream.stdout;
      if (eqFilter) {
        let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
        if (!fs.existsSync(ffmpegPath)) ffmpegPath = require('ffmpeg-static');
        let ffmpegInstance = ffmpeg().input(stream).setFfmpegPath(ffmpegPath).audioFilters(eqFilter).format('webm');
        ffmpegInstance.on('error', (err, stdout, stderr) => {
          if (
            (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close'))) ||
            (err && err.outputStreamError && (err.outputStreamError.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.outputStreamError.message?.includes('Premature close')))
          ) {
            console.warn('[Music] ffmpegInstance: Premature close (non-fatal, suppressed)');
            return;
          }
          console.error('[Music] ffmpegInstance error:', err);
        });
        const ffmpegStream = ffmpegInstance.pipe();
        ffmpegStream.on('error', (err) => {
          if (
            (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close')))
          ) {
            console.warn('[Music] ffmpegStream: Premature close (non-fatal, suppressed)');
            return;
          }
          console.error('[Music] ffmpegStream error:', err);
        });
        stream = ffmpegStream;
      }
      const resource = createAudioResource(stream, { inlineVolume: true });
      resource.volume.setVolume(volume / 100);
      queueData.player.play(resource);

      queueData.player.on(AudioPlayerStatus.Idle, async () => {
        let nextSongUrl;
        if (queueData.repeatMode === 1) {
          nextSongUrl = queueData.songs[queueData.currentIndex].url;
        } else if (queueData.repeatMode === 2 && queueData.songs.length > 0) {
          queueData.currentIndex =
            (queueData.currentIndex + 1) % queueData.songs.length;
          nextSongUrl = queueData.songs[queueData.currentIndex].url;
        } else {
          queueData.currentIndex += 1;
          if (queueData.currentIndex < queueData.songs.length) {
            nextSongUrl = queueData.songs[queueData.currentIndex].url;
          } else {
            if (leaveOnEnd) {
              connection.disconnect();
            }
            return;
          }
        }

        const nextYtDlpStream = spawn(ytdlpPath, [
          "--no-playlist",
          "-f",
          "bestaudio[ext=webm]/bestaudio",
          "--quiet",
          "-o",
          "-",
          nextSongUrl,
        ]);
        let nextStream = nextYtDlpStream.stdout;
        if (eqFilter) {
          let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
          if (!fs.existsSync(ffmpegPath)) ffmpegPath = require('ffmpeg-static');
          let ffmpegInstance = ffmpeg().input(nextStream).setFfmpegPath(ffmpegPath).audioFilters(eqFilter).format('webm');
          ffmpegInstance.on('error', (err, stdout, stderr) => {
            if (
              (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close'))) ||
              (err && err.outputStreamError && (err.outputStreamError.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.outputStreamError.message?.includes('Premature close')))
            ) {
              console.warn('[Music] ffmpegInstance: Premature close (non-fatal, suppressed)');
              return;
            }
            console.error('[Music] ffmpegInstance error:', err);
          });
          const ffmpegStream = ffmpegInstance.pipe();
          ffmpegStream.on('error', (err) => {
            if (
              (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close')))
            ) {
              console.warn('[Music] ffmpegStream: Premature close (non-fatal, suppressed)');
              return;
            }
            console.error('[Music] ffmpegStream error:', err);
          });
          nextStream = ffmpegStream;
        }
        const nextResource = createAudioResource(nextStream, {
          inlineVolume: true,
        });
        nextResource.volume.setVolume(volume / 100);
        queueData.player.play(nextResource);
      });

      if (leaveOnEmpty) {
        Bot.bot.on("voiceStateUpdate", (oldState, newState) => {
          if (oldState.guild.id !== server.id) return;

          const botChannel = connection.joinConfig.channelId;
          if (!botChannel) return;

          const botVoiceChannel = server.channels.cache.get(botChannel);
          if (botVoiceChannel && botVoiceChannel.members.size === 1) {
            setTimeout(() => {
              if (botVoiceChannel.members.size === 1) {
                connection.disconnect();
              }
            }, seconds);
          }
        });
      }

      Bot.bot.on("voiceStateUpdate", (oldState, newState) => {
        if (
          oldState.channelId &&
          !newState.channelId &&
          oldState.member.id === Bot.bot.user.id &&
          oldState.guild.id === server.id
        ) {
          connection.disconnect();
        }
      });

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        connection.destroy();
        queueData.player.stop();
        queueData.player.removeAllListeners();
        Bot.bot.queue.delete(server.id);
      });
    } else if (data.type === "1") {
      const currentSong = serverQueue.songs[serverQueue.currentIndex];
      serverQueue.songs.splice(serverQueue.currentIndex + 1, 0, songs[0]);
      serverQueue.songs.splice(serverQueue.currentIndex + 2, 0, currentSong);
      serverQueue.player.stop();
    } else {
      serverQueue.songs.push(...songs);
    }

    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(songs[0], storage, varName2, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
