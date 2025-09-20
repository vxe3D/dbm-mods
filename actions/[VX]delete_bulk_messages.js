module.exports = {
  name: "[VX]delete_bulk_messages",
  displayName: "Delete Bulk Messages",
  section: "# VX - Message(s)",
  meta: {
    version: "3.2.0",
    actionVersion: "3.2.6",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data, presets) {
    return `Delete ${data.count} messages from ${presets.getChannelText(
      data.channel,
      data.varName
    )}`;
  },

  fields: ["channel", "count", "condition", "custom", "varName", "customDays", "customDaysInput", "customWords", "authorInput", "saveToFile", "fileName"],

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

      <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

      <br><br><br>

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Amount to Delete</span><br>
        <input id="count" class="round" type="text" style="width: 100%;"><br>
      </div>
      <div style="padding-top: 2px;">
        <div style="float: left; width: 45%;">
          <span class="dbminputlabel">Delete Condition</span><br>
          <select id="condition" class="round" onchange="glob.onChange2(this)">
            <option value="0" selected>None</option>
            <option value="1">Has Author</option>
            <option value="2">Custom</option>
          </select>
        </div>
        <div style="float: right; width: 45%; position: relative; min-height: 60px;">
          <span class="dbminputlabel">Save Message to File</span><br>
          <select id="saveToFile" class="round" style="width: 100%;">
            <option value="no" selected>No</option>">
              <optgroup label="🗑️ After 15 seconds delete file!">
                <option value="/logs">/logs</option>
                <option value="/resources">/resources</option>
                <option value="/data">/data</option>
              </optgroup>
            </select>
          <input id="fileName" class="round" type="text" style="position: absolute; right: 0; top: 51px; width: 100%; margin-top: 0; display: none; z-index: 2;" placeholder="deleted_messages.txt">
        </div>
      </div>
      <div id="varNameContainer2" style="float: left; display: none;">
        <div id="authorInputContainer" style="display: none;">
          <input id="authorInput" class="round" type="text" placeholder="Enter author (ID or variable)" style="margin-top: 4px; width: 138%;">
        </div>
        <div id="customOptionsContainer" style="display: none;">
          <select id="customDays" class="round" style="width: 134%; margin-top: 4px;">
            <option value="7">Older than 7 days</option>
            <option value="14">Older than 14 days</option>
            <option value="30">Older than 30 days</option>
            <option value="custom">Custom number of days</option>
            <option value="words">Keywords</option>
          </select>
          <input id="customDaysInput" class="round" type="number" min="1" placeholder="How many days?" style="width: 134%; display: none; margin-top: 4px;">
          <div id="customWordsContainer" style="display: none; margin-top: 4px;">
            <input id="customWords" class="round" type="text" placeholder="(separated by commas)" style="width: 134%;">
          </div>
        </div>
      </div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const { glob, document } = this;

    glob.onChange2 = function (event) {
      const value = parseInt(event.value, 10);
      const varNameInput = document.getElementById("varNameContainer2");
      const authorInputContainer = document.getElementById("authorInputContainer");
      const customOptionsContainer = document.getElementById("customOptionsContainer");
      if (value === 1) {
        varNameInput.style.display = null;
        authorInputContainer.style.display = "block";
        customOptionsContainer.style.display = "none";
      } else if (value === 2) {
        varNameInput.style.display = null;
        authorInputContainer.style.display = "none";
        customOptionsContainer.style.display = "block";
      } else {
        varNameInput.style.display = "none";
        authorInputContainer.style.display = "none";
        customOptionsContainer.style.display = "none";
      }
    };

    glob.onChange2(document.getElementById("condition"));

    const customDays = document.getElementById("customDays");
    const customDaysInput = document.getElementById("customDaysInput");
    const customWordsContainer = document.getElementById("customWordsContainer");
    if (customDays && customDaysInput && customWordsContainer) {
      customDays.addEventListener("change", function() {
        if (customDays.value === "custom") {
          customDaysInput.style.display = "inline-block";
          customWordsContainer.style.display = "none";
        } else if (customDays.value === "words") {
          customDaysInput.style.display = "none";
          customWordsContainer.style.display = "block";
        } else {
          customDaysInput.style.display = "none";
          customWordsContainer.style.display = "none";
        }
      });
      // Inicjalizacja widoczności na starcie
      if (customDays.value === "custom") {
        customDaysInput.style.display = "inline-block";
        customWordsContainer.style.display = "none";
      } else if (customDays.value === "words") {
        customDaysInput.style.display = "none";
        customWordsContainer.style.display = "block";
      } else {
        customDaysInput.style.display = "none";
        customWordsContainer.style.display = "none";
      }
    }

    const saveToFile = document.getElementById("saveToFile");
    const fileNameInput = document.getElementById("fileName");

    glob.onChangeSaveToFile = function(event) {
      const select = event.target || event;
      const value = select.value;
      if (fileNameInput) {
        if (value === "no") {
          fileNameInput.style.display = "none";
        } else {
          fileNameInput.style.display = "block";
        }
      }
    };

    if (saveToFile) {
      saveToFile.addEventListener("change", glob.onChangeSaveToFile);
      glob.onChangeSaveToFile({ target: saveToFile });
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = cache.server;
    const source = await this.getChannelFromData(
      data.channel,
      data.varName,
      cache
    );

    if (!source?.messages) return this.callNextAction(cache);

    const count = parseInt(this.evalMessage(data.count, cache), 10);
    const options = {
      limit: 100,
    };

    if (cache.msg) {
      options.before = cache.msg.id;
    }

    source.messages
      .fetch(options)
      .then((messages) => {
        const condition = parseInt(data.condition, 10);
        let toDelete;
        if (condition === 1) {
          let author = this.evalMessage(data.authorInput, cache);
          if (author) {
            toDelete = messages.filter((m) => String(m.author?.id) === String(author)).first(count);
          }
        } else if (condition === 2) {
          if (data.customDays === "custom") {
            const daysRaw = this.evalMessage(data.customDaysInput, cache);
            const days = parseInt(daysRaw, 10);
            if (!isNaN(days)) {
              const minTimestamp = Date.now() - days * 24 * 60 * 60 * 1000;
              toDelete = messages.filter((m) => m.createdTimestamp < minTimestamp).first(count);
            }
          } else if (data.customDays === "words") {
            const wordsRaw = this.evalMessage(data.customWords, cache);
            const words = (wordsRaw || "").split(",").map(w => w.trim()).filter(Boolean);
            if (words.length > 0) {
              toDelete = messages.filter((m) => words.some(word => m.content && m.content.includes(word))).first(count);
            }
          } else if (["7","14","30"].includes(data.customDays)) {
            const days = parseInt(data.customDays, 10);
            const minTimestamp = Date.now() - days * 24 * 60 * 60 * 1000;
            toDelete = messages.filter((m) => m.createdTimestamp < minTimestamp).first(count);
          }
        } else {
          // None: just take the first N messages
          toDelete = messages.first(count);
        }

        if (["/logs","/resources","/data"].includes(data.saveToFile) && data.fileName) {
          const fs = require("fs");
          const path = require("path");
          const folder = data.saveToFile;
          const filePath = path.join(process.cwd(), folder, data.fileName);
          function formatDate(ts) {
            const d = new Date(ts);
            const pad = (n) => n < 10 ? '0'+n : n;
            return `${pad(d.getDate())}.${pad(d.getMonth()+1)}-${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
          }
          const logContent = Array.from((Array.isArray(toDelete) ? toDelete : toDelete?.values?.() ? Array.from(toDelete.values()) : [])).map(m => {
            const nick = m.member?.displayName || m.author?.username || m.author?.tag || m.author?.id || "?";
            const id = m.author?.id || "?";
            const date = formatDate(m.createdTimestamp);
            const hasAttachment = m.attachments && m.attachments.size > 0;
            let attachmentInfo = "";
            if (hasAttachment) {
              const links = Array.from(m.attachments.values()).map(a => a.url).join(", ");
              attachmentInfo = `Attachment${links ? ` (${links})` : ""}`;
            }
            if (hasAttachment) {
              return `${nick} (${id}) | ${date} | ${attachmentInfo}\n- ${m.content || ""}`;
            } else {
              return `${nick} (${id}) | ${date}${m.content ? ` | ${m.content}` : ""}`;
            }
          }).join("\n\n");
          try {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, logContent, "utf8");
            setTimeout(() => {
              try {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
              } catch (e) {}
            }, 15000);
          } catch (e) {
            this.displayError(data, cache, e);
          }
        }

        source
          .bulkDelete(toDelete, true)
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      })
      .catch((err) => this.displayError(data, cache, err));
  },

  mod(DBM) {},
};
