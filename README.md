# Arrow Escape Puzzle

A complete mobile-first puzzle game inspired by arrow-clearing mechanics. It is built as a dependency-free Progressive Web App so it can be packaged for Android/iOS with Capacitor, Cordova, a WebView shell, or any static host.

## Run

Open `index.html` in a browser, or serve the folder for offline service-worker support:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Production Architecture

- `src/core/engine.js` - deterministic move validation, undo stack, win detection, scoring helpers.
- `src/core/levelGenerator.js` - 1000+ scalable levels, daily challenge seeds, editor import/export format.
- `src/core/objectPool.js` - reusable DOM node pool for particles and board effects.
- `src/services/save.js` - local save, statistics, streaks, rewards, settings, purchases.
- `src/services/audio.js` - Web Audio tap, success, completion, and background music toggles.
- `src/services/adService.js` - rewarded-ad adapter with a local simulator fallback.
- `src/services/analytics.js` - analytics adapter boundary for Firebase/GameAnalytics/etc.
- `src/services/leaderboard.js` - local leaderboard adapter ready to swap for Game Center/Play Games.
- `src/ui/screens.js` - splash, home, level select, gameplay, pause, settings, daily, achievements, shop, statistics.
- `src/data/themes.js` - light, dark, and purchasable cosmetic themes.
- `src/data/achievements.js` - achievement definitions and unlock rules.

## Level Data Format

```js
{
  id: 42,
  size: 6,
  mode: "classic",
  moveLimit: null,
  timeLimit: null,
  tiles: [
    { id: "42-0", row: 0, col: 1, dir: "down", color: 2 }
  ]
}
```

A tile exits only when every cell in its facing ray is empty. The generator creates solvable boards by reverse-building placements from known exits, then shuffling tile order.

## Monetization Strategy

- Rewarded ads grant hints or bonus daily coins.
- `remove_ads` purchase disables ad prompts.
- Coin packs feed hints and cosmetics.
- Cosmetic themes avoid pay-to-win behavior.
- Adapter files are isolated so store SDKs can replace local simulations.

## Mobile Packaging Notes

Use the PWA as the game surface inside Capacitor. Map `AdService`, `SaveService`, and `LeaderboardService` to native plugins for AdMob, StoreKit/Billing, Game Center, and Play Games.
