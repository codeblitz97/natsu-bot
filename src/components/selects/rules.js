const {
  StringSelectMenuInteraction,
  EmbedBuilder,
  Colors,
} = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
  customId: 'rules-select',
  /**
   *
   * @param {ExtendedClient} client
   * @param {StringSelectMenuInteraction} interaction
   */
  run: async (client, interaction) => {
    const serverRulesDesc = `
1. **Respect Everyone**:
    - Treat others with kindness and respect.
    - No hate speech, discrimination, or harassment will be tolerated.
    
2. **No Spamming**:
    - Avoid excessive posting of messages, emojis, or images.
    - No advertising or self-promotion without permission from the moderators.
    
3. **Keep it Safe and SFW (Safe For Work)**:
    - No explicit or NSFW (Not Safe For Work) content allowed.
    - Keep discussions and media appropriate for all ages.
    
4. **Stay On Topic**:
    - Keep discussions relevant to the designated channels.
    - Avoid derailing conversations with unrelated content.
    
5. **No Trolling or Flaming**:
    - Do not intentionally provoke or antagonize others.
    - Respect different opinions and engage in constructive discussions.
    
6. **Use Appropriate Channels**:
    - Post content in the appropriate channels as per the server's structure.
    - Avoid off-topic discussions in channels with specific themes.
    
7. **No Spamming Bot Commands**:
    - Do not spam commands or misuse bots.
    
8. **No Impersonation**:
    - Do not impersonate other users, staff, or celebrities.
    - Use a recognizable and appropriate username.
    
9. **Respect Staff Decisions**:
    - Follow instructions from server moderators and administrators.
    - If you have concerns, address them through appropriate channels.
    
10. **No Doxing or Personal Information**:
    - Do not share or request personal information about others.
    - Keep private matters out of public discussions.
    
11. **English and Hindi Only**:
    - Use English or Hindi for communication to ensure understanding by all members.
    
12. **No Illegal Content**:
    - Do not share or promote illegal content, including links or downloads.
    
13. **Listen to Music in Designated Channels**:
    - Use designated music channels <#1182686354245685368> for playing music bots to avoid disrupting conversations.
    
14. **Reporting Violations**:
    - Report any rule violations to the moderators through direct messages or in <#1187106776739479673>.
    
15. **Have Fun!**
    - Remember that the primary goal is to have a positive and enjoyable experience for everyone.
`;

    const liveStreamRules = `
1. **Be Respectful:**
    - Treat others with kindness and respect.
    - Avoid hate speech, discrimination, or personal attacks.
        
2. **No Spamming:**
    - Refrain from excessive posting of messages or repetitive content.
    - Avoid using all caps excessively.
        
3. **Stay on Topic:**
    - Keep discussions relevant to the stream's content.
    - Avoid derailing conversations with unrelated topics.
        
4. **No Self-Promotion:**
    - Avoid promoting personal channels, products, or services without permission.
    - Don't share external links without approval.
        
5. **Mindful Language:**
    - Keep language clean and appropriate.
    - Avoid excessive profanity.
        
6. **No Trolling or Bullying:**
    - Do not engage in trolling, bullying, or harassment.
    - Report any instances of inappropriate behavior to moderators.
        
7. **Respect the Moderators:**
    - Follow the instructions of the moderators.
    - Avoid arguing with or harassing moderators.
        
8. **No Spoilers:**
    - Avoid sharing spoilers for games, movies, or other content discussed in the stream.
    - Be mindful of others who may not have experienced the content yet.
        
9. **Privacy Matters:**
    - Do not share personal information, including your own or others'.
    - Respect the privacy of the streamer and other viewers.
        
10. **No Graphic or Offensive Content:**
    - Refrain from posting or discussing graphic, violent, or offensive content.
    - Report any inappropriate content to moderators.
        
11. **Be Patient:**
    - Understand that the streamer and moderators may not catch every message immediately.
    - Be patient and considerate.
        
12. **Follow YouTube's Community Guidelines:**
    - Abide by YouTube's community guidelines and terms of service.
    - Any violations may result in consequences, including removal from the stream or channel.`;

    const value = interaction.values[0];
    let rulesEmbed = new EmbedBuilder()
      .setTitle('Rules')
      .setFooter({ text: `${interaction.guild.name}` })
      .setTimestamp();

    if (value === 'discord_rules') {
      rulesEmbed = rulesEmbed
        .setColor(Colors.Navy)
        .setAuthor({ name: 'Discord' })
        .setDescription(serverRulesDesc);

      await interaction.reply({ embeds: [rulesEmbed], ephemeral: true });
    } else {
      rulesEmbed = rulesEmbed
        .setColor(Colors.Red)
        .setAuthor({ name: 'YouTube' })
        .setDescription(liveStreamRules);
      await interaction.reply({ embeds: [rulesEmbed], ephemeral: true });
    }
  },
};
