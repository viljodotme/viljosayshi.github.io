var timer = true;
var over = '<div id="over" class="alert alert-dismissible alert-warning">     <p>The timer has finished!</p></div>';
var remaining = $("<h4 class='remaining'></h4>").text('Remaining Time');

var loop;

$('#thatformthing').on('submit', function () {
    runTimer();
 });

$('#start').click(function (){
  console.log('Clicked start, running timer.');
  runTimer();
});

$('#reset').click(function () {
  if (timer == false){
    clearInterval(loop);
  }
  else {
    console.log("The timer has not been created yet!");
    return false;
  }
  $('.remaining').remove();
  $('.time').remove();
  $('#over').remove();
  $('#form').show(1000);
  console.log('Reset the form.');
});

function runTimer() {
    timer = false;
    endTime = document.querySelector('#endTime').value;
    var re = new RegExp ()
    if (endTime == null || endTime == '') {
      alert('You must fill in all fields!');
      console.log('No blank fields!');
      return false;
    }
    $('#form').hide(1000);  
    var now = moment.now();
    var end = moment(endTime, 'HH:mm:ss');
    var timeRemaining = '';
    var tempTime = moment.duration(timeRemaining);
    var hours = tempTime.hours();
    var minutes = tempTime.minutes();
    var seconds = tempTime.seconds();
    var time = '<p class="time"><b>' + hours + '</b> Hours, <b>' + minutes + '</b> Minutes, <b>' + seconds + '</b> Seconds';
    loop = setInterval(function() {
        $('.remaining').remove();
        $('.time').remove();
        $('#over').remove();
        now = moment.now();
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
        }
    }, 1000);
};