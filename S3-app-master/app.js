//single state object

var state = {
  questions: [{
      question: 'Amazon S3 is which type of storage service?',
      answers: ['Object', 'Block', 'Simple', 'Secure'],
      answerCorrect: 0
    },
    {
      question: 'Which AWS storage service assists S3 with transferring data?',
      answers: ['CloudFront', 'AWS Import/Export', 'DynamoDB', 'ElastiCache'],
      answerCorrect: 0
    },
    {
      question: 'Object storage systems store files in a flat organization of containers called what?',
      answers: ['Baskets', 'Brackets', 'Clusters', 'Buckets'],
      answerCorrect: 3
    },
    {
      question: 'Amazon S3 offers encryption services for which types of data?',
      answers: ['data in flight', 'data at relax', 'data at rest', 'a and c'],
      answerCorrect: 3
    },
    {
      question: 'Amazon S3 has how many pricing components?',
      answers: ['4', '5', '3', '2'],
      answerCorrect: 2
    },
    {
      question: 'What does RRS stand for when referring to the storage option in Amazon S3 that offers a lower level of durability at a lower storage cost?',
      answers: ['Reduced Reaction Storage', 'Redundant Research Storage', 'Regulatory Resources Storage', 'Reduced Redundancy Storage'],
      answerCorrect: 3
    },
    {
      question: 'Object storage systems require less ______ than file systems to store and access files?',
      answers: ['Big data', 'Metadata', 'Master data', 'Master data'],
      answerCorrect: 1
    },
    {
      question: 'For storing archived content, which service you will recommend?',
      answers: ['Amazon Glacier', 'S3 Standard','S3 Infrequent Access','S3 One zone - Infrequent Access'],
      answerCorrect: 0
    },
    {
      question: 'An Individual object size in Amazon S3 bucket can range between _____ to ______?',
      answers: ['0 to 5 GB', '0 to 5 TB', '0 to 1 GB', '0 to 100 MB'],
      answerCorrect: 1
    },
    {
      question: 'Why is a bucket policy necessary?',
      answers: ['To allow bucket access to multiple users', 'To grant or deny accounts to read and upload files in your bucket', 'To approve or deny users the option to add or remove buckets', 'All of the above'],
      answerCorrect: 1
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
