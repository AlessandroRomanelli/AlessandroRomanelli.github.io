$(document).ready(function(){
  $('#fullpage').fullpage({
    menu: '#menu',
    lockAnchors: false,
    anchors:['firstPage', 'secondPage'],
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
  });
  setTimeout(function() {
    init("#canvas1", 25);
    $(".sidelink").fadeIn(1000);
  },2500);
});
