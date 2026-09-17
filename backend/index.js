require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Subscriber = require("./models/Subscriber");
const Feedback = require("./models/Feedback");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, {
  family: 4,
})
.then(() => {
    console.log("MongoDB Connected Successfully!");
})
.catch((err) => {
    console.log("MongoDB Connection Failed:", err);
});

app.get("/", (req, res) => {
    res.send("Makshroom Backend is Running 🚀");
});
app.post("/subscribe", async (req, res) => {

    try {

        const subscriber = new Subscriber({
            email: req.body.email
        });

        await subscriber.save();

        res.send("Subscription Saved Successfully!");

    } 
    catch (error) {

    if (error.code === 11000) {
        return res.status(400).send("You are already subscribed.");
    }

    console.log(error);

    res.status(500).send("Something went wrong");

}

});

app.post("/feedback", async (req, res) => {

    try {

        const feedback = new Feedback(req.body);

        await feedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });

    }

});

app.get("/feedback", (req, res) => {
    res.send("Feedback route is working!");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});