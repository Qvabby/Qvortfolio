// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    //$("#q").attr('id', 'qbounce').addClass("gr").css("left", "0");
    //$("#v").attr('id', 'vbounce').addClass("gr");
    //$("#a").attr('id', 'abounce').addClass("gr");
    //$("#b").attr('id', 'bbounce').addClass("gr");
    //$("#b2").attr('id', 'b2bounce').addClass("gr");
    //$("#y").attr('id', 'ybounce').addClass("gr");
    //$("#t").attr('id', 'tbounce').addClass("gr");
    //$("#e").attr('id', 'ebounce').addClass("gr");

    $("#q").slideUp(0).delay(200).fadeIn(150).animate({
        top: '50px'
    });
    

    $("#v").slideUp(0).delay(400).fadeIn(200).animate({
        top: '90px'
    });
    $("#a").slideUp(0).delay(700).fadeIn(250).animate({
        top: '130px'
    });
    $("#b").slideUp(0).delay(1050).fadeIn(300).animate({
        top: '175px'
    });
    $("#b2").slideUp(0).delay(1400).fadeIn(350).animate({
        top: '219px'
    });
    $("#y").slideUp(0).delay(1800).fadeIn(400).animate({
        top: '252px'
    });
    $("#t").slideUp(0).delay(2200).fadeIn(450).animate({
        top: '307px'
    });
    $("#e").slideUp(0).delay(2750).fadeIn(500).animate({
        top: '344px'
    });
});

$(document).ready(function () {
    $("#qvabbyteimage").delay(150).animate({ opacity: 1, top: "40px" }, 'slow', );
    moveUp();
    moveDown();
}) 
//function gl($param) {
//    $param.delay(100).animate({ left: "-5px" }, { duration: 100, queue: false })
//    $param.addClass("gr")
//    $param.removeClass("gl")
//    gr($param);
    
//}
//function gr($param) {
//    $param.delay(100).animate({ left: "5px" }, {duration:100, queue: false })
//    $param.addClass("gl")
//    $param.removeClass("gr")
//    gl($param);
//}
function moveDown() {
    $("#qvabbyteimage").animate({ opacity: 1, top: '3px' }, 600, )
    moveUp()
}
function moveUp() {
    $("#qvabbyteimage").animate({ opacity: 0.90, top: "-3px" }, 600,);
    moveDown()
}