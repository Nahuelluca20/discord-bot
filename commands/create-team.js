const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createteam")
    .setDescription("Crea equipos aleatorios con los usuarios dados.")
    .addStringOption(option =>
      option
        .setName("users")
        .setDescription("Lista de usuarios separados por espacios.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const users = interaction.options.getString("users").split(" ");
    const shuffled = shuffle(users);
    const mid = Math.ceil(users.length / 2);
    const team1 = shuffled.slice(0, mid);
    const team2 = shuffled.slice(mid);
    const team1Text = `Equipo 1: ${team1.join(", ")}`;
    const team2Text = `Equipo 2: ${team2.join(", ")}`;
    await interaction.reply(`${team1Text}\n${team2Text}`);
  },
};

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}