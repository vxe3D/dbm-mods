module.exports = {
  name: "[VX]set_music_equalizer_MOD",
  displayName: "Set Music Equalizer",
  section: "# VX - Music",
  meta: {
    version: "3.2.0",
    actionVersion: "3.5.0",
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

        .eq-band-row {display:flex;align-items:center;gap:3px;margin-bottom:-2px;background:rgba(60,50,100,0.08);border-radius:6px;padding:3px 8px 3px 0;transition:background 0.2s;}
        .eq-band-row:hover {background:rgba(135,84,255,0.10);}
        .eq-label {min-width:62px;font-weight:500;color:#b595ff;font-size:13px;letter-spacing:0.5px;margin-right:2px;}
        .eq-inp {width:64px;padding:2px 7px;border:1px solid #8754ff;border-radius:4px;background:#23243a;color:#fff;font-size:13px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .eq-inp:focus {border-color:#b595ff;box-shadow:0 0 0 2px rgba(135,84,255,0.10);background:#2d2e4a;}
        .eq-unit {color:#aaa;font-size:12px;margin:0 2px;}
        .eq-btn {background:linear-gradient(90deg,#3a3b5a 0%,#23243a 100%);color:#fff;border:1px solid #8754ff;border-radius:5px;padding:4px 13px;font-size:12px;font-weight:600;margin-right:5px;margin-bottom:2px;cursor:pointer;transition:border-color 0.2s,color 0.2s,box-shadow 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.10);outline:none;background-size:200% 100%;background-position:0% 0%;}
        .eq-btn:hover {background:linear-gradient(90deg,#8754ff 0%,#23243a 100%,#8754ff 100%);background-size:200% 100%;background-position:100% 0%;color:#fff;border-color:#b595ff;box-shadow:0 4px 16px rgba(135,84,255,0.15);animation:eq-btn-gradient-move 0.4s linear forwards;}
        @keyframes eq-btn-gradient-move {from{background-position:0% 0%;}to{background-position:100% 0%;}}
      </style>

    <tab-system>
      <tab label="Main" icon="share square">
        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
      </tab>
      <tab label="Equalizer" icon="sliders horizontal">
        <div style="display: flex; flex-direction: row; gap: 24px; margin-bottom: 8px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
      <p style="font-size:15px; font-weight:200; color:#b595ff; margin-bottom:8px;">Enter frequency (Hz) and gain (dB) for 6 bands:</p>
      <div class="eq-band-row"><label class="eq-label">Band 1:</label> <input class="eq-inp" id="freq0" name="freq0" type="number" placeholder="e.g. 32"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain0" name="gain0" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
      <div class="eq-band-row"><label class="eq-label">Band 2:</label> <input class="eq-inp" id="freq1" name="freq1" type="number" placeholder="e.g. 64"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain1" name="gain1" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
      <div class="eq-band-row"><label class="eq-label">Band 3:</label> <input class="eq-inp" id="freq2" name="freq2" type="number" placeholder="e.g. 250"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain2" name="gain2" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
      <div class="eq-band-row"><label class="eq-label">Band 4:</label> <input class="eq-inp" id="freq3" name="freq3" type="number" placeholder="e.g. 1000"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain3" name="gain3" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
      <div class="eq-band-row"><label class="eq-label">Band 5:</label> <input class="eq-inp" id="freq4" name="freq4" type="number" placeholder="e.g. 4000"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain4" name="gain4" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
      <div class="eq-band-row"><label class="eq-label">Band 6:</label> <input class="eq-inp" id="freq5" name="freq5" type="number" placeholder="e.g. 8000"> <span class="eq-unit">Hz</span> <input class="eq-inp" id="gain5" name="gain5" type="number" step="0.1" placeholder="e.g. 0"> <span class="eq-unit">dB</span></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px; background: #222; color: #eee; border-radius: 10px; padding: 8px 8px 8px 12px; max-width: 180px; max-height: 170px; margin-top: 55px;">
              <b>Example band split:</b>
              <div><b>32 Hz</b> — sub-bass</div>
              <div><b>64 Hz</b> — bass</div>
              <div><b>250 Hz</b> — low-mids</div>
              <div><b>1 kHz</b> — mids</div>
              <div><b>4 kHz</b> — upper-mids</div>
              <div><b>8 kHz</b> — presence/treble</div>
          </div>
        </div>
        <div style="margin-left: 265px;">
          <button id="importEqBtn" type="button" class="eq-btn">Import Equalizer</button>
          <input type="file" id="importEqFile" accept=".eq" style="display:none;">
          <button id="exportEqBtn" type="button" class="eq-btn">Export Equalizer</button>
        </div>
      </tab>
    </tab-system>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const importBtn = document.getElementById('importEqBtn');
    const importFile = document.getElementById('importEqFile');
    const exportBtn = document.getElementById('exportEqBtn');
    if(importBtn && importFile) {
      importBtn.onclick = function() { importFile.click(); };
      importFile.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          try {
            const bands = JSON.parse(ev.target.result);
            for(let i=0;i<6;i++) {
              if(bands[i]) {
                document.getElementById('freq'+i).value = bands[i].freq;
                document.getElementById('gain'+i).value = bands[i].gain;
              }
            }
            let fileName = file.name;
            let dotIdx = fileName.lastIndexOf('.');
            if(dotIdx > 0) fileName = fileName.substring(0, dotIdx);
            alert('Equalizer imported: ' + fileName + ' profile!');
          } catch {
            alert('Invalid file format!');
          }
        };
        reader.readAsText(file);
      };
    }
    if(exportBtn) {
      exportBtn.onclick = function() {
        const bands = [];
        for(let i=0;i<6;i++) {
          bands.push({
            freq: document.getElementById('freq'+i).value,
            gain: document.getElementById('gain'+i).value
          });
        }
        const blob = new Blob([JSON.stringify(bands, null, 2)], {type:'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'equalizer.eq';
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        }, 100);
      };
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const { Actions } = this.getDBM();
    let bands = [];
    const { storage, varName2 } = data;
    const storageType = parseInt(storage, 10);
    let bandsRaw = Actions.getVariable(storageType, varName2, cache);
    if (typeof bandsRaw === 'string') {
      try { bands = JSON.parse(bandsRaw); } catch { bands = []; }
    } else if (Array.isArray(bandsRaw)) {
      bands = bandsRaw;
    }
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
    if (varName2) {
      Actions.storeValue(JSON.stringify(bands), storageType, varName2, cache);
    }

    // --- REALTIME EQ ---
    try {
      const { Bot } = this.getDBM();
      let guild = cache.guild || cache.server;
      if (!guild) throw new Error('Brak guild/server w cache!');
      let queue = Bot.bot.queue && Bot.bot.queue.get(guild.id);
      if (!queue || !queue.player) {
        return this.callNextAction(cache);
      }
      let url = null;
      if (queue.songs && queue.songs.length > 0 && queue.currentIndex < queue.songs.length) {
        url = queue.songs[queue.currentIndex]?.url || queue.songs[0]?.url;
      }
      if (!url && cache.actions && cache.actions[0] && cache.actions[0].url) {
        url = cache.actions[0].url;
      }
      if (!url) throw new Error('Nie znaleziono url do odtworzenia!');
      const { spawn } = require('child_process');
      const fs = require('fs');
      const path = require('path');
      let eqFilter = '';
      if (Array.isArray(bands) && bands.length > 0) {
        eqFilter = bands.map(b => `equalizer=f=${b.freq}:width_type=o:width=2:g=${b.gain}`).join(",");
      }
      const loudnormFilter = "loudnorm=I=-8:TP=0:LRA=8";
      if (eqFilter && eqFilter.length > 0) {
        eqFilter = eqFilter + "," + loudnormFilter;
      } else {
        eqFilter = loudnormFilter;
      }
      let volume = 1;
      if (queue.volume) volume = queue.volume;
      else if (cache.actions && cache.actions[0] && cache.actions[0].volume) volume = parseFloat(cache.actions[0].volume) / 100;
      const { createAudioResource, StreamType } = require("@discordjs/voice");
      let inputStream = null;
      if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
        const ytdlp = require('yt-dlp-exec');
        const ytdlpProc = ytdlp(url, {
          output: '-',
          quiet: true,
          noPlaylist: true,
          format: 'bestaudio[ext=webm]/bestaudio',
        });
        inputStream = ytdlpProc.stdout;
      } else {
        inputStream = url;
      }
      let ffmpegArgs = [
        "-i", inputStream !== url ? "pipe:0" : url,
        "-f", "ogg",
        "-acodec", "libopus",
        "-ar", "48000",
        "-ac", "2"
      ];
      if (eqFilter) {
        ffmpegArgs.push("-af", eqFilter);
      }
      ffmpegArgs.push("pipe:1");
      const ffmpegPath = "ffmpeg";
      const ffmpegProc = spawn(ffmpegPath, ffmpegArgs, { stdio: inputStream !== url ? ["pipe", "pipe", "ignore"] : ["ignore", "pipe", "ignore"] });
      if (inputStream !== url && inputStream && typeof inputStream.pipe === 'function') {
        inputStream.pipe(ffmpegProc.stdin);
      }
      ffmpegProc.on("error", (err) => {
        console.error("[set_music_equalizer_MOD] FFmpeg error:", err);
      });
      const audioResource = createAudioResource(ffmpegProc.stdout, {
        inputType: StreamType.OggOpus,
        inlineVolume: true,
      });
      if (audioResource.volume) {
        let prevVol = 1;
        if (queue.player.state && queue.player.state.resource && queue.player.state.resource.volume) {
          prevVol = queue.player.state.resource.volume.volume;
        } else if (typeof queue.volume === 'number') {
          prevVol = queue.volume;
        } else if (cache.actions && cache.actions[0] && cache.actions[0].volume) {
          prevVol = parseFloat(cache.actions[0].volume) / 100;
        }
        audioResource.volume.setVolume(prevVol);
      }
      queue.player.stop();
      queue.player.play(audioResource);
    } catch (err) {
      console.error('[set_music_equalizer_MOD] Błąd realtime EQ:', err);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
