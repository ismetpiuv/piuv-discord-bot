const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wlal')
    .setDescription('Belirtilen üyenin whitelistini alır.')
    .addUserOption(option =>
      option.setName('kisi')
        .setDescription('Kişiyi belirtin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Whitelist alınma sebebi.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const kisi = interaction.options.getMember('kisi');
    const sebep = interaction.options.getString('sebep');
    const alanyetkili = interaction.member;

    if (!interaction.member.roles.cache.has(config.whitelist.wlyetkilisi)) {
      return interaction.reply({ content: `Bu komutu kullanmak için yetkin yok.`, ephemeral: true });
    }

    try {
      await kisi.roles.remove(config.whitelist.wlpermi);
      await interaction.reply({ content: `Belirtilen kişinin whitelisti alındı. \n***Kişi: ${kisi}*** \n***Sebep: ${sebep}***`, ephemeral: false });

      const logKanal = interaction.guild.channels.cache.get(config.whitelist.wllogkanal);
      if (logKanal) {
        logKanal.send(`***Whitelisti alınan kişi: ${kisi}*** \n***Whitelist alınma sebebi: ${sebep}*** \n***Whitelisti alan yetkili: ${alanyetkili}***`);
      } else {
        console.error(`Whitelist log kanalı bulunamadı: ${config.whitelist.wllogkanal}`);
      }
    } catch (error) {
      console.error('Whitelist rolü alınırken bir hata oluştu:', error);
      return interaction.reply({ content: `Belirtilen kişinin whitelisti alınırken bir hata oluştu.`, ephemeral: true });
    }
  },
};
