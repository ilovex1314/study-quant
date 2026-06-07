import type { Attempt, CurrentAttempt } from "../data/types";

const prefix = "study-quant";

function currentKey(lessonId: string) {
  return `${prefix}:${lessonId}:current`;
}

function historyKey(lessonId: string) {
  return `${prefix}:${lessonId}:history`;
}

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadCurrentAttempt(lessonId: string) {
  return parseJson<CurrentAttempt | null>(localStorage.getItem(currentKey(lessonId)), null);
}

export function saveCurrentAttempt(attempt: CurrentAttempt, lessonId: string) {
  localStorage.setItem(currentKey(lessonId), JSON.stringify(attempt));
}

export function resetCurrentAttempt(lessonId: string) {
  localStorage.removeItem(currentKey(lessonId));
}

export function loadAttemptHistory(lessonId: string) {
  return parseJson<Attempt[]>(localStorage.getItem(historyKey(lessonId)), []);
}

export function completeCurrentAttempt(attempt: Attempt, lessonId: string) {
  const history = loadAttemptHistory(lessonId);
  localStorage.setItem(historyKey(lessonId), JSON.stringify([attempt, ...history]));
  localStorage.removeItem(currentKey(lessonId));
}

export function deleteAttempt(attemptId: string, lessonId: string) {
  const history = loadAttemptHistory(lessonId).filter((attempt) => attempt.id !== attemptId);
  localStorage.setItem(historyKey(lessonId), JSON.stringify(history));
}

export function clearAttemptHistory(lessonId: string) {
  localStorage.removeItem(historyKey(lessonId));
}

export function exportAttemptHistory(lessonId: string) {
  return JSON.stringify(loadAttemptHistory(lessonId), null, 2);
}
