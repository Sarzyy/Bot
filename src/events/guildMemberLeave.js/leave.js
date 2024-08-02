const { Client, GuildMember, Embed, EmbedBuilder, Interaction } = require('discord.js')
const WelcomeChannel = require('./../../models/WelcomeChannel')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 * @param {Interaction} interaction
 */
module.exports = async (guild, member, client) => {
  try {
    client.on("guildMemberRemove", (member) => {
      console.log(member + `akdhf`)
  })

  client.on("guildMemberAdd", (member) => {
    console.log("ahahaahah")
  })

  } catch (error) {
    console.log(error)
  }

}