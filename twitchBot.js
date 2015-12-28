/*
	To-do List
	Currency System
		-Join = 1 point (First time = 5 p)
		-RPG/Game?
		-!bank - Returns users currency
		-!top10 - Returns top10
		-!trade <amount> <user> - Give your currency to someone
	Twitch API
		-!uptime - Returns uptime
	Games
*/

var irc = require("tmi.js");
var request = require('request');
var functions = require('./modules/functions')
var chalk = require('chalk');
var config = require('./config');

var client = new irc.client(config.options);


client.addListener('disconnect', function (reason) {
	console.log ("Disconnected because "+ reason);
})

client.addListener('chat', function (channel, user, message) {

	var msg = message.toLowerCase();
	var args = msg.split(" ");

	if(msg.indexOf("!hello") === 0){
		client.say(channel, "Hello, " + user.username + "!");
	}
	else if(msg.indexOf("!kappa") === 0){
		client.say(channel, "Keepo");
	}
	else if(message.toLowerCase() === "!mmr"){
		var mmr = functions.randomNumberGen(8500)
		client.say(channel, "Bakalım MMR'ın kaç " + user.username);
		if (mmr > 6000){
			client.say(channel, user.username + " MMR'ı : " + mmr + " CoolCat");
		}
		else if (mmr < 1000){
			client.say(channel, user.username + " MMR'ı : " + mmr + " DansGame");
		}
		else if (mmr > 4500){
			client.say(channel, user.username + " MMR'ı : " + mmr + " Kreygasm");
		}
		else{
			client.say(channel, user.username + " MMR'ı : " + mmr + " FailFish");
		}
	}
	else if(msg.indexOf("!rulet") === 0){
		var roulette = functions.randomNumberGen(6);
		client.say(channel, user.username + " kafasına silahı dayadı ve tetiği çekti.");
		console.log(roulette);
		if(roulette === 1){
			client.say(channel, "SMSkull RIP in peperonis " + user.username + " SMSkull");
		}
		else{
			client.say(channel, "@"+ user.username + ", mucizevi bir şekilde yaşamaya devam ediyor SeemsGood");
		}
	}
	else if(msg.indexOf("!rps") === 0){
		/*
		RPS = 1 Rock
		RPS = 2 Paper
		RPS = 3 Scissors
		*/
		if (args[1] !== undefined){
			var rps = functions.randomNumberGen(3);
			if (args[1] === "taş"){
				if (rps === 1)
					client.say(channel, "@" + user.username + ", bot taş oynadı. Berabere kaldın! ResidentSleeper");
				else if(rps === 2)
					client.say(channel, "@" + user.username + ", bot kağıt oynadı. Kaybettin! videoyunBibleThump");
				else
					client.say(channel, "@" + user.username + ", bot makas oynadı. Kazandın! 4Head");
			}
			else if (args[1] === "makas"){
				if (rps === 1)
					client.say(channel, "@" + user.username + ", bot taş oynadı. Kaybettin! videoyunBibleThump");
				else if(rps === 2)
					client.say(channel, "@" + user.username + ", bot kağıt oynadı. Kazandın! 4Head");
				else
					client.say(channel, "@" + user.username + ", bot makas oynadı. Berabere kaldın! ResidentSleeper");
			}
			else if (args[1] === "kağıt"){
				if (rps === 1)
					client.say(channel, "@" + user.username + ", bot taş oynadı. Kazandın! 4Head");
				else if(rps === 2)
					client.say(channel, "@" + user.username + ", bot kağıt oynadı. Berabere kaldınız! ResidentSleeper");
				else
					client.say(channel, "@" + user.username + ", bot makas oynadı. Kaybettin! videoyunBibleThump");
			}
	}
		else {
			client.say(channel, "Yanlış komut! !rps den sonra taş, kağıt veya makas koy. FailFish");
		}
	}
	else if(msg.indexOf("!aşk") === 0){
		if (args[1] === undefined){
			client.say(channel, "Yanlış komut! !aşk tan sonra birinin ismini koy. FailFish");
		}
		else{
			var love = functions.randomNumberGen(100);
			client.say(channel, "@" + user.username + " ile " + args[1] + " arasındaki aşk %" + love + " bleedPurple");
		}
	}
	else if(msg.indexOf("!follow") === 0){
		var followURL = 'https://api.rtainc.co/twitch/followers/length?channel=videoyun' +'&name=' + user.username;

		request(followURL, function(error, response, body){
			if(!error && response.statusCode == 200){
				var follow = body.toString();
				console.log(follow);
				follow = follow.replace(/years,|year,|years|year/ , ' yıl ');
				follow = follow.replace(/months,|month,|months|month/, ' ay ');
				follow = follow.replace(/weeks,|week,|weeks|week/, ' hafta ');
				follow = follow.replace(/days,|day,|days|day/, ' gün ');
				follow = follow.replace(/hours,|hour,|hours|hour/, ' saat ');
				follow = follow.replace(/minutes,|minute,|minutes|minute/, ' dakika ');
				follow = follow.replace(/seconds,|second,|seconds|second/, ' saniye ');
				console.log(follow);
				client.say(channel, "@" + user.username + ", takip süren: " + follow);
			}
			else {
				client.say(channel, "@" + user.username, ", takip etmiyorsun");
			}
		});
	}
	else if(msg.indexOf("!sudoku") === 0){
		client.say(channel, "/timeout " +  user.username + " 5");
		client.say(channel, "Fedakarlığın için teşekkürler, " + user.username + " BibleThump");
	}
	else if(msg.indexOf("!kapat") === 0){
		if(user.username === "videoyun"){
			client.say(channel, "Bot kapatılıyor ResidentSleeper ");
			client.disconnect();
		}
	}
	else if(msg.indexOf("!ping") === 0){
		if(user.username === "videoyun"){
			client.say(channel, "Pong ");
		}
	}
		else if(msg.indexOf("!komut") === 0){
		client.say(channel, "Komutlar: !mmr, !rulet, !rps, !aşk, !follow", "!sudoku");

	}


})

client.connect();
