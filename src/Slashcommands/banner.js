const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banner")
    .setDescription("Kullanıcının yada sizin bannerınızı gönderir.")
    .addUserOption((option) =>
          option
        .setName("kişi")
        .setDescription("Bannerına bakmak istediğiniz üyeyi belirtiniz.")
    ),
  async execute(interaction, client) {

    const member = interaction.options.getUser('kişi') || interaction.user;
    const fetchUser = await client.users.fetch(member.id);

    async function bannerXd(user, client) {
      const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
      if(!response.data.banner) return `https://media.discordapp.net/attachments/1046065340800585769/1149032562182848572/57A3E2B8-0601-47C3-9BD6-E04F6BE6BFA3.png`
      if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
      else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
    }
    
    let banner = await bannerXd(fetchUser.id, client)
    interaction.reply({content: `> ${ hyperlink(`${fetchUser.username}`, `${banner}`)}`, ephemeral: false })  
  }
};