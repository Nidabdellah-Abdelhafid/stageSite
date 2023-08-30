

(function ($) {

  
    
    
    "use strict";

    $(document).ready(function() {
    
        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var slidesPerPage = 4; //globaly define number of elements per page
        var syncedSecondary = true;
        
        sync1.owlCarousel({
          items : 1,
          slideSpeed : 2000,
          nav: true,
          autoplay: false,
          dots: true,
          loop: true,
          responsiveRefreshRate : 200,
        
        }).on('changed.owl.carousel', syncPosition);
        
        sync2
          .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
          })
          .owlCarousel({
          items : slidesPerPage,
          dots: true,
          nav: true,
          smartSpeed: 200,
          slideSpeed : 500,
          slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
          responsiveRefreshRate : 100
        }).on('changed.owl.carousel', syncPosition2);
        
        function syncPosition(el) {
          //if you set loop to false, you have to restore this next line
          //var current = el.item.index;
          
          //if you disable loop you have to comment this block
          var count = el.item.count-1;
          var current = Math.round(el.item.index - (el.item.count/2) - .5);
          
          if(current < 0) {
            current = count;
          }
          if(current > count) {
            current = 0;
          }
          
          //end block
        
          sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
          var onscreen = sync2.find('.owl-item.active').length - 1;
          var start = sync2.find('.owl-item.active').first().index();
          var end = sync2.find('.owl-item.active').last().index();
          
          if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
          }
          if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
          }
        }
        
        function syncPosition2(el) {
          if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
          }
        }
        
        sync2.on("click", ".owl-item", function(e){
          e.preventDefault();
          var number = $(this).index();
          sync1.data('owl.carousel').to(number, 300, true);
        });
    });
    $('#circuit-2').owlCarousel({
        stagePadding: 150,
        autoplay: true,
        dots: false,
        loop: true,
        responsive: {
            0: {
                stagePadding: false,
                items: 1,
                dots: true,

                nav: false,
            },
            600: {
                stagePadding: false,
                items: 2,
                dots: true,

                nav: false,


            },
            1000: {
                items: 2,
                nav: true,
            },
            1440: {
                items: 2,
                nav: true,
            }
        }

    });
    $('#circuit-1').owlCarousel({
        stagePadding: 200,
        loop: true,
        margin: 10,
        nav: false,
        items: 1,
        lazyLoad: true,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 60,


            },
            600: {

                items: 1,
                stagePadding: 100
            },
            1000: {
                items: 1,
                stagePadding: 200
            },
            1200: {
                items: 1,
                stagePadding: 250
            },
            1400: {
                items: 1,
                stagePadding: 300
            },
            1600: {
                items: 1,
                stagePadding: 350
            },
            1800: {
                items: 1,
                stagePadding: 400
            }
        }
    })



    $('#carousel1').owlCarousel({
        autoplay: true,
        dots: true,
        margin: 20,
        nav: false,
        loop: true,
        responsive: {
            0: {
                items: 1,

            },
            600: {
                items: 2,


            },
            1000: {
                items: 4,


            }
        }

    });
    $('#offres').owlCarousel({
        stagePadding: 150,
        autoplay: true,
        dots: false,
        loop: true,
        responsive: {
            0: {
                stagePadding: false,
                items: 1,
                dots: true,
                dotsEach: 5,
                nav: false,
            },
            600: {
                stagePadding: false,
                items: 2,
                dots: true,

                nav: false,


            },
            1000: {
                items: 2,
                nav: true,
            },
            1440: {
                items: 2,
                nav: true,
            }
        }

    });

    $('#circuit').owlCarousel({
        stagePadding: 150,
        autoplay: true,
        dots: false,
        loop: true,
        responsive: {
            0: {
                stagePadding: false,
                items: 1,
                dots: true,

                nav: false,
            },
            600: {
                stagePadding: false,
                items: 2,
                dots: true,

                nav: false,


            },
            1000: {
                items: 3,
                nav: true,
            }
        }

    });
    $('.owl-2').owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 30,
        margin: 20,
        smartSpeed: 1000,
        autoplay: true,
        nav: true,
        dots: true,
        pauseOnHover: false,
        responsive: {
            600: {

                margin: 20,
                nav: true,
                items: 2
            },
            1000: {
                margin: 20,
                stagePadding: 0,
                nav: true,
                items: 4
            }
        }
    });
    // Mobile Mmenu
    var $menu = $("nav#menu").mmenu({
        "extensions": ["pagedim-black"],
        counters: true,
        keyboardNavigation: {
            enable: true,
            enhance: true
        },
        navbar: {
            title: 'MENU'
        },
        navbars: [{ position: 'bottom', content: ['<a href="/static">© 2021 fractalite</a>'] }]
    },
        {
            // configuration
            clone: true,
            classNames: {
                fixedElements: {
                    fixed: "menu_fixed",
                    sticky: "sticky"
                }
            }
        });
    var $icon = $("#hamburger");
    var API = $menu.data("mmenu");
    $icon.on("click", function () {
        API.open();
    });
    API.bind("open:finish", function () {
        setTimeout(function () {
            $icon.addClass("is-active");
        }, 100);
    });
    API.bind("close:finish", function () {
        setTimeout(function () {
            $icon.removeClass("is-active");
        }, 100);
    });

    $(".flight-item .flight-plan").hide();

    $(".flight-item .btn-stopover").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.flight-item').find('.flight-plan').toggle("easy");
    });

    // FILTERS WIDGETS

    $(".filter-item .filter-item-header").on("click", function (e) {
        e.preventDefault();
        $(this).parent().find(".filter-item-body").slideToggle("slow");
    });
})(window.jQuery);
$(document).ready(function () {
    $('.menu-dropdown').click(function () {
    });
});



$(document).ready(function () {
    $('#menu-sidebar, #close-menu').click(function () {
        var sidebar = $('.menu-side-bar').first();
        var overlay = $('.side-bar-overlay').first();
        if (sidebar.hasClass('show')) {
            sidebar.removeClass('show');
            overlay.removeClass('show');
        } else {
            sidebar.addClass('show');
            overlay.addClass('show');
        }
    });

    $('#profile-sidebar, #close-profile').click(function () {
        var sidebar = $('.profile-side-bar').first();
        var overlay = $('.side-bar-overlay').first();
        if (sidebar.hasClass('show')) {
            sidebar.removeClass('show');
            overlay.removeClass('show');
        } else {
            sidebar.addClass('show');
            overlay.addClass('show');
        }
    });


    $(".menu-dropdown").click(function (event) {
        let target = $(event.target);
        if (target.is("li")) {
            if (target.hasClass('open')) {
                target.removeClass('open');
            } else {
                target.addClass('open');
            }
        }
    })
});



// *********DETAIL-PAGE-SCRIPT********* //
function close_panel_dropdown() {
    $('.nice-select').removeClass("open");
}
$('.nice-select button').on('click', function (e) {
    if ($(this).parent().is(".open")) {
        close_panel_dropdown();
    } else {
        close_panel_dropdown();
        $(this).parent().addClass('open');
    }
    e.preventDefault();
});

// Closes dropdown on click outside the conatainer
var mouse_is_inside = false;

$('.nice-select').hover(function () {
    mouse_is_inside = true;
}, function () {
    mouse_is_inside = false;
});

$("body").mouseup(function () {
    if (!mouse_is_inside) close_panel_dropdown();
});

function hidemodal() {
    console.log("HERE");
    $("#flights-modal-det").modal('hide');
}

// the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:checkbox").on('click', function () {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});

$(".rotate").click(function () {
    $(this).toggleClass("down");
})








$(document).ready(function () {
    $('select').niceSelect();
});

$(".rotate").click(function () {
    $(this).toggleClass("down");
})



// !function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

