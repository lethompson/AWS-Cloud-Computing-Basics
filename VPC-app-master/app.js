//single state object

var state = {
  questions: [{
      question: 'A workload consisting of Amazon EC2 instances is placed in an Amazon VPC. What feature of VPC can be used to deny network traffic based on IP source address and port number?',
      answers: ['Subnets', 'Security groups', 'Route tables', 'Network Access Control Lists'],
      answerCorrect: 3
    },
    {
      question: 'You want to pass traffic securely from your on-premises network to resources in your Amazon VPC. Which type of gateway can be used on the VPC?',
      answers: ['Internet Gateway (IGW)', 'Amazon Virtual Private Cloud endpoint', 'Virtual Private Gateway', 'Amazon Virtual Private Cloud peer'],
      answerCorrect: 2
    },
    {
      question: 'When an Amazon RDS database instance is run within an Amazon Virtual Private Cloud, which Amazon VPC security features can be used to protect the database instance?',
      answers: ['Security groups', 'Network ACLs', 'Private subnets', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'What statement is true about Internet gateways?',
      answers: ['For high availability, you should have one IGW per AZ', 'IGWs come with public IP addresses already assigned', 'You cannot have a VPC with both an IGW and VGW', 'An IGW is needed if you want to connect to AWS services outside of the VPC'],
      answerCorrect: 3
    },
    {
      question: 'You need to monitor all traffic from the Internet to Amazon EC2 instances in a VPC. What AWS tool do you have at your disposal?',
      answers: ['Amazon VPC Flow Logs', 'Amazon CloudWatch', 'AWS CloudTrail', 'AWS Network Management Console'],
      answerCorrect: 0
    },
    {
      question: 'What does a default VPC come with?',
      answers: ['A /20 address space', 'Both an IGW and a VGW', 'A route table that sends all IPv4 traffic destined for the Internet to the Internet gateway', 'A NAT instance'],
      answerCorrect: 0
    },
    {
      question: 'What AWS Cloud service provides a logically isolated section of the AWS Cloud where system operators can launch AWS resources into a virtual network they defined?',
      answers: ['Amazon Virtual Private Cloud (Amazon VPC)', 'Amazon Route 53', 'Availability Zones', 'Security Groups'],
      answerCorrect: 0
    },
    {
      question: 'You are not seeing network traffic flow on the AWS side of your VPN connection to your Amazon VPC. How do you check the status?',
      answers: ['Deploy a third-party tool to monitor your VPN', 'Go to the AWS management tool, and navigate VPN connections', 'Check your router logs', 'Turn on route propagation in the Amazon VPC main routing table'],
      answerCorrect: 3
    },
    {
      question: 'What is a private VIF?',
      answers: ['The physical connection between AWS and the customer location', 'The logical interface between the customer location and those AWS resources located inside the VPC', 'The logical interface between the customer location and those AWS services located outside the VPC', 'The logical connection between two VPCs when you establish VPC peering'],
      answerCorrect: 1
    },
    {
      question: 'You have noticed that your web servers have come under a phishing attack. You have identified the IP address that is the source of this attack. What should you do to mitigate this attack?',
      answers: ['Configure a route table that directs packets from this IP address to a fictitious EC2 instance', 'Configure the NACLs to block traffic from this IP address', 'Configure the security group for your web servers to deny any protocols from this IP address', 'Contact the AWS Help Desk, and ask them to put a block on the offending subnet'],
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
