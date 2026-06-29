# Analytics And Sound

## Sound

The site uses `src/sound.js`.

Current generated sound events:

- `click`
- `success`
- `wrong`
- `win`

The sounds are generated with Web Audio. No external audio files are used.

Mobile browsers require one user gesture before sound can play. The shared sound button is added automatically on pages that load `src/sound.js`.

## Analytics

The site uses `src/analytics.js`.

Set the Google Analytics 4 measurement ID in `src/site-config.js`:

```js
window.WONDER_SITE = {
  analytics: {
    gaMeasurementId: "G-XXXXXXXXXX",
    debug: true,
  },
};
```

When `gaMeasurementId` is empty, events are only printed in the browser console and counted locally in `localStorage`. Real visitor counts require a GA4 ID.

## Current Events

- `page_view`
- `lobby_ready`
- `age_filter`
- `game_open`
- `planned_game_click`
- `game_view`
- `game_start`
- `game_answer`
- `game_complete`
- `game_restart`
- `sound_toggle`

## Recommended GA Reports

- Lobby visits
- Game opens by `game_id`
- Game completion by `game_id`
- Restart rate by `game_id`
- Age filter clicks
- Planned game demand from `planned_game_click`

## Privacy Notes

Do not collect names, emails, chat content, or child personal data. Keep game analytics event-only and anonymous.
