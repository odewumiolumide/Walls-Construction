
const employmentForm = document.getElementById("employmentForm");
const coverLetter = document.getElementById("cover_letter");
const characterCounter = document.getElementById("coverLetterCounter");


// ================================
// LIVE CHARACTER COUNTER
// ================================
if (coverLetter && characterCounter) {

    coverLetter.addEventListener("input", function () {

        const currentLength = this.value.length;

        characterCounter.textContent =
            `Characters: ${currentLength.toLocaleString()} / 1,000`;
    });

}


// ================================
// FORM SUBMISSION
// ================================
if (employmentForm) {

    employmentForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');

        // Prevent multiple submissions
        submitButton.disabled = true;
        submitButton.innerText = "SUBMITTING...";


        try {

            const response = await fetch(form.action, {

                method: "POST",

                body: new FormData(form),

                headers: {
                    "Accept": "application/json"
                }

            });


            // ================================
            // SUCCESS
            // ================================
            if (response.ok) {

                // Clear the form
                form.reset();

                // Reset character counter
                if (characterCounter) {
                    characterCounter.textContent =
                        "Characters: 0 / 1,000";
                }

                // Reload page
                window.location.reload();

            }


            // ================================
            // FORM ERROR
            // ================================
            else {

                alert(
                    "There was a problem submitting your application. Please try again."
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "SUBMIT APPLICATION";
            }

        }


        // ================================
        // CONNECTION ERROR
        // ================================
        catch (error) {

            alert(
                "Unable to submit your application. Please check your internet connection and try again."
            );

            submitButton.disabled = false;

            submitButton.innerText =
                "SUBMIT APPLICATION";
        }

    });

}
