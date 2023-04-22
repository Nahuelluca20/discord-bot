const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cla')
		.setDescription('Lista de los audios'),
	async execute(interaction) {
		await interaction.reply(`
    \n~
    Cintura: /cintura,
    GrupoCuliau: /grupoculiau,
    Corte: /corte,
    Hija de puta: /hijadeputa2,
    No descuiden a sus primas: /nodescuiden,
    Oidpum: /oidpum,
    Vamo a chupa: /vamochupa,
    Wacha: /wacha,
    Tenes un problema: /tenesunproblema
  ~`);
	},
};