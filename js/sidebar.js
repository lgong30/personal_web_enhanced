/**
 * Created by longgong on 1/13/17.
 */
jQuery(document).ready(function() {

    if (jQuery(".col-sidebar").length)
    {
        var topOffset = jQuery(".col-sidebar").offset().top;




        jQuery(window).scroll(function() {

            var scrollPos = jQuery(window).scrollTop();

            if (scrollPos >= topOffset) {
                jQuery(".col-sidebar").stop().animate({
                    marginTop: jQuery(window).scrollTop() - topOffset + 50
                },2);

            } else {

                jQuery(".col-sidebar").stop().animate({
                    marginTop: 0
                },2);

            }

        });
    }


});