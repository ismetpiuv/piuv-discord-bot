const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Kullanıcının yasağını kaldırır.')
    .addStringOption(option =>
      option.setName('kullanici')
        .setDescription('Yasağı kaldırılacak kullanıcının ID\'sini girin.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const bannedUserId = interaction.options.getString('kullanici');

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'Bu komutu kullanma izniniz yok.', ephemeral: true });
    }

    try {
      const bannedUsers = await interaction.guild.bans.fetch();
      const bannedUser = bannedUsers.find((user) => user.user.id === bannedUserId);

      if (!bannedUser) {
        return interaction.reply({ content: 'Belirtilen ID ile yasaklanmış bir kullanıcı bulunamadı.', ephemeral: true });
      }

      await interaction.guild.bans.remove(bannedUserId);
      interaction.reply({ content: `${bannedUser.user} adlı kullanıcının yasağı başarıyla kaldırıldı.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Kullanıcının yasağını kaldırırken bir hata oluştu.', ephemeral: true });
    }
  },
};