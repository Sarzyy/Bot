const { Client, Interaction, PermissionFlagsBits, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')
const ms = require('ms');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async(client, interaction) => {
    const mentionable = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value;
    const reason = interaction.options.get('reason')?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply("That user doesn't exist on this server.");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("I can't time out a bot 🤖!")
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply("Please reply a valid timeout duration!")
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days!");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //Highest role of the target user
    const requestUserRolePostion = interaction.member.roles.highest.position; //Highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //Highest role of the bot!

    if (targetUserRolePosition >= requestUserRolePostion) {
      await interaction.editReply("You cannot timeout that user because they have the same / higher role than you."

      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("I cant timeout the user because they have the same/higher role than me."
      );
      return;
    }

    // Timeout the user!
    try {
      const { default: prettyMs } = await import('pretty-ms')

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply(`${targetUser}'s timeout has been updated to: "${prettyMs(msDuration, { verbose: true })}"\nReason: ${reason}`);
        return;
      }
      await targetUser.timeout(msDuration, reason);
      await interaction.editReply(`${targetUser} was timed out for: "${prettyMs(msDuration, { verbose: true })}".\nReason: ${reason}`);

    } catch (error) {
      console.log(`There was an error while trying to timeout a user: ${error}`)
    }
  },

  name: 'timeout',
  description: 'Timeout a user!',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to timeout!',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'duration',
      description: 'The duration of the timeout (30m, 1h, 1day)',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the timeout',
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.Administrator],
}