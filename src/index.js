require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
const express = require('express');
const cors = require('cors');
const { log } = require('./functions');
const usetube = require('usetube');
const { isYtLive } = require('discord-yt-live');
const liveCheck = require('./liveCheck');

const channelId = 'NATSUYT612';

(async () => {
  console.log(await liveCheck(channelId));
})();

const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const app = express();
const axios = require('axios').default;
const Parser = require('rss-parser');
const ytSearch = require('yt-search');

const parser = new Parser();

const client = new ExtendedClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  try {
    res.status(200).json({
      message: 'Client info',
      username: client.user.tag,
      displayName: client.user.displayName,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const APIKey = process.env.YOUTUBE_API_KEY;

const checkAdmin = (req, res, next) => {
  if (
    !req.headers['x-youtube-key'] &&
    req.headers['x-youtube-key'] !== APIKey
  ) {
    return res.status(403).json({
      message: 'Unauthorized: Invalid secret key provided',
    });
  } else {
    next();
  }
};

app.post('/send-yt-announce', (req, res) => {
  try {
    ytSearch({ videoId: req.body.video_url.split('v=')[1] }, (err, result) => {
      if (err) throw err;

      const videoDetails = result.videos[0];
      console.log(videoDetails);

      const embedObj = {
        title: videoDetails.title || "Natsu's video",
        url: req.body.video_url,
        thumbnail: videoDetails.image,
      };

      const link = new ButtonBuilder()
        .setLabel('Link')
        .setStyle(ButtonStyle.Link)
        .setEmoji('<:YouTube:1186995933624401992>')
        .setURL(req.body.video_url || 'https://youtube.com');

      const btnRow = new ActionRowBuilder().addComponents(link);

      const embed = new EmbedBuilder()
        .setTitle(videoDetails.title || "Natsu's video")
        .setURL(req.body.video_url)
        .setImage(videoDetails.image)
        .setAuthor({ name: 'YouTube' });

      client.guilds.cache
        .get('1144642820590805156')
        .channels.cache.get('1187406291157667870')
        .send({
          content: `@everyone **Natsu** has uploaded a new video, go check it out`,
          embeds: [embed],
          components: [btnRow],
        });

      res.status(200).json({ data: embedObj });
    });
  } catch (error) {
    throw error;
  }
});

// const channelId = 'UCYK5OyQZ6-7P_HXhxyHOY8g';

const CHECK_INTERVAL_MS = 0.5 * 60 * 1000; // Check every 1 minute

client.start();

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'Internal Server Error',
    err: err.message,
  });
});

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

app.listen(3000, () => {
  log('Server is listening on PORT 3000', 'info');
});
