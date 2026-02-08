# Retro Terminal Research Brief: Interactive Story

## Style: Retro Terminal
**Phosphor CRT Design System**

## Period: 1837-1982 | Global Computing Revolution
From the theoretical dreams of Victorian engineers to the green glow of home computing terminals—a century of humanity's relentless drive to automate thought itself.

## Story Concept
A novice programmer in 1982 discovers an old terminal at a university surplus sale. As they power it on, the machine whispers secrets of computing history—from Babbage's mechanical dreams to the room-sized giants that won wars, to the pocket-sized revolution happening in real time. Each keystroke unlocks a chapter of the digital age.

---

## Key Historical Facts

1. **Charles Babbage designs the Analytical Engine (December 1837)**
   - British mathematician Charles Babbage published "On the Mathematical Powers of the Calculating Engine" describing a mechanical general-purpose computer—the first design that was Turing-complete with arithmetic logic, conditional branching, loops, and integrated memory.

2. **First computer program written by Ada Lovelace (1837-1840)**
   - Ada Lovelace completed the first program for the Analytical Engine in 1837, making her the world's first computer programmer—a century before electronic computers existed.

3. **Alan Turing's Universal Machine paper (1936)**
   - Alan Turing published "On Computable Numbers, with an Application to the Entscheidungsproblem," laying the theoretical foundation for modern computers and establishing that a single machine could compute any problem.

4. **ENIAC completion (February 1946)**
   - The Electronic Numerical Integrator and Computer (ENIAC) was publicly announced on February 14, 1946, and formally dedicated February 15, 1946. At 17,000 vacuum tubes, 70,000 resistors, 10,000 capacitors, 1,500 relays, weighing 30 tons, it cost $487,000 (equivalent to $7 million in 2024).

5. **ENIAC's computing power (1946)**
   - ENIAC could execute up to 5,000 additions per second, several orders of magnitude faster than electromechanical predecessors. Its first program was a feasibility study for thermonuclear weapons.

6. **John Bardeen & Walter Brattain invent the transistor (October 3, 1950)**
   - Three scientists at AT&T Bell Labs received a U.S. patent for the transistor—one of the most important inventions of the 20th century. It would eventually replace the power-hungry vacuum tube.

7. **Transistor era begins (1950s-1960)**
   - During the 1950s, semiconductor devices gradually replaced vacuum tubes in digital computers. By 1960, all new computer designs were fully transistorized, reducing size, power consumption, and heat generation dramatically.

8. **Louis Pouzin coins "shell" for Multics (1964)**
   - For the Multics operating system, computer scientist Louis Pouzin conceived the idea of "using commands somehow like a programming language" and coined the term "shell" to describe the command-line interface—a revolutionary approach to human-computer interaction.

9. **IBM System/360 announcement (April 7, 1964)**
   - IBM launched the System/360, a family of mainframes with six processor models covering a 50-fold range in performance. At a cost of $5 billion over 4 years, this unified architecture pioneered the 8-bit byte still used on computers today and separated software from hardware for the first time.

10. **Unix Shell introduced (1969)**
    - The first Unix shell appeared in Unix System 1 (1969), establishing the command-line paradigm that would dominate programming and system administration for decades.

11. **The "1977 Trinity" of personal computers**
    - Three revolutionary machines released in 1977: the Apple II (designed by Steve Wozniak), Commodore PET 2001, and TRS-80. These machines made computing accessible to non-professionals and became the most popular by late 1978.

12. **Commodore 64 dominates home computing (1982)**
    - Released in 1982 as successor to the VIC-20 (which sold over 1 million units), the Commodore 64 was priced at $595, making home computing accessible to the masses. At its peak in 1983, Commodore was selling as many C64s as the rest of the entire computer industry combined.

---

## Dramatic Arc

**SETUP (Scenes 1-3): The Discovery**
- Protagonist finds the old terminal at a surplus sale
- Powers it on—the CRT flickers to life with an eerie green glow
- First prompt appears on screen, inviting interaction

**RISING TENSION (Scenes 4-7): The Machine Awakens**
- Terminal displays fragmented memories of computation's past
- Protagonist types commands that unlock historical moments
- Temporal confusion: Is this machine real or some kind of simulation?
- Each command reveals deeper layers of computing history

**CLIMAX (Scenes 8-9): The Bridge**
- Terminal reveals it was built in 1982—the moment when home computing changed everything
- Protagonist realizes they are typing on a REAL machine from the pivotal year
- A choice: Continue delving into the machine's encrypted archives, or shut it down?
- Choice A leads to "deeper rabbit hole" → Scene 10A
- Choice B leads to "acceptance" → Scene 10B

**RESOLUTION (Scenes 10-12): The Future in the Past**
- Scene 10A (Deep Dive): Terminal shows theoretical future applications of 1982 technology
- Scene 10B (Acceptance): Protagonist understands the machine's historical importance
- Scene 11: Reflection on how "retro" computing connects to modern technology
- Scene 12 (Epilogue): Terminal goes dark, but protagonist's understanding is illuminated

---

## Component Mapping

**CSS Classes to Narrative Functions:**

| Style Class | Narrative Function | Usage |
|---|---|---|
| `.terminal-title` / `.section-title` | Chapter headers, scene titles | Major scene breaks and era markers |
| `.prompt` | Protagonist action, command entry | Player inputs and choices |
| `.text-bright` / `.phosphor-bright` | Critical discoveries, plot points | Key historical revelations |
| `.text-dim` / `.phosphor-dim` | Exposition, background context | Historical narrative passages |
| `.card` | Memory fragments, historical data blocks | Individual historical facts |
| `.alert alert-system` | Machine responses, dramatic moments | Terminal outputs, warnings |
| `.alert alert-warning` | Tension escalation | Anomaly warnings, system glitches |
| `.alert alert-error` | Climactic moments, danger | System failures, conflicts |
| `.button-grid` / `.btn` | Player choices | Branching decision points |
| `.cursor` | Active state, waiting for input | Interaction prompts |
| `.boot-text` | Machine startup sequences | Scene interludes, transitions |
| `.divider` / `.divider-dashed` | Scene separators | Temporal breaks between eras |
| `.table` | Timeline displays, technical specs | Factual historical data presentation |
| `.progress-bar` | Time passage, memory loading | Temporal progression, data transfer |

---

## Scene Outline

**SCENE 1: THE YARD SALE** (scene_001)
- **Title:** "SURPLUS INVENTORY"
- **Type:** Exposition / Setup
- **Description:** Protagonist discovers the terminal at a university surplus sale on a humid afternoon in 2024. Dust covers the keyboard. A handwritten label reads "1982."
- **Interactive Element:** Choice to buy or pass
- **Branches:** Choice A → Scene 2 (buy it); Choice B → Bad ending

**SCENE 2: POWER UP** (scene_002)
- **Title:** "SYSTEM INITIALIZATION"
- **Type:** Setup / Rising Tension
- **Description:** The terminal hums to life. Capacitors discharge with an audible buzz. The green phosphor screen flickers. A boot sequence appears.
- **Interactive Element:** Follow-on prompt
- **Branches:** → Scene 3

**SCENE 3: FIRST PROMPT** (scene_003)
- **Title:** "USER@TERMINAL:~$"
- **Type:** Rising Tension / Exposition
- **Description:** The cursor blinks expectantly. A message appears: "ENTER COMMAND?" The machine seems to be waiting for input. Protagonist realizes this isn't a simulation—it's a real 1982 machine.
- **Interactive Element:** Command entry (freeform or guided)
- **Branches:** → Scene 4 (any valid command)

**SCENE 4: THE HISTORY PROTOCOL** (scene_004)
- **Title:** "ENIAC.LOG DISCOVERED"
- **Type:** Rising Tension / Exposition
- **Description:** Terminal displays file listing. Protagonist types "cat ENIAC.LOG" and 1946 appears on screen—February 15, 1946, to be precise. ENIAC's public announcement. 17,000 vacuum tubes. 5,000 additions per second.
- **Historical Content:** Fact #4-5 (ENIAC details)
- **Interactive Element:** View the file or move on
- **Branches:** → Scene 5A (explore further) or Scene 5B (skip ahead)

**SCENE 5: VACUUM TUBE REVELATION** (scene_005)
- **Title:** "VACUUM_TUBE.LOG ACCESSED"
- **Type:** Rising Tension / Exposition
- **Description:** The machine displays the evolution from vacuum tubes to transistors. October 3, 1950. Bell Labs. Bardeen, Brattain, and Shockley. The beginning of the end for ENIAC-style computing.
- **Historical Content:** Fact #6-7 (Transistor invention and era)
- **Interactive Element:** Read more or investigate deeper
- **Branches:** → Scene 6

**SCENE 6: THE SHELL OPENS** (scene_006)
- **Title:** "SHELL_HISTORY.TXT"
- **Type:** Exposition / Rising Tension
- **Description:** A revelation that the very keyboard the protagonist is typing on uses a shell—the interface invented in 1964 by Louis Pouzin for Multics. The commands they're typing are descendants of 60-year-old ideas.
- **Historical Content:** Fact #8, #10 (Shell and Unix history)
- **Interactive Element:** Realization moment or denial
- **Branches:** → Scene 7 (acceptance leads deeper)

**SCENE 7: THE IBM GIANT** (scene_007)
- **Title:** "SYSTEM_360.MANIFEST"
- **Type:** Rising Tension / Exposition
- **Description:** The terminal displays information about the IBM System/360 from 1964. $5 billion investment. Six processor models. The machine that changed business forever. This terminal—a 1982 machine—is the spiritual descendant of that revolution.
- **Historical Content:** Fact #9 (IBM System/360)
- **Interactive Element:** Contemplate the scale or rush forward
- **Branches:** → Scene 8 (curiosity increases)

**SCENE 8: THE CRISIS** (scene_008)
- **Title:** "UNKNOWN.SYS CORRUPTED"
- **Type:** Climax / Tension Peak
- **Description:** An error message appears. The terminal begins displaying a warning: an unknown program is running in memory. Is it AI? A virus? A ghost in the machine? The cursor blinks with menace.
- **Interactive Element:** Major choice point
- **Choice A → Scene 9A:** Debug the system, investigate further
- **Choice B → Scene 9B:** Shut down the machine, reject the mystery
- **Branches:** Two-path climax

**SCENE 9A: THE DEEPER DIVE** (scene_009a)
- **Title:** "DEBUG.LOG RECURSIVE"
- **Type:** Climax / Revelation
- **Description:** The protagonist pursues the mysterious program. It reveals itself as a 1982-era predictive model—someone encoded a vision of the future into this machine. References to computers in pockets, instant global networks, and artificial minds. The machine shows glimpses of 2024.
- **Historical Content:** Fact #12 (Commodore 64 / 1982 computing revolution)
- **Interactive Element:** Accept the vision or reject it
- **Branches:** → Scene 11 (continue revelation path)

**SCENE 9B: THE SHUTDOWN** (scene_009b)
- **Title:** "SYSTEM HALT"
- **Type:** Climax / Resolution (alternate)
- **Description:** The protagonist refuses the mystery. They type "SHUTDOWN." The terminal powers down. The green glow fades. They're left with silence and a decision: was any of it real?
- **Interactive Element:** Reflection moment
- **Branches:** → Scene 11B (alternate resolution path)

**SCENE 10: THE BRIDGE** (scene_010)
- **Title:** "TEMPORAL_COHERENCE.SYS"
- **Type:** Resolution / Revelation
- **Description:** The machine reveals its true purpose. It was designed in 1982 as a time capsule—not physical, but digital. An attempt to show the past's connection to the future. Ada Lovelace to ENIAC to IBM System/360 to Commodore 64 to... whatever comes next.
- **Historical Content:** All facts synthesized
- **Interactive Element:** Understanding moment
- **Branches:** → Scene 11 or 12

**SCENE 11: THE PERSONAL REVOLUTION** (scene_011)
- **Title:** "1977_TRINITY.LOG"
- **Type:** Resolution / Revelation
- **Description:** The terminal displays the 1977 Trinity: Apple II, Commodore PET, TRS-80. Three machines that democratized computing. The protagonist realizes they are living in the era these machines predicted—the age of personal computing, fully realized.
- **Historical Content:** Fact #11 (1977 Trinity)
- **Interactive Element:** Epilogue reflection
- **Branches:** → Scene 12 (final moment)

**SCENE 12: THE GLOW FADES** (scene_012)
- **Title:** "END_OF_TRANSMISSION"
- **Type:** Resolution / Epilogue
- **Description:** The terminal's final message appears: "THANK YOU FOR REMEMBERING. YOUR FUTURE IS COMPUTATION." The green glow dims. But the protagonist's understanding remains bright. They look at their modern computer—a smartphone, a laptop—and see the lineage stretching back to Babbage, Turing, and the vacuum tubes of ENIAC.
- **Interactive Element:** Closure / Exit
- **Branches:** None (end state)

---

## Visual Notes

**Color Palette (from Retro Terminal style):**
- Primary glow: `#00ff00` (Phosphor Bright) — historical breakthroughs, key facts
- Secondary glow: `#33ff33` (Phosphor Mid) — exposition, narrative passages
- Tertiary muted: `#00cc00` (Phosphor Dim) — background details, flavor text
- Deep black: `#000a00` (CRT Black) — screen background
- Error moments: `#ff3333` (Status Error) — dramatic tension, climax
- Warning moments: `#ffcc00` (Status Warning) — rising tension
- Info moments: `#00ccff` (Status Info) — technical revelations

**Typography:**
- Scene titles: VT323 48px, full glow effect
- Historical facts: IBM Plex Mono 16px, normal brightness
- Dialogue/narration: IBM Plex Mono 16px, mid-brightness
- Commands typed: Fira Code 14px, bright with subtle glow
- Timestamps in history: Fira Code 12px, dim

**Special Effects to Leverage:**
- **Scanlines animation:** Apply during scene transitions to simulate CRT refresh
- **Flicker effect:** Activate during moments of system stress or temporal anomaly (Scenes 8-9)
- **Glow-pulse animation:** Use on critical historical facts or revelations
- **Blink animation:** Cursor blinks during wait states and climactic moments
- **Boot-text style:** Use for system startup sequences between major scenes
- **Matrix-bg decoration:** Subtle binary background during data access scenes
- **Alert-system styling:** Dramatic centering and glow for pivotal story moments

**Layout Considerations:**
- Each scene occupies full-screen terminal container
- Commands and responses use `.prompt` and `.boot-text` styles
- Historical facts displayed in `.card` containers with `.card-highlight` for critical revelations
- Choice buttons use `.btn-primary` (accepting) and `.btn-danger` (rejecting/warning)
- Branching points marked with `.button-grid` containing two `.btn` elements
- Temporal transitions marked with `.divider` or `.divider-dashed`
- Loading sequences use `.progress-bar` to indicate memory retrieval
- Error states use `.alert alert-error` for dramatic impact

---

## References & Sources

- [Alan Turing - Wikipedia](https://en.wikipedia.org/wiki/Alan_Turing)
- [ENIAC - Wikipedia](https://en.wikipedia.org/wiki/ENIAC)
- [Command-line interface - Wikipedia](https://en.wikipedia.org/wiki/Command-line_interface)
- [Analytical engine - Wikipedia](https://en.wikipedia.org/wiki/Analytical_engine)
- [The IBM System/360 - IBM](https://www.ibm.com/history/system-360)
- [Home computer - Wikipedia](https://en.wikipedia.org/wiki/Home_computer)
