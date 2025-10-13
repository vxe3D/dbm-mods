module.exports = {
  name: "[VX]Store_member_data_list",
  displayName: "Store Member Data List",
  section: "# VX - List",
  meta: {
    version: "3.2.0",
    actionVersion: "3.1.0",
    preciseCheck: true,
    author: "Flapekk",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    return `${data.dataName || "Unknown Data"}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, "Array"];
  },

  fields: ["dataName", "numbefstselect", "numbefst2", "start", "middle", "end", "sort", "getresults", "storage", "varName2", "debu"],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
  const actionFilename = (this.name ? this.name + ".js" : "[VX]store_server_info.js");
  window.__VX_ACTION_VERSION = actionVersion;
  window.__VX_ACTION_FILENAME = actionFilename;
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">Flapekk</span></div>
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
            --vcstatus-box-left-width: 115px;
            --vcstatus-box-left-height: 58px;
            --vcstatus-author-font-size: 14px;
            --vcstatus-discord-font-size: 14px;
            --vcstatus-author-margin-top: 0px;
            --vcstatus-discord-margin-top: -2px;
            --vcstatus-box-left-offset: 16px;
            --vcstatus-author-margin-left: 2px;
            --vcstatus-discord-margin-left: 10px;
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

      <div style="width: 530px; height: 350px; overflow-y: scroll;">
        <div>
          <div style="padding-top: 8px;">
            <div style="float: left; width: 100%;">
              <span class="dbminputlabel">Data Name</span>
              <input id="dataName" class="round" type="text" placeholder="Enter the data name from players.json">
            </div>
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Show Numbers?</span>
            <select id="numbefstselect" class="round" style="width:100%" onchange="glob.onChange1(this)">
              <option value="1">No</option>
              <option value="2" selected>Yes</option>
            </select>
          </div>
          
          <div id="numbefst" style="width: 100%; padding-top: 8px;">
            <span class="dbminputlabel">Character after number</span>
            <input id="numbefst2" class="round" type="text" value=")" placeholder="e.g. ) or .">
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Start Text</span>
            <input id="start" class="round" type="text" value="<@{user_id}> zdobył aż">
            <div style="font-size: 11px; color: #888;">Use {user_id} for user ID and {result} for data value</div>
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Middle Text</span>
            <input id="middle" class="round" type="text" value="" placeholder="Separator between start and end">
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">End Text</span>
            <input id="end" class="round" type="text" value="{result} punktów!">
            <div style="font-size: 11px; color: #888;">Use {user_id} and {result} as placeholders</div>
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Sort Type</span>
            <select id="sort" class="round" style="width:100%">
              <option value="0" selected>Don't Sort</option>
              <option value="1">Sort Descending (highest first)</option>
              <option value="2">Sort Ascending (lowest first)</option>
            </select>
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Result Limit</span>
            <input id="getresults" class="round" type="text" placeholder="Leave blank for all results">
          </div>
          
          <div style="padding-top: 8px;">
            <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
          </div>
          
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Debug Mode</span>
            <select id="debu" class="round" style="width:100%">
              <option value="0">Show Errors</option>
              <option value="1" selected>Hide Errors</option>
            </select>
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
    
    glob.onChange1 = function(event) {
      const value = parseInt(event.value, 10);
      const numbefstDiv = document.getElementById("numbefst");
      
      if (value === 1) {
        numbefstDiv.style.display = "none";
      } else {
        numbefstDiv.style.display = null;
      }
    };
    
    const selectElement = document.getElementById("numbefstselect");
    if (selectElement) {
      glob.onChange1(selectElement);
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const Bot = this.getDBM().Bot;
    const { msg, interaction } = cache;
    
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const dataName = this.evalMessage(data.dataName, cache);
    const sortType = parseInt(data.sort, 10);
    const debug = parseInt(data.debu, 10);
    const showNumbers = parseInt(data.numbefstselect, 10);
    
    try {
      const Mods = this.getMods();
      const { sort } = Mods.require("fast-sort");
      const { JSONPath } = Mods.require("jsonpath-plus");
      const fs = require("fs");
      const path = require("path");
      
      // Read players.json file
      const filePath = path.join(process.cwd(), 'data', 'players.json');
      let fileContent = fs.readFileSync(filePath, "utf8");
      
      if (!fileContent) {
        if (debug === 0) console.error("players.json is empty or doesn't exist");
        return this.callNextAction(cache);
      }
      
      const jsonData = JSON.parse(fileContent);
      const results = [];
      
      const userPaths = JSONPath({
        path: `$[?(@['${dataName}'] != null)]~`,
        json: jsonData,
      });
      
      for (const userPath of userPaths) {
        try {
          const userId = userPath;
          const userData = JSONPath({
            path: `$['${userId}']['${dataName}']`,
            json: jsonData,
          })[0];
          
          const guild = msg?.guild || interaction?.guild;
          if (guild) {
            const member = guild.members.cache.get(userId);
            if (member) {
              results.push({
                user_id: userId,
                result: userData
              });
            }
          } else {
            results.push({
              user_id: userId,
              result: userData
            });
          }
        } catch (err) {
          if (debug === 0) console.error(`Error processing user ${userPath}:`, err);
        }
      }
      
      let sortedResults = [...results];
      switch (sortType) {
        case 1:
          sortedResults = sort(results).desc(u => parseFloat(u.result) || 0);
          break;
        case 2:
          sortedResults = sort(results).asc(u => parseFloat(u.result) || 0);
          break;
        default:
          break;
      }
      
      let resultLimit = parseInt(this.evalMessage(data.getresults, cache), 10);
      if (!resultLimit || resultLimit <= 0 || resultLimit > sortedResults.length) {
        resultLimit = sortedResults.length;
      }
      
      const finalResults = sortedResults.slice(0, resultLimit);
      const outputList = [];
      
      for (let i = 0; i < finalResults.length; i++) {
        const item = finalResults[i];
        const user_id = item.user_id;
        const result = item.result;
        
        let startText = this.evalMessage(data.start, cache);
        let middleText = this.evalMessage(data.middle, cache);
        let endText = this.evalMessage(data.end, cache);
        
        startText = startText.replace(/{user_id}/g, user_id).replace(/{result}/g, result);
        middleText = middleText.replace(/{user_id}/g, user_id).replace(/{result}/g, result);
        endText = endText.replace(/{user_id}/g, user_id).replace(/{result}/g, result);
        
        let formattedLine = startText + middleText + endText;
        
        if (showNumbers === 2) {
          const numberSuffix = this.evalMessage(data.numbefst2, cache);
          formattedLine = `${i + 1}${numberSuffix} ${formattedLine}`;
        }
        
        outputList.push(formattedLine);
      }
      
      const finalOutput = outputList.join('\n');
      
      this.storeValue(finalOutput, storage, varName2, cache);
      
    } catch (error) {
      if (debug === 0) {
        console.error("Error in Store Member Data List:", error);
      }
    }
    
    this.callNextAction(cache);
  },

  mod() {},
};