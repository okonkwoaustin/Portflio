jQuery(document).ready(function ($) {

    'use strict';

    $(window).load(function () { // makes sure the whole site is loaded
        $(".seq-preloader").fadeOut(); // will first fade out the loading animation
        $(".sequence").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
    })


    $(function () {

        function showSlide(n) {
            // n is relative position from current slide

            // unbind event listener to prevent retriggering
            $body.unbind("mousewheel");

            // increment slide number by n and keep within boundaries
            currSlide = Math.min(Math.max(0, currSlide + n), $slide.length - 1);

            var displacment = window.innerWidth * currSlide;
            // translate slides div across to appropriate slide
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
            // delay before rebinding event to prevent retriggering
            setTimeout(bind, 700);

            // change active class on link
            $('nav a.active').removeClass('active');
            $($('a')[currSlide]).addClass('active');

        }

        function bind() {
            $body.bind('false', mouseEvent);
        }

        function mouseEvent(e, delta) {
            // On down scroll, show next slide otherwise show prev slide
            showSlide(delta >= 0 ? -1 : 1);
            e.preventDefault();
        }

        $('nav a, .main-btn a').click(function (e) {
            // When link clicked, find slide it points to
            var newslide = parseInt($(this).attr('href')[1]);
            // find how far it is from current slide
            var diff = newslide - currSlide - 1;
            showSlide(diff); // show that slide
            e.preventDefault();
        });

        $(window).resize(function () {
            // Keep current slide to left of window on resize
            var displacment = window.innerWidth * currSlide;
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
        });

        // cache
        var $body = $('body');
        var currSlide = 0;
        var $slides = $('.slides');
        var $slide = $('.slide');

        // give active class to first link
        $($('nav a')[0]).addClass('active');

        // add event listener for mousescroll
        $body.bind('false', mouseEvent);
    })


    $('#form-submit .date').datepicker({
    });


    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 100) {
            $(".header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".header").removeClass("active");
        }
    });


});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
    contactName = document.getElementById("contact-name"),
    contactEmail = document.getElementById("contact-email"),
    contactSubject = document.getElementById("contact-subject"),
    contactMessage = document.getElementById("contact-message");
    contactStatus = document.getElementById("contact-status");

const sendEmail = (e) => {
    e.preventDefault();

    // Check if the field has a value
    if (
        contactName.value === "" ||
        contactEmail.value === "" ||
        contactSubject.value === "" ||
        contactMessage.value === ""
    ) {
        // Add and remove color
        contactStatus.classList.remove("color-blue");
        contactStatus.classList.add("color-red");

        // Show message
        contactStatus.textContent = "Please fill in all the fields 📨";
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm(
            "service_xom0swv",
            "template_9oc8to7",
            "#contact-form",
            "5uoT9wGZ7qaUX8zDP"
        )
            .then(
                () => {
                    contactStatus.classList.add("color-blue");
                    contactStatus.textContent = "Message sent successfully ✅";

                    setTimeout(() => {
                        contactStatus.textContent = "";
                    }, 5000);
                },
                (error) => {
                    alert("OOPS! SOMETHING HAS FAILED...", error);
                }
            );

        // To clear the input field
        contactName.value = "";
        contactEmail.value = "";
        contactSubject.value = "";
        contactMessage.value = "";
    }
};
contactForm.addEventListener("submit", sendEmail);