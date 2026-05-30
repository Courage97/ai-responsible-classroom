export const dimensions = [
  {
    id: "privacy",
    label: "Data Privacy",
    icon: "🔒",
    color: "var(--color-dim-privacy)",
    questions: [0, 1, 2],
  },
  {
    id: "policy",
    label: "AI Usage Policy",
    icon: "📋",
    color: "var(--color-dim-policy)",
    questions: [3, 4, 5],
  },
  {
    id: "tool",
    label: "Tool Readiness",
    icon: "🛠️",
    color: "var(--color-dim-tool)",
    questions: [6, 7, 8],
  },
  {
    id: "cyber",
    label: "Cyber Infrastructure",
    icon: "🛡️",
    color: "var(--color-dim-cyber)",
    questions: [9, 10, 11],
  },
  {
    id: "workforce",
    label: "Workforce Alignment",
    icon: "🎓",
    color: "var(--color-dim-workforce)",
    questions: [12, 13, 14],
  },
];

export const questions = [
  // Data Privacy
  "Do you formally vet EdTech tools for data privacy compliance before adoption?",
  "Do you know which student data your current tools collect and where it is stored?",
  "Do you have a process to remove student data when a tool is decommissioned?",

  // AI Usage Policy
  "Does your institution have a published AI usage policy for students?",
  "Are teachers trained on how to enforce AI usage boundaries in assessments?",
  "Is your AI policy reviewed and updated at least once per academic year?",

  // Tool Readiness
  "Do your current AI tools provide explainable rubric-aligned feedback?",
  "Can you audit or override AI-generated grades or recommendations?",
  "Are your teachers trained on the AI tools they are expected to use?",

  // Cyber Infrastructure
  "Has your institution conducted a cybersecurity audit in the last 12 months?",
  "Do students and staff receive regular digital safety training?",
  "Do you have an incident response plan if a platform you use is breached?",

  // Workforce Alignment
  "Does your curriculum include AI literacy as a core competency?",
  "Are your graduates assessed on skills the current AI job market requires?",
  "Do you have industry partnerships that inform how you update your curriculum?",
];

export const answers = [
  { id: "yes",       label: "Yes — we have this in place",       emoji: "✅", points: 10 },
  { id: "partially", label: "Partially — we are working on it",  emoji: "⚠️", points: 5  },
  { id: "no",        label: "No — this is not yet in place",     emoji: "❌", points: 0  },
];

export function getDimensionForQuestion(index) {
  return dimensions.find((d) => d.questions.includes(index));
}

export function computeScores(userAnswers) {
  const scoreMap = { yes: 10, partially: 5, no: 0 };

  const dimScores = {};
  dimensions.forEach((dim) => {
    dimScores[dim.id] = dim.questions.reduce((sum, qi) => {
      return sum + (scoreMap[userAnswers[qi]] ?? 0);
    }, 0);
  });

  const total = Object.values(dimScores).reduce((a, b) => a + b, 0);
  const percentage = Math.round((total / 150) * 100);

  return { dimScores, total, percentage };
}