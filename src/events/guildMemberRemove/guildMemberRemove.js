const { Client, Interaction, GuildMember } = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 * @param {Interaction} interaction 
 */

module.exports = async (client, member, interaction) => {
  try {
    client.on('guildMemberRemove', (guild) => {
      const channelId = '1266759994192433272'
      let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)

      client.channels.cache.get(counterChannel).setName(`✅ | MemberCounat: ${memberCount}`)

      console.log("Someone left!")

    })


  } catch (error) {
    console.log(error)
  }
}