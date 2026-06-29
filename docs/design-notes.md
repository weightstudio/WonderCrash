# Wonder Crash Design Notes

## Main Menu

The main menu uses five bottom tabs:

- Character: permanent hero growth. Current plan: improves coin gain and projectile speed.
- Equipment: permanent weapon growth. Current plan: improves eraser damage and base cooldown.
- Battle: level selection and progression locks.
- Wall: permanent defense growth. Current plan: improves max wall HP and damage reduction.
- Settings: battle exit, audio, and basic preference controls. Do not expose progress reset as a normal menu action.

## Balance Direction

- Character upgrades should feel like economy and control growth, not raw damage.
- Equipment upgrades should be the main answer to high-HP enemies.
- Wall upgrades should help younger players survive mistakes.
- Battle upgrades are temporary per-run choices after waves, so they can be stronger and more playful.
- Permanent upgrades should be slower and stable; battle upgrades should feel exciting immediately.

## Current Permanent Upgrade Formulas

- Character: +5% coin gain per level after level 1, +28 projectile speed per level after level 1.
- Equipment: +1 base weapon damage per level, cooldown improves by 3.5% per level after level 1, capped at 72% of base cooldown.
- Wall: +18 max wall HP per level after level 1, +2.5% wall damage reduction per level after level 1, capped at 35%.

## Equipment Backpack

- The equipment page shows coins first, then 8 fixed equipment slots in a 4 x 2 grid.
- Equipment slots do not scroll. The backpack below shows at least 5 rows and scrolls only when there are more items.
- The backpack stores owned weapon copies.
- A weapon can be equipped multiple times, up to the number of owned copies.
- Equipped weapons can be dragged back to the backpack area to unequip them.
- The backpack shows individual weapon cards, not `xN` counts.
- Weapon merging happens in the backpack, not in equipped slots.
- Dragging the same backpack weapon onto another backpack copy merges only when both copies are the same tier: x1 + x1 becomes x2, x2 + x2 becomes x3, up to x6.
- Weapon tier background colors show in both equipped slots and backpack cards: x1 gray, x2 green, x3 blue, x4 purple, x5 gold, x6 red.
- Merged weapon tiers spend the matching number of owned copies, but save equipment space and increase that weapon shot's damage.
- If the same weapon is equipped in separate slots, it fires additional projectiles at the same cooldown.
- Future weapons should be added to `src/game-data.js` under `weapons`, and their icon requests should be added to `docs/image-requests.md`.

## Visual Asset Rules

- Prefer image icons over text labels for menu buttons, upgrades, weapons, enemies, currency, and key battle UI.
- When a new image is needed, add it to `docs/image-requests.md` with target filename, usage, size, and a matching prompt.
- `docs/image-requests.md` is only for unfinished image requests. When a requested image is completed and placed in `assets/`, delete that row from `docs/image-requests.md` instead of marking it as existing, because the whole file may be sent to an image AI.
- Use existing bright toy-like 2D style prompts so new images match the current assets.

## Loading Rule

- Every playable game must show an in-game loading screen before the first interactive screen.
- Game images, sprite sheets, audio files, and required JSON/data tables must be preloaded before gameplay starts.
- The loading screen should show clear progress text or a progress bar. Never leave a blank screen while assets load.
- If loading fails, show a simple retry/refresh message instead of silently hanging.
- Do not allow gameplay input until required assets are ready.
- Each game should fire `game_ready` through `WonderAnalytics` after its required assets are loaded.

## Progression And Leaderboard Rule

- Every playable game should have a level/progression mode unless the core design is explicitly score-attack.
- Level/progression games need clear stages, unlock progression, completion feedback, and a reason to continue to the next stage.
- Score-attack games must include a leaderboard plan before release. The first version can use a local leaderboard, but the design should be ready for an online leaderboard later.
- If a game supports both level mode and score mode, level mode is the default for younger players and score mode is the replay/challenge layer.
- A game is not considered production-ready if it has neither progression nor a leaderboard-supported score goal.
- Analytics should track level start, level complete, score submit, and restart where applicable.

## Enemy Roles

- Toilet: runner. Low HP and low wall damage, but fast. Tests player early weapon coverage.
- TV: wobbler. Average stats but moves left and right, making it harder to hit cleanly.
- Fridge: tank. Slow, high HP, first hit is reduced by armor. Good target for damage upgrades.
- Wardrobe: breaker. Slow-ish, higher HP and high wall damage. Must be killed before reaching the wall.
- Surveillance: dasher. Medium stats, occasionally surges downward. Creates pressure spikes.
- Books: caster. Lower speed, higher HP, zigzags and pays more coins.
- Clock: sprinter. Fast and lighter, creates late-game timing pressure.
- Pencil box: bruiser. High HP and wall damage, introduced as a late-game priority target.

Enemy waves still define baseline difficulty. Enemy type multipliers create different behavior inside that difficulty.
