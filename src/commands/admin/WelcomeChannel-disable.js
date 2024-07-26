const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const WelcomeChannel = require('../../models/WelcomeChannel');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      if (!(await WelcomeChannel.exists({ guildId: interaction.guild.id }))) {
        interaction.editReply('Weclome channel has not been configured for this server. Use `/welcome-channel-configure ` to set it up.');
        return;
      }

      await WelcomeChannel.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.editReply('Welcome channel has been disabled for this server. Use `/welcome-channel-configure ` to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'welcome-channel-disable',
  description: 'Disable the welcome channel in this server.',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};