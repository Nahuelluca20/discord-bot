const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioResource, createAudioPlayer } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

function crearComando(nombre, descripcion, audio, mensaje) {
  return {
    data: new SlashCommandBuilder()
      .setName(nombre)
      .setDescription(descripcion),
    async execute(message) {
      const voiceChannel = message.member.voice.channel;

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
        await message.reply(`:thumbsup: ${mensaje}`);
      } else {
        message.channel.send(mensaje);
      }
    },
  };
}

module.exports = crearComando;