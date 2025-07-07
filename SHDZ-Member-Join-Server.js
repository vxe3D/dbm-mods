const { Events } = require('discord.js');

module.exports = {
  name: '# SHDZ - Member Join Server',
  isEvent: true,

  fields: ['GuildMember Variable Name:', 'Invite Code Variable Name:'],

  mod(DBM) {
    DBM.Events = DBM.Events || {};
    const { Bot, Actions } = DBM;

    const invitesCache = new Map();

    async function fetchInvites(guild) {
      try {
        const invites = await guild.invites.fetch();
        invitesCache.set(guild.id, invites);
        return invites;
      } catch (err) {
        console.warn(`[INVITES] Błąd podczas pobierania zaproszeń dla: ${guild.name}`);
        console.error(err);
        return null;
      }
    }

    async function handleGuildMemberAdd(member) {
      const guild = member.guild;

      const oldInvites = invitesCache.get(guild.id);
      const newInvites = await fetchInvites(guild);

      let usedCode = 'unknown';

      if (oldInvites && newInvites) {
        const usedInvite = newInvites.find(i => {
          const old = oldInvites.get(i.code);
          return old && i.uses > old.uses;
        });

        if (usedInvite) {
          usedCode = usedInvite.code;
        }
      }

      // Obsługa vanity URL jeśli zwykłe zaproszenie nie zostało wykryte
      if (usedCode === 'unknown' && guild.vanityURLCode) {
        try {
          const vanity = await guild.fetchVanityData();
          if (vanity && vanity.uses > 0) {
            usedCode = vanity.code;
          }
        } catch (err) {
          console.warn(`[VANITY] Błąd podczas pobierania vanity URL dla: ${guild.name}`);
          console.error(err);
        }
      }

      const events = Bot.$evts['# SHDZ - Member Join Server'];
      if (!events || !events.length) {
      }

      for (const event of events || []) {
        const temp = {};
        if (event.temp) temp[event.temp] = member;
        // Domyślna nazwa zmiennej invite, jeśli nie ustawiono w polach
        const inviteVarName = event.temp2 || 'invite';
        temp[inviteVarName] = usedCode;
        Actions.invokeEvent(event, guild, temp);
      }
    }

    const onReadyOriginal = Bot.onReady;
    Bot.onReady = async function (...params) {

      if (Bot.bot.guilds.cache.size) {
        for (const [_, guild] of Bot.bot.guilds.cache) {
          await fetchInvites(guild);
        }
      } else {
        console.warn('[BOT] Bot nie jest połączony z żadnymi serwerami.');
      }

      Bot.bot.on(Events.GuildMemberAdd, handleGuildMemberAdd);

      return onReadyOriginal.apply(this, params);
    };
  },
};
