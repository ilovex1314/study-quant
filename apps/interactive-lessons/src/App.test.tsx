import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { lessons } from "./data/lessons";

describe("interactive lessons", () => {
  it("renders the first lesson route", () => {
    render(
      <MemoryRouter initialEntries={["/day01/series"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Day01 量化到底是什么" })).toBeInTheDocument();
  });

  it("keeps lesson data internally consistent", () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    expect(lessonIds.size).toBe(12);

    for (const lesson of lessons) {
      const concepts = new Set(lesson.concepts.map((concept) => concept.concept));
      expect(lesson.questions.length).toBeGreaterThanOrEqual(4);
      expect(lesson.reviewPrompts.length).toBeGreaterThanOrEqual(3);
      expect(lesson.concepts.length).toBeGreaterThanOrEqual(4);
      expect(lesson.flow.length).toBeGreaterThanOrEqual(5);
      expect(lesson.practice.guide?.methodSteps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.practice.guide?.workedExample.steps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.practice.guide?.checklist.length).toBeGreaterThanOrEqual(3);

      for (const question of lesson.questions) {
        expect(concepts.has(question.concept)).toBe(true);
        expect(question.options.filter((option) => option.correct)).toHaveLength(1);
      }

      for (const field of lesson.practice.fields) {
        const fieldGuide = lesson.practice.guide?.fieldGuides[field];
        expect(fieldGuide?.purpose).toBeTruthy();
        expect(fieldGuide?.howToDerive).toBeTruthy();
        expect(fieldGuide?.example).toBeTruthy();
        expect(fieldGuide?.commonMistake).toBeTruthy();
      }
    }
  });

  it("keeps lesson titles aligned with lesson content", () => {
    const day02 = lessons.find((lesson) => lesson.id === "day02");
    expect(day02?.practice.title).toBe("量化流程画布");
    expect(JSON.stringify(day02)).not.toContain("策略研究计划");

    const day05 = lessons.find((lesson) => lesson.id === "day05");
    const day05Text = JSON.stringify(day05);
    expect(day05?.title).toContain("Python");
    expect(day05Text).toMatch(/Python|pandas|read_csv|to_datetime|pct_change|rolling/);
    expect(day05?.concepts.some((concept) => concept.concept === "python-implementation")).toBe(true);
    expect(day05?.practice.title).toContain("Python");
  });

  it("does not fall back to the series section when review is active at page bottom", async () => {
    const originalRect = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function mockRect() {
      return { top: -1000, bottom: -800, left: 0, right: 0, width: 0, height: 200, x: 0, y: -1000, toJSON: () => ({}) };
    };

    render(
      <MemoryRouter initialEntries={["/day01/review"]}>
        <App />
      </MemoryRouter>
    );

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 750));
      fireEvent.scroll(window);
      await waitFor(() => expect(screen.getAllByRole("button", { name: "复盘" })[0]).toHaveClass("active"));
      expect(screen.getAllByRole("button", { name: "课程" })[0]).not.toHaveClass("active");
    } finally {
      HTMLElement.prototype.getBoundingClientRect = originalRect;
    }
  });

  it("turns practice pages into saved interactive workbenches", () => {
    render(
      <MemoryRouter initialEntries={["/day03/practice"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("练习产物")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "保存草稿" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "导出 Markdown" })).toBeInTheDocument();
    expect(screen.getByLabelText("练习完成度 0%")).toBeInTheDocument();

    fireEvent.change(screen.getAllByRole("textbox")[0], { target: { value: "用交易日历对齐收盘价和成交额。" } });

    expect(screen.getByLabelText("练习完成度 11%")).toBeInTheDocument();
    expect(window.localStorage.getItem("study-quant:day03:practice")).toContain("交易日历");
  });

  it("teaches the Day02 strategy research process before asking for fields", () => {
    render(
      <MemoryRouter initialEntries={["/day02/practice"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("先学方法")).toBeInTheDocument();
    expect(screen.getByText("完整示例")).toBeInTheDocument();
    expect(screen.getByText("字段推导")).toBeInTheDocument();
    expect(screen.getByText("完成前自查")).toBeInTheDocument();
    expect(screen.getByText(/不要先想买卖点/)).toBeInTheDocument();
    expect(screen.getByText(/宽基 ETF 动量/)).toBeInTheDocument();
  });
});
