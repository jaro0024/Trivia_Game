
// Ready function
$(function () {
    showSection(showStart);
    initGame();
})

// Array for the trivia game including question, answers, correct answer and image for the correct answer
var triviaGame = [
    {
        question: "Who sold an aviation start-up called Aviato?",
        answers: ["Big Head", "Richard", "Erlich", "Jared"],
        correctAnswer: "Erlich",
        image: ("assets/images/erlich.gif")
    },

    {
        question: "What is the name of the website Richard is working on in the pilot episode?",
        answers: ["Green Archer", "Pied Piper", "Red Hood", "Green Arrow"],
        correctAnswer: "Pied Piper",
        image: ("assets/images/piedpiper.gif")
    },

    {
        question: 'Who said: "Most CEOs don’t have a best friend just hanging around"?',
        answers: ["Gilfoyle", "Richard", "Erlich", "Jared"],
        correctAnswer: "Jared",
        image: ("assets/images/jared.gif")
    },

    {
        question: "Who is revealed to be Canadian and gets himself a work visa?",
        answers: ["Gilfoyle", "Peter", "Jared", "Richard"],
        correctAnswer: "Gilfoyle",
        image: ("assets/images/gilfoyle.gif")
    },

    {
        question: 'Who said: "It’s weird having a girl in the house, it’s a very strange energy"?',
        answers: ["Big Head", "Richard", "Erlich", "Dinesh"],
        correctAnswer: "Dinesh",
        image: ("assets/images/dinesh.gif")
    }];

// Global variables
var sectionId = "";
var showStart = $("#start-section");
var showQuestion = $("#question-section");
var showAnswer = $("#answer-section");
var showResults = $("#results-section");
var correctTotal = 0;
var incorrectTotal = 0;
var unansweredTotal = 0;
var timeLeft = 100;
var timeInterim;
var interval;
var playerChoice = "";
var correctOption;
var currentQuestion = 0;
var correctAnswers = ["Erlich", "Pied Piper", "Jared", "Gilfoyle", "Dinesh"];

// To show the section needed
function showSection(sectionId) {
    //Hide all sections
    showStart.hide();
    showQuestion.hide();
    showAnswer.hide();
    showResults.hide();
    // Show only the sectionId section
    if (sectionId) {
        sectionId.show();
    }
}

// Function to start game by clicking the "start game" button
function initGame() {
    $("#start-game").click(function () {
        showSection(showQuestion);
        createQuestion();
    })
}

// Function to get question and possible answers for that question 
function createQuestion() {
    // Get timer to show on page and run the timer function
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    runTimer();
    // Get question to show on page
    $("#trivia-question").html("<h3>" + triviaGame[currentQuestion].question + "</h3>");
    // Get the answers to show on page
    $("#answerA").html(triviaGame[currentQuestion].answers[0]);
    $("#answerB").html(triviaGame[currentQuestion].answers[1]);
    $("#answerC").html(triviaGame[currentQuestion].answers[2]);
    $("#answerD").html(triviaGame[currentQuestion].answers[3]);
    // Run function to check what player clicked and compare to correct answer
    checkAnswer();
}

// Function to get player's answer and check if it is correct or not
function checkAnswer() {
    $(".options").click(function () {
        playerChoice = $(this).text();
        console.log(playerChoice);
        clearInterval(interval);
        // for (var i = 0; i < triviaGame.length; i++) {
            correctOption = triviaGame[currentQuestion].correctAnswer;
            console.log(correctOption);
            if (playerChoice === correctOption) {
                correctTotal++;
                // $("#correct-answer").html("<h3>" + "Good Job! You got it right!" + "</h3>");
                console.log("correct " + correctTotal);
            }
            else {
                incorrectTotal++;
                // $("#correct-answer").html("<h3>" + "Sorry! The correct answer is " +  + "!" + "</h3>");
                console.log(incorrectTotal);
            }
        // }
        showSection(showAnswer);
        timeInterim = setTimeout(function () {
            showSection(showQuestion);
        }, 5000);
        nextQuestion();
    })
}

// Function to go to next question after player answers a question or time runs out
function nextQuestion() {
    currentQuestion++;
    createQuestion();
}


// Function to run the timer
function runTimer() {
    interval = setInterval(timeUp, 1000);
}

// Function to set decrement, so we can run the timer function
function timeUp() {
    timeLeft--;
    // Get timer decrement to show on page
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    // When time gets down all the way to zero, timer stops 
    if (timeLeft === 0) {
        clearInterval(interval);
        // Number of unanswered questions increase by 1 and it shows page with time is up msg, correct answer and gif
        unansweredTotal++;
        showSection(showAnswer);
        $("#correct-answer").html("<h3>" + "Time is up! The correct answer is " + + "<h3>");
        $("#answer-gif").html();
        // Amount of time between the "Time is up!" msg and the next question
        timeInterim = setTimeout(function () {
            showSection(showQuestion);
        }, 5000)
        // To get next question
        nextQuestion();
    }
}

// function answeredCorrectly() {

// }

// function answeredIncorrectly() {

// }

// Function to show the stats and give an option to click on a reset button to play again after game is over
function gameOver() {
    showSection(showResults);
    $("#correct-total").html("Correct answers: " + correctTotal);
    $("#incorrect-total").html("Incorrect answers: " + incorrectTotal);
    $("#unanswered-total").html("Unanswered answers: " + unansweredTotal);
}

// Function to reset and restart game when clicking "play again?" button
$("#play-again").click(function () {
    showSection(showQuestion);
    correctTotal = 0;
    incorrectTotal = 0;
    unansweredTotal = 0;
    timeLeft = 20;
    createQuestion();
    runTimer();
    checkAnswer();
})







/* Pseudo code:

 

 4) if correct, show page that says correct and a giphy (if / else statement)
 5) else if is incorrect, show page that says incorrect, gives the correct answer and a giphy (if / else statement)
 6) else, no answer before timer is up, show page that says you ran out of time, gives the correct answer and a giphy (if / else statement)
 

 9) once the player has gone through all questions, show a screen with the stats:
  a) correct answers
  b) incorrect answers
  c) unanswered questions
 10) add a "start over" button that will reset the game to the begiinning without reloading the page */