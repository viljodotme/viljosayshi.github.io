function easterEgg() {
  console.log("Easter egg activated");
  $('#egg').modal({
    fadeDuration: 350,
    fadeDelay: 0,
    escapeClose: true,
    clickClose: false,
    showClose: false
  });
};

cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
  easterEgg();
});

cheet('m i n e m a n', function(){
  window.location = 'https://xor.li/a34049d1';
})