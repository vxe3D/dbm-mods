module.exports = {
  name: "Play Music",
  section: "# SHDZ - Music",
  meta: {
    version: "3.2.0",
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
    "eqBandsStorage",
    "eqBandsVar",
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
      <span class="vcstatus-version">v3.2.0</span>
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
    <div style="width: 100%; margin-bottom: 8px;">
      <div style="float: left; width: 38%; min-width: 220px;">
        <retrieve-from-variable dropdownLabel="EQ Bands" selectId="eqBandsStorage" selectWidth="100%" variableInputWidth="100%" variableContainerId="eqBandsVarContainer" variableInputId="eqBandsVar"></retrieve-from-variable>
      </div>
      <div style="float: right; width: 54%; min-width: 220px;">
        <voice-channel-input dropdownLabel="Voice Channel" selectId="voiceChannel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="100%" variableInputWidth="100%"></voice-channel-input>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div style="width: 100%; margin-top: 2px;">
      <div style="float: left; width: 38%; min-width: 220px;">
        <span class="dbminputlabel">Play Type</span><br>
        <select id="type" class="round" style="width: 100%;">
            <option value="0" selected>Add to Queue</option>
            <option value="1">Play Immediately</option>
        </select>
      </div>
      <div style="float: right; width: 54%; min-width: 220px;">
        <span class="dbminputlabel">YouTube URL</span><br>
        <input id="query" class="round" type="text" placeholder="YouTube Video/Playlist URL">
      </div>
      <div style="clear: both;"></div>
    </div><br><br>
  
    <div style="width: 100%; height: 50px; display: flex;">
      <div style="width: 35%; height: 100%; padding-top: -5px;">
        <span class="dbminputlabel">Default Volume</span><br>
        <input id="volume" class="round" type="text" placeholder="Leave blank for 80">
      </div>
      <div style="width: 60%; height: 100%; padding-top: 20px; padding-left: 5%;">
        <dbm-checkbox style="float: left;" id="leaveOnEmpty" label="Leave On Empty" checked></dbm-checkbox>
        <dbm-checkbox style="float: right;" id="leaveOnEnd" label="Leave On End" checked></dbm-checkbox>
      </div>
    </div><br>

    <div style="float: left; width: 100%; padding-top: 6px;">
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
  console.log('[Play Music] Start action');
    const data = cache.actions[cache.index];

    const ffmpeg = require("fluent-ffmpeg");
    const { Readable } = require("stream");
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
    const path = require("path");
    const youtubedl = require("yt-dlp-exec");

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // region Dalszy kod
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // EQ: pobierz pasma z dynamicznej zmiennej lub z pola eqBands (JSON)
    let eqBands = [];
    let eqBandsRaw = undefined;
    if (data.eqBandsStorage && data.eqBandsVar) {
      const eqType = parseInt(data.eqBandsStorage, 10);
      const eqVar = this.evalMessage(data.eqBandsVar, cache);
      eqBandsRaw = this.getVariable(eqType, eqVar, cache);
    }
    if (eqBandsRaw) {
      try {
        if (typeof eqBandsRaw === 'string') {
          eqBands = JSON.parse(eqBandsRaw);
        } else if (Array.isArray(eqBandsRaw) && eqBandsRaw.length === 1 && typeof eqBandsRaw[0] === 'string') {
          // Obsługa: [ '[{...}]' ]
          eqBands = JSON.parse(eqBandsRaw[0]);
        } else {
          eqBands = eqBandsRaw;
        }
      } catch (e) {
        eqBands = [];
        console.warn('[EQ] Błąd parsowania eqBandsRaw:', e);
      }
    } else if (data.eqBands) {
      try {
        eqBands = JSON.parse(this.evalMessage(data.eqBands, cache));
      } catch (e) {
        eqBands = [];
        console.warn('[EQ] Błąd parsowania data.eqBands:', e);
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

    if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
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
    let voiceChannel = await this.getVoiceChannelFromData(
      data.voiceChannel,
      data.varName,
      cache
    );
    if (!voiceChannel) {
      // Pobierz kanał, na którym aktualnie znajduje się bot
      const botMember = server.members.cache.get(Bot.bot.user.id);
      if (botMember && botMember.voice && botMember.voice.channel) {
        voiceChannel = botMember.voice.channel;
      }
    }
    if (!voiceChannel) {
      console.error('[Play Music] Brak wybranego kanału głosowego i bot nie jest na żadnym kanale.');
      if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
        await cache.interaction.reply({ content: 'Nie wybrano kanału głosowego i bot nie jest na żadnym kanale!', ephemeral: true });
      }
      return this.callNextAction(cache);
    }

    if (!Bot.bot.queue) Bot.bot.queue = new Map();

    const volume = parseInt(this.evalMessage(data.volume, cache), 10) || 80;
  // Obsługa checkboxów leaveOnEnd i leaveOnEmpty (mogą być stringiem lub booleanem)
  const leaveOnEnd = data.leaveOnEnd === true || data.leaveOnEnd === "true" || data.leaveOnEnd === "on";
  const leaveOnEmpty = data.leaveOnEmpty === true || data.leaveOnEmpty === "true" || data.leaveOnEmpty === "on";
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
        console.log('[Play Music] Detected playlist, fetching playlist info...');
        playlist = await ytpl(query, { agent });
        console.log('[Play Music] Playlist info fetched:', playlist && playlist.items && playlist.items.length, 'items');
      } catch (error) {
        console.error('[Play Music] Error fetching playlist:', error);
        return this.callNextAction(cache);
      }
  let requestedById = null;
      if (cache.interaction) {
        if (cache.interaction.user && cache.interaction.user.id) {
          requestedById = cache.interaction.user.id;
        } else if (cache.interaction.member && cache.interaction.member.user && cache.interaction.member.user.id) {
          requestedById = cache.interaction.member.user.id;
        }
      }
      if (!requestedById && cache.getUser && cache.getUser()) {
        requestedById = cache.getUser().id;
      }
      if (!requestedById && Bot && Bot.bot && Bot.bot.user && Bot.bot.user.id) {
        requestedById = Bot.bot.user.id;
      }
      songs = playlist.items.map((item) => ({
        title: item.title,
        thumbnail: item.thumbnail,
        url: item.shortUrl,
        author: item.author.name,
        duration: item.duration
          .split(":")
          .reduce((acc, time) => 60 * acc + Number(time)),
        requestedBy: requestedById,
      }));
      console.log('[Play Music] Songs array for playlist:', songs);
    } else {
      let songInfo;
      try {
        console.log('[Play Music] Detected single track, fetching info...');
        songInfo = await youtubedl(query, {
          dumpSingleJson: true,
          noPlaylist: true,
          preferFreeFormats: true,
          noCheckCertificates: true,
          addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });
        console.log('[Play Music] Song info:', songInfo);
      } catch (error) {
        console.error('[Play Music] Error fetching song info:', error);
        return this.callNextAction(cache);
      }
      let requestedById2 = null;
      if (cache.interaction) {
        if (cache.interaction.user && cache.interaction.user.id) {
          requestedById2 = cache.interaction.user.id;
        } else if (cache.interaction.member && cache.interaction.member.user && cache.interaction.member.user.id) {
          requestedById2 = cache.interaction.member.user.id;
        }
      }
      if (!requestedById2 && cache.getUser && cache.getUser()) {
        requestedById2 = cache.getUser().id;
      }
      if (!requestedById2 && Bot && Bot.bot && Bot.bot.user && Bot.bot.user.id) {
        requestedById2 = Bot.bot.user.id;
      }
      songs.push({
        title: songInfo.title,
        thumbnail: songInfo.thumbnail,
        url: songInfo.webpage_url,
        author: songInfo.uploader,
        duration: songInfo.duration,
        description: songInfo.description,
        views: songInfo.view_count,
        requestedBy: requestedById2,
      });
    }

    if (!serverQueue) {
      // Sprawdź, czy istnieje aktywne połączenie głosowe
      let connection = null;
      let existingQueue = Bot.bot.queue.get(server.id);
      if (existingQueue && existingQueue.connection && existingQueue.connection.state.status !== 'destroyed') {
        connection = existingQueue.connection;
      } else {
        try {
          console.log('[Play Music] Joining voice channel:', voiceChannel && voiceChannel.id);
          connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: server.id,
            adapterCreator: server.voiceAdapterCreator,
            selfDeaf: autoDeafen,
          });
          console.log('[Play Music] Voice connection established');
        } catch (err) {
          console.error('[Play Music] Error joining voice channel:', err);
          return this.callNextAction(cache);
        }
      }

      const queueData = {
        connection: connection,
        player: createAudioPlayer(),
        songs: [],
        currentIndex: 0,
        repeatMode: 0, // 0 = off, 1 = loop one, 2 = loop queue
        leaveTimeout: null,
        loopCollector: null,
        cleanedUp: false,
      };
      Bot.bot.queue.set(server.id, queueData);
      // --- Loop Collector: synchronizuj repeatMode z queue.loopQueue/loopOne ustawianymi przez inne akcje ---
      if (!queueData.loopCollector) {
        queueData.loopCollector = setInterval(() => {
          const extQueue = Bot.bot.queue.get(server.id);
          if (!extQueue) return;
          // Sprawdź flagi loopQueue/loopOne ustawiane przez inne akcje
          if (extQueue.loopOne) {
            if (queueData.repeatMode !== 1) {
              queueData.repeatMode = 1;
              console.log(`[Music] [Collector] repeatMode set to 1 (loop one) for guild ${server.id}`);
            }
          } else if (extQueue.loopQueue) {
            if (queueData.repeatMode !== 2) {
              queueData.repeatMode = 2;
              console.log(`[Music] [Collector] repeatMode set to 2 (loop queue) for guild ${server.id}`);
            }
          } else {
            if (queueData.repeatMode !== 0) {
              queueData.repeatMode = 0;
              console.log(`[Music] [Collector] repeatMode set to 0 (no loop) for guild ${server.id}`);
            }
          }
        }, 1000); // Sprawdzaj co sekundę
      }
      queueData.songs.push(...songs);
      connection.subscribe(queueData.player);

      // Helper to clean up and disconnect
      function cleanupAndLeave() {
        if (queueData.cleanedUp) {
          return;
        }
        queueData.cleanedUp = true;
        // Wyłącz collector przy czyszczeniu
        if (queueData.loopCollector) {
          clearInterval(queueData.loopCollector);
          queueData.loopCollector = null;
        }
        try {
          if (queueData.connection && queueData.connection.state.status !== 'destroyed') {
            queueData.connection.disconnect();
            queueData.connection.destroy();
          }
        } catch (e) {
          console.warn('[Music] cleanupAndLeave error:', e);
        }
        try {
          queueData.player.stop();
          queueData.player.removeAllListeners();
        } catch (e) {
          console.warn('[Music] cleanupAndLeave player error:', e);
        }
        Bot.bot.queue.delete(server.id);
      }


      const playSong = async (songUrl) => {
        console.log('[Play Music] playSong() called for url:', songUrl);
        let ytdlpStream;
        try {
          ytdlpStream = youtubedl.exec(songUrl, {
            output: '-',
            format: 'bestaudio[ext=webm]/bestaudio/best',
            quiet: true,
            noPlaylist: true,
          }, { stdio: ['ignore', 'pipe', 'ignore'] });
        } catch (err) {
          console.error('[Play Music] yt-dlp-exec failed:', err);
          if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
            await cache.interaction.reply({ content: 'Nie udało się pobrać piosenki!', ephemeral: true });
          }
          cleanupAndLeave();
          return;
        }
        let stream = ytdlpStream.stdout;
        let streamError = false;
        ytdlpStream.on('error', async (err) => {
          console.error('[Play Music] yt-dlp-exec stream error:', err);
          streamError = true;
          if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
            await cache.interaction.reply({ content: 'Błąd pobierania piosenki!', ephemeral: true });
          }
          cleanupAndLeave();
        });
        if (eqFilter) {
          let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
          try { if (!require('fs').existsSync(ffmpegPath)) ffmpegPath = require('ffmpeg-static'); } catch (e) { ffmpegPath = require('ffmpeg-static'); }
          let ffmpegInstance = ffmpeg().input(stream).setFfmpegPath(ffmpegPath).audioFilters(eqFilter).format('webm');
          ffmpegInstance.on('error', async (err, stdout, stderr) => {
            if (
              (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close'))) ||
              (err && err.outputStreamError && (err.outputStreamError.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.outputStreamError.message?.includes('Premature close')))
            ) {
              console.warn('[Music] ffmpegInstance: Premature close (non-fatal, suppressed)');
              return;
            }
            console.error('[Music] ffmpegInstance error:', err);
            streamError = true;
            if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
              await cache.interaction.reply({ content: 'Błąd przetwarzania piosenki!', ephemeral: true });
            }
            cleanupAndLeave();
          });
          const ffmpegStream = ffmpegInstance.pipe();
          ffmpegStream.on('error', async (err) => {
            if (
              (err && (err.code === 'ERR_STREAM_PREMATURE_CLOSE' || err.message?.includes('Premature close')))
            ) {
              console.warn('[Music] ffmpegStream: Premature close (non-fatal, suppressed)');
              return;
            }
            console.error('[Music] ffmpegStream error:', err);
            streamError = true;
            if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
              await cache.interaction.reply({ content: 'Błąd przetwarzania piosenki!', ephemeral: true });
            }
            cleanupAndLeave();
          });
          stream = ffmpegStream;
        }
        // Sprawdź czy stream istnieje i nie ma błędu
        if (!stream || streamError) {
          console.error('[Play Music] Brak poprawnego streama audio!');
          if (cache.interaction && !cache.interaction.replied && !cache.interaction.deferred) {
            await cache.interaction.reply({ content: 'Nie udało się pobrać lub przetworzyć piosenki!', ephemeral: true });
          }
          cleanupAndLeave();
          return;
        }
        const resource = createAudioResource(stream, { inlineVolume: true });
        resource.volume.setVolume(volume / 100);
        queueData.player.play(resource);
        console.log('[Play Music] playSong() resource created and started');
      };

  await playSong(queueData.songs[queueData.currentIndex].url);

      queueData.player.on(AudioPlayerStatus.Idle, async () => {
  console.log('[Play Music] AudioPlayerStatus.Idle event');
        // repeatMode: 0 = off, 1 = repeat one, 2 = repeat all
        // If there are no songs, always clean up or reset
        if (!queueData.songs || queueData.songs.length === 0) {
          console.log('[Play Music] No songs in queue, cleaning up and leaving');
          cleanupAndLeave();
          return;
        }

        if (queueData.repeatMode === 1) {
          // Repeat current song (loop one)
          if (queueData.currentIndex < queueData.songs.length) {
            const nextSongUrl = queueData.songs[queueData.currentIndex].url;
            console.log('[Play Music] Repeat one, playing again:', nextSongUrl);
            playSong(nextSongUrl);
            return;
          } else {
            // If index is out of range, treat as queue end
            console.log('[Play Music] Repeat one, index out of range, cleaning up');
            cleanupAndLeave();
            return;
          }
        } else if (queueData.repeatMode === 2) {
          // Repeat queue (loop all)
          if (queueData.songs.length > 0) {
            queueData.currentIndex = (queueData.currentIndex + 1) % queueData.songs.length;
            const nextSongUrl = queueData.songs[queueData.currentIndex].url;
            console.log('[Play Music] Repeat queue, next song:', nextSongUrl);
            playSong(nextSongUrl);
            return;
          } else {
            console.log('[Play Music] Repeat queue, no songs, cleaning up');
            cleanupAndLeave();
            return;
          }
        } else {
          queueData.currentIndex += 1;
          if (queueData.currentIndex < queueData.songs.length) {
            const nextSongUrl = queueData.songs[queueData.currentIndex].url;
            console.log('[Play Music] Next song:', nextSongUrl);
            playSong(nextSongUrl);
            return;
          } else {
            console.log('[Play Music] End of queue, cleaning up');
            cleanupAndLeave();
            return;
          }
        }
      });

      // Only one listener per server for leaveOnEmpty
      if (leaveOnEmpty && !connection._leaveOnEmptyListener) {
        connection._leaveOnEmptyListener = true;
        const leaveOnEmptyHandler = (oldState, newState) => {
          if (oldState.guild.id !== server.id) return;
          const botChannel = connection.joinConfig.channelId;
          if (!botChannel) return;
          const botVoiceChannel = server.channels.cache.get(botChannel);
          if (botVoiceChannel && botVoiceChannel.members.size === 1) {
            if (queueData.leaveTimeout) clearTimeout(queueData.leaveTimeout);
            queueData.leaveTimeout = setTimeout(() => {
              if (botVoiceChannel.members.size === 1) {
                cleanupAndLeave();
              }
            }, seconds);
          } else if (queueData.leaveTimeout) {
            clearTimeout(queueData.leaveTimeout);
            queueData.leaveTimeout = null;
          }
        };
        Bot.bot.on("voiceStateUpdate", leaveOnEmptyHandler);
        connection._leaveOnEmptyHandler = leaveOnEmptyHandler;
      }

      // Only one listener per server for bot disconnect
      if (!connection._botDisconnectListener) {
        connection._botDisconnectListener = true;
        const botDisconnectHandler = (oldState, newState) => {
          if (
            oldState.channelId &&
            !newState.channelId &&
            oldState.member.id === Bot.bot.user.id &&
            oldState.guild.id === server.id
          ) {
            cleanupAndLeave();
          }
        };
        Bot.bot.on("voiceStateUpdate", botDisconnectHandler);
        connection._botDisconnectHandler = botDisconnectHandler;
      }

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        cleanupAndLeave();
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
