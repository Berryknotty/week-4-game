$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;	//Set Global Variables
	var wins = 0;
	var loses = 0;

//variable values
	function varSet() {		
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Princess Lea",
			pic: 'assets/images/PrincessLea.jpg',
			hitPoints: 150,
			attackPower: 5
		}, {
			id: 1,
			name: "Chewy",
			pic: 'assets/images/Chewy.jpg',
			hitPoints: 100,
			attackPower: 25 		
		}, {
			id: 2,
			name: "General Ackbar",
			pic: 'assets/images/General.jpg',
			hitPoints: 120,
			attackPower: 19 
		}, {
			id: 3,
			name: "Darth Vader",
			pic: 'assets/images/DarthVader.jpg',
			hitPoints: 140,
			attackPower: 9 
		} ];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 3;
		rounds = 7;

		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='choose' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].hitPoints +
			"<br> AP: " + enemyArray[i].attackPower + " </div>";
		}

		$("#picking").html(choices);
		$("#todo").html("Click to choose your character!");

		$('.hero').remove();
		$('.fighting').remove();
		$('#whathappens').html("");

		attachCharacterOnClick();
	}

	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='choose' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].hitPoints +
			"<br> AP: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='choose' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].hitPoints +
			"<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
		$('#user').html(hero);
		$('#enemy').html(badguy);
	}

	function whatHappens() {
		var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>" +
			"Your attack power has increased by " + rounds + "!";
		$('#whathappens').html(description);
	}

	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	//Picking your character
				myChar = $(this).attr('id');
				$("#user").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$('#whathappens').html("");
				$("#todo").html("Choose your opponent!");
			}
			//You have a character and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {	
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$('#whathappens').html("");
				$("#todo").html("Keep clicking attack to duel!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveCharacter) {
			$('#whathappens').html("You need to pick your character first!");
		}
		else if(!haveAttacker) {
			$('#whathappens').html("Pick who you are fighting!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			enemyArray[opponentChar].hitPoints  = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;	//Hit Them
			enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;	//Get Hit


			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#whathappens').html("");
					$("#todo").html("Who will you duel next?");
					haveAttacker = false;
				}
				else {
					whatHappens();
					alert("You win!  Play again!");
					wins++;
					$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
					varSet();
				}
				
			}
			else if(enemyArray[myChar].hitPoints < 0) {
				whatHappens();
				alert("You've been defeated!  Try again!");
				loses++;
				$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
				varSet();
			}
			else {
				whatHappens();
				printCharacters();
			}

			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});