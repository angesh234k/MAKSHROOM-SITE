const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
{
    name: String,
    email: String,
    subject: String,
    message: String,

    product: String,
    favouriteFlavour: String,
    customFlavour: String,

    snackFrequency: String,
    pricePreference: String,
    buyLocation: String,

    additionalSuggestion: String
},
{
    timestamps: true
});

module.exports = mongoose.model("Feedback", feedbackSchema);