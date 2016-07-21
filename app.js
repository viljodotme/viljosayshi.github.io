var timer = true;
var over = '<div id="over" class="alert alert-dismissible alert-warning">     <p>The timer has finished!</p></div>';
var remaining = "<h4 class='remaining'>Remaining Time </h4>";
var now;
var end;
var timeRemaining = '';
var tempTime;
var hours;
var minutes;
var seconds;
var time = '<p class="time"><b>' + hours + '</b> Hours, <b>' + minutes + '</b> Minutes, <b>' + seconds + '</b> Seconds </div>';
var loop;

var endSound = new Howl({
  urls: ['alarm.mp3'],
  loop: true,
  onloaderror: function() {
    raiseError('4eZBGoTb', 'Oh no, an error occured while trying to play the alarm. The timer has finished, though.');
  }
});

$('#thatformthing').on('submit', function () {
    runTimer();
 });

$('#start').click(function (){
  if (timer == false) {
    raiseError('DdKwfCaZ', 'You can\'t start the timer twice, silly. It\'s already running.');
    return false;
  }
  runTimer();
});

$('#reset').click(function () {
  if (timer == false){
    clearInterval(loop);
  }
  else {
    raiseError('3Tpl1z5a', "The timer isn't running yet, how can you reset it if it's not already running?");
    return false;
  }
  endSound.stop();
  timer = true;
  $('#remaining').remove();
  $('.remaining').remove();
  $('.time').remove();
  $('#over').remove();
  $('#form').show(1000);
  $('input').val(''); 
});

function runTimer() {
    endTime = document.querySelector('#endTime').value;
    var re = new RegExp ("\\d\\d:\\d\\d","g");
    if (endTime == null || endTime == '') {
      raiseError('TcLO8hJ1', 'Hey buddy, can you make sure to enter a time? I can\'t read minds...');
      return false;
    };
    if (re.test(endTime) == false){
      raiseError('xZh2TfJ3', 'The format for the timer isn\'t being matched, oh dear. This is a code error, please report it.');

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
      time = '<p class="time"><b>' + hours + '</b> Hours, <b>' + minutes + '</b> Minutes, <b>' + seconds + '</b> Seconds </div>';
      toAppend = remaining + time;
      timeRemaining = end - now;
      $('#text').append(toAppend);
  } else if (now > end) {
      $('#text').append(over);
      clearInterval(loop);
      endSound.play();
  }
};