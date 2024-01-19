const client = global.bot;
const config = require("../configs/settings.json");

module.exports = async () => {
  console.log(
    `Bot "${client.user.tag}" ismiyle aktif edildi!`
  );
  console.log("Bu bot ismetpiuv tarafından geliştirilmiştir.");
  client.user.setActivity({ name: config.oyunetkyazi, type: config.oyunetktur })

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  });
});
};

module.exports.conf = {
  name: "ready",
};
