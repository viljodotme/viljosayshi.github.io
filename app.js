var timer = true;
var over = '<div id="over" class="alert alert-dismissible alert-warning">     <p>The timer has finished!</p></div>';
var remaining = $("<h4 class='remaining'></h4>").text('Remaining Time');
var now;
var end;
var timeRemaining = '';
var tempTime;
var hours;
var minutes;
var seconds;
var time = '<p class="time"><b>' + hours + '</b> Hours, <b>' + minutes + '</b> Minutes, <b>' + seconds + '</b> Seconds';
var loop;

var endSound = new Howl({
  urls: ['alarm.mp3'],
  loop: true,
  onloaderror: function() {
    raiseError('4eZBGoTb', 'An error occured trying to sound the timer alarm!');
  }
});

$('#thatformthing').on('submit', function () {
    runTimer();
 });

$('#start').click(function (){
  if (timer == false) {
    raiseError('DdKwfCaZ', 'An instance of the timer is already running!');
    return false;
  }
  runTimer();
});

$('#reset').click(function () {
  if (timer == false){
    clearInterval(loop);
  }
  else {
    raiseError('3Tpl1z5a', "The timer is not running!");
    return false;
  }
  endSound.stop();
  timer = true;
  $('.remaining').remove();
  $('.time').remove();
  $('#over').remove();
  $('#form').show(1000);
  $('input').val('');
  console.log('Reset the form.');
});

function runTimer() {
    endTime = document.querySelector('#endTime').value;
    var re = new RegExp ("\\d\\d:\\d\\d:\\d\\d","g");
    if (endTime == null || endTime == '') {
      raiseError('TcLO8hJ1', 'You must fill in all fields!');
      return false;
    };
    if (re.test(endTime) == false){
      raiseError('xZh2TfJ3', 'You must match the format!');

      $('input').val('');
      return false;
    };
    timer = false;
    $('#form').hide(1000);
    loop = setInterval(timerFunction, 1000);
};

function raiseError(errorID, errorText) {
  console.log("An error occured\n" + errorID + ": " + errorText);
  $('#error-id').text(errorID);
  $('#error-body').text(errorText);
  $('#error').modal({
    fadeDuration: 350,
    fadeDelay: 0,
    escapeClose: true,
    clickClose: false,
    showClose: false
  });
};

function timerFunction() {
  $('.remaining').remove();
  $('.time').remove();
  $('#over').remove();
  now = moment.now();
  end = moment(endTime, 'HH:mm:ss');
  tempTime = moment.duration(timeRemaining);
  hours = tempTime.hours();
  minutes = tempTime.minutes();
  seconds = tempTime.seconds();
  if (now < end) {
      time = '<p class="time"><b>' + hours + '</b> Hours, <b>' + minutes + '</b> Minutes, <b>' + seconds + '</b> Seconds';
      timeRemaining = end - now;
      $('#text').append(remaining, time);
  } else if (now > end) {
      $('#text').append(over);
      clearInterval(loop);
      endSound.play();
  }
};