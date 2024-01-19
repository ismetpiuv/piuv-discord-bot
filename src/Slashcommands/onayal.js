const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('onayal')
    .setDescription('Belirtilen üyenin karakter onayını alır.')
    .addUserOption(option =>
      option.setName('kisi')
        .setDescription('Kişiyi belirtin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Karakter onay alınma sebebi.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const kisi = interaction.options.getMember('kisi');
    const sebep = interaction.options.getString('sebep');
    const alanyetkili = interaction.member;

    if (!interaction.member.roles.cache.has(config.karakteronay.onayyetkilisi)) {
      return interaction.reply({ content: `Bu komutu kullanmak için yetkin yok.`, ephemeral: true });
    }

    try {
      await kisi.roles.remove(config.karakteronay.onaypermi);
      await interaction.reply({ content: `Belirtilen kişinin karakter onayı alındı. \n***Kişi: ${kisi}*** \n***Sebep: ${sebep}***`, ephemeral: false });

      const logKanal = interaction.guild.channels.cache.get(config.karakteronay.onaylogkanal);
      if (logKanal) {
        logKanal.send(`***Karakter onayı alınan kişi: ${kisi}*** \n***Karakter onay alınma sebebi: ${sebep}*** \n***Karakter onayı alan yetkili: ${alanyetkili}***`);
      } else {
        console.error(`Karakter onay log kanalı bulunamadı: ${config.karakteronay.onaylogkanal}`);
      }
    } catch (error) {
      console.error('Karakter onay rolü alınırken bir hata oluştu:', error);
      return interaction.reply({ content: `Belirtilen kişinin karakter onayı alınırken bir hata oluştu.`, ephemeral: true });
    }
  },
};
