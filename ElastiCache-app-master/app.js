//single state object

var state = {
  questions: [{
      question: 'What does Amazon ElastiCache provide?',
      answers: ['A service by this name does not exist. Perhaps you mean Amazon CloudCache', 'A virtual server with a huge amount of memory', 'A managed In-memory cache service', 'An Amazon EC2 instance with the Memcached software already pre-installed'],
      answerCorrect: 2
    },
    {
      question: 'You are developing a highly available web application using stateless web servers. Which services are suitable for storing session state data?',
      answers: ['Elastic Load Balancing', 'Amazon CloudWatch', 'AWS Storage Gateway', 'Amazon ElastiCache'],
      answerCorrect: 3
    },
    {
      question: 'Which statement best describes ElastiCache?',
      answers: ['Reduces the latency by splitting the workload across multiple AZs', 'A simple web services interface to create and store multiple data sets, query your data easily, and return the results', 'Offload the read traffic from your database in order to reduce latency caused by read-heavy workload', 'Managed service that makes it easy to set up, operate and scale a relational database in the cloud'],
      answerCorrect: 2
    },
    {
      question: 'How many nodes can you add to an Amazon ElastiCache cluster running Memcached?',
      answers: ['1', '5', '20', '100'],
      answerCorrect: 2
    },
    {
      question: 'How many nodes can you add to an Amazon ElastiCache cluster running Redis?',
      answers: ['1', '5', '20', '100'],
      answerCorrect: 0
    },
    {
      question: 'Which cache engines does Amazon ElastiCache support?',
      answers: ['Membase', 'Couchbase', 'Cassandra','Memcached'],
      answerCorrect: 3
    },
    {
      question: 'You are working on a mobile gaming application and are building the leaderboard feature to track the top scores across millions of users. Which AWS services are best suited for this use case',
      answers: ['Amazon Redshift', 'Amazon ElastiCache using Memcached', 'Amazon ElastiCache using Redis', 'Amazon Simple Storage Service (S3)'],
      answerCorrect: 2
    },
    {
      question: 'Which of the following objects are good candidates to store in a cache?',
      answers: ['Session', 'Shopping cart', 'Product catalog', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'How can you back up data stored in Amazon ElastiCache running Redis?',
      answers: ['Create an image of the Amazon EC2 instance', 'Configure automatic snapshots to back up the cache environment every night', 'Redis cluster cannot be backed up', 'All of the above'],
      answerCorrect: 1
    },
    {
      question: 'Best description of Amazon ElastiCache?',
      answers: ['It reduces the latency of a DB instance by splitting the workload across multiple AZs', 'It provides a smple web interface to create and store multiple datasets, query your data easily, and return the results', 'It is a managed service from AWS that makes it easy to set up, operate, and scale a relational database in the cloud', 'It offloads the read traffic from a database in order to reduce latency caused by read-heavy workload'],
      answerCorrect: 3
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
