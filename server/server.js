const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors()); // To allow cross-origin requests from React frontend
app.use(bodyParser.json()); // To parse incoming JSON requests

// Mock database (in-memory store)
let quizzes = [];

// POST route to create a new quiz
app.post("/api/quizzes", (req, res) => {
  const quizData = req.body;
  if (!quizData.title || !quizData.questions) {
    return res
      .status(400)
      .json({ message: "Title and questions are required" });
  }

  // Save the quiz data
  quizzes.push(quizData);
  console.log("Quiz Created:", quizData);

  return res
    .status(201)
    .json({ message: "Quiz created successfully", quiz: quizData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
