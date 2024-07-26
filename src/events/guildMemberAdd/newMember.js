const { Client, GuildMember, Embed, EmbedBuilder} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member, interaction) => {
  try {
    let guild = member.guild;
    const message = interaction;
    if (!guild) return;

    const welcome = new EmbedBuilder()
    .setTitle(`--Welcome to ${guild.name}!--`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("Green")
    .addFields([
      {
        name: `There are now **${guild.memberCount}**`,
        value: '**user on this guild!!!**'
      },
      {
        name: `@${member.user.tag} has joined the Server!!`,
        value: `We hope you have a\n nice time on **${guild.name}**`,
        inline: true,
      },
      {
        name: 'Read the rules for further information!',
        value: 'If you verify you can join our giveaways etc.',
        inline: true,
      }
    ])


    member.guild.channels.cache.get('1253720465189507168').send({ embeds: [welcome] })

  } catch (error) {
    console.log(`Error while Welcoming a player: ${error}`);
  }
}