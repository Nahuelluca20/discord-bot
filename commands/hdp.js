const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioResource, createAudioPlayer } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hijadeputa2")
    .setDescription("HIJA DE PUTAAAAA"),
  async execute(message) {
    const voiceChannel = message.member.voice.channel;

    const audio = "https://www.youtube.com/watch?v=PtcIzif85Xo";

    if (!voiceChannel)
      return message.channel.send(
        "Tenés que estar en un canal de voz PELOTUDO"
      );

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = connection.subscribe(player);

    if (audio) {
      const stream = ytdl(audio, { filter: "audioonly" });
      const resource = createAudioResource(stream);

      player.play(resource);
      await message.reply(`:thumbsup: HIJA DE PUTAAAAA`);
    } else {
      message.channel.send("grupo culiau");
    }
  },
};
