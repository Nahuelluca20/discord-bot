const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('selectmap')
    .setDescription('Selecciona aleatoriamente un mapa')
    .addStringOption(option =>
      option.setName('mapas')
        .setDescription('Lista de mapas separados por espacios')
        .setRequired(true)
    ),
  async execute(interaction) {
    const mapas = interaction.options.getString('mapas').split(' ');
    const randomIndex = Math.floor(Math.random() * mapas.length);
    const randomMapa = mapas[randomIndex];
    await interaction.reply(`Mapas introducidos: ${mapas}\nEl mapa aleatorio es: ${randomMapa}`);
  },
};