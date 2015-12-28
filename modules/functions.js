var chalk = require('chalk');

function randomNumberGen(i){
	var random = Math.floor((Math.random() * i) + 1);
	console.log(chalk.blue("Random Number Generated: ") + chalk.bold(random));
	return random;
}

module.exports =
{
	randomNumberGen
};
