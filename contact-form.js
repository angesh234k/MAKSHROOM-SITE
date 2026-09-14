const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const feedbackData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value,

        product: document.querySelector('input[name="product"]:checked')?.value || "",

        favouriteFlavour: document.querySelector('input[name="flavour"]:checked')?.value || "",

        customFlavour: document.getElementById("customFlavour").value,

        snackFrequency: document.getElementById("snackFrequency").value,

        pricePreference: document.getElementById("pricePreference").value,

        buyLocation: document.getElementById("buyLocation").value,

        additionalSuggestion: document.getElementById("additionalSuggestion").value

    };

    try {

        const response = await fetch("http://localhost:5000/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(feedbackData)

        });

        const result = await response.json();

        alert(result.message);

        if (result.success) {

            form.reset();

        }

    } catch (error) {

        console.error(error);

        alert("Unable to submit feedback.");

    }

});