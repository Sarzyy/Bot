const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const User = require('../../models/User')

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command in a guild!")
      return;
    }

    try {
      const targetUser = interaction.options.get('target-user')?.value || interaction.member.id;
      const amount = interaction.options.getInteger("amount")
      const user = await User.findOne({ userId: targetUser })
      const { channel } = interaction;

      if (!user) {
        interaction.channel.send("User does not have an account on this server do `/daily` for you to get `1000 Coins` and get an account on this server!")
      }

      if (amount <= 0 || amount > 1500000 ) {
        return await interaction.channel.send(`Invalid amount. Please use an amount greater than 0 and not over 1500000 coins at once`)
      }

      const addingCoins = new EmbedBuilder()
      .setTitle(`Adding coins to User...`)
      .setDescription("This could take a little!")

      interaction.channel.send({ embeds: [addingCoins] })

      user.balance += amount;
      await user.save();

      await channel.bulkDelete(1)

      const addedCoins = new EmbedBuilder()
      .setTitle("Succesfully added Coins to the User!")
      .setDescription(`You added **${amount}**\n to his/hers balance is ${user.balance}!`)

      interaction.channel.send({ embeds: [addedCoins] })


    } catch (error) {
      console.log(`Error while giving coins: ${error}`)
    }
  },

  name: 'balance-add',
  description: 'Add balance to a user!',

  options: [
    {
      name: 'target-user',
      description: 'The user you want to add Coins',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'amount',
      description: 'The amount you want to add to a user',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
}