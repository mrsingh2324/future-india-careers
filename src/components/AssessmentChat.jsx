// src/components/AssessmentChat.js
import React, { useState } from 'react';
import axios from 'axios';

const DEFAULT_QUESTION = "What are your strengths and interests in school?";

// 🔐 INSERT YOUR OpenRouter API Key below (or use env variable via backend)
const OPENROUTER_API_KEY = 'your-api-key-here';

const AssessmentChat = () => {
  const [conversation, setConversation] = useState([
    { question: DEFAULT_QUESTION, answer: "" }
  ]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const callDeepSeek = async (history) => {
    const lastEntry = history[history.length - 1];
    const prompt = `
You are a counselling expert. We want to understand the career path for a student.

We asked: "${lastEntry.question}"
The student answered: "${lastEntry.answer}"

Now, ask a logical follow-up question. Return ONLY in this JSON format:
{ "question": "your next question here" }

At the end of 10-15 questions, return:
{ "recommendation": "best suited career path" }
    `.trim();

    const payload = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: "You are a helpful AI career counselor." },
        { role: "user", content: prompt }
      ]
    };

    const headers = {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      { headers }
    );

    const reply = response.data.choices[0].message.content;
    return JSON.parse(reply);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const updated = [...conversation];
    updated[updated.length - 1].answer = currentAnswer;
    setConversation(updated);
    setCurrentAnswer("");
    setLoading(true);

    try {
      const result = await callDeepSeek(updated);
      if (result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        setConversation([...updated, { question: result.question, answer: "" }]);
      }
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-chat">
      <h2>Career Path Assessment</h2>
      <ul>
        {conversation.map((entry, i) => (
          <li key={i}>
            <strong>Q{i + 1}:</strong> {entry.question}
            {entry.answer && <div><strong>You:</strong> {entry.answer}</div>}
          </li>
        ))}
      </ul>

      {!recommendation && (
        <form onSubmit={handleAnswerSubmit}>
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}

      {recommendation && (
        <div className="result">
          <h3>📌 Recommended Career Path</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default AssessmentChat;
