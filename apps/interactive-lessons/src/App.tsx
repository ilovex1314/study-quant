import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArchitecturePanel,
  ConceptsPanel,
  Hero,
  PracticePanel,
  QuizPanel,
  ReviewPanel,
  routeSections,
  SeriesPanel
} from "./components/LessonSections";
import { lessons } from "./data/lessons";
import type { Attempt, CurrentAttempt, SectionId } from "./data/types";
import { createCompletedAttempt, createCurrentAttempt } from "./lib/review";
import {
  clearAttemptHistory,
  completeCurrentAttempt,
  deleteAttempt,
  exportAttemptHistory,
  loadAttemptHistory,
  loadCurrentAttempt,
  resetCurrentAttempt,
  saveCurrentAttempt
} from "./lib/storage";

const sectionIds = routeSections.map((section) => section.id);

function getSection(section?: string): SectionId {
  return sectionIds.includes(section as SectionId) ? (section as SectionId) : "series";
}

function getCurrentAttempt(lessonId: string) {
  const existing = loadCurrentAttempt(lessonId);
  if (existing) {
    return existing;
  }

  const created = createCurrentAttempt();
  saveCurrentAttempt(created, lessonId);
  return created;
}

function scrollToSection(section: SectionId, behavior: ScrollBehavior) {
  const target = document.getElementById(section);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 20;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/day01/series" replace />} />
      <Route path="/:dayId/:sectionId?" element={<LessonRoute />} />
      <Route path="*" element={<Navigate to="/day01/series" replace />} />
    </Routes>
  );
}

function LessonRoute() {
  const { dayId, sectionId } = useParams();
  const lesson = lessons.find((item) => item.id === dayId);

  if (!lesson) {
    return <Navigate to="/day01/series" replace />;
  }

  return <LessonPage lessonId={lesson.id} routeSection={getSection(sectionId)} />;
}

function LessonPage({ lessonId, routeSection }: { lessonId: string; routeSection: SectionId }) {
  const navigate = useNavigate();
  const lesson = useMemo(() => lessons.find((item) => item.id === lessonId) ?? lessons[0], [lessonId]);
  const [activeSection, setActiveSection] = useState<SectionId>(routeSection);
  const [current, setCurrent] = useState<CurrentAttempt>(() => getCurrentAttempt(lesson.id));
  const [history, setHistory] = useState<Attempt[]>(() => loadAttemptHistory(lesson.id));
  const suppressSyncUntil = useRef(0);
  const activeSectionRef = useRef<SectionId>(routeSection);

  function setActive(section: SectionId) {
    activeSectionRef.current = section;
    setActiveSection(section);
  }

  useEffect(() => {
    setCurrent(getCurrentAttempt(lesson.id));
    setHistory(loadAttemptHistory(lesson.id));
    setActive(routeSection);
    if (routeSection === "series") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      suppressSyncUntil.current = Date.now() + 600;
      window.setTimeout(() => scrollToSection(routeSection, "auto"), 0);
    }
  }, [lesson.id, routeSection]);

  useEffect(() => {
    let frame = 0;

    function sync() {
      frame = 0;
      if (Date.now() < suppressSyncUntil.current) {
        return;
      }

      const activationLine = Math.min(180, window.innerHeight * 0.28);
      let next = activeSectionRef.current;
      for (const id of sectionIds) {
        const target = document.getElementById(id);
        if (!target) {
          continue;
        }
        const rect = target.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > 0) {
          next = id;
        } else if (rect.top <= activationLine) {
          next = id;
        }
      }

      if (activeSectionRef.current !== next) {
        activeSectionRef.current = next;
        setActiveSection(next);
        navigate(`${lesson.path}/${next}`, { replace: true });
      }
    }

    function schedule() {
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", schedule);
    };
  }, [lesson.path, navigate]);

  function routeTo(path: string) {
    navigate(`${path}/series`);
  }

  function jump(section: SectionId) {
    suppressSyncUntil.current = Date.now() + 700;
    setActive(section);
    navigate(`${lesson.path}/${section}`);
    window.setTimeout(() => scrollToSection(section, "smooth"), 0);
  }

  function answer(questionId: string, optionId: string) {
    const next = { ...current, answers: { ...current.answers, [questionId]: optionId } };
    setCurrent(next);
    saveCurrentAttempt(next, lesson.id);
  }

  function complete() {
    if (Object.keys(current.answers).length !== lesson.questions.length) {
      return;
    }

    const completed = createCompletedAttempt(current, lesson.questions);
    completeCurrentAttempt(completed, lesson.id);
    setHistory(loadAttemptHistory(lesson.id));
    const next = createCurrentAttempt();
    saveCurrentAttempt(next, lesson.id);
    setCurrent(next);
  }

  function retry() {
    resetCurrentAttempt(lesson.id);
    const next = createCurrentAttempt();
    saveCurrentAttempt(next, lesson.id);
    setCurrent(next);
  }

  function exportHistory() {
    const blob = new Blob([exportAttemptHistory(lesson.id)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `study-quant-${lesson.id}-history.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <Hero lesson={lesson} />
      <nav className="route-strip" aria-label="课程模块导航">
        {routeSections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeSection === section.id ? "active" : ""}
            onClick={() => jump(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <SeriesPanel currentLesson={lesson} onRoute={routeTo} />
      <ConceptsPanel lesson={lesson} />
      <ArchitecturePanel lesson={lesson} />
      <PracticePanel lesson={lesson} />
      <section className="content-band quiz-band">
        <QuizPanel
          lesson={lesson}
          current={current}
          onAnswer={(question, optionId) => answer(question.id, optionId)}
          onComplete={complete}
          onRetry={retry}
        />
      </section>
      <ReviewPanel
        lesson={lesson}
        history={history}
        onDelete={(id) => {
          deleteAttempt(id, lesson.id);
          setHistory(loadAttemptHistory(lesson.id));
        }}
        onClear={() => {
          clearAttemptHistory(lesson.id);
          setHistory([]);
        }}
        onExport={exportHistory}
      />
    </main>
  );
}
