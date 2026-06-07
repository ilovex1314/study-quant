import { useEffect, useMemo, useState } from "react";
import { lessons } from "../data/lessons";
import type { Attempt, CurrentAttempt, LessonPage, LessonQuestion, SectionId } from "../data/types";
import { scoreAttempt } from "../lib/review";

type RouteSection = {
  id: SectionId;
  label: string;
};

export const routeSections: RouteSection[] = [
  { id: "series", label: "课程" },
  { id: "concepts", label: "概念" },
  { id: "architecture", label: "流程" },
  { id: "practice", label: "练习" },
  { id: "review", label: "复盘" }
];

export function Hero({ lesson }: { lesson: LessonPage }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">{lesson.phase}</p>
        <h1>{lesson.title}</h1>
        <p className="hero-text">{lesson.summary}</p>
      </div>
      <div className="hero-panel">
        <span>今日目标</span>
        <p>{lesson.goal}</p>
      </div>
    </header>
  );
}

export function SeriesPanel({ currentLesson, onRoute }: { currentLesson: LessonPage; onRoute: (path: string) => void }) {
  return (
    <section id="series" className="section-anchor content-band">
      <div className="section-heading">
        <p className="eyebrow">Series</p>
        <h2>量化学习路径</h2>
        <p>{currentLesson.why}</p>
      </div>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <button
            className={lesson.id === currentLesson.id ? "lesson-card active" : "lesson-card"}
            key={lesson.id}
            onClick={() => onRoute(lesson.path)}
            type="button"
          >
            <span>{lesson.phase}</span>
            <strong>{lesson.title}</strong>
            <small>{lesson.summary}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ConceptsPanel({ lesson }: { lesson: LessonPage }) {
  return (
    <section id="concepts" className="section-anchor content-band">
      <div className="section-heading">
        <p className="eyebrow">Concepts</p>
        <h2>核心概念</h2>
      </div>
      <div className="concept-grid">
        {lesson.concepts.map((concept) => (
          <article key={concept.id} className="concept-card">
            <h3>{concept.title}</h3>
            <p>{concept.summary}</p>
            <dl>
              <div>
                <dt>解决</dt>
                <dd>{concept.solves}</dd>
              </div>
              <div>
                <dt>边界</dt>
                <dd>{concept.boundary}</dd>
              </div>
              <div>
                <dt>误区</dt>
                <dd>{concept.commonMistake}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ArchitecturePanel({ lesson }: { lesson: LessonPage }) {
  return (
    <section id="architecture" className="section-anchor content-band">
      <div className="section-heading">
        <p className="eyebrow">Architecture</p>
        <h2>{lesson.diagramTitle}</h2>
      </div>
      <div className="flow-row" aria-label={lesson.diagramTitle}>
        {lesson.flow.map((step, index) => (
          <div key={step.id} className="flow-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </div>
        ))}
      </div>
      <div className="two-column">
        <div>
          <h3>数据与逻辑流</h3>
          <ol>
            {lesson.dataFlow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3>关键技术点</h3>
          <ul>
            {lesson.technicalPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="example-grid">
        <article>
          <h3>生产例子</h3>
          <p>{lesson.productionExample}</p>
        </article>
        <article>
          <h3>反例</h3>
          <p>{lesson.counterexample}</p>
        </article>
      </div>
    </section>
  );
}

function getPracticeStorageKey(lessonId: string) {
  return `study-quant:${lessonId}:practice`;
}

function createEmptyPracticeDraft(fields: string[]) {
  return Object.fromEntries(fields.map((field) => [field, ""]));
}

function readPracticeDraft(lesson: LessonPage) {
  const emptyDraft = createEmptyPracticeDraft(lesson.practice.fields);

  try {
    const raw = window.localStorage.getItem(getPracticeStorageKey(lesson.id));
    if (!raw) {
      return emptyDraft;
    }

    return { ...emptyDraft, ...(JSON.parse(raw) as Record<string, string>) };
  } catch {
    return emptyDraft;
  }
}

function buildPracticeMarkdown(lesson: LessonPage, draft: Record<string, string>) {
  const answers = lesson.practice.fields
    .map((field) => `## ${field}\n\n${draft[field]?.trim() || "（未填写）"}`)
    .join("\n\n");

  return `# ${lesson.title} - ${lesson.practice.title}\n\n## 验收标准\n\n${lesson.practice.acceptance}\n\n${answers}\n`;
}

export function PracticePanel({ lesson }: { lesson: LessonPage }) {
  const [draft, setDraft] = useState<Record<string, string>>(() => readPracticeDraft(lesson));
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const storageKey = getPracticeStorageKey(lesson.id);
  const guide = lesson.practice.guide;

  useEffect(() => {
    setDraft(readPracticeDraft(lesson));
    setSavedAt(null);
  }, [lesson]);

  const completedCount = useMemo(
    () => lesson.practice.fields.filter((field) => draft[field]?.trim()).length,
    [draft, lesson.practice.fields]
  );
  const progress = Math.round((completedCount / lesson.practice.fields.length) * 100);
  const missingFields = lesson.practice.fields.filter((field) => !draft[field]?.trim());

  function persistDraft(nextDraft: Record<string, string>) {
    window.localStorage.setItem(storageKey, JSON.stringify(nextDraft));
    setSavedAt(new Date().toLocaleTimeString());
  }

  function updateField(field: string, value: string) {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    persistDraft(nextDraft);
  }

  function saveDraft() {
    persistDraft(draft);
  }

  function resetDraft() {
    const emptyDraft = createEmptyPracticeDraft(lesson.practice.fields);
    window.localStorage.removeItem(storageKey);
    setDraft(emptyDraft);
    setSavedAt(null);
  }

  function exportMarkdown() {
    const blob = new Blob([buildPracticeMarkdown(lesson, draft)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${lesson.id}-practice.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="practice" className="section-anchor content-band">
      <div className="section-heading">
        <p className="eyebrow">Practice</p>
        <h2>{lesson.practice.title}</h2>
        <p>{lesson.practice.acceptance}</p>
      </div>
      {guide ? (
        <div className="practice-learning-flow">
          <article className="practice-method-card">
            <p className="eyebrow">先学方法</p>
            <h3>{guide.outcome}</h3>
            <div className="method-step-grid">
              {guide.methodSteps.map((step, index) => (
                <div key={step.title} className="method-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="practice-example-card">
            <p className="eyebrow">完整示例</p>
            <h3>{guide.workedExample.title}</h3>
            <p>{guide.workedExample.context}</p>
            <ol>
              {guide.workedExample.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      ) : null}
      <div className="practice-workbench">
        <div className="practice-meta">
          <article>
            <span>练习产物</span>
            <strong>一份可复用的课程行动稿</strong>
            <p>这里不是随手填空。你写下的内容会保存在本机，作为本课复盘、自测纠错和后续课程继续迭代的材料。</p>
          </article>
          <article>
            <span>完成度</span>
            <strong>
              {completedCount}/{lesson.practice.fields.length}
            </strong>
            <div className="progress-track" aria-label={`练习完成度 ${progress}%`}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </article>
          <article>
            <span>下一步</span>
            <strong>{missingFields.length === 0 ? "可以进入自测或复盘" : `先补齐：${missingFields[0]}`}</strong>
            <p>{missingFields.length === 0 ? lesson.explorationPrompt : "每填完一项都会自动保存，先追求说清楚，再回头打磨表达。"}</p>
          </article>
        </div>
        <div className="practice-toolbar">
          <span className="status-pill">{savedAt ? `已保存 ${savedAt}` : "本机草稿"}</span>
          <button type="button" onClick={saveDraft}>
            保存草稿
          </button>
          <button type="button" className="secondary" onClick={exportMarkdown}>
            导出 Markdown
          </button>
          <button type="button" className="danger" onClick={resetDraft}>
            清空
          </button>
        </div>
      </div>
      {guide ? (
        <div className="section-heading compact-heading">
          <p className="eyebrow">字段推导</p>
          <h3>按提示把方法迁移到你的策略</h3>
        </div>
      ) : null}
      <div className="template-grid">
        {lesson.practice.fields.map((field) => {
          const fieldGuide = guide?.fieldGuides[field];

          return (
          <label key={field} className="practice-field-card">
            <span>{field}</span>
            {fieldGuide ? (
              <div className="field-guide">
                <p>
                  <strong>作用：</strong>
                  {fieldGuide.purpose}
                </p>
                <p>
                  <strong>怎么得到：</strong>
                  {fieldGuide.howToDerive}
                </p>
                <p>
                  <strong>示例：</strong>
                  {fieldGuide.example}
                </p>
                <p>
                  <strong>常见错误：</strong>
                  {fieldGuide.commonMistake}
                </p>
              </div>
            ) : null}
            <textarea
              rows={3}
              value={draft[field] || ""}
              onChange={(event) => updateField(field, event.target.value)}
              placeholder={`写下你的「${field}」；保持具体，能被复盘和改进。`}
            />
          </label>
          );
        })}
      </div>
      {guide ? (
        <div className="practice-checklist">
          <div>
            <p className="eyebrow">完成前自查</p>
            <h3>提交给未来的自己之前，先过这几关</h3>
          </div>
          <ul>
            {guide.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="explore-box">
        <strong>探索提示</strong>
        <p>{lesson.explorationPrompt}</p>
      </div>
    </section>
  );
}

export function QuizPanel({
  lesson,
  current,
  onAnswer,
  onComplete,
  onRetry
}: {
  lesson: LessonPage;
  current: CurrentAttempt;
  onAnswer: (question: LessonQuestion, optionId: string) => void;
  onComplete: () => void;
  onRetry: () => void;
}) {
  const answered = Object.keys(current.answers).length;
  const allAnswered = answered === lesson.questions.length;
  const score = scoreAttempt(lesson.questions, current.answers);

  return (
    <div className="quiz-panel">
      <div className="quiz-header">
        <div>
          <p className="eyebrow">Quiz</p>
          <h3>自测题</h3>
        </div>
        <span>
          {answered}/{lesson.questions.length}
        </span>
      </div>
      {lesson.questions.map((question, index) => {
        const selected = current.answers[question.id];
        return (
          <article key={question.id} className="question-card">
            <h4>
              {index + 1}. {question.prompt}
            </h4>
            <div className="option-grid">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={selected === option.id ? "option selected" : "option"}
                  onClick={() => onAnswer(question, option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selected ? <p className="explain">{question.explanation}</p> : null}
          </article>
        );
      })}
      <div className="action-row">
        <button type="button" onClick={onComplete} disabled={!allAnswered}>
          完成并记录
        </button>
        <button type="button" className="secondary" onClick={onRetry}>
          重做
        </button>
        <span>
          当前得分 {score.score}/{score.total}
        </span>
      </div>
    </div>
  );
}

export function ReviewPanel({
  lesson,
  history,
  onDelete,
  onClear,
  onExport
}: {
  lesson: LessonPage;
  history: Attempt[];
  onDelete: (id: string) => void;
  onClear: () => void;
  onExport: () => void;
}) {
  return (
    <section id="review" className="section-anchor content-band">
      <div className="section-heading">
        <p className="eyebrow">Review</p>
        <h2>复盘记录</h2>
      </div>
      <div className="review-prompts">
        {lesson.reviewPrompts.map((prompt) => (
          <p key={prompt}>{prompt}</p>
        ))}
      </div>
      <div className="action-row">
        <button type="button" className="secondary" onClick={onExport}>
          导出记录
        </button>
        <button type="button" className="danger" onClick={onClear}>
          清空历史
        </button>
      </div>
      <div className="history-list">
        {history.length === 0 ? <p className="empty">还没有完成记录。</p> : null}
        {history.map((attempt) => (
          <article key={attempt.id} className="history-card">
            <div>
              <strong>
                {attempt.score}/{attempt.total}
              </strong>
              <span>{new Date(attempt.completedAt).toLocaleString()}</span>
            </div>
            {attempt.recommendations.length > 0 ? (
              <ul>
                {attempt.recommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>这次掌握不错，可以进入下一课。</p>
            )}
            <button type="button" className="danger compact" onClick={() => onDelete(attempt.id)}>
              删除
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
