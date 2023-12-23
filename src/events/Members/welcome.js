const { Events, GuildMember, AttachmentBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const Canvas = require('discord-canvas');

module.exports = {
  event: Events.GuildMemberAdd,

  /**
   * @param {ExtendedClient} client
   * @param {GuildMember} member
   */
  run: async (client, member) => {
    const guildId = '1187402287149236335';
    const memberCount = client.guilds.cache.get(guildId).memberCount;

    const formattedMemberCount = memberCount.toString().padStart(4, '0');

    const welcomeCanvas = await new Canvas.Welcome()
      .setUsername(member.user.displayName)
      .setAvatar(member.user.displayAvatarURL({ extension: 'png' }))
      .setColor('border', '#8015EA')
      .setColor('username-box', '#8015EA')
      .setColor('discriminator-box', '#8015EA')
      .setColor('message-box', '#8015EA')
      .setColor('title', '#8015EA')
      .setColor('avatar', '#8015EA')
      .setGuildName('Natsu Gaming')
      .setBackground(
        'https://i.pinimg.com/originals/51/36/3d/51363dfb06b23f636cb210ddc866099d.png'
      )
      .setMemberCount(memberCount)
      .setDiscriminator(formattedMemberCount)
      .toAttachment();

    const channel = client.channels.cache.get('1144642821513543714');
    channel.send({ files: [new AttachmentBuilder(welcomeCanvas.toBuffer())] });
  },
};
