# The Floor Is Lava! 🌋 — Alex's Volcano Adventure

A cheerful, totally wholesome side-scrolling platformer made for Alex (6). Run and jump Mario-style over bubbling lava — couches, pillows, jungle islands, bouncy mushrooms, lava-rock platforms, pipes and crystal ledges — then make the grumpy Volcano King happy!

**Play:** https://howibrettyourmother.github.io/alex-floor-is-lava/ (best in landscape on a phone or iPad)

- **4 levels:** Living Room Lava → Jungle Volcano → Lava Caves → Volcano Summit, plus a friendly boss: bounce on the Volcano King 3 times and he turns into a happy, flower-covered volcano that shoots fireworks and confetti.
- **Mechanics:** coins, 5 sparkly gems per level, stompable lava blobs / hoppers / ember bats, ? blocks with power-ups: **Fire Boots** (walk on lava), **Rocket Jump** (double jump), **Bubble Shield** (saves you once), extra hearts. Checkpoint flags refill hearts.
- **Big moments:** rising-lava climbs, erupting volcanoes that rain coins (watch the glowing circles for lava drops).
- **Made for a 6-year-old:** huge LEFT / RIGHT / JUMP buttons (multi-touch), optional Auto-Run (off by default; shown as a green "AUTO-RUN ON" badge in-game, one tap on LEFT or the pause menu turns it off), coyote time, jump buffering, generous hitboxes, corner nudging. Falling in lava = a funny "HOT HOT HOT!" hop back to safety (−1 heart). Out of hearts = "Oopsie!" and continue from the last flag. No game over.
- **Sound:** original WebAudio chiptune themes per level (with a volcano drum groove), synth SFX, and warm voice lines ("Great job, Alex!", "Awesome jump, Alex!", "Alex, you're a lava legend!") played one at a time with music ducking. Works with the iPhone silent switch on.
- Title screen with hero color picker, best score, mute; end screen with stars, gems, coins and time.

All characters, art, music and sounds are original (procedural canvas + WebAudio); no third-party game assets.

Dev: `src/gen.sh` (offline Piper TTS → `/tmp/afl`), `python3 src/build.py` (inlines clips + JS into `index.html`), `python3 src/test.py` (iPhone 13 landscape/portrait + iPad checks & screenshots), `python3 src/fullrun.py` (simulated full playthrough).

Input (v1.1.0): touches are tracked per `Touch.identifier` and reconciled against `e.touches` on every touch event; touchcancel / pointercancel / blur / pagehide / visibilitychange clear all input, so a dropped touchend on iOS can never leave RIGHT stuck on.
