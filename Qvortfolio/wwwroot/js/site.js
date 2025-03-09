$(document).ready(function () {
    // Function to apply bounce animation to letters
    function triggerBounce() {
        var letters = $("#qvabbytetext .letterforqvatext");
        letters.each(function (index) {
            var $letter = $(this);
            setTimeout(function () {
                $letter.addClass('bouncing');
                setTimeout(function () {
                    $letter.removeClass('bouncing'); // Remove the class after the animation ends
                }, 800); // Duration of the bounce animation (same as CSS)
            }, index * 200); // Delay between each letter's bounce
        });
    }

    // Call the bounce function every 30 seconds (2 times per minute)
    setInterval(triggerBounce, 3000); // 30 seconds interval

    // Trigger bounce immediately on page load
    triggerBounce();

    // Simplified image animation logic
    function animateImage() {
        $("#qvabbyteimage").animate({ top: '0px', opacity: 1 }, 1000)
            .delay(1000)
            .animate({ top: '10px', opacity: 0.9 }, 1000);
    }

    // Trigger image animation on page load
    animateImage();

    // Keep the image bouncing every 5 seconds (adjust interval as needed)
    setInterval(animateImage, 5000);
});



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
