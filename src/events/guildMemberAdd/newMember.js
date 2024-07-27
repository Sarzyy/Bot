const { Client, GuildMember, Embed, EmbedBuilder, Interaction } = require('discord.js')
const WelcomeChannel = require('./../../models/WelcomeChannel')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 * @param {Interaction} interaction
 */
module.exports = async (client, member, interaction) => {
  try {

    const guild = member.guild;
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



    client.channels.cache.get('1266761513222275147').setName(`✅ | MemberCount: ${guild.memberCount}`)

    let welcomeChannel = await WelcomeChannel.findOne({ guildId: member.guild.id });


    if (!welcomeChannel) {
      return;
    }


    member.guild.channels.cache.get(welcomeChannel.channelId).send({ embeds: [welcome] })
    

  } catch (error) {
    console.log(error);
  }
}