const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('onayver')
    .setDescription('Belirtilen üyeye karakter onay verir.')
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

    if (!interaction.member.roles.cache.has(config.karakteronay.onayyetkilisi)) {
      return interaction.reply({ content: `Bu komutu kullanmak için yetkin yok.`, ephemeral: true });
    }

    try {
      await kisi.roles.add(config.karakteronay.onaypermi);
      await interaction.reply({ content: `Belirtilen kişiye karakter onay verildi. \n        ***Kişi: ${kisi} Steam Profil: ${steamprofil}***`, ephemeral: false });

      const logKanal = interaction.guild.channels.cache.get(config.karakteronay.onaylogkanal);
      if (logKanal) {
        logKanal.send(`***Karakter onay verilen kişi: ${kisi}*** \n***Steam Profili: ${steamprofil}*** \n***Karakter onay veren yetkili: ${verenyetkili}***`);
      } else {
        console.error(`Karakter onay log kanalı bulunamadı: ${config.karakteronay.onaylogkanal}`);
      }
    } catch (error) {
      console.error('Karakter onay rolü eklenirken bir hata oluştu:', error);
      return interaction.reply({ content: `Belirtilen kişiye karakter onayı verilirken bir hata oluştu.`, ephemeral: true });
    }
  },
};
