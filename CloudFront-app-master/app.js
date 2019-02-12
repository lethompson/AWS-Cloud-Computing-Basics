//single state object

var state = {
  questions: [{
      question: 'What type of server is used to speed the delivery of content using a variety of techniques for caching content closer to users?',
      answers: ['Edge server', 'Origin Server', 'Base server', 'Remote server'],
      answerCorrect: 0
    },
    {
      question: 'CloudFront pricing is based on what two factors?',
      answers: ['GBs of provisioned storage/ level of storage', 'Data transfer to the origin site / HTTP requests', 'Number of volumes used / I/O usage of system', 'EC2 instance usage / HTTP requests'],
      answerCorrect: 1
    },
    {
      question: 'Amazon CloudFront retrieves files twice as fast as what other well-known Amazon storage service?',
      answers: ['Amazon EC2', 'Amazon EBS', 'Amazon SQS', 'Amazon S3'],
      answerCorrect: 3
    },
    {
      question: 'To deliver content through Amazon CloudFront, you create a ______?',
      answers: ['Distributor', 'Distributing server', 'Distribution', 'None of the above'],
      answerCorrect: 2
    },
    {
      question: 'Amazon charges ______ for distributing dynamic content _______ for distributing static content?',
      answers: ['more/than it does', 'less/than it does', 'the same/as it does', 'more/more'],
      answerCorrect: 2
    },
    {
      question: 'For on-demand media files, you can stream content using RTMP delivery. RTMP stands for what?',
      answers: ['Real-Time Messaging Protocol', 'Reaction-Time Messenger Policy', 'Resistant-Time Message Procedure', 'Ready-Time Messaging Policy'],
      answerCorrect: 0
    },
    {
      question: 'Which statement is correct regarding Amazon CloudFront?',
      answers: ['Amazon CloudFront will forward a file to the user as soon as it gets the first bytes', 'Amazon CloudFront will wait until the entire file downloads in order to perform error checking before it forwards the file to the user', 'Amazon CloudFront always delivers the most current version of the file to the user', 'Amazon CloudFront is only located in AWS Regions'],
      answerCorrect: 0
    },
    {
      question: 'When you configure Amazon CloudFront, an origin refers to which of the following?',
      answers: ['The AWS server that is holding your static content', 'Either an HTTP server or an Amazon S3 bucket', 'For static content only, it is an Amazon S3 bucket', 'For static content, it is either an HTTP server or an Amazon S3 bucket. For media files on demand it is an S3 bucket'],
      answerCorrect: 3
    },
    {
      question: 'What is the best way to control access to your content in the Amazon CloudFront edge locations?',
      answers: ['Signed URLs', 'Elastic IP', 'public IP', 'All of the above'],
      answerCorrect: 0
    },
    {
      question: 'Which of the following is a good use case for Amazon CloudFront?',
      answers: ['A popular software download site that supports users around the world, with dynamic content that changes rapidly', 'A corporate website that serves training videos to employees. Most employees are located in two corporate campuses in the same city', 'A corporate HR website that supports a global workforce. Because the site contains sensitive data, all users must connect through a corporate VPN', 'All of the above'],
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
