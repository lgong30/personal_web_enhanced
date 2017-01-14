/**
 * Created by longgong on 1/13/17.
 */
jQuery(document).ready(function () {

    // set timeout onDomReady
    $(function() {
        setTimeout(delayedFragmentTargetOffset, 20);
    })

    $(".taglink").click(function(){

        // var targetId = $(this).attr("data-target-cate");
        //
        // alert(targetId);



        setTimeout(delayedFragmentTargetOffset, 20);

        // if ($(".dummyinput").length) {
        //
        //     var firstTagId = $(".dummyinput").val();
        //
        //     if (firstTagId == targetId) {
        //
        //         $(targetId).css("margin-top", 50);
        //     }
        // }

    });

});

// add scroll offset to fragment target (if there is one)
function delayedFragmentTargetOffset(){
    var offset = $(':target').offset();
    if(offset){
        var scrollto = offset.top - 100; // minus fixed header height
        $('html, body').animate({scrollTop:scrollto}, 0);
    }
}