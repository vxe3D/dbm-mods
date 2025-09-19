module.exports = {
  name: "[VX]generate_random_word",
  displayName: "Generate Random Word",
  section: "# VX - Utilities",
  meta: {
    version: "3.4.2",
    actionVersion: "2.5.0",
    preciseCheck: true,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    return `Generate ${data.language === "pl" ? "Polish" : "English"} word`;
  },

  fields: ["language", "storage1", "varName1", "storage2", "varName2"],

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
        
      <div style="padding:10px;">
        <div class="dbminputlabel">Language</div>
        <select id="language" class="round">
          <option value="pl">Polish</option>
          <option value="en">English</option>
        </select>
        <br><br>

        <div style="float:left; width: calc(50% - 6px);">
          <store-in-variable dropdownLabel="Correct Word" selectId="storage1" variableContainerId="varNameContainer1" variableInputId="varName1" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
        </div>
        <div style="float:right; width: calc(50% - 6px);">
          <store-in-variable dropdownLabel="Random Letters" selectId="storage2" variableContainerId="varNameContainer2" variableInputId="varName2" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
        </div>
      </div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

async action(cache) {
  const data = cache.actions[cache.index];

  const storage1 = parseInt(data.storage1, 10);
  const varName1 = this.evalMessage(data.varName1, cache);
  const storage2 = parseInt(data.storage2, 10);
  const varName2 = this.evalMessage(data.varName2, cache);
  const translate = require('google-translate-api-x');

  function isFakeTranslation(original, translation) {
    original = original.toLowerCase();
    translation = translation.toLowerCase();

    const origParts = original.split(/[-\s]/);
    const transParts = translation.split(/[-\s]/);

    if (translation === original) return true;

    for (let i = 0; i < Math.min(origParts.length, transParts.length); i++) {
      const orig = origParts[i];
      const trans = transParts[i];

      if (/[ęóąśżźćń]/.test(trans)) return false;

      let matchCount = 0;
      const len = Math.min(orig.length, trans.length);
      for (let j = 0; j < len; j++) {
        if (orig[j] === trans[j]) matchCount++;
      }
      if (matchCount / orig.length > 0.65) return true;
    }

    return false;
  }

  // zamień losowo 2 litery
  function shuffleFew(str, swaps = 2) {
    const arr = str.split("");
    const len = arr.length;

    for (let i = 0; i < swaps; i++) {
      const idx1 = Math.floor(Math.random() * len);
      let idx2 = Math.floor(Math.random() * len);
      while (idx2 === idx1) idx2 = Math.floor(Math.random() * len);
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    return arr.join("");
  }

  async function getRandomWord() {
    console.time("getRandomWord");
    try {
      const resp = await fetch("https://random-word.ryanrk.com/api/en/word/random");
      const contentType = resp.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await resp.text();
        console.error("[RandomWordAPI] Response not JSON:", text);
        return "Not found | JSON Error";
      }
      const arr = await resp.json();
      console.timeEnd("getRandomWord");
      return arr[0];
    } catch (e) {
      console.timeEnd("getRandomWord");
      console.error("[RandomWordAPI] Error:", e);
      return "Not found | Fetch Error";
    }
  }

  async function translateToPL(txt) {
    console.time("translateToPL");
    try {
      const res = await translate(txt, { from: 'en', to: 'pl' });
      const translation = res.text || txt;
      console.timeEnd("translateToPL");

      if (isFakeTranslation(txt, translation)) {
        return txt;
      }

      return translation;
    } catch (e) {
      console.timeEnd("translateToPL");
      console.error('[GoogleTranslate-X] Error:', e);
      return txt;
    }
  }

  console.time("totalAction");
  try {
    let word = "";

    if (data.language === "pl") {
      let tries = 0;
      do {
        word = await getRandomWord();
        const translated = await translateToPL(word);
        if (translated.toLowerCase() !== word.toLowerCase()) {
          word = translated;
          break;
        }
        tries++;
      } while (tries < 5);
    } else {
      word = await getRandomWord();
    }

    if (Array.isArray(word)) word = word[0];
    if (typeof word !== 'string') word = String(word);

    console.time("capitalizeWord");
    word = word.charAt(0).toUpperCase() + word.slice(1);
    console.timeEnd("capitalizeWord");

    let tries2 = 0;
    while ((word.length < 1 || word.length > 15) && tries2 < 5) {
      let w = await getRandomWord();
      if (data.language === "pl") w = await translateToPL(w);
      if (Array.isArray(w)) w = w[0];
      if (typeof w !== 'string') w = String(w);
      console.time("capitalizeW");
      w = w.charAt(0).toUpperCase() + w.slice(1);
      console.timeEnd("capitalizeW");
      word = w;
      tries2++;
    }

    console.time("shuffleFew");
    const shuffled = shuffleFew(word, 2);
    console.timeEnd("shuffleFew");

    console.log("[VX] Generated word:", word, "| Shuffled:", shuffled);
    this.storeValue(word, storage1, varName1, cache);
    this.storeValue(shuffled, storage2, varName2, cache);
  } catch (err) {
    console.error("Error fetching or translating word:", err);
  }
  console.timeEnd("totalAction");

  this.callNextAction(cache);
},

  mod() {},
};
