"use client";

import { useState } from "react";
import Screen1 from "./component/Screen1";
import Screen2 from "./component/Screen2";
import Screen3 from "./component/Screen3";
import Screen4 from "./component/Screen4";
import UrgencyTicker from "./component/UrgencyTicker";

export default function Home() {
  const [screen, setScreen]               = useState(1);
  const [institutionType, setInstitutionType] = useState(null);
  const [userAnswers, setUserAnswers]     = useState(Array(15).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores]               = useState(null);

  function handleComplete(computedScores) {
    setScores(computedScores);
    setScreen(4);
  }

  function handleRetake() {
    setScreen(1);
    setInstitutionType(null);
    setUserAnswers(Array(15).fill(null));
    setCurrentQuestion(0);
    setScores(null);
  }

  return (
    <>
      <main
        style={{
          backgroundColor: "var(--color-navy)",
          minHeight: "100vh",
          paddingBottom: 44, // clears the fixed ticker
        }}
      >
        {screen === 1 && (
          <Screen1 onNext={() => setScreen(2)} />
        )}

        {screen === 2 && (
          <Screen2
            onNext={() => setScreen(3)}
            onBack={() => setScreen(1)}
            institutionType={institutionType}
            setInstitutionType={setInstitutionType}
          />
        )}

        {screen === 3 && (
          <Screen3
            onBack={() => setScreen(2)}
            onComplete={handleComplete}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        )}

        {screen === 4 && scores && (
          <Screen4
            scores={scores}
            institutionType={institutionType}
            onRetake={handleRetake}
          />
        )}
      </main>

      {/* Persistent across all screens */}
      <UrgencyTicker />
    </>
  );
}