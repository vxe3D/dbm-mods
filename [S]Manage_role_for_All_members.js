module.exports = {
  name: '[S] Manage Role for All Members',
  section: '# SHDZ - Moderation',

  subtitle(data) {
    const mode = data.action === 'add' ? 'Dodaj' : 'Usuń';
    return `${mode} rolę ${data.roleId} wszystkim członkom`;
  },

  meta: {
    version: '1.0',
    preciseCheck: true,
    author: 'vxed',
    authorUrl: 'https://github.com/vxe3D/dbm-mods',
  },

  fields: ['roleId', 'action'],

  html() {
    return `
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
