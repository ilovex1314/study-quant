export type ConceptId =
  | "quant-definition"
  | "hypothesis"
  | "rules"
  | "data-validation"
  | "risk-control"
  | "research-pipeline"
  | "strategy-report"
  | "feedback-loop"
  | "market-rules"
  | "tradability"
  | "index-etf"
  | "data-layer"
  | "signal-layer"
  | "backtest-layer"
  | "report-layer"
  | "python-timeseries"
  | "return-curve"
  | "moving-average"
  | "backtest-traps"
  | "position-sizing"
  | "portfolio-rotation"
  | "simulation-tracking"
  | "strategy-journal"
  | "research-canvas"
  | "execution-assumption"
  | "python-implementation"
  | "metric-calculation"
  | "signal-execution-gap"
  | "survivorship-bias"
  | "rebalance-rule"
  | "correlation"
  | "decision-record"
  | "paper-trading-gap";

export type SectionId = "series" | "concepts" | "architecture" | "practice" | "review";

export type LessonSummary = {
  id: string;
  path: string;
  title: string;
  phase: string;
  summary: string;
};

export type ConceptModule = {
  id: string;
  concept: ConceptId;
  title: string;
  summary: string;
  solves: string;
  boundary: string;
  commonMistake: string;
};

export type FlowStep = {
  id: string;
  label: string;
  detail: string;
};

export type PracticeTemplate = {
  title: string;
  fields: string[];
  acceptance: string;
  guide?: {
    outcome: string;
    methodSteps: Array<{
      title: string;
      detail: string;
    }>;
    workedExample: {
      title: string;
      context: string;
      steps: string[];
    };
    fieldGuides: Record<
      string,
      {
        purpose: string;
        howToDerive: string;
        example: string;
        commonMistake: string;
      }
    >;
    checklist: string[];
  };
};

export type LessonQuestion = {
  id: string;
  concept: ConceptId;
  prompt: string;
  options: Array<{
    id: string;
    label: string;
    correct: boolean;
  }>;
  explanation: string;
};

export type LessonPage = LessonSummary & {
  goal: string;
  why: string;
  diagramTitle: string;
  flow: FlowStep[];
  concepts: ConceptModule[];
  dataFlow: string[];
  technicalPoints: string[];
  productionExample: string;
  counterexample: string;
  practice: PracticeTemplate;
  explorationPrompt: string;
  questions: LessonQuestion[];
  reviewPrompts: string[];
  references: Array<{ label: string; url: string }>;
};

export type CurrentAttempt = {
  id: string;
  startedAt: string;
  answers: Record<string, string>;
};

export type Attempt = CurrentAttempt & {
  completedAt: string;
  score: number;
  total: number;
  weakConcepts: ConceptId[];
  recommendations: string[];
};
