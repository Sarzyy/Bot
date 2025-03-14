const { Client, GuildMember, Embed, EmbedBuilder} = require('discord.js')
const AutoRole = require('../../models/AutoRole')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member, interaction) => {
  try {
    let guild = member.guild;
    if (!guild) return;

    const autoRole = await AutoRole.findOne({ guildId: guild.id });
    if (!autoRole) return;


    await member.roles.add(autoRole.roleId);
  } catch (error) {
    console.log(`Error while giving role automatically: ${error}`);
  }
}