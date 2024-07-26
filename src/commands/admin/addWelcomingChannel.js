const {
	ApplicationCommandOptionType,
	Client,
	Interaction,
  PermissionFlagsBits,
} = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		if (!interaction.inGuild()) {
			interaction.reply("You can only run this command inside a server!");
			return;
		}

		const targetChannelId = interaction.options.get("target-channel-id").value;

		try {
			await interaction.deferReply();

			let welcomeChannel = await WelcomeChannel.findOne({ guildId: interaction.guild.id });

			if (welcomeChannel) {
				if (welcomeChannel.channelId === targetChannelId) {
					interaction.editReply(
						"Welcoming channel has already been setup for this guild to disable run: `/autorole-disable`"
					);
					return;
				}

				WelcomeChannel.channelId = targetChannelId;
			} else {
        welcomeChannel = new WelcomeChannel({
          guildId: interaction.guild.id,
          channelId: targetChannelId,
        })
      }

      await welcomeChannel.save();
      interaction.editReply("Welcome channel has now been configured. To disable run `/welcomingchannel-disable`");
		} catch (error) {
			console.log(error);
		}
	},

	name: "welcome-channel-configure",
	description: "Configure your welcome channel for this server!",
	options: [
		{
			name: "target-channel-id",
			description: "The channel you want the welcoming message to send in!",
			type: ApplicationCommandOptionType.String,
			require: true,
		},
	],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
