import { reviewAdvice } from "../data/lessons";
import type { Attempt, ConceptId, CurrentAttempt, LessonQuestion } from "../data/types";

export function createCurrentAttempt(): CurrentAttempt {
  return {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    answers: {}
  };
}

export function scoreAttempt(questions: LessonQuestion[], answers: Record<string, string>) {
  let score = 0;
  const weakConcepts = new Set<ConceptId>();

  for (const question of questions) {
    const selected = question.options.find((option) => option.id === answers[question.id]);
    if (selected?.correct) {
      score += 1;
    } else {
      weakConcepts.add(question.concept);
    }
  }

  return {
    score,
    total: questions.length,
    weakConcepts: Array.from(weakConcepts),
    recommendations: Array.from(weakConcepts).map((concept) => reviewAdvice[concept])
  };
}

export function createCompletedAttempt(current: CurrentAttempt, questions: LessonQuestion[]): Attempt {
  return {
    ...current,
    ...scoreAttempt(questions, current.answers),
    completedAt: new Date().toISOString()
  };
}
