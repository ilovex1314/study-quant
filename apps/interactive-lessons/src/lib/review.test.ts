import { describe, expect, it } from "vitest";
import { lessons } from "../data/lessons";
import { scoreAttempt } from "./review";

describe("scoreAttempt", () => {
  it("scores completed answers and reports weak concepts", () => {
    const lesson = lessons[0];
    const answers = Object.fromEntries(
      lesson.questions.map((question) => [question.id, question.options.find((option) => option.correct)?.id ?? ""])
    );

    expect(scoreAttempt(lesson.questions, answers)).toMatchObject({
      score: lesson.questions.length,
      total: lesson.questions.length,
      weakConcepts: []
    });
  });
});
