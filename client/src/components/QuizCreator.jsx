import React, { useState } from "react";
import "./QuizCreator.css";

const QuizCreator = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [], correctAnswers: [], answerType: "single" }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: [],
        correctAnswers: [],
        answerType: "single"
      }
    ]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const quizData = { title, questions };
    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData)
      });
      const data = await res.json();
      console.log("Quiz created:", data);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="quiz-creator-container">
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <div className="question-text">
            <input
              type="text"
              className="input-field"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].questionText = e.target.value;
                setQuestions(newQuestions);
              }}
            />
          </div>
          <div className="options-container">
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                className="option-input"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
              />
            ))}
            <button
              className="add-option-btn"
              onClick={() => handleAddOption(index)}
            >
              Add Option
            </button>
          </div>
        </div>
      ))}
      <button className="add-question-btn" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizCreator;
