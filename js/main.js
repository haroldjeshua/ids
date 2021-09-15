(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800
    },

    $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    /* Preloader
    * -------------------------------------------------- */
    var idsPreloader = function () {

        $("html").addClass('cl-preload');

        $WIN.on('load', function () {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            $(".preloader-inner").fadeOut("slow", function () {
                $(".preloader-wrapper").delay(300).fadeOut("slow");
            });

            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

        });
    };

    /* Menu on Scrolldown
    * -------------------------------------------------- */
    var idsMenuOnScrolldown = function () {

        var hdr= $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

        });
    };

    /* Mobile Menu
    * ---------------------------------------------------- */ 
    var idsMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };

    /* Smooth Scrolling
    * ------------------------------------------------------ */
    var idsSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

    /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
    var idsPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };

    /* Animate On Scroll
    * ------------------------------------------------------ */
    var idsAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    /* Alert Boxes
     * ------------------------------------------------------ */
    var idsAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };

    /* Prev Button
    * ------------------------------------------------------ */
    var idsPreviousButton = function() {
        $('.previousButton').click(function(){
            window.history.go(-1); return false;
        });
    };

    var idsSidebar = function() {
        $('.sidebar-menu .sidebar-item.main-trigger').unbind().click(function() {
            ('.sidebar-menu .sidebar-item.main-trigger').removeClass('active');
            $(this).addClass('active');
            $('.main-content').addClass('hidden');
            $('.main-content.' + $(this).attr('data-main')).removeClass('hidden');
            $('.page').removeClass('toggle');
            $('.ids-sidebar').removeClass('active');
            $('html, body').animate({ scrollTop: 0 }, 'fastest');
            return false;
        });
    };

    (function idsInit() {
        idsPreloader();
        idsMenuOnScrolldown();
        idsMobileMenu();
        idsSmoothScroll();
        idsPlaceholder();
        idsAOS();
        idsAlertBoxes();
        idsPreviousButton();
        idsSidebar();
    })();

})(jQuery);