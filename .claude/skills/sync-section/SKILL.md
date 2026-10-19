---
name: sync-section
description: Safely synchronise ONE explicitly named section/page of the Madrid-UCM iGEM 2026 wiki with the latest official remote repository. Preserves both remote and local changes for that section, never touches unrelated local work, stops on genuine line-level conflicts instead of guessing, and requires explicit user confirmation before any commit or push. Use when the user runs `/sync-section <SectionName>` (e.g. `/sync-section Team`, `/sync-section Engineering`).
argument-hint: <SectionName>
allowed-tools: [Read, Bash, Grep, Glob, Edit]
---

# /sync-section

Synchronise **one explicitly requested section** of this wiki with the
official remote, integrating remote and local changes for that section only,
and leaving absolutely everything else in the working tree untouched.

## Arguments

The user invoked this with: $ARGUMENTS

Treat the first token as the section name (e.g. `Team`, `Engineering`,
`Human Practices`). If it's missing or ambiguous, ask which section before
doing anything else — never guess.

## Non-negotiable rules

- Only ever read, stage, commit or push files belonging to the requested
  section, plus files the user explicitly confirms.
- Never use blanket `--ours`/`--theirs`, `checkout -f`, or "just take my/
  their whole file" shortcuts. A file with independent edits on both sides
  gets a real per-file three-way merge; a file with a genuine same-line
  conflict gets surfaced to the user, not resolved automatically.
- Never run `git add -A`, `git add .`, or any other broad-stage command.
- Never `git stash drop`, `git clean`, `git checkout -- .`, or `git reset
  --hard` as a shortcut to a clean tree. If a stash is used to isolate
  unrelated work temporarily (Phase 5), it must be popped back before you
  finish, and every file it covers outside the synced section must verify
  byte-identical to Phase 0 — the section's own files are the one deliberate
  exception (Phase 7): they end up holding the reconciled version, not their
  old pre-sync content.
- Never commit or push anything before the user explicitly confirms the plan
  in Phase 4. "Looks right, go ahead" counts; silence does not.
- Never push to a protected/official branch directly, and never bypass an
  existing merge-request workflow, just to finish faster. If unsure which
  applies, ask (Phase 6 tells you what to check first).
- If at any point something doesn't fit these rules cleanly (e.g. a binary
  asset conflict, a renamed file, a section boundary that's genuinely
  unclear), stop and ask rather than improvising a resolution.

## Phase 0 — Setup and snapshot

1. Confirm the remote: `git remote -v`. This repo's **official** remote is
   `origin` (`gitlab.igem.org/2026/madrid-ucm`) — a `github` remote may also
   exist as a personal mirror; never treat it as the official repository.
2. `git fetch origin` — fetch only, no merge/pull yet.
3. Resolve the official branch: `git symbolic-ref refs/remotes/origin/HEAD`
   (normally `origin/main`). Use this, not an assumption, for every
   comparison below.
4. Snapshot the *entire* current working tree state before touching
   anything: `git status --porcelain=v1` and note the current branch
   (`git branch --show-current`) and any unpushed commits ahead of origin on
   it (`git log origin/<branch>..HEAD --oneline` if the current branch has an
   upstream). You'll diff against this snapshot in Phase 8 to prove nothing
   outside scope moved.

## Phase 1 — Resolve the section to files

1. Look up the requested section in `src/pages.ts` (match `name`/`title`,
   case-insensitively) to find its `component` and `path`.
2. Resolve that component to its file(s): either a single
   `src/contents/<Name>.tsx` (+ any co-located `.css`), or a subfolder
   (`src/contents/<Name>/…`) with its own components, data files and CSS —
   see `rePhlow-wiki-context.md` for the current folder convention if it
   exists.
3. Include section-specific assets (typically `public/assets/<slug>/…`) that
   the resolved component(s) actually reference.
4. Explicitly **exclude** shared/global files (`src/containers/App/App.css`,
   `src/components/Header.tsx`, `src/pages.ts`, `PageSectionNav.*`,
   `EcosystemMap*`, `Navbar.tsx`, `Footer.tsx`, etc.) even if they show local
   changes — unless the user named one of them directly.
5. If a shared file's current diff looks like it's *actually* about this
   section (e.g. a one-line entry in `pages.ts`), don't fold it in
   silently — list it under "uncertain cross-page dependency" in Phase 4 and
   let the user decide.

Produce a concrete file list. This is the *only* set of paths anything below
may touch.

## Phase 2 — Classify every section file (per-file, three-way)

For each file `F` in the Phase 1 list:

```
base=$(git merge-base HEAD origin/<branch>)
```

Compare three versions of `F`: `base` (`git show $base:F`), `remote`
(`git show origin/<branch>:F`), and `local` (the current working-tree copy,
including any uncommitted edits). Do this in a scratch location
(e.g. `/tmp`) — never overwrite the real working-tree file yet.

- **Unchanged both sides** → nothing to do.
- **Changed only remotely** (local == base) → the remote version is the
  result; no local work is lost because there wasn't any on this file.
- **Changed only locally** (remote == base) → the local version is the
  result; nothing remote to integrate.
- **Changed on both sides** → attempt a real per-file merge:
  `git merge-file -p local base remote > merged`.
  - Exit code `0`: clean automatic merge (the edits touched different
    hunks/lines) — `merged` is the integrated result. Keep it.
  - Exit code non-zero: `merged` contains `<<<<<<<`/`=======`/`>>>>>>>`
    conflict markers on genuinely overlapping lines. **Stop for this file.**
    Show the conflicting hunk(s) to the user in Phase 4 as a blocking item —
    do not guess a resolution, do not pick a side.
- **Exists remotely, missing locally** (deleted locally or added upstream)
  and **exists locally, missing remotely** (new local file, or deleted
  upstream) — flag explicitly in Phase 4; don't silently delete or silently
  adopt either side.
- **Binary assets** (images, PDFs) can't be three-way merged textually — if
  both sides changed the same asset, treat it like a conflict: surface both
  versions and ask which to keep (or whether both are needed under different
  names).

## Phase 3 — Check unpushed local commits (not just uncommitted changes)

If the current branch already has commits ahead of `origin/<branch>` that
are unrelated to this section, do not fold them into the sync. The sync
branch created in Phase 5 is built from `origin/<branch>` plus only the
reconciled section content — unrelated existing commits on the current
branch are left exactly where they are.

## Phase 4 — Present the plan and stop

Before writing anything, show the user, clearly labelled:

- **Section being synchronised** and the resolved file list (Phase 1).
- **Remote-only changes** being preserved (which files, one-line summary
  each).
- **Local-only changes** being added (same).
- **Merged files** — both sides integrated into the same file — with a short
  diff/summary of what came from where.
- **Conflicts requiring a decision** (Phase 2's non-zero cases) — the actual
  conflicting hunks, not a paraphrase. If any exist, this is a hard stop:
  don't proceed past this file until the user tells you how to resolve it.
- **Uncertain cross-page dependencies** (Phase 1, step 5) needing a decision.
- **The exact final file list proposed for staging** — nothing more.

Then ask directly, e.g.: *"Ready to stage and commit these N files for
<Section>. Nothing else in your working tree will be touched. Once this
lands, your local copies of these section files will hold the reconciled
version (origin/main + your local changes) instead of their old pre-sync
content — everything outside the section stays exactly as it is now. Confirm
to proceed?"*

**Do not go further until the user explicitly confirms.** If they raise
concerns or ask for changes, revise and re-present rather than proceeding on
an assumption.

## Phase 5 — Isolate, apply, stage, commit

Only after explicit confirmation:

1. If the current working tree has *any* changes outside the approved file
   list (virtually always true — that's the whole point of scoping), stash
   everything first so the sync branch starts clean:
   `git stash push -u -m "sync-section: <Section> temp WIP"`.
2. Create the sync branch from the official remote state (not from the
   stashed branch): `git switch -c <slug>-local-sync-<YYYY-MM-DD>
   origin/<branch>` — this repo's own history already uses exactly this
   `<section-slug>-local-sync-<date>` naming (see `git log --oneline
   --grep=Merge -i`), so match it.
3. Write the reconciled content computed in Phase 2 into place for the
   approved files only.
4. `git add <file> <file> …` — name each file explicitly, never a wildcard
   or `-A`.
5. `git diff --cached` — verify the staged diff matches exactly what was
   presented and confirmed in Phase 4. If it doesn't, stop and re-check
   before committing.
6. Commit with a clear, scoped message, e.g.
   `Sync <Section>: integrate remote updates with local changes`.

## Phase 6 — Check the contribution workflow before pushing

Look at recent history for how changes actually reach `main`:
`git log --oneline -20 origin/main` and `git log --oneline --grep="Merge
branch" -i`. In this repo, every recent integration (`project-description-
local-sync-2026-08-24`, `team-page-local-sync-2026-08-24`, etc.) landed via a
GitLab Merge Request into `main`, and `.gitlab-ci.yml` only runs its deploy
job on `main` itself — so a direct push to `main` also skips the review step
those other changes went through.

- **Default**: push the sync branch (`git push -u origin
  <slug>-local-sync-<date>`) and surface the "create a merge request" link
  GitLab prints in the push output (or construct
  `https://gitlab.igem.org/2026/madrid-ucm/-/merge_requests/new?merge_request%5Bsource_branch%5D=<branch>&merge_request%5Btarget_branch%5D=main`
  as a fallback). Summarise in the MR description what was changed and what
  remote changes were preserved. Do not merge it yourself.
- Only push straight to `main` if the user explicitly says that's the
  team's current practice for this kind of change — and confirm that
  specifically before doing it, separately from the Phase 4 confirmation.
- If GitLab rejects the push (protected branch, needs an MR, permissions),
  stop and report it plainly rather than trying another way around it.

## Phase 7 — Restore unrelated work; leave the section reconciled

**The final local state is not a full revert to Phase 0.** Unrelated files
go back to exactly how they were; the section's files must end up holding
the reconciled version (`origin/main` + local changes) that was just
committed and pushed — not their old, pre-sync local content. The stash from
Phase 5 contains *both* mixed together, so it can't just be popped and left
as-is.

1. Switch back to the branch the user was originally on:
   `git switch <original-branch>`.
2. `git stash pop`. If this reports a conflict on **any** file, stop
   immediately and show it exactly as git presents it — don't resolve a
   stash-pop conflict by discarding either side, and don't touch the
   section's files yet. (At this point every section file is back to its
   old pre-sync content; that's expected and temporary — step 4 replaces it.)
3. For each section file, before overwriting it, diff its just-restored
   content against the exact "local" snapshot recorded for it in Phase 2. If
   they differ, something changed that file after the snapshot was taken (a
   race, or an edit made during the sync) — **stop and show the user that
   diff instead of overwriting anything.**
4. Once confirmed unchanged, replace each section file's working-tree
   content with the version committed on the sync branch:
   `git show <sync-branch>:<file> > <file>` (equivalently `git checkout
   <sync-branch> -- <file>`). These files will now show as locally modified
   relative to the original branch's last commit — that's expected: they
   hold `origin/main` + local changes, not what that commit had.
5. Verify both halves explicitly: every file **outside** the section must
   now match the Phase 0 snapshot exactly; every file **inside** the section
   must now match `git show <sync-branch>:<file>` exactly. Report any
   mismatch instead of proceeding.

## Phase 8 — Report

Tell the user, concretely:

- The commit hash(es) created and their scoped file list.
- The branch pushed (and the Merge Request link, if applicable) or that a
  direct push to `main` landed (only if explicitly agreed in Phase 6).
- Confirmation that every file **outside** the section is byte-identical to
  before the sync started, and every file **inside** the section now holds
  the reconciled `origin/main` + local content (not its old pre-sync
  version) — i.e. the local working tree is the section synced, everything
  else untouched, not a full revert.
- Anything left unresolved (conflicts the user still needs to act on,
  cross-page dependencies not yet decided).
