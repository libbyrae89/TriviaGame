var triviaQuestions = [{
	question: "What is the name of Lorelai’s dog?",
	answerList: ["Paul Anka", "Elvis Presley", "Neil Diamond", "Frank Sinatra"],
	answer: 0
},{
	question: "In which season were Lorelai and Rory not on speaking terms?",
	answerList: ["Season 7", "Season 3", "Season 5", "Season 6"],
	answer: 3
},{
	question: "Who sings the theme song?",
	answerList: ["TCarly Simon", "Carole King", "Joni Mitchell", "Linda Ronstadt"],
	answer: 1
},{
	question: "Who does Rory say is her inspiration for becoming a journalist?",
    answerList: ["Barbara Walters", "Diane Sawyer", "Christiane Amanpour", "Katie Couric"],
	answer: 2
},{
	question: "What movie do Dean and Rory (and Lorelai) watch on their first date?",
	answerList: ["Willy Wonka and the Chocolate Factory", "Annie Hall", "The Breakfast Club", "Casablanca"],
	answer: 0
},{
	question: "What is the name of Lane’s band?",
	answerList: ["Spider Pupil", "Affiliate Lily", "Hep Alien", "Lexical Exhale"],
	answer: 2
},{
	question: "Students at Rory’s school, Chilton, could sing the school song in what alternate language to earn extra credit?",
	answerList: ["Chinese", "Spanish", "French", "Latin"],
	answer: 3
},{
	question: "What color lipstick did Lorelai and her mom wear during their spa weekend?",
	answerList: ["Glampire", "Vicious Trollop", "Dirty Bird", "Vamp"],
	answer: 1
},{
	question: "What kind of flowers did Lorelai get during her marriage proposal from Max Medina?",
	answerList: ["Yellow daisies", "Red roses", "Pink peonies", "Blue hyacinths"],
	answer: 0
},{
	question: "What does Rory call Jess one of the first nights after she meets him?",
	answerList: ["Robin Hood", "Dodger", "Huck Finn", "Mowgli"],
	answer: 1
},{;

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}