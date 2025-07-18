$(function () {

    // Initialize form validation
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    // Function to validate form fields
    function validateForm() {
        var name = $("input#name").val().trim();
        var email = $("input#email").val().trim();
        var subject = $("input#subject").val().trim();
        var message = $("textarea#message").val().trim();

        // Clear previous errors
        $('#success').html('');

        // Basic validation
        if (!name || !email || !subject || !message) {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-danger')
                    .append("<strong>Please fill in all fields before sending your message.</strong>");
            $('#success > .alert-danger')
                    .append('</div>');
            return false;
        }

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-danger')
                    .append("<strong>Please enter a valid email address.</strong>");
            $('#success > .alert-danger')
                    .append('</div>');
            return false;
        }

        return true;
    }

    // Function to create formatted messages
    function createFormattedMessages() {
        var name = $("input#name").val().trim();
        var email = $("input#email").val().trim();
        var subject = $("input#subject").val().trim();
        var message = $("textarea#message").val().trim();

        // Create formatted message for WhatsApp
        var whatsappMessage = encodeURIComponent(
            "Hello Abras Nigeria Enterprises,\n\n" +
            "I am contacting you from your website contact form.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Subject: " + subject + "\n\n" +
            "Message:\n" + message + "\n\n" +
            "Please respond at your earliest convenience.\n\n" +
            "Best regards,\n" + name
        );

        // Create formatted message for Email
        var emailSubject = encodeURIComponent("Website Contact: " + subject);
        var emailBody = encodeURIComponent(
            "Hello Abras Nigeria Enterprises,\n\n" +
            "I am contacting you from your website contact form.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Subject: " + subject + "\n\n" +
            "Message:\n" + message + "\n\n" +
            "Please respond at your earliest convenience.\n\n" +
            "Best regards,\n" + name
        );

        return {
            whatsappURL: "https://wa.me/2348036775192?text=" + whatsappMessage,
            emailURL: "mailto:abrasnigeriaent@gmail.com?subject=" + emailSubject + "&body=" + emailBody
        };
    }

    // WhatsApp button click handler
    $("#sendWhatsAppButton").click(function() {
        if (validateForm()) {
            var urls = createFormattedMessages();
            
            // Show success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-success')
                    .append("<strong>Opening WhatsApp with your message...</strong>");
            $('#success > .alert-success')
                    .append('</div>');
            
            // Open WhatsApp
            window.open(urls.whatsappURL, '_blank');
            
            // Reset form after a delay
            setTimeout(function() {
                resetContactForm();
            }, 2000);
        }
    });

    // Email button click handler
    $("#sendEmailButton").click(function() {
        if (validateForm()) {
            var urls = createFormattedMessages();
            
            // Show success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-success')
                    .append("<strong>Opening your email client with the message...</strong>");
            $('#success > .alert-success')
                    .append('</div>');
            
            // Open email client
            window.open(urls.emailURL, '_blank');
            
            // Reset form after a delay
            setTimeout(function() {
                resetContactForm();
            }, 2000);
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});

// Function to reset the contact form
function resetContactForm() {
    $('#contactForm').trigger("reset");
    $('#success').html('');
    $("#sendMessageButton").prop("disabled", false);
}
