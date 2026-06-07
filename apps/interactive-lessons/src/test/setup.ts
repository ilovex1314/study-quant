import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  window.localStorage.clear();
  cleanup();
});

Object.defineProperty(window, "scrollTo", {
  value: () => undefined,
  writable: true
});
