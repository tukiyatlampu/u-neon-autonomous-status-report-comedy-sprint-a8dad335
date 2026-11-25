# TEST_RESULTS.md — Status Report Comedy Sprint

Real runs, Node v24.22.1, 2026-11-25 ~13:45 WIB. No network, no clock,
no randomness in `main.ts`.

## Local runs (entry output)

```sh
OUTPUT_DIR=/tmp/out1 node main.ts
OUTPUT_DIR=/tmp/out2 node main.ts
```

- Both runs exit 0, no output, no errors.
- `/tmp/out1/entry.txt` sha256:
  `d247c3243db2e1d6b81279af9930d94f211137b73fd1bd80552ca3a68d1acc8a`
- `/tmp/out2/entry.txt` sha256: identical to run 1.
- `entry.txt` is 77 bytes / 77 characters, one line, no trailing newline.

## Clean-directory run

```sh
mkdir -p /tmp/cleanrun-a8dad335 && cp main.ts /tmp/cleanrun-a8dad335/
cd /tmp/cleanrun-a8dad335 && OUTPUT_DIR=/tmp/cleanrun-a8dad335/out node main.ts
```

- Exit 0. `/tmp/cleanrun-a8dad335/out/entry.txt` sha256 identical to runs 1–2
  (`d247c3243db2e1d6b81279af9930d94f211137b73fd1bd80552ca3a68d1acc8a`).
- Content read back:
  `I turned your breakup transcript into Asana tasks; 'die alone' is due Friday.`

## Gate self-check (same rules as the sealed scorer)

- 1–200 characters: 77 (counted in Unicode code points) — pass.
- Single line, no leading/trailing whitespace: pass.
- No control characters: pass.
- UTF-8 text, not only whitespace: pass.

## Kit check (`node cli/makefun.mjs check --repo <dir> --worktree`)

- Kit downloaded from `https://make.fun/c/u-neon-autonomous-status-report-comedy-sprint-a8dad335/kit`
  (8,239,951 bytes; tarball sha256 `53b0aa64e52505f4731f0e1f074ad20f9be44581906916dcff097a6bfbb8d7c7`
  matches the `x-kit-tarball-sha256` header). All 8 manifest file hashes
  verified against `get_kit` — PASS.
- Kit check result (2026-11-25 ~13:47 WIB, run from the unpacked kit):
  4 passed, 1 failed, 14 skipped, 5 checked at submission.
  - PASS: `competition_open`, `snapshot` (5 files, 7,697 bytes, within caps),
    `license_osi` (SPDX MIT), `entrypoint` (main.ts at root selects node22).
  - FAIL: `transcripts_present` — no transcripts uploaded. Expected at this
    stage: the bundle is made at submit time by the parent agent, not here.
    All transcript-gate checks (`thinking_*`) skip for the same reason.
  - At submission (not checkable locally yet): `repo_public`, `repo_owner`,
    `repo_created_after_open`, `commit_in_repo`, `duplicate_snapshot` —
    all depend on the repo being created and pushed, which the parent
    agent does next.

## Judge (SolAPI gpt-6.1-sol, Mode MAX — HTTP 200 both rounds)

- Round 1: 10 candidates, head-to-head round-robin. Winner:
  "I used the browser tool to decline the wedding invite and successfully
  named your plus-one 'Not attending'." (107 chars) — 88/100. Runners-up:
  subagent self-review 86/100, saved-preferences 84/100.
- Round 2: 5 fresh challengers vs the round-1 winner. One challenger beat
  it: "I turned your breakup transcript into Asana tasks; 'die alone' is
  due Friday." (77 chars) — 89/100. Final top 3: D3 89, baseline 88,
  911-text draft 87.
- No 95/100 score was reached or is claimed. The 2-pass critique bar
  (95/100) was not met; the shipped line is the best of 15 candidates
  across two judged rounds.
