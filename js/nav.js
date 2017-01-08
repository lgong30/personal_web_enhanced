jQuery(document).ready(function() {

    var navOffset = jQuery("nav").offset().top;

    jQuery(window).scroll(function() {

        var scrollPos = jQuery(window).scrollTop();

        if (scrollPos >= navOffset) {
            jQuery("nav").addClass("fixed");
        } else {
            jQuery("nav").removeClass("fixed");
        }

    });

});