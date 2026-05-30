"use client";

import { useState, useEffect } from "react";
import Wordmark from "./shared/Wordmark";
import CornerBrackets from "./shared/CornerBrackets";
import {
  questions,
  answers,
  getDimensionForQuestion,
  computeScores,
} from "../data/questions";

export default function Screen3({
  onBack,
  onComplete,
  userAnswers,
  setUserAnswers,
  currentQuestion,
  setCurrentQuestion,
}) {
  const selected = userAnswers[currentQuestion] ?? null;
  const [animating, setAnimating] = useState(false);

  const total = questions.length;
  const progress = Math.round((currentQuestion / total) * 100);
  const dimension = getDimensionForQuestion(currentQuestion);
  const isLast = currentQuestion === total - 1;

  function handleSelect(answerId) {
    if (animating) return;

    // Save answer
    const updated = [...userAnswers];
    updated[currentQuestion] = answerId;
    setUserAnswers(updated);

    // Auto-advance after 400ms
    setTimeout(() => {
      if (isLast) {
        const scores = computeScores(updated);
        onComplete(scores);
      } else {
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestion((q) => q + 1);
          setAnimating(false);
        }, 200);
      }
    }, 400);
  }

  function handleBack() {
    if (currentQuestion === 0) {
      onBack();
    } else {
      setCurrentQuestion((q) => q - 1);
    }
  }

  function getAnswerClass(answerId) {
    if (selected !== answerId) return "rac-answer";
    if (answerId === "yes") return "rac-answer selected-yes";
    if (answerId === "partially") return "rac-answer selected-partial";
    return "rac-answer selected-no";
  }

  return (
    <div className="rac-screen animate-fadeIn">
      <CornerBrackets />

      {/* Top Row */}
      <div className="flex items-start justify-between mb-5">
        <Wordmark />
        <button className="rac-back" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-1">
        <div className="rac-progress-track">
          <div
            className="rac-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p
        className="text-right text-xs mb-6"
        style={{ color: "var(--color-light-blue)" }}
      >
        Question {currentQuestion + 1} of {total}
      </p>

      {/* Dimension Pill */}
      <div className="flex justify-center mb-6">
        <div
          className="rac-pill"
          style={{
            borderColor: dimension.color,
            color: dimension.color,
            backgroundColor: "var(--color-navy-card)",
          }}
        >
          <span>{dimension.icon}</span>
          <span
            className="uppercase text-xs font-black tracking-widest"
            style={{ color: dimension.color }}
          >
            {dimension.label}
          </span>
        </div>
      </div>

      {/* Question */}
      <div
        className="flex-1 flex flex-col justify-center"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.2s ease" }}
      >
        <h2
          className="text-white font-bold text-center mb-8 leading-snug"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.375rem)" }}
        >
          {questions[currentQuestion]}
        </h2>

        {/* Answer Buttons */}
        <div className="flex flex-col gap-3">
          {answers.map((answer) => (
            <button
              key={answer.id}
              className={getAnswerClass(answer.id)}
              onClick={() => handleSelect(answer.id)}
              disabled={animating}
            >
              <span className="mr-3">{answer.emoji}</span>
              {answer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <p
        className="text-center text-xs mt-8"
        style={{ color: "var(--color-light-blue)", opacity: 0.6 }}
      >
        Tap an answer to continue automatically
      </p>
    </div>
  );
}
