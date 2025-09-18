module.exports = {
  name: "[VX]store_track_info_MOD",
  displayName: "Store Track Info",
  section: '# VX - Music',
  meta: {
    version: '3.2.0',
    actionVersion: "3.4.0",
    preciseCheck: false,
    author: 'vxed_',
    authorUrl: 'https://github.com/vxe3D/dbm-mods',
  },
  requiresAudioLibraries: true,
  fields: ['trackObject', 'varName', 'info', 'storage', 'varName1'],

  subtitle({ info }) {
    const names = [
      'Track Title',
      'Track Thumbnail',
      'Track URL',
      'Track Author',
      'Track Duration (In seconds)',
      'Requested By (User ID)',
      'Track Duration (Progress bar)',
      'Track Thumbnail (Dominant Color)',
    ];
    return `${names[parseInt(info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [
      data.varName1,
      ['Track Title', 'Track Thumbnail', 'Track URL', 'Track Author', 'Track Duration [In seconds]', 'Requested By', 'Track Duration [Progress bar]', 'Track Thumbnail [Dominant Color]'][
        parseInt(data.info, 10)
      ] || 'Track Info',
    ];
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
        </style>

    <retrieve-from-variable dropdownLabel="Track" selectId="trackObject" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
    <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Track Info</span><br>
    <select id="info" class="round">
      <option value="0">Track Title</option>
      <option value="1">Track Thumbnail</option>
      <option value="7">Track Thumbnail (Dominant Color)</option>
      <option value="2">Track URL</option>
      <option value="3">Track Author</option>
      <option value="4">Track Duration (In seconds)</option>
      <option value="6">Track Duration (Progress bar)</option>
      <option value="5">Requested By (User ID)</option>
    </select>
  </div>
  <br><br><br><br>

  <div style="float: left; width: 100%; padding-top: 16px;">
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer1" variableInputId="varName1"></store-in-variable>
  </div>
`;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const type = parseInt(data.trackObject, 10);
    const varName = this.evalMessage(data.varName, cache);
    const track = this.getVariable(type, varName, cache);

    let result;
    if (!track) {
      result = undefined;
    } else {
      switch (info) {
        case 0:
          result = track.title;
          break;
        case 1:
          result = track.thumbnail;
          break;
        case 2:
          result = track.url;
          break;
        case 3:
          result = track.author;
          break;
        case 4:
          result = track.duration;
          break;
        case 5:
          result = track.requestedBy;
          break;
        case 6: {
          // Pasek postępu utworu dla przekazanego tracka
          const { Bot } = this.getDBM();
          const server = cache.server;
          const queue = Bot.bot.queue ? Bot.bot.queue.get(server.id) : undefined;
          let isCurrent = false;
          let currentTime = 0;
          let totalTime = track && track.duration ? parseInt(track.duration, 10) : 0;
          if (queue && queue.songs && typeof queue.currentIndex === 'number') {
            const song = queue.songs[queue.currentIndex];
            // Sprawdź czy track to aktualnie grający utwór
            if (song && track && song.url === track.url) {
              isCurrent = true;
              if (queue.player && queue.player.state && queue.player.state.resource && typeof queue.player.state.resource.playbackDuration === 'number') {
                currentTime = queue.player.state.resource.playbackDuration / 1000;
              }
            }
          }
          const progressBarLength = 11;
          let progress = 0;
          if (totalTime > 0 && isCurrent) {
            progress = Math.round((currentTime / totalTime) * progressBarLength);
          }
          // Jeśli to aktualnie grający utwór, pokaż 🔘, jeśli nie - pełny pasek
          let progressBar;
          if (isCurrent) {
            progressBar = `${`▬`.repeat(progress)}🔘${`▬`.repeat(progressBarLength - progress)}`;
          } else {
            progressBar = `▬`.repeat(progressBarLength + 1);
          }

          const currentHours = Math.floor(currentTime / 3600);
          const currentMinutes = Math.floor((currentTime % 3600) / 60);
          const currentSeconds = Math.floor(currentTime % 60);

          const totalHours = Math.floor(totalTime / 3600);
          const totalMinutes = Math.floor((totalTime % 3600) / 60);
          const totalSeconds = Math.floor(totalTime % 60);

          // Formatowanie czasu z zerowaniem
          const formatTime = (h, m, s) => {
            let time = '';
            if (h > 0) {
              time += h + ':';
              if (m < 10) time += '0';
            }
            time += m + ':';
            if (s < 10) time += '0';
            time += s;
            return time;
          };

          const currentTimeStr = isCurrent ? formatTime(currentHours, currentMinutes, currentSeconds) : '0:00';
          const totalTimeStr = formatTime(totalHours, totalMinutes, totalSeconds);

          result = `${currentTimeStr} ┃ ${progressBar} ┃ ${totalTimeStr}`;
          break;
        }
        case 7: {
          // Track Thumbnail (Dominant Color)
          const thumbnailUrl = track.thumbnail;
          let dominantColor = '#1DB954';
          if (thumbnailUrl) {
            try {
              const sharp = require('sharp');
              const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
              const response = await fetch(thumbnailUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0',
                  'Accept': 'image/png,image/*;q=0.8,*/*;q=0.5'
                }
              });
              if (response.ok) {
                const buffer = Buffer.from(await response.arrayBuffer());
                const contentType = response.headers.get('content-type');
                let pngBuffer = buffer;
                if (contentType && contentType.includes('image/webp')) {
                  try {
                    pngBuffer = await sharp(buffer).png().toBuffer();
                  } catch (err) {
                    console.log('Sharp conversion error (thumbnail):', err);
                  }
                }
                if (pngBuffer.length > 0) {
                  try {
                    const { channels } = await sharp(pngBuffer).stats();
                    // Convert mean RGB to hex
                    const r = Math.round(channels[0].mean);
                    const g = Math.round(channels[1].mean);
                    const b = Math.round(channels[2].mean);
                    dominantColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
                      .toString(16)
                      .slice(1)
                      .toUpperCase();
                  } catch (err) {
                    console.log('Sharp.stats error (thumbnail):', err);
                  }
                }
              } else {
                console.log('Thumbnail fetch error:', response.status, response.statusText);
              }
            } catch (err) {
              console.log('Thumbnail fetch exception:', err);
            }
          }
          result = dominantColor;
          break;
        }
      }
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName1 = this.evalMessage(data.varName1, cache);
      this.storeValue(result, storage, varName1, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
