const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioResource, createAudioPlayer } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const {
  VoiceConnectionStatus,
  AudioPlayerStatus,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Le da play locura no es muy difícil")
    .addStringOption((option) =>
      option.setName("song").setDescription("Pone el nombre de la SONG")
    ),
  async execute(message) {
    const voiceChannel = message.member.voice.channel;

    const song = message.options.getString("song");

    if (!voiceChannel)
      return message.channel.send(
        "Tenés que estar en un canal de voz PELOTUDO"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send("Sos Tarado?? Te faltan pemisos");
    if (!permissions.has("SPEAK"))
      return message.channel.send("Sos Tarado?? Te faltan pemisos");
    console.log(song);
    if (!song.length)
      return message.channel.send("Boludito te falta la canción");

    // const connection = await voiceChannel.join();

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = connection.subscribe(player);

    connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
      console.log("Connection is in the Ready state!");
    });

    player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
      console.log("Audio player is in the Playing state!");
    });

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(song);

    if (video) {
      const stream = ytdl(video.url, { filter: "audioonly" });
      const resource = createAudioResource(stream);

      player.play(resource);
      await message.reply(`:thumbsup: Now Playing ***${video.title}***`);
    } else {
      message.channel.send("no video results found");
    }
  },
};
