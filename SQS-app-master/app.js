//single state object

var state = {
  questions: [{
      question: 'What is the default time for an Amazon Simple Queue Service (Amazon SQS) visibility timeout?',
      answers: ['30 seconds', '60 seconds', '1 hour', '12 hours'],
      answerCorrect: 0
    },
    {
      question: 'What is the longest time available for an Amazon Simple Queue Service (Amazon SQS) visibility timeout?',
      answers: ['30 seconds', '60 seconds', '1 hour', '12 hours'],
      answerCorrect: 3
    },
    {
      question: 'Which of the following option is a valid property for an Amazon Simple Queue Service (Amazon SQS) message?',
      answers: ['Destination', 'Type', 'Body', 'All of the above'],
      answerCorrect: 2
    },
    {
      question: 'How does Amazon Simple Queue Service (Amazon SQS) deliver messages?',
      answers: ['Last In, First Out (LIFO)', 'First In, First Out (FIFO)', 'Sequentially', 'Amazon SQS does not guarantee delivery of your messages in any particular order'],
      answerCorrect: 3
    },
    {
      question: 'Your application polls an Amazon SQS queue frequently and returns immediately, often with empty ReceiveMessageResponses. What is one thing that can be done to reduce Amazon SQS costs?',
      answers: ['Pricing on Amazon SQS does not include a cost for service requests; therefore, there is no concern', 'Increase the timeout value for short polling to wait for messages longer before returning a response', 'Change the message visibility value to a higher number', 'Use long polling by supplying a WaitTimeSeconds of greater than 0 secs when calling ReceiveMessage'],
      answerCorrect: 3
    },
    {
      question: 'What is the longest time available for an Amazon SQS long polling timeout?',
      answers: ['10 seconds', '20 seconds', '30 seconds', '1 hour'],
      answerCorrect: 1
    },
    {
      question: 'What is the longest configurable message retention period for Amazon SQS?',
      answers: ['30 minutes', '4 days', '30 seconds', '14 days'],
      answerCorrect: 3
    },
    {
      question: 'What is the default message retention period for Amazon Simple Queue Service (Amazon SQS)?',
      answers: ['30 minutes', '4 days', '30 seconds', '14 days'],
      answerCorrect: 1
    },
    {
      question: 'A _____ letter queue is a queue that other queues can target to send messages that could not be processed successfully?',
      answers: ['Broken', 'Maimed', 'Dead', 'Fixed'],
      answerCorrect: 2
    },
    {
      question: 'Of the following options, what is an efficient way to fanout a single Amazon SNS message to multiple Amazon SQS queues?',
      answers: ['Create an Amazon SNS topic using Amazon SNS. Then create & subcribe multiple Amazon SQS queues sent to the Amazon SNS topic', 'Create one Amazon SQS queue that subcribes to multiple Amazon SNS topics', 'Amazon SNS allows exactly one subscriber to each topic, so fanout is not possible', 'Create an Amazon SNS topic using Amazon SNS. Create an application that subscribes to that topic & duplicates the message. Send copies to multiple Amazon SQS queues'],
      answerCorrect: 0
    }
  ],

  currentQuestion: 0,
  userScore: 0
}

//register when start button is clicked and removes div with heading
//and start button
function clickStart() {
  $('.js-startPage').on('click', 'button', function(event) {

    $('.js-startPage').remove();
    $('#question-container').removeClass('hidden');
  })
};

//register when an answer/button has been clicked/chosen by the user
function clickAnswer(chosenElement, state) {

  var chosenAnswer = $(chosenElement).val();

  //if the chosen answer is correct, then tell the user "correct", otherwise "wrong :("
  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {

    state.userScore += 1;
    $('.response1').text('Correct!');
  } else {
    $('.response1').text('Wrong :(');

    //add class "wrong answer" so that the button that was clicked can be
    //marked with a red colour
    $(chosenElement).addClass('wrong-answer');
  }

  //add class to the correct answer so that this can be highlighted in green
  $('.button' + state.questions[state.currentQuestion].answerCorrect).addClass('button-correct');

  //remove hover class from button so the highlighted answers will still stay red and green
  //when you hover over them
  $('button').removeClass('hover');

  //show result
  $('.result').removeClass('hidden');
  //show continue button
  $('.js-continue').removeClass('hidden');
  //disable the answer buttons so user cannot continue clicking them
  $('.js-answer').attr('disabled', true);

  return state;
}


function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $('.js-continue').addClass('hidden');
  $('.result').addClass('hidden');
  $('section').remove();

  //if quiz is done insert "you're done" and user's score
  //remove count and score from bottom of page
  if (state.currentQuestion > 9) {
    $('body').append('<h1 class="end">You\'re done!</h1><p class ="endScore">You scored ' + state.userScore + " out of " + state.currentQuestion);
    $('.js-count').remove();
    $('.js-score').remove();

  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $('#question-container').append("<section class = 'question-container col-8'>" +
      "<p class='question'>" + state.questions[state.currentQuestion].question + "</p><br>" +
      "<button class='button0 js-answer hover' value = '0'>" + state.questions[state.currentQuestion].answers[0] + "</button><br>" +
      "<button class='button1 js-answer hover' value = '1'>" + state.questions[state.currentQuestion].answers[1] + "</button><br>" +
      "<button class='button2 js-answer hover' value = '2'>" + state.questions[state.currentQuestion].answers[2] + "</button><br>" +
      "<button class='button3 js-answer hover' value = '3'>" + state.questions[state.currentQuestion].answers[3] + "</button>" +
      "</section>");

    $('.js-count').text("Question: " + (state.currentQuestion + 1) + "/" + state.questions.length);
    $('.js-score').text("Correct: " + state.userScore + "/" + state.currentQuestion);
  }

}

$(function() {
  clickStart();
  $('#question-container').on('click', 'button', function(event) {

    clickAnswer($(this), state);
  });

  $('.js-continue').click(function(event) {

    clickContinue(state);
  });

});
