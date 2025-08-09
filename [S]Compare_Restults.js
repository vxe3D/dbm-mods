module.exports = {
  name: 'Compare Results',
  section: '# SHDZ - Utilities',
  meta: {
    version: "3.0.0",
    preciseCheck: false,
    author: "vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
  },
  fields: ['value1Type', 'value1Var', 'value2Type', 'value2Var', 'storage1', 'varName1', 'storage2', 'varName2'],

  subtitle() {
    return 'Compares two results and returns the percentage share of each.';
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

    <div style="width: 100%; overflow: hidden;">
      <div style="float: left; width: 42%; padding-bottom: 8px;">
        <retrieve-from-variable dropdownLabel="Enter the number for 'Yes'" selectId="value1Type" variableContainerId="varNameContainer1" variableInputId="value1Var" selectWidth="100%" variableInputWidth="100%"></retrieve-from-variable>
      </div>
      <div style="float: right; width: 48%; padding-bottom: 8px;">
        <retrieve-from-variable dropdownLabel="Enter the number for 'Against'" selectId="value2Type" variableContainerId="varNameContainer2" variableInputId="value2Var" selectWidth="100%" variableInputWidth="100%"></retrieve-from-variable>
      </div>
    </div>
    <div style="width: 100%; overflow: hidden;">
      <div style="float: left; width: 42%; padding-bottom: 8px;">
        <store-in-variable dropdownLabel="Result % for 'Yes'" selectId="storage1" variableContainerId="varNameContainer3" variableInputId="varName1" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
      </div>
      <div style="float: right; width: 48%; padding-bottom: 8px;">
        <store-in-variable dropdownLabel="Result % for 'Against'" selectId="storage2" variableContainerId="varNameContainer4" variableInputId="varName2" selectWidth="100%" variableInputWidth="100%"></store-in-variable>
      </div>
    </div>
    <div style="clear: both;"></div>
    `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const type1 = parseInt(data.value1Type, 10);
    const varName1 = this.evalMessage(data.value1Var, cache);
    const value1 = Number(this.getVariable(type1, varName1, cache));

    const type2 = parseInt(data.value2Type, 10);
    const varName2 = this.evalMessage(data.value2Var, cache);
    const value2 = Number(this.getVariable(type2, varName2, cache));

    let percent1 = 0;
    let percent2 = 0;
    const total = value1 + value2;
    if (total > 0) {
      percent1 = Math.round((value1 / total) * 10000) / 100;
      percent2 = Math.round((value2 / total) * 10000) / 100;
    }

    const storage1 = parseInt(data.storage1, 10);
    const outVar1 = this.evalMessage(data.varName1, cache);
    this.storeValue(percent1, storage1, outVar1, cache);

    const storage2 = parseInt(data.storage2, 10);
    const outVar2 = this.evalMessage(data.varName2, cache);
    this.storeValue(percent2, storage2, outVar2, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
