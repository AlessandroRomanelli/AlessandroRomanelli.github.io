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

  //On first visit animation
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
  //Normal animation
  } else {
    init("#canvas1", 25, false, 25);
    setTimeout(function(){
      $(".title").addClass("invert");
      $(".my-projects").addClass("my-inverted");
      $(".sidelink").fadeIn(1000);
    },3000);

  }
    //SVG Social Media
    $(".social-media").load("svgstore.html");

    //Animation of sidelinks
    $(".sidelink").click(function(){
      var about = "<a href='#firstPage/slide1'>About</a>";
      var mail = "<a href='#firstPage/slide3'>aleromrod@gmail.com</a>";
      var mainFromL = "<a href='#firstPage/slide2'>&#9661;</a>";
      var mainFromR = "<a href='#firstPage/slide2'>&#9651;</a>";
      $(".sidelink").fadeOut();
      if ($(this).hasClass("text-l")) {
        init("#canvas2", 3, true, 250);
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
    $.getJSON("https://teamtreehouse.com/alessandroromanelli.json", function renderProgressbar(data) {
      var points = data.points;

      var sortable = [];
      for (var skill in points) {
        sortable.push([skill, points[skill]]);
      };
      sortable.sort(function(a,b){
        return b[1] - a[1];
      });
      sortable = sortable.slice(1,5);

      var skillsHTML = "<ul>";
      $.each(sortable, function (index, skill) {
        skillsHTML += "<li>"+skill[0]+"</li>";
      });
      skillsHTML += "<li>Others</li>";
      skillsHTML += "</ul>";
      $(".skills").append(skillsHTML);

      function genPerc (x) {
        return Math.round(x[1]/points.total*100);
      };

      var firstPerc = genPerc(sortable[0]);
      var secondPerc = genPerc(sortable[1]);
      var thirdPerc = genPerc(sortable[2]);
      var fourthPerc = genPerc(sortable[3]);

      $(".text-l").click(function(){
        setTimeout(function(){
          $(".first-skill").css("width", firstPerc+"%");
          $(".second-skill").css("width", secondPerc+"%");
          $(".third-skill").css("width", thirdPerc+"%");
          $(".fourth-skill").css("width", fourthPerc+"%");
        },750);
      });
    });
});
