const { Client, Interaction, ActivityType } = require('discord.js')

module.exports = async (client, member, guild) => {

let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
  client.user.setActivity({
    name: `with ${client.guilds.cache.size} Guild(s)!`,
    type: ActivityType.Playing,
  })


  //I like kids - Drake
  
  console.log("┖-------------------------------------------")
  console.log(`✅ ${client.user.tag} has succesfully logged in and is on ${client.guilds.cache.size} guild(s)`)
  console.log(`✅ Currently playing with ${memberCount} User!!`)
}

