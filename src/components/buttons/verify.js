const { ButtonInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const VerificationSchema = require('../../schemas/VerificationSchema');

module.exports = {
  customId: 'verify-btn',
  /**
   *
   * @param {ExtendedClient} client
   * @param {ButtonInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      const verificationDoc = await VerificationSchema.findOne({
        guild: interaction.guild.id,
      });

      const user = interaction.user;
      const member = client.guilds.cache
        .get(interaction.guild.id)
        .members.cache.get(user.id);

      if (member.roles.cache.has(verificationDoc.roleId)) {
        await interaction.reply({
          content: 'You are already verified',
          ephemeral: true,
        });
      } else {
        member.roles.add(verificationDoc.roleId);

        await interaction.reply({
          content: 'You are now verified',
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.reply({
        content: `Error: ${error.message}`,
      });
    }
  },
};
