const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Dice quien es el mas bot'),
	async execute(interaction) {
		await interaction.reply('El WandyNaitor es el verdadero bot');
	},
};