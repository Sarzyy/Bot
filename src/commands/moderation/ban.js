const {
	Client,
	Interaction,
	ApplicationCommandOptionType,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */

	callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason').value;

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesnt exist in this server!.")
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You cannot ban that user because they are the server owner!!")
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //Highest role of the target user
    const requestUserRolePostion = interaction.member.roles.highest.position; //Highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //Highest role of the bot!

    if (targetUserRolePosition >= requestUserRolePostion) {
      await interaction.editReply("You cannot ban that user because they have the same / higher role than you.");
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("I cant ban the user because they have the same/higher role than me.");
      return;
    }

    // Ban the targetUser
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(`User "${targetUser} was banned\nReason: "${reason}"`)
    } catch (error) {
      console.log(`There was an error when banning the user: "${targetUser}", The error: ${error}`)
    }
  },

	name: "ban",
	description: "Bans a member from this server",
	options: [
		{
			name: "target-user",
			description: "User to ban from the server!",
			type: ApplicationCommandOptionType.Mentionable,
			required: true,
		},
		{
			name: "reason",
			description: "The reason for the ban",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissions: [PermissionFlagsBits.Administrator],
};
