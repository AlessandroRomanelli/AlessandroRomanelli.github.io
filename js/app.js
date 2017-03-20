$(document).ready(function(){
  //FullPage.js plugin settings
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

  //==================================== ANIMATION
    init("#canvas1", 25, false, 25);
    setTimeout(function(){
      $(".title").addClass("invert");
      $(".my-projects").addClass("my-inverted");
      $(".sidelink").fadeIn(1000);
      $(".about-content").show()
    },2500);

  //==================================== SVG LOADING
    $(".social-media").load("svgstore.html");

    //================================== SIDELINK INTERACTIVITY
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

      //==================================== ABOUT PROFILE JSON

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
      skillsHTML += "</ul>";
      $(".skills").append(skillsHTML);

      var latestBadges = [];
      for (i=1; i < 9; i++) {
        latestBadges.push(data.badges[data.badges.length-i]);
      }

      var badgesHTML = "<ul>";
      $.each(latestBadges, function(index, badge) {
        badgesHTML += "<li><a href="+badge.url+" target='_blank'>";
        badgesHTML += "<img class='badge-img' src="+badge.icon_url+"></a></li>";
      });
      badgesHTML += "</ul>";
      $(".badges").append(badgesHTML);

      var delta = points.total;
      for (var i=0; i < 4; i++) {
        delta -= sortable[i][1];
      }

      var total = points.total - delta;

      function genPerc (x) {
        return Math.round(x[1]/total*100);
      };

      var firstPerc = genPerc(sortable[0]);
      var secondPerc = genPerc(sortable[1]);
      var thirdPerc = genPerc(sortable[2]);
      var fourthPerc = genPerc(sortable[3]);

      window.onhashchange = function(){
        if (location.hash === "#firstPage") {
          setTimeout(function(){
            $(".first-skill").css("width", firstPerc+"%");
            $(".second-skill").css("width", secondPerc+"%");
            $(".third-skill").css("width", thirdPerc+"%");
            $(".fourth-skill").css("width", fourthPerc+"%");
          },750);
        };
      };
    }); //END .getJSON

    $.get("https://ipinfo.io", function (response) {
      let country = response.country;
      $.get("greetings.xml", function(xml) {
        let greeting = xml.getElementsByTagName(country)[0].childNodes[1].childNodes[0].nodeValue;
        console.log(greeting);
        $(".about-content h1:first").text(greeting);
      }, "xml");
    }, "jsonp");

}); //END Doc.ready
