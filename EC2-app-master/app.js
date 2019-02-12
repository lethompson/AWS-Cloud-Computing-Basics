//single state object

var state = {
  questions: [{
      question: 'If I want my instance to run on a single-tenant hardware, which value do I have to set the instance’s tenancy attribute to?',
      answers: ['Dedicated', 'Isolated', 'One','Reserved'],
      answerCorrect: 0
    },
    {
      question: 'How can you safeguard EC2 instances running on a VPC?',
      answers: ['Security Groups', 'NACL', 'CIDR Block Range', 'WAF'],
      answerCorrect: 0
    },
    {
      question: 'How many EC2 instances can be used in a VPC (Soft-limit)?',
      answers: ['There is a limit of running up to a total of 20', 'There is a limit of running up to a total of 15', 'There is a limit of running up to a total of 5', 'There is a limit of running up to a total of 40'],
      answerCorrect: 0
    },
    {
      question: 'Can you run multiple websites on an EC2 server using a single IP address?',
      answers: ['More than one elastic IP is required to run multiple websites on EC2', 'Only one elastic IP is required to run multiple websites on EC2', 'No elastic IP is required to run multiple websites on EC2', 'Two elastic IP is required to run multiple websites on EC2'],
      answerCorrect: 0
    },
    {
      question: 'What EC2 Available Metrics can you monitor using CloudWatch?',
      answers: ['CPU Utilization', 'Network Utilization', 'Disk Performance', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'If you have an EC2 instance backed with an EBS volume, what happens with the data if you stop it?',
      answers: ['All data is erased', 'Some data is erased', 'All data is copied into a new volume', 'All data is preserved'],
      answerCorrect: 3
    },
    {
      question: 'A company is running applications for development, and those applications could be interrupted at any time. They are looking for an option to purchase EC2 instances for optimizing costs. What will you recommend?',
      answers: ['On-demand instances', 'Spot Instances', 'Reserved instances', 'Dedicated host'],
      answerCorrect: 1
    },
    {
      question: 'If you want to measure the RAM usage of an EC2 instance, what do you need to do?',
      answers: ['Use basic monitoring', 'Develop a custom CloudWatch metric', 'Develop a custom operating system script', 'Use advanced monitoring'],
      answerCorrect: 1
    },
    {
      question: 'Which is NOT a status of the EC2 instance lifecycle?',
      answers: ['Running', 'Stopped', 'Restarting', 'Terminated'],
      answerCorrect: 2
    },
    {
      question: 'You have created a custom AMI. Another AWS account wants to use it, for launching new EC2 instances. What do you need to do?',
      answers: ['Deregister your custom AMI', 'Copy it to a new region', 'Make it public', 'Share it with the AWS community ID'],
      answerCorrect: 2
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
