//single state object

var state = {
  questions: [{
      question: 'In RDS, what is the maximum value I can set for my backup retention period?',
      answers: ['15 days', '30 days', '35 days', '45 days'],
      answerCorrect: 2
    },
    {
      question: 'How are charges calculated for data transferred between Amazon Relational Database Service (Amazon RDS) and Amazon Elastic Compute Cloud (Amazon EC2) instances in the same Availability Zone?',
      answers: ['GB out from Amazon RDS', 'GB in from Amazon RDS', 'IOPS from Amazon EC2', 'There is no charge'],
      answerCorrect: 3
    },
    {
      question: 'Amazon Relational Database Service (Amazon RDS) automated backups and DB snapshots are currently supported for which storage engine?',
      answers: ['JDBC', 'ODBC', 'InnoDB', 'MyISAM'],
      answerCorrect: 2
    },
    {
      question: 'In Amazon CloudWatch, which metric monitors the amount of free space on a DB instance?',
      answers: ['FreeStorageTotal', 'FreeStorageVolume', 'FreeStorageSpace', 'FreeRDSStorage'],
      answerCorrect: 2
    },
    {
      question: 'Which metric should be monitored carefully in order to know when a Read Replica should be recreated if it becomes out of sync due to replication errors?',
      answers: ['ReadLag', 'ReadReplica', 'ReplicaLag', 'ReplicaThreshold'],
      answerCorrect: 2
    },
    {
      question: 'Can connections between my application and a DB instance be encrypted using Secure Sockets Layer (SSL)?',
      answers: ['Yes', 'No', 'Yes, but only inside an Amazon Virtual Private Cloud (Amazon VPC)', 'Yes, but only inside certain regions'],
      answerCorrect: 0
    },
    {
      question: 'When using a Multi-AZ deployment, in the event of a planned or unplanned outage of the primary DB instance, Amazon RDS automatically switches to the standby replica. Which DNS record is updated by the automatic failover mechanism and points to the standby DB instance?',
      answers: ['The A Record', 'CNAME', 'MX', 'SOA'],
      answerCorrect: 1
    },
    {
      question: 'Is it possible to force a failover for a MySQL Multi-AZ DB instance deployment?',
      answers: ['Yes', 'No', 'Only in certain regions', 'Only in Amazon VPC'],
      answerCorrect: 0
    },
    {
      question: 'What is the range, in days, to which the backup retention period can be set?',
      answers: ['From 1 day to 7 days', 'From 1 day to 28 days', 'From 1 day to 35 days', 'From 1 day to 90 days'],
      answerCorrect: 2
    },
    {
      question: 'After inadvertently deleting a database table, which Amazon RDS feature will allow you to restore a database reliably to within five minutes of the deletion?',
      answers: ['Amazon RDS Automated Backup', 'Multi-AZ Amazon RDS', 'Amazon RDS Read Replicas', 'Amazon RDS Snapshots'],
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
