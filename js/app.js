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
    controlArrows: false,
    keyboardScrolling: false
  });
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    setTimeout(function() {
      init("#canvas1", 25, true, 25);
      setTimeout(function() {
        localStorage.setItem("hasCodeRunBefore", true);
        $(".sidelink").fadeIn(1000);
        $(".title").addClass("invert");
        $(".my-projects").addClass("my-inverted");
      },12000);
    },3500);
  } else {
    init("#canvas1", 25, false, 25);
    setTimeout(function(){
      $(".title").addClass("invert");
      $(".my-projects").addClass("my-inverted");
      $(".sidelink").fadeIn(1000);
    },3000);

  }

    $(".social-media").load("svgstore.html");

    $(".sidelink").click(function(){
      var about = "<a href='#firstPage/slide1'>About</a>";
      var mail = "<a href='#firstPage/slide3'>aleromrod@gmail.com</a>";
      var mainFromL = "<a href='#firstPage/slide2'>&#9661;</a>";
      var mainFromR = "<a href='#firstPage/slide2'>&#9651;</a>";
      $(".sidelink").fadeOut();
      if ($(this).hasClass("text-l")) {
        init("#canvas2", 3, true, 150);
      }
      setTimeout(function(clicked){
        if (clicked.hasClass("text-l")) {
          $(".nav-right").removeClass("text-r");
          $(".nav-right").html(mainFromL);
          $(".nav-right").addClass("arrow arrow-r");
          $(".nav-right").fadeIn();
        } else if (clicked.hasClass("arrow-r")) {

          clicked.html(mail);
          $(".nav-right").addClass("text-r");
          $(".nav-right").removeClass("arrow arrow-r");
          $(".sidelink").fadeIn();

        } else if (clicked.hasClass("text-r")) {
          $(".nav-left").removeClass("text-l");
          $(".nav-left").html(mainFromR);
          $(".nav-left").addClass("arrow arrow-l");
          $(".nav-left").fadeIn();

        } else if (clicked.hasClass("arrow-l")) {

          clicked.html(about);
          $(".nav-left").addClass("text-l");
          $(".nav-left").removeClass("arrow arrow-l");
          $(".sidelink").fadeIn();
        }
      }, 750, $(this))
    });
});
