const { Client, PermissionFlagsBits, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return;
    }
    
    const { channel, options } = interaction;
    const amount = interaction.options.getInteger("amount")

    if (amount >= '100') {
      interaction.reply("Cannot clear over 100 messages!")
      return;
    }
    


    console.log(typeof amount)

    const res = new EmbedBuilder()
    .setTitle('--/clear--')
    .setAuthor({
      name: interaction.member.user.username,
      url: interaction.member.avatarURL(),
    })
    .setColor("Green")
    .setDescription(`Succesfully cleared **${amount}** messages!`)


    await channel.bulkDelete(amount)

    await interaction.channel.send({ embeds: [res] });
  },

  name: 'clear',
  description: 'Clear messages',
  permissionsRequired: [PermissionFlagsBits.Administrator],
  options: [
    {
      name: 'amount',
      description: 'How much you want to clear',
      required: true,
      type: ApplicationCommandOptionType.Integer,
    }
  ]
}