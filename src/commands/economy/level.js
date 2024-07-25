const {
	Client,
	Interaction,
	ApplicationCommandOptionType,
  AttachmentBuilder,
} = require("discord.js");
const Level = require("../../models/Level");
const canvacord = require('canvacord')
const calculateLevelXp = require('../../utils/calculateLevelXp')

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		if (!interaction.inGuild()) {
			interaction.reply("You can only run this command in a server.");
			return;
		}

		await interaction.deferReply();

		const mentionUserId = interaction.options.get("target-user")?.value;
		const targetUserId = mentionUserId || interaction.member.id;
		const targetUserObj = await interaction.guild.members.fetch(targetUserId);

		const fetchedLevel = await Level.findOne({
			userId: targetUserId,
			guildId: interaction.guild.id,
		});

		if (!fetchedLevel) {
			interaction.editReply(
				mentionUserId
					? `${targetUserObj.user.tag} does not have any levels yet. Try again when they chat a little more!`
					: "You do not have any levels yet. Chat a little more and try again!"
			);
			return;
		}

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
		const { Font } = require('canvacord');
		Font.loadDefault();

    const rank = new canvacord.RankCardBuilder()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setStatus(targetUserObj.presence.status)
      .setUsername(targetUserObj.user.username)
      
			const image = await rank.build({ format: 'png',});
			const attachment = new AttachmentBuilder(image);
			interaction.editReply({ files: [attachment] });			
	},

	name: "level",
	description: "Shows your/someones level.",
	options: [
		{
			name: "target-user",
			description: "The user whose level you want to see.",
			type: ApplicationCommandOptionType.Mentionable,
		},
	],
};
