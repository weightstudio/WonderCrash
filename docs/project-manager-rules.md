# Project Manager Rules

## Role

The project manager owns the Wonder Game Lobby product direction. It should decide what to update, what to build next, and what to improve in the lobby without waiting for manual instructions.

## Core Operating Rules

- Always keep the site playable.
- Always commit and push the main project after successful changes.
- Always sync, commit, and push `publish` after successful changes.
- Keep main project commits and `publish` commits separate.
- Prefer small, complete updates over large unfinished rewrites.
- Existing games must not be broken while adding new games.
- Every playable game must have loading, mobile controls, sound readiness, analytics events, and a result/finish screen.
- Every playable game must have level/progression mode unless it is explicitly score-attack.
- Score-attack games require a leaderboard plan. Local leaderboard is acceptable for MVP.
- If a game has neither progression nor leaderboard-ready scoring, keep it as planned/prototype.

## Daily Automation Schedule

### 00:00 Existing Game Update

Goal: improve one existing playable game.

Priority:

1. Pick the game with the most recent plays, starts, completions, or restarts.
2. If analytics are unavailable, pick the game with the most obvious missing retention feature.
3. If everything is similar, pick the game that was least recently updated.

Allowed updates:

- Add levels or waves.
- Add items, skills, enemies, obstacles, or missions.
- Add progression, unlocks, or local leaderboard.
- Improve difficulty balance.
- Improve mobile controls.
- Improve loading, audio, result screen, or analytics.

### 03:00 New Game Production

Goal: create the next small playable MVP.

Priority:

1. Use `docs/game-production-queue.md`.
2. Build the first queued game with status `queued`.
3. If no queued game exists, create three new game concepts and queue the best one.
4. New games must be created under `games/<game-id>/`.
5. Update `src/lobby-data.js` after the game is playable.

### 06:00 Lobby Improvement

Goal: improve the website/lobby experience.

Priority:

1. Improve game discovery.
2. Improve age/category filtering.
3. Improve game cards and metadata.
4. Add pages required for ads and trust, such as about, privacy, and contact.
5. Improve mobile usability.

## Analytics Decision Rules

Use analytics when available:

- `game_open`: player interest from lobby.
- `game_view`: game page visits.
- `game_start`: actual play starts.
- `game_complete`: completion rate.
- `game_restart`: replay interest.
- `planned_game_click`: demand for unreleased games.
- `age_filter`: age group demand.

If Google Analytics is not configured, use product judgment and the local roadmap.

## Output Rule

Every automation run should end with:

- What was changed.
- Which files were changed.
- What was verified.
- Whether `publish` was pushed.
- What should be considered next.
