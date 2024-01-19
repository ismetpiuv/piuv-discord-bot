const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wlver')
    .setDescription('Belirtilen üyeye whitelist verir.')
    .addUserOption(option =>
      option.setName('kisi')
        .setDescription('Kişiyi belirtin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('steamprofil')
        .setDescription('Kişinin steam profilini belirtin.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const kisi = interaction.options.getMember('kisi');
    const verenyetkili = interaction.member;
    const steamprofil = interaction.options.getString('steamprofil');

    if (!interaction.member.roles.cache.has(config.whitelist.wlyetkilisi)) {
      return interaction.reply({ content: `Bu komutu kullanmak için yetkin yok.`, ephemeral: true });
    }

    try {
      await kisi.roles.add(config.whitelist.wlpermi);
      await interaction.reply({ content: `Belirtilen kişiye whitelist verildi. \n        ***Kişi: ${kisi} Steam Profil: ${steamprofil}***`, ephemeral: false });

      const logKanal = interaction.guild.channels.cache.get(config.whitelist.wllogkanal);
      if (logKanal) {
        logKanal.send(`***Whitelist verilen kişi: ${kisi}*** \n***Steam Profili: ${steamprofil}*** \n***Whitelist veren yetkili: ${verenyetkili}***`);
      } else {
        console.error(`Whitelist log kanalı bulunamadı: ${config.whitelist.wllogkanal}`);
      }
    } catch (error) {
      console.error('Whitelist rolü eklenirken bir hata oluştu:', error);
      return interaction.reply({ content: `Belirtilen kişiye whitelist verilirken bir hata oluştu.`, ephemeral: true });
    }
  },
};
