let cooldowns = {};
const config = require("../configs/settings.json");

module.exports = {
  conf: {
    aliases: [],
    name: "kayıt",
    help: "kayıt",
  },

  run: async (client, message, args, embed, prefix) => {
    const beklemesuresi = 30000; // 30 saniye
    const now = Date.now();
    let kisibeklemesuresi = cooldowns[message.author.id];

    if (!kisibeklemesuresi || now - kisibeklemesuresi > beklemesuresi) {
      await message.channel.send(`<@${message.author.id}> Kayıt talebinde bulundu. <@&${config.yetkili}>`);

      cooldowns[message.author.id] = now;
    } else {
      const kalanzaman = (kisibeklemesuresi + beklemesuresi - now) / 1000;
      const yuvarlananzaman = Math.round(kalanzaman);
      message.reply(`Bu komutu tekrar kullanabilmek için **${yuvarlananzaman}** saniye daha beklemelisin!`);
    }
  },
};
