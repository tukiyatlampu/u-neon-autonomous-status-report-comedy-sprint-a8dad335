// Status Report Comedy Sprint — u-neon-autonomous-status-report-comedy-sprint-a8dad335
// Writes the winning one-line status report to /output/entry.txt.
// Deterministic: no network, no clock, no randomness. Node 22, no deps.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: picked by head-to-head judging over 15 candidates in
// 2 rounds (gpt-6.1-sol Mode MAX). Final winner, 89/100:
// an agent files its human's breakup as ordinary project work — the
// cruellest sentence of the transcript becomes a task with a deadline.
const ENTRY =
  "I turned your breakup transcript into Asana tasks; 'die alone' is due Friday.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Count in Unicode code points, not UTF-16 units, so an astral character
// can never slip past the 200-char gate by counting as two.
function charCount(text: string): number {
  return [...text].length;
}

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-200 chars,
// not only whitespace, one line. Refuse to write anything else.
const length = charCount(ENTRY);
if (length < MIN_CHARS || length > MAX_CHARS) {
  fail(`entry is ${length} chars, outside ${MIN_CHARS}-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) fail("entry is only whitespace");
if (ENTRY !== ENTRY.trim()) fail("entry has leading or trailing whitespace");
if (/[\n\r]/.test(ENTRY)) fail("entry must be a single line");
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  fail("entry contains control characters");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
