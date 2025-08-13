module.exports = {
  name: 'Store Queue Info',
  section: '# SHDZ - Music',
  meta: {
    version: '3.0.0',
    preciseCheck: false,
    author: 'vxed_',
    authorUrl: 'https://github.com/vxe3D/dbm-mods',
  },
  requiresAudioLibraries: true,
  fields: ['queueObject', 'varName0', 'info', 'storage', 'varName'],

  subtitle({ info }) {
    const names = [
      'Tracks',
      'Previous Tracks',
      'Is Playing?',
      'Is Paused?',
      'Loop Queue',
      'Loop One',
      'Progress Bar',
      'Formatted Track List',
      'Now Playing',
      'Queue Channel',
      'Queue Object',
      'Queue Length',
    ];
    return `${names[parseInt(info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [
      data.varName,
      [
        'Tracks',
        'Previous Tracks',
        'Is Playing?',
        'Is Paused?',
        'Loop Queue',
        'Loop One',
        'Progress Bar',
        'Formatted Track List',
        'Now Playing',
        'Queue Channel',
        'Queue Object',
        'Queue Length',
      ][parseInt(data.info, 10)] || 'Queue Info',
    ];
  },

  html(isEvent) {
    return `
    <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
      <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
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
    <div style="float: left; width: 100%;">
      <span class="dbminputlabel">Queue Info</span><br>
      <select id="info" class="round">
        <option value="0">Tracks</option>
        <option value="1">Previous Tracks</option>
        <option value="2">Is Playing?</option>
        <option value="3">Is Paused?</option>
        <option value="4">Loop Queue</option>
        <option value="5">Loop One</option>
        <option value="6">Progress Bar</option>
        <option value="7">Formatted Track List</option>
        <option value="8">Now Playing</option>
        <option value="9">Queue Channel</option>
        <option value="10">Queue Object</option>
        <option value="11">Queue Length</option>
      </select>
    </div>
    <br><br>
  
    <div style="float: left; width: 100%; padding-top: 16px;">
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    </div>
    `;
  },

  init() {
    const { document } = this;

    document.toggleRepeatText = function () {
      const infoSelect = document.getElementById('info');
      const repeatModeText = document.getElementById('repeatModeText');

      if (infoSelect.value === '3') {
        repeatModeText.style.display = 'block';
      } else {
        repeatModeText.style.display = 'none';
      }
    };

    document.toggleRepeatText();
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);

    const type = parseInt(data.queueObject, 10);
    const varName = this.evalMessage(data.varName0, cache);
    let queue = this.getVariable(type, varName, cache);

    if (!queue) {
      const { Bot } = this.getDBM();
      // Spróbuj pobrać guildId z różnych źródeł (event, command, interaction, server)
      let guildId = undefined;
      if (cache.msg && cache.msg.guildId) guildId = cache.msg.guildId;
      else if (cache.interaction && cache.interaction.guildId) guildId = cache.interaction.guildId;
      else if (cache.server && cache.server.id) guildId = cache.server.id;
      else if (cache.guild && cache.guild.id) guildId = cache.guild.id;
      // Fallback: spróbuj z channel.guild.id jeśli channel istnieje
      else if (cache.channel && cache.channel.guild && cache.channel.guild.id) guildId = cache.channel.guild.id;

      if (!guildId || !Bot.bot.queue) {
        queue = undefined;
      } else {
        queue = Bot.bot.queue.get(guildId);
      }
    }

    let result;
    switch (info) {
      case 0:
        result = queue && queue.songs ? queue.songs : undefined;
        break;
      case 1:
        result = queue && queue.songs && typeof queue.currentIndex === 'number' ? queue.songs.slice(0, queue.currentIndex) : undefined;
        break;
      case 2:
        result = !!(queue && queue.player && queue.player.state && queue.player.state.status === 'playing');
        break;
      case 3: // Is Paused?
        result = !!(queue && queue.player && queue.player.state && queue.player.state.status === 'paused');
        break;
      case 4: // Loop Queue
        result = !!(queue && queue.loopQueue);
        break;
      case 5: // Loop One
        result = !!(queue && queue.loopOne);
        break;
      case 6:
        if (queue && queue.songs && typeof queue.currentIndex === 'number') {
          const song = queue.songs[queue.currentIndex];
          let currentTime = 0;
          if (queue.player && queue.player.state && queue.player.state.resource && typeof queue.player.state.resource.playbackDuration === 'number') {
            currentTime = queue.player.state.resource.playbackDuration / 1000;
          }
          const totalTime = song ? parseInt(song.duration, 10) : 0;
          const progressBarLength = 14;
          let progress = 0;
          if (totalTime > 0) {
            progress = Math.round((currentTime / totalTime) * progressBarLength);
          }
          const progressBar = `${`▬`.repeat(progress)}🔘${`▬`.repeat(progressBarLength - progress)}`;

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

          const currentTimeStr = formatTime(currentHours, currentMinutes, currentSeconds);
          const totalTimeStr = formatTime(totalHours, totalMinutes, totalSeconds);

          result = `${currentTimeStr} ┃ ${progressBar} ┃ ${totalTimeStr}`;
        } else {
          result = undefined;
        }
        break;
      case 7: // Formatted Track List
        if (queue && queue.songs && queue.songs.length) {
          result = queue.songs.map((song, index) => `${index + 1}. ${song.title || song.name || '[no title]'} - ${song.author || song.uploader || '[no author]'}`).join('\n');
        } else {
          result = 'Brak utworów w kolejce.';
        }
        break;
      case 8:
        result = queue && queue.songs && typeof queue.currentIndex === 'number' ? queue.songs[queue.currentIndex] : undefined;
        break;
      case 9:
        result = queue && queue.connection && queue.connection.channel ? queue.connection.channel : undefined;
        break;
      case 10:
        result = queue;
        break;
      case 11: // Queue Length
        result = queue && queue.songs ? queue.songs.length : 0;
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
