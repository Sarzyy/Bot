const { Client, GuildMember, Embed, EmbedBuilder} = require('discord.js')
const WelcomeChannel = require('./../../models/WelcomeChannel')

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

    let welcomeChannel = await WelcomeChannel.findOne({ guildId: interaction.guild.id });


    member.guild.channels.cache.get(welcomeChannel).send({ embeds: [welcome] })

  } catch (error) {
    console.log(`Error while Welcoming a player: ${error}`);
  }
}