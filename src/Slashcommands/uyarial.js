const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uyarıal')
    .setDescription('Belirtilen üyenin uyarısını alır.')
    .addUserOption(option =>
      option.setName('kisi')
        .setDescription('Kişiyi belirtin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('kacinciuyari')
        .setDescription('Kaçıncı uyarının alınacağını giriniz. 1/2/3')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Sebebi girin.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const kisi = interaction.options.getMember('kisi');
    const sebep = interaction.options.getString('sebep');
    const kacinciuyari = interaction.options.getString('kacinciuyari');
    const verenyetkili = interaction.member;

    if (!interaction.member.roles.cache.has(config.yetkili)) {
      return interaction.reply({ content: `Bu komutu kullanmak için yetkin yok.`, ephemeral: true });
    }

    try {
      if (kacinciuyari == 1) {
        interaction.reply({ content: `${kisi} İsimli kişinin 3. uyarısı ${sebep} sebebiyle alındı.`, ephemeral: false });
        kisi.roles.remove(config.uyari.uyari1);
      }
      if (kacinciuyari == 2) {
        interaction.reply({ content: `${kisi} İsimli kişinin 3. uyarısı ${sebep} sebebiyle alındı.`, ephemeral: false });
        kisi.roles.remove(config.uyari.uyari2);
      }
      if (kacinciuyari == 3) {
        interaction.reply({ content: `${kisi} İsimli kişinin 3. uyarısı ${sebep} sebebiyle alındı.`, ephemeral: false });
        kisi.roles.remove(config.uyari.uyari3);
      }

      const logKanal = interaction.guild.channels.cache.get(config.uyari.uyarilogkanal);
      if (logKanal) {
        logKanal.send(`***Uyarısı alınan kişi: ${kisi}\nUyarı Sebebi: ${sebep}\nUyarısını alan yetkili: ${verenyetkili}***`);
      } else {
        console.error(`Uyarı log kanalı bulunamadı: ${config.uyari.uyarilogkanal}`);
      }
    } catch (error) {
      console.error('Uyarı rolü alınırken bir hata oluştu:', error);
      return interaction.reply({ content: `Belirtilen kişiden uyarı alınırken bir hata oluştu.`, ephemeral: true });
    }
  },
};
