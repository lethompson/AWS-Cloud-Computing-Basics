//single state object

var state = {
  questions: [{
      question: 'The IAM access keys used to access AWS services via the AWS CLI and/or SDK consist of which two parts?',
      answers: ['Access Key ID and password', 'Public Access Key and Secret Access Key', 'Access Key ID and Secret Access Key', 'User name and Public Access Key'],
      answerCorrect: 2
    },
    {
      question: 'Which Multi-Factor Authentication devices does the IAM service support?',
      answers: ['Hardware devices (Gemalto)', 'Virtual MFA applications (e.g., Google Authenticator)', 'Simple Message Service (SMS)', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'Which of the following is true when using AWS Identity and Access Management groups?',
      answers: ['IAM users are members of a default user group', 'Groups can be nested', 'An IAM user can be a member of multiple groups', 'IAM roles can be members of a group'],
      answerCorrect: 2
    },
    {
      question: 'Which of the following is not a best practice for securing an AWS account?',
      answers: ['Requiring Multi-Factor Authentication for root-level access', 'Creating individual IAM users', 'Monitoring activity on your AWS account', 'Sharing credentials to provide cross-account access'],
      answerCorrect: 3
    },
    {
      question: 'Which AWS service provides centralized management of access and authentication of users administering the services in an AWS account?',
      answers: ['AWS Directory Service', 'AWS Identity and Access Management Service', 'Amazon Cognito', 'AWS Config'],
      answerCorrect: 1
    },
    {
      question: 'How can administrators create a role with the AWS Identity and Access Management (IAM) service?',
      answers: ['AWS Command Line Interface', 'IAM APIs', 'IAM console', 'Any of the above'],
      answerCorrect: 3
    },
    {
      question: 'When the IAM API is updated, who is responsible for updating a third-party IAM tool?',
      answers: ['The third-party tool provider', 'AWS', 'The third-party tool user', 'An update is not required'],
      answerCorrect: 0
    },
    {
      question: 'What is the format of an IAM policy?',
      answers: ['XML', 'Key/value pairs', 'JSON', 'Tab-delimited text'],
      answerCorrect: 2
    },
    {
      question: 'Which of the following are found in an IAM policy?',
      answers: ['Service Name', 'Region', 'Access Key', 'Secret Key'],
      answerCorrect: 0
    },
    {
      question: 'Which feature of AWS is designed to permit calls to the platform from an Amazon EC2 instance without needing access keys placed on the instance?',
      answers: ['AWS Identity and Access Management (IAM) instance profile', 'IAM groups', 'IAM roles', 'Amazon EC2 key pairs'],
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
