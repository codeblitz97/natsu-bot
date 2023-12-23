const cheerio = require('cheerio');
const needle = require('needle');

module.exports = async function checklive(channelID) {
  let url = `https://www.youtube.com/${channelID}`;

  const response = {
    live: false,
    title: '',
    url: '',
    thumbnail: '',
  };
  try {
    let res = await needle('get', encodeURI(url), { follow_max: 3 });

    let $ = cheerio.load(res.body);
    response.url = `https://www.youtube.com/${$('#thumbnail').attr('href')}`;
    response.title = $('yt-formatted-string#video-title').text().trim();
    response.live = $('span#text').text().trim().toLowerCase() === 'live';
    response.thumbnail = $('#thumbnail > yt-image > img').attr('src');
    return response;
  } catch (error) {
    console.log(error);
  }
};
