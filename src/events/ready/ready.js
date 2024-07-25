const { Client, Interaction, ActivityType } = require('discord.js')
const localCommands = require('../interactionCreate/handleCommands')

module.exports = async (client, member, guild) => {

let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
  client.user.setActivity({
    name: `on ${client.guilds.cache.size} Guild(s)!`,
    type: ActivityType.Playing,
  })

  console.log(`✅ ${client.user.tag} has succesfully logged in and is on ${client.guilds.cache.size} guild(s)`)
  console.log(localCommands)
}

