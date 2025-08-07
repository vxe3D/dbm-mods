module.exports = {
  name: "Set Music Equalizer",
  section: "# SHDZ - Music",
  meta: {
    version: "3.0.0",
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
  },
  fields: [
    "voiceChannel",
    "varName",
    "bands",
    "storage",
    "varName2",
    "freq0","gain0","freq1","gain1","freq2","gain2","freq3","gain3","freq4","gain4","freq5","gain5"
  ],  
  subtitle(data) {
    return `Set EQ for ${data.varName2 || 'track'}`;
  },
  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, "Music Track (EQ)"];
  },
  html() {
    return `
<tab-system>
  <tab label="Main" icon="sliders">
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
  </tab>
  <tab label="Equalizer" icon="equalizer">
    <div style="display: flex; flex-direction: row; gap: 24px; margin-bottom: 8px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <p>Podaj częstotliwości (Hz) i wzmocnienia (dB) dla 6 pasm:</p>
        <div><label>Band 1:</label> <input id="freq0" name="freq0" type="number" placeholder="np. 32" style="width:70px;"> Hz, <input id="gain0" name="gain0" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
        <div><label>Band 2:</label> <input id="freq1" name="freq1" type="number" placeholder="np. 64" style="width:70px;"> Hz, <input id="gain1" name="gain1" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
        <div><label>Band 3:</label> <input id="freq2" name="freq2" type="number" placeholder="np. 250" style="width:70px;"> Hz, <input id="gain2" name="gain2" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
        <div><label>Band 4:</label> <input id="freq3" name="freq3" type="number" placeholder="np. 1000" style="width:70px;"> Hz, <input id="gain3" name="gain3" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
        <div><label>Band 5:</label> <input id="freq4" name="freq4" type="number" placeholder="np. 4000" style="width:70px;"> Hz, <input id="gain4" name="gain4" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
        <div><label>Band 6:</label> <input id="freq5" name="freq5" type="number" placeholder="np. 8000" style="width:70px;"> Hz, <input id="gain5" name="gain5" type="number" step="0.1" placeholder="np. 0" style="width:70px;"> dB</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px; background: #222; color: #eee; border-radius: 8px; padding: 10px; min-width: 180px;">
        <b>Przykładowy podział pasm:</b>
        <div><b>32 Hz</b> — sub-bass (najniższe tony)</div>
        <div><b>64 Hz</b> — bass (bas)</div>
        <div><b>250 Hz</b> — low-mids (niskie środki)</div>
        <div><b>1 kHz</b> — mids (środki)</div>
        <div><b>4 kHz</b> — upper-mids (wysokie środki)</div>
        <div><b>8 kHz</b> — presence/treble (wysokie tony)</div>
      </div>
    </div>
  </tab>
</tab-system>
`;
  },
  // przecinek po zamknięciu metody html()
  init() {
    // No slider logic needed, just simple text/number fields
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const { Actions } = this.getDBM();
    // Pobierz najnowszy EQ z DBM variable (jeśli jest)
    let bands = [];
    const { storage, varName2 } = data;
    const storageType = parseInt(storage, 10);
    let bandsRaw = Actions.getVariable(storageType, varName2, cache);
    if (typeof bandsRaw === 'string') {
      try { bands = JSON.parse(bandsRaw); } catch { bands = []; }
    } else if (Array.isArray(bandsRaw)) {
      bands = bandsRaw;
    }
    // Jeśli nie ma w zmiennej, pobierz z pól
    if (!bands || !Array.isArray(bands) || bands.length === 0) {
      bands = [];
      for (let i = 0; i < 6; i++) {
        const freq = parseFloat(data[`freq${i}`]);
        const gain = parseFloat(data[`gain${i}`]);
        if (!isNaN(freq) && !isNaN(gain)) {
          bands.push({ freq, gain });
        }
      }
    }
    // Zapisz bands jako JSON string do zmiennej DBM (zawsze aktualizuj)
    if (varName2) {
      Actions.storeValue(JSON.stringify(bands), storageType, varName2, cache);
      console.log('Bands to store:', JSON.stringify(bands), '->', varName2, 'storage:', storageType);
    }

    // --- REALTIME EQ: podmień resource na tym samym playerze ---
    try {
      const { Bot } = this.getDBM();
      let guild = cache.guild || cache.server;
      if (!guild) throw new Error('Brak guild/server w cache!');
      let queue = Bot.bot.queue && Bot.bot.queue.get(guild.id);
      if (!queue || !queue.player) {
        // Brak aktywnego playera – tylko zapisujemy bands i kończymy akcję
        return this.callNextAction(cache);
      }
      // ...reszta kodu bez zmian...
      // Pobierz ostatni url z queue/songs lub z cache
      let url = null;
      if (queue.songs && queue.songs.length > 0 && queue.currentIndex < queue.songs.length) {
        url = queue.songs[queue.currentIndex]?.url || queue.songs[0]?.url;
      }
      if (!url && cache.actions && cache.actions[0] && cache.actions[0].url) {
        url = cache.actions[0].url;
      }
      if (!url) throw new Error('Nie znaleziono url do odtworzenia!');
      const ffmpeg = require('fluent-ffmpeg');
      const fs = require('fs');
      const path = require('path');
      let ffmpegPath = path.resolve(process.cwd(), 'ffmpeg.exe');
      if (!fs.existsSync(ffmpegPath)) {
        const ffmpegLocal = path.resolve(process.cwd(), 'ffmpeg');
        if (fs.existsSync(ffmpegLocal)) {
          ffmpegPath = ffmpegLocal;
        } else {
          ffmpegPath = require('ffmpeg-static');
        }
      }
      let eqFilter = '';
      if (Array.isArray(bands) && bands.length > 0) {
        eqFilter = bands.map(b => `equalizer=f=${b.freq}:width_type=o:width=2:g=${b.gain}`).join(",");
      }
      let volume = 1;
      if (queue.volume) volume = queue.volume;
      else if (cache.actions && cache.actions[0] && cache.actions[0].volume) volume = parseFloat(cache.actions[0].volume) / 100;
      const { createAudioResource, StreamType } = require("@discordjs/voice");
      let inputStream = null;
      if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
        const { spawn } = require('child_process');
        let ytdlpPath = null;
        const resourcesDir = path.join(__dirname, "..", "resources");
        const os = require('os');
        const osPlatform = os.platform();
        const osArch = os.arch();
        const candidates = [];
        if (osPlatform === "win32") {
          candidates.push(path.join(resourcesDir, "yt-dlp_x86.exe"));
        } else if (osArch === "arm" || osArch === "armv7l") {
          candidates.push(path.join(resourcesDir, "yt-dlp_armv7l"));
        } else if (osArch === "aarch64" || osArch === "arm64") {
          candidates.push(path.join(resourcesDir, "yt-dlp_aarch64"));
        } else {
          candidates.push(path.join(resourcesDir, "yt-dlp_linux"));
        }
        candidates.push(
          path.join(resourcesDir, "yt-dlp_x86.exe"),
          path.join(resourcesDir, "yt-dlp_armv7l"),
          path.join(resourcesDir, "yt-dlp_aarch64"),
          path.join(resourcesDir, "yt-dlp_linux")
        );
        for (const candidate of candidates) {
          if (fs.existsSync(candidate)) {
            ytdlpPath = candidate;
            break;
          }
        }
        if (!ytdlpPath) {
          if (osPlatform === "win32") {
            ytdlpPath = path.join(resourcesDir, "yt-dlp_x86.exe");
          } else if (osArch === "arm" || osArch === "armv7l") {
            ytdlpPath = path.join(resourcesDir, "yt-dlp_armv7l");
          } else if (osArch === "aarch64" || osArch === "arm64") {
            ytdlpPath = path.join(resourcesDir, "yt-dlp_aarch64");
          } else {
            ytdlpPath = path.join(resourcesDir, "yt-dlp_linux");
          }
        }
        const ytDlpStream = spawn(ytdlpPath, [
          "--no-playlist",
          "-f",
          "bestaudio[ext=webm]/bestaudio",
          "--quiet",
          "-o",
          "-",
          url,
        ]);
        inputStream = ytDlpStream.stdout;
      } else {
        inputStream = url;
      }
      let ffmpegInstance = ffmpeg().setFfmpegPath(ffmpegPath);
      if (inputStream !== url) {
        ffmpegInstance = ffmpegInstance.input(inputStream);
      } else {
        ffmpegInstance = ffmpegInstance.input(url);
      }
      if (eqFilter) ffmpegInstance = ffmpegInstance.audioFilters(eqFilter);
      const ffmpegStream = ffmpegInstance
        .format("ogg")
        .on("error", (err) => {
          if (
            (err && err.code === 'ERR_STREAM_PREMATURE_CLOSE') ||
            (err && err.outputStreamError && err.outputStreamError.code === 'ERR_STREAM_PREMATURE_CLOSE')
          ) {
            console.warn('[set_music_equalizer_MOD][LOG] ffmpegProc error: Premature close (ignorowane)');
            return;
          }
          console.error("[set_music_equalizer_MOD] FFmpeg error:", err);
        })
        .pipe();
      ffmpegStream.on('error', (err) => {
        if (err && err.code === 'ERR_STREAM_PREMATURE_CLOSE') {
          console.warn('[set_music_equalizer_MOD][LOG] Stream error: Premature close (ignorowane)');
          return;
        }
        console.error('[set_music_equalizer_MOD] Stream error:', err);
      });
      const audioResource = createAudioResource(ffmpegStream, {
        inputType: StreamType.OggOpus,
        inlineVolume: true,
      });
      if (audioResource.volume) {
        audioResource.volume.setVolume(volume);
      }
      queue.player.stop();
      queue.player.play(audioResource);
      console.log('[set_music_equalizer_MOD] Podmieniono resource na playerze (realtime EQ)!');
    } catch (err) {
      console.error('[set_music_equalizer_MOD] Błąd realtime EQ:', err);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
