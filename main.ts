// The One-Line Cat Joke That Lands — make.fun entry
// Writes a single original one-line joke about cats to
// <MAKEFUN_OUTPUT_DIR || '/output'>/entry.txt and validates it
// against the brief's gate: UTF-8 text, 1-200 characters, not
// only whitespace, a single line, nothing else. Node 22,
// standard library only, no network, no input files: the joke
// is a fixed string below, written fresh for this entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original cat joke, written for this entry.
// Setup: an everyday cat-on-keyboard moment. Turn: the
// destruction is framed as helpfulness — she deleted three
// hours of work and purred like she had fixed it.
const JOKE =
  "My cat walked across my keyboard, deleted three hours of work, and purred like she'd fixed it.";

const MAX_CHARS = 200;

function main(): void {
  const chars = [...JOKE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`joke is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (JOKE.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE + "\n", "utf8");
  // Read back what was written and confirm it round-trips exactly,
  // so a partial or mangled write can never pass silently.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== JOKE + "\n") {
    throw new Error(`written file does not match the joke (${outPath})`);
  }
  console.log(`wrote ${chars} characters to ${outPath}`);
}

main();
