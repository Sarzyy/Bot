const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, channelLink, Embed } = require('discord.js')
const User = require('../../models/User')

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    try {
      await interaction.deferReply()
      const amount = interaction.options.getInteger("amount");
      const user = await User.findOne({ userId: interaction.user.id })
      const { channel } = interaction;

      if (!user) {
        return await interaction.editReply("You do not have an account on this server use `/daily`");
      }

      if (amount <= 0 || amount > 150000 || amount > user.balance) {
        return await interaction.editReply(`Invalid amount. Please bet an amount greater than 0, within your balance **${user.balance}** and not over 150,000`)
      }

      const flipMsg = new EmbedBuilder()
      .setTitle('Flipping Coin...')
      .setDescription(":coin:")

      const flipMessage = await interaction.editReply({ embeds: [flipMsg] })

      setTimeout(async () => {
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        const win = result === 'heads' ? amount : -amount;

        user.balance += win;
        await user.save();

        const winEmbed = new EmbedBuilder()
        .setTitle(`You flipped **${result}**`)
        .addFields({
          name: `And you ${win > 0 ? 'Won!!!!!' : 'Lost....'} ${Math.abs(win)} coins!`,
          value: `${win > 0 ? 'You can get more coins because you won!\n If you do `/coinflip`' : 'You can try again with `/coinflip`!'}`,
          inline: true,
        })

        await channel.bulkDelete(1)
        await interaction.channel.send({ embeds: [winEmbed] })
      }, 3000);

    } catch (error) {
      console.log(`Error:  ${error}`)
    }
  },

  name: 'coinflip',
  description: 'Flips a coin for a chance to win coins!',
  options: [
    {
      name: 'amount',
      description: 'The amoutn you want to bet!',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
}