const { Client, Interaction, ActivityType } = require('discord.js')

module.exports = async (client, member, guild) => {

let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)

  client.user.setActivity({
    name: `with ${client.guilds.cache.size} Guild(s)!`,
    type: ActivityType.Playing,
  })

  try {
    const counterChannelCategory = '1266885089812418593';

  const counterChannel = '1266891113575223468';

  await client.channels.cache.get(counterChannelCategory).setName(`📊 | Server Stats | 📊`)
  
  console.log("┖-------------------------------------------")

  console.log("...Updating CounterChannel!")
  await client.channels.cache.get(counterChannel).setName(`✅ Members: ` + memberCount);

  console.log("✅ Succesfully updated CounterChannel!")

  console.log(`✅ ${client.user.tag} has succesfully logged in and is on ${client.guilds.cache.size} guild(s)`)
  console.log(`✅ Currently playing with ${memberCount} User!!`)

  } catch (error) {
    console.log(`Error in ready.js: ${error}`)
  }


}

