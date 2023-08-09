import React, { useState } from "react";

const Try = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [questions, setQuestions] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields and questions
    if (!company || !position || questions.some((q) => !q)) {
      setErrorMessage("Please provide all fields and questions");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Prepare request body
      const requestBody = {
        company,
        position,
        questions,
      };

      const response = await fetch("/api/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error creating job");
      }

      // Handle successful job creation
      const data = await response.json();
      // console.log(data.job);
      // Reset form and error message
      setCompany("");
      setPosition("");
      setQuestions(["", "", "", "", ""]);
      setErrorMessage("");
    } catch (error) {
      console.error("Job creation error:", error.message);
      setErrorMessage("Error creating job");
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <h4>Questions</h4>
          {questions.map((question, index) => (
            <div key={index}>
              <label>Question {index + 1}</label>
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default Try;
