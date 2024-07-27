const { ButtonBuilder } = require("discord-gamecord/utils/utils");
const {
	Client,
	Interaction,
	ActionRowBuilder,
	ButtonStyle,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */

	callback: async (client, interaction) => {
		try {
      const roleId = interaction.options.get("target-role").value

			const roles = [
				{
					id: roleId.id,
					label: "Verify!",
				},
			];

			const row = new ActionRowBuilder();

			roles.forEach((role) => {
				row.components.push(
					new ButtonBuilder()
						.setCustomId(roleId)
						.setLabel(role.label)
						.setStyle(ButtonStyle.Danger)
				);
			});

      const embed = new EmbedBuilder()
      .setTitle("**Server-Regeln**")
      .setColor("Red")
      .setImage('https://pbs.twimg.com/media/EMWnOMsUEAgo4vb.jpg:large')
      .addFields({
        name: '**Regel 1**',
        value: 'Verbale Gewalt, Provokationen und Spam gegenüber anderen Mitgliedern sind untersagt. Toxisches Verhalten wird ebenfalls nicht geduldet.',
      }, {
        name: '**Regel 2**',
        value: 'Rassistische und ethisch inakzeptable Inhalte sind untersagt!',
      }, {
        name: '**Regel 3**',
        value: 'Werbung (zum Beispiel für andere Server) bitte immer vorher per DM mit uns abklären.'
      }, {
        name: '**Regel 4**',
        value: 'Medien/Nicknames/Avatare dürfen keine pornografischen oder andere gegen das deutsche Recht verstoßende Inhalte enthalten.'
      }, {
        name: '**Regel 5**',
        value: 'Es dürfen weder Bilder einer Person, noch die Adresse oder andere private Daten, ohne ihre Einverständnis, geleakt werden. Dies ist auch über DM verboten..'
      }, {
        name: '**Regel 6**',
        value: 'Anweisungen der Admins sind ohne Widerspruch Folge zu leisten.'
      }, {
        name: '**Regel 7**',
        value: 'Das Aufnehmen von Gesprächen im Voice-Channel ist ohne Zustimmung verboten.'
      }, {
        name: '**Anmerkung**',
        value: 'Unwissenheit schützt nicht vor Strafe. Wir versuchen, den Server weitestgehend demokratisch zu halten. Bei schwerwiegenden Angelegenheiten werden die Admins und Owner jedoch selbst entscheiden.'
      })

      interaction.channel.send({embeds: [embed], components: [row]})

      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);

        if (!role) {
          interaction.editReply({
            content: 'I could not find that role',
          })
          return;
        }

        const hasRole = interaction.member.roles.cache.has(roleId)

        if(hasRole) {
          await interaction.member.roles.remove(roleId);
          await interaction.editReply(`The role ${roleId} has been removed!`)
        }

        await interaction.member.roles.add(roleId)
        await interaction.editReply(`The role @${roleId} has been added!`)
      })

		} catch (error) {
			console.log(error);
		}
	},

	name: "load-rules",
	description: "Loads the rules with buttons!",
  options: [
    {
      name: 'target-role',
      description: 'The  role you want to give the player when clicking verify!',
      type: ApplicationCommandOptionType.Role,
      required: true,
    }
  ]
};
