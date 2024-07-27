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

		const targetChannel = interaction.options.getChannel("target-channel");

		try {

			let welcomeChannel = await WelcomeChannel.findOne({ guildId: interaction.guild.id });

			if (welcomeChannel) {
				if (welcomeChannel.channelId === targetChannel) {
					interaction.reply(
						"Welcoming channel has already been setup for this guild to disable run: `/welcomechannel-disable`"
					);
					return;
				}

				WelcomeChannel.channelId = targetChannel;
			} else {
        welcomeChannel = new WelcomeChannel({
          guildId: interaction.guild.id,
          channelId: targetChannel.id,
        })
      }

      await welcomeChannel.save();
      interaction.reply("Welcome channel has now been configured. To disable run `/welcomechannel-disable`");
		} catch (error) {
			console.log(error);
		}
	},

	name: "welcome-channel-configure",
	description: "Configure your welcome channel for this server!",
	options: [
		{
			name: "target-channel",
			description: "The channel you want the welcoming message to send in!",
			type: ApplicationCommandOptionType.Channel,
			require: true,
		},
	],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
