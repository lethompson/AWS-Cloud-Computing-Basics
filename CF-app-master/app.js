//single state object

var state = {
  questions: [{
      question: 'Your company is migrating to AWS and wants to apply DevOps techniques to automate the deployment of new environments. What tool should they use?',
      answers: ['AWS CloudFormation', 'AWS Config', 'AWS Chief', 'AWS Shield'],
      answerCorrect: 0
    },
    {
      question: 'AWS CloudFormation template requires which of the following sections?',
      answers: ['Format Version', 'Description', 'Parameters', 'Resources'],
      answerCorrect: 3
    },
    {
      question: 'AWS CloudFormation supports the following text formats?',
      answers: ['YAML', 'RAW', 'XML', 'DOC'],
      answerCorrect: 0
    },
    {
      question: 'You are creating an AWS CloudFormation template and you want to use it for multiple regions. What optional section of an AWS CloudFormation Stack needs to exist?',
      answers: ['Description', 'Resources', 'Conditions', 'Mappings'],
      answerCorrect: 3
    },
    {
      question: 'Your company has not approved the use of AWS Elastic Beanstalk. You would like to do blue/green deployments on your AWS environments. What tool can be used to automate your deployment and perform a blue/green deployment?',
      answers: ['This is not possible without AWS Elastic Beanstalk', 'AWS CloudFormation', 'AWS Datapipeline', 'AWS CodeCommit'],
      answerCorrect: 1
    },
    {
      question: 'An AWS CloudFormation template was used to deploy the resources used for your application. The resources are no longer needed, however you need to keep the data for your Amazon RDS instance. How can you clean up the resources while preventing the database from being deleted?',
      answers: ['Manually delete all resources except the Amazon RDS instance', 'Update the stack directly, & remove all of the resources from the template', 'Set a deletion policy attribute for the Amazon RDS instance resource in the template', 'It is not possible to retain resources when deleting an AWS CloudFormation Stack'],
      answerCorrect: 2
    },
    {
      question: 'What is the method for updating an AWS CloudFormation Stack?',
      answers: ['Direct update', 'Indirect update', 'Rolling update', 'Update stack'],
      answerCorrect: 0
    },
    {
      question: 'AWS CloudFormation allows you to define your infrastructure as code in what artifact?',
      answers: ['JSON', 'StackSets', 'Stacks', 'Templates'],
      answerCorrect: 3
    },
    {
      question: 'An AWS CloudFormation stack contains a subnet that is critical to your infrastructure and should never be deleted, even if the stack is updated with a template that requires this. What is the best way to protect the subnet in this situation?',
      answers: ['Add a stack policy that denies the Update:Delete and Update:Replace actions on this resource', 'Use an AWS IAM service role that prohibits calls to ec2:DeleteSubnet', 'Add a DeletionPolicy property to the subnet ressource with a value of Retain', 'Delete the aws:cloudformation tags attached to the subnet'],
      answerCorrect: 0
    },
    {
      question: 'In an AWS CloudFormation template, you attepmt to create a VPC with a CIDR range of 10.0.0.0/16 and a subnet within the VPC with a CIDR range of 10.1.0.0/24. What happens when you initiate a CreateStack operation with this template?',
      answers: ['AWS CloudFormation detects the conflict and returns an error immediately', 'AWS CloudFormation attempts to create the subnet. When this fails, it skips this step and creates the remaining resources', 'AWS CloudFormation attempts to create the subnet. When this fails, it rolls back all other resources', 'AWS CloudFormation attempts to create the subnet. When this fails, it calls a custom resource handler to handle the error'],
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
