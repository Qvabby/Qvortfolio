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
