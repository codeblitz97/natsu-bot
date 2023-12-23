const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const VerificationModel = require('../../../schemas/VerificationSchema');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Execute some codes.')
    .addSubcommand((op) =>
      op.setName('rules').setDescription('Set rules for the server')
    )
    .addSubcommand((op) =>
      op
        .setName('verification')
        .setDescription('Set the server verification')
        .addRoleOption((ro) =>
          ro
            .setName('verify-role')
            .setDescription('The verified role')
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  options: {
    developers: false,
  },
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction<true>} interaction
   */
  run: async (client, interaction, args) => {
    if (interaction.options.getSubcommand() === 'rules') {
      await interaction.reply({ content: 'Sent rules', ephemeral: true });
      const rulesPanel = new EmbedBuilder()
        .setTitle('Rules for Natsu Gaming')
        .setDescription(
          'Rules are set dynamically, please choose the rules from the select menu below'
        )
        .setColor(Colors.DarkGreen)
        .setFooter({ text: `${interaction.guild.name}` })
        .setTimestamp();

      const rulesSelectMenu = new StringSelectMenuBuilder()
        .setCustomId('rules-select')
        .setPlaceholder('Choose a category')
        .setOptions(
          {
            label: 'Discord',
            emoji: '<:discord_natsu:1187357194321149962>',
            value: 'discord_rules',
          },
          {
            label: 'YouTube',
            emoji: '<:YouTube:1186995933624401992>',
            value: 'youtube_rules',
          }
        );

      const rulesRow = new ActionRowBuilder().addComponents(rulesSelectMenu);

      const rulesChannel = interaction.guild.channels.cache.get(
        '1182347821400207400'
      );
      await rulesChannel.send({ embeds: [rulesPanel], components: [rulesRow] });
    } else if (interaction.options.getSubcommand() === 'verification') {
      const role = interaction.options.getRole('verify-role');

      const roleId = role.id;

      const roleIdSchema = new VerificationModel({
        guild: interaction.guild.id,
        roleId,
      });

      await roleIdSchema.save();

      const verificationButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji('✅')
        .setCustomId('verify-btn')
        .setLabel('Verify');

      const verificationEmbed = new EmbedBuilder()
        .setTitle('Verify yourself')
        .setDescription(
          `In order to get access to the full content, you need to verify. Click the button below to get <@&${
            (await VerificationModel.findOne({ guild: interaction.guild.id }))
              .roleId
          }>`
        )
        .setFooter({ text: interaction.guild.name })
        .setTimestamp();

      const btnRow = new ActionRowBuilder().addComponents(verificationButton);

      interaction.guild.channels.cache
        .get('1187402274977357957')
        .send({ embeds: [verificationEmbed], components: [btnRow] });

      await interaction.reply({
        content: 'Sent verification panel',
        ephemeral: true,
      });
    }
  },
};
