module.exports = {
  name: '[S] Manage Role for All Members',
  section: '# VX - Moderation',

  subtitle(data) {
    const mode = data.action === 'add' ? 'Dodaj' : 'Usuń';
    return `${mode} rolę ${data.roleId} wszystkim członkom`;
  },

  meta: {
    version: '3.2.0',
    actionVersion: "3.1.0",
    preciseCheck: true,
    author: 'vxed',
    authorUrl: 'https://github.com/vxe3D/dbm-mods',
  },

  fields: ['roleId', 'action'],

  html() {
    return `
      <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
        <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
        <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
      </div>
      <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
        <span class="vcstatus-version">v3.1.0</span>
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
        .vcstatus-box-fixed {position:fixed;top:2px;z-index:9999;padding:5px 8px;border-radius:10px;font-size:14px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.10);border:1px solid #23272a;background:linear-gradient(90deg,#23243a 0%,#3a3b5a 100%);color:#fff;min-width:120px;max-width:320px;display:flex;flex-direction:column;margin-top:5px;align-items:flex-start;gap:4px;}
        .vcstatus-box-right {right:18px;justify-content:center;color:#ff4d4d;align-items:center;flex-direction:row;width:var(--vcstatus-box-width);min-width:var(--vcstatus-box-width);max-width:var(--vcstatus-box-width);padding:0;flex-shrink:0;font-size:16px;height:var(--vcstatus-box-height);margin-top:-0.5px;box-sizing:border-box;overflow:hidden;}
        .vcstatus-version {color:#9040d1ff;font-weight:bold;font-size:18px;margin:0;padding:0;line-height:1;letter-spacing:0;white-space:nowrap;min-width:0;max-width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;}
        .vcstatus-box-left {left:var(--vcstatus-box-left-offset);width:var(--vcstatus-box-left-width);min-width:var(--vcstatus-box-left-width);max-width:var(--vcstatus-box-left-width);height:var(--vcstatus-box-left-height);}
        .vcstatus-author {color:#ff4d4d;font-weight:bold;font-size:var(--vcstatus-author-font-size);margin-bottom:2px;margin-top:var(--vcstatus-author-margin-top);margin-left:var(--vcstatus-author-margin-left);}
        .vcstatus-discord {color:#5865F2;background:#23272a;border-radius:5px;padding:2px 10px;text-decoration:none;font-weight:bold;font-size:var(--vcstatus-discord-font-size);margin-top:var(--vcstatus-discord-margin-top);margin-left:var(--vcstatus-discord-margin-left);transition:background 0.2s,color 0.2s;box-shadow:0 1px 4px rgba(88,101,242,0.08);}
        .vcstatus-discord:hover {background:#5865F2;color:#fff;text-decoration:underline;}
        .vcstatus-warning {background:linear-gradient(90deg,#4a3252ff 0%,#885697ff 100%);border:1px solid #140e16ff;color:#222;padding:10px 14px;border-radius:8px;margin-bottom:16px;font-size:13px;box-shadow:0 2px 8px rgba(255,85,85,0.08);margin-top:5px;}
        .dbminputlabel {color:#8754ffff;font-weight:bold;}
        input.round {border-radius:6px;border:1px solid #aaa;padding:6px 10px;font-size:14px;background:#21232B;transition:border-color 0.2s;}
        input.round:focus {border-color:#b595ffff;outline:none;}
      </style>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">ID roli</span>
  <input id="roleId" class="round" type="text" placeholder="np. 123456789012345678" style="width: 100%;">
</div>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">Akcja</span>
  <select id="action" class="round" style="width: 100%;">
    <option value="add" selected>➕ Dodaj rolę (wszystkim oprócz botów)</option>
    <option value="remove">➖ Usuń rolę (tylko tym, którzy ją mają)</option>
  </select>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const roleId = this.evalMessage(data.roleId, cache);
    const action = data.action;

    const guild = cache.server;
    if (!guild) return this.callNextAction(cache);

    try {
      // Pobieramy wszystkich członków
      const members = await guild.members.fetch();

      let count = 0;

      for (const member of members.values()) {
        const hasRole = member.roles.cache.has(roleId);
        const isBot = member.user.bot;

        if (action === 'add' && !hasRole && !isBot) {
          await member.roles.add(roleId).catch(() => {});
          count++;
        }

        if (action === 'remove' && hasRole) {
          await member.roles.remove(roleId).catch(() => {});
          count++;
        }
      }

      console.log(`[S] Rola ${action === 'add' ? 'dodana' : 'usunięta'} ${count} użytkownikom.`);
    } catch (err) {
      console.error('[S] Błąd podczas zarządzania rolami:', err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
