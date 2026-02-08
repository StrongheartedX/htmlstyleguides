# Neon Brutal Research Brief: Interactive Story

## Style: Neon Brutal
## Period: 1910–1980s | Urban nightlife across Times Square (New York), Fremont Street (Las Vegas), and Kabukichō (Tokyo)
## Story Concept: A time-traveling neon fabricator discovers the parallel rise of electric light in three global nightlife capitals, racing to preserve the final handcrafted neon before LEDs replace them forever. Each city holds a secret about why humans need to glow.

---

## Key Historical Facts

1. **Georges Claude's air liquefaction breakthrough (1902)** – French engineer Georges Claude developed the Claude system for liquefying air in 1902. This industrial process produced neon as a byproduct, making the gas available in commercial quantities for the first time.

2. **First public neon demonstration at Paris Motor Show (December 3–18, 1910)** – Claude unveiled his neon tube lighting technology at the Paris Motor Show, marking the birth of neon as a public spectacle. He filed his first patent for neon lighting in 1910.

3. **Times Square's first neon sign (1924)** – The Willys-Overland automobile company installed the first neon sign in New York's Times Square in 1924, causing such a sensation that pedestrians stopped in the streets to stare, creating traffic jams.

4. **Las Vegas's first neon sign (1929)** – The Oasis Café at 123 Fremont Street installed Las Vegas's first neon sign in 1929. The Las Vegas Club followed in 1930, establishing the visual signature of downtown.

5. **First neon sign in Japan (1926)** – The very first neon sign in Japan was erected by Tokyo Pan Bakery in the Shinjuku district in 1926, introducing neon technology to the Far East two years before Las Vegas.

6. **Golden Nugget's revolutionary 1961 redesign** – The Golden Nugget, which opened in 1946, received a transformative neon facelift in 1961 when YESCO sign designer Kermit Wayne wrapped the exterior in glowing neon tubes, creating the iconic "bull nose" sign at the corner of 2nd and Fremont Street.

7. **Vegas Vic arrives on Fremont Street (1951)** – A 40-foot-tall neon cowboy named Vegas Vic was erected on the exterior of the Pioneer Club on the southwest corner of First Street and Fremont Street. Designed by Pat Denner and manufactured by Young Electric Sign Company, Vegas Vic featured a waving arm, moving cigarette, and a recording of "Howdy Partner" voiced by Maxwell Kelch every 15 minutes.

8. **Binion's Horseshoe opens as neon flagship (1951)** – Benny Binion opened the original Binion's Horseshoe Casino at 128 Fremont Street in 1951, later undergoing a legendary 1961 redesign by YESCO with one of the world's largest neon displays, featuring rotating horseshoes and a three-story "H Wall."

9. **Kabukichō's post-war reconstruction (April 1, 1948)** – After World War II devastation, Kabukichō was officially named on April 1, 1948, as part of Shinjuku's reconstruction. By 1956, the Tokyu Koma Theater and other entertainment venues were complete, cementing the area as an entertainment center primed for neon brilliance.

10. **Neon's explosion in Tokyo during 1964 Olympics** – The 1964 Tokyo Olympics sparked massive demand for outdoor advertising, causing neon sign adoption to skyrocket across Japan. Neon became the visual language of post-war Japanese modernity and urban nightlife.

11. **The 1950s–60s golden age of neon fabrication** – During the 1950s and 1960s, hand-bending neon tubes required years of specialized training. Artisans used hydrogen-oxygen torches to heat glass to precise temperatures, bend tubes freehand against line drawings, weld connections, and fill tubes with neon gas—a craft that produced tens of thousands of custom signs across North America and Asia.

12. **The near-death of neon (1950s–2000s)** – Fluorescent lamps and acrylic cabinet faces began replacing neon in the 1950s–60s. General Electric's introduction of LEDs (light-emitting diodes) delivered the final blow to widespread neon manufacturing. By the 2000s, the number of working neon fabricators had dwindled to a handful, turning hand-bent neon into a lost art form.

---

## Dramatic Arc

**Setup (Scenes 1–2):** The player is a young neon fabricator in 1980 Las Vegas, standing in a workshop surrounded by glass tubes, torches, and the faint hum of power supplies. Vegas Vic glows outside. The mentor figure warns: "LEDs are coming. The last real neon benders will be gone in a decade."

**Rising Tension (Scenes 3–6):** The player discovers a mysterious journal written by three neon artists—one from Times Square (1924), one from Fremont Street (1951), and one from Tokyo Shinjuku (1964). Each entry describes not just the technical craft, but the spiritual reason cities *need* to glow. Clues suggest the three artists knew each other across time.

**Climax (Scenes 7–9):** The player must choose between preserving neon by smashing LEDs in high-profile casinos (ethical dilemma), teaching the craft to a new generation (slow, uncertain), or using old technology to create one final monumental neon sign that will inspire the world. Time is running out—the mentor is leaving town tomorrow.

**Resolution (Scenes 10–12):** The choice branches. Path A: The sign is completed and catches the eye of a museum curator, sparking a neon preservation movement. Path B: The craft dies but the journal is preserved, later discovered by a 21st-century artist who revives it. Path C: The player fails, but small neon shops secretly survive in hidden corners of Tokyo and Las Vegas, waiting.

---

## Component Mapping

### CSS Classes → Narrative Functions

| CSS Class | Narrative Function | Usage |
|-----------|-------------------|-------|
| `.hero-title` | **Main scene heading** | Scene title, act breaks |
| `.hero-sub` | **Scene exposition** | Detailed setting description, context |
| `.card` | **Dialogue container** | Character speech, journal entries |
| `.btn.primary` | **Accept/commit choice** | "Bend the neon," "Smash the LED," "Teach" |
| `.btn.ghost` | **Reject/hesitant choice** | "Walk away," "Ask for more time," "Doubt" |
| `.badge` | **Status tags** | [CHOICE MADE], [TIME RUNNING], [SKILL CHECK: FAILING] |
| `.badge.alt` | **Warning/consequence tag** | [ALERT: LED FACTORY DEADLINE], [BETRAYAL IMMINENT] |
| `.badge.soft` | **Success/positive tag** | [ACHIEVEMENT UNLOCKED], [MENTOR APPROVES] |
| `.input` | **Player name/craft entry** | Signature in the journal, naming the final sign |
| `.memory-orb` | **Key memory/flashback trigger** | Glowing focal point when entering a past scene |
| `.scale-bar` | **Narrative progress** | Tension meter, time remaining, skill proficiency bar |
| `.type-sample` | **Flavor text / atmosphere** | Technical neon jargon, historical asides |
| `.scanlines` | **Visual transition effect** | Static flicker between scenes, time-jump distortion |

---

## Scene Outline

### Scene 1: The Workshop (1980 Las Vegas)
**ID:** `scene_001_workshop`
**Title:** "The Last Shift"
**Description:** The player enters their neon fabrication workshop. Vegas Vic glows visibly through the window. The mentor sits at a desk, face half-lit by a red neon tube, holding a journal.

**Choices:**
- A) Ask the mentor about the journal → **Branch to Scene 2**
- B) Ignore the mentor and bend neon → **Branch to Scene 3**
- C) Walk outside to look at Vegas Vic → **Branch to Scene 4** (alternate path)

**Component mapping:** `.hero-title` for "The Last Shift," `.hero-sub` for setting description, `.memory-orb` as Vegas Vic glow outside, `.card` for mentor dialogue.

---

### Scene 2: The Journal's First Entry (1980 Las Vegas)
**ID:** `scene_002_journal`
**Title:** "A Secret Across Time"
**Description:** The mentor opens the journal. The first entry is dated 1924 Times Square, signed by an unknown neon artist. The handwriting shifts between scenes.

**Choices:**
- A) "Tell me everything you know about this journal" → **Branch to Scene 5**
- B) "I don't believe this is real" → **Branch to Scene 3** (reality check)
- C) "Let me read it myself" → **Branch to Scene 6**

**Component mapping:** `.card` for journal entry text, `.type-sample` for historical flavor, `.badge[DISCOVERY]` on entry.

---

### Scene 3: Bending Tubes (1980 Las Vegas)
**ID:** `scene_003_craft`
**Title:** "The Torch Never Lies"
**Description:** The player picks up a glass tube and lights the hydrogen torch. The flame heats the glass. The player must focus to remember the correct temperature and angle—or risk shattering the tube.

**Choices:**
- A) Bend the tube with confidence → **[SKILL CHECK: PASS]** → Branch to Scene 4
- B) Hesitate and ask for guidance → **Branch to Scene 2**
- C) Let the tube overheat deliberately → **[SKILL CHECK: FAIL]** → Branch to Scene 7 (consequence path)

**Component mapping:** `.scale-bar` as heat meter, `.badge.alt` for [OVERHEAT WARNING], `.btn.primary` for "Bend," `.btn.ghost` for "Hesitate."

---

### Scene 4: Vegas Vic at Night (1980 Las Vegas)
**ID:** `scene_004_vicnight`
**Title:** "Neon Never Sleeps"
**Description:** Standing under Vegas Vic, the player watches the cowboy's arm wave and cigarette move. A younger neon artist walks by, talking about moving to California because "there's no work here anymore." Vegas Vic's glow flickers momentarily.

**Choices:**
- A) "Are you the artist from the 1951 generation?" → **Branch to Scene 5**
- B) "There's still time to save neon" → **Branch to Scene 8**
- C) Return to the workshop → **Branch to Scene 2**

**Component mapping:** `.hero-sub` for atmosphere of Fremont Street at night, `.memory-orb` as Vegas Vic's glow, `.card` for the young artist's dialogue.

---

### Scene 5: The 1951 Times Square Flashback
**ID:** `scene_005_flashback_1951_ny`
**Title:** "The First Glow in Manhattan"
**Description:** Time-shift effect (scanlines flicker). The player is now standing in Times Square in 1924–1951, watching the Willys-Overland neon sign cause crowds to stop and stare. A master neon bender, Thomas Gibbons (fictional name inspired by real YESCO artisans), explains: "Neon isn't light—it's *presence*. It says 'We're here. We're alive. Look at us.'"

**Choices:**
- A) "Teach me your technique" → **[LEARNING: TIMES SQUARE STYLE]** → Branch to Scene 6
- B) "Why does neon matter so much?" → **Branch to Scene 8**
- C) Return to 1980 → **Branch to Scene 4**

**Component mapping:** `.hero-title` for "First Glow," `.card` for Gibbons's teaching dialogue, `.badge.soft[KNOWLEDGE GAINED]`, scanlines transition effect.

---

### Scene 6: The 1951 Fremont Street Flashback
**ID:** `scene_006_flashback_1951_vegas`
**Title:** "The Golden Nugget Rises"
**Description:** Time-shift to Fremont Street in 1951, opening night of Binion's Horseshoe. The "bull nose" neon is under construction. A second master bender, Sofia Marcos (fictional, inspired by YESCO's Kermit Wayne), oversees the welding of massive neon tubes. The player watches the three-story "H" wall take shape.

**Choices:**
- A) "Can I help assemble this sign?" → **[TASK: WELD THE H-WALL]** → Branch to Scene 7
- B) "How is this different from Times Square?" → **Branch to Scene 8**
- C) Return to 1980 → **Branch to Scene 4**

**Component mapping:** `.hero-sub` for Fremont Street setting, `.card` for Sofia's dialogue, `.scale-bar` for construction progress, `.badge.alt[MONUMENTAL TASK]`.

---

### Scene 7: The 1964 Tokyo Kabukichō Flashback
**ID:** `scene_007_flashback_1964_tokyo`
**Title:** "The Neon Olympics"
**Description:** Time-shift to Tokyo's Shinjuku/Kabukichō in 1964 during the Olympics. Neon signs are multiplying across the district. The third master bender, Kenji Tanaka, is training a generation of young artisans. The district is alive with color—pink, blue, yellow neon competing for attention.

**Choices:**
- A) "Teach me the Japanese style of bending" → **[LEARNING: KABUKICHŌ STYLE]** → Branch to Scene 9
- B) "Why did neon explode here?" → **Branch to Scene 8**
- C) Return to 1980 → **Branch to Scene 4**

**Component mapping:** `.hero-title` for "Neon Olympics," `.hero-sub` for Kabukichō sensory description, `.memory-orb` as glowing neon intersection, `.card` for Kenji's dialogue.

---

### Scene 8: The Three Benders' Secret (Any Timeline)
**ID:** `scene_008_secret`
**Title:** "Why We Glow"
**Description:** A moment of clarity. The journal reveals that the three master benders—Gibbons, Marcos, and Tanaka—corresponded in secret. They believed neon was humanity's way of reclaiming the night, of saying "darkness is no longer in charge." They each built one perfect sign in their city, and those signs act as anchors against despair.

**Choices:**
- A) "I will become the fourth bender" → **Branch to Scene 10** (path: preservation)
- B) "I should warn people about LED corporations" → **Branch to Scene 11** (path: resistance)
- C) "Maybe neon's time is just over" → **Branch to Scene 12** (path: acceptance)

**Component mapping:** `.card` for revelatory journal entry, `.type-sample` for philosophical asides, `.badge.soft[EXISTENTIAL MOMENT]`.

---

### Scene 9: The Final Torch (1980 Las Vegas)
**ID:** `scene_009_finaltorch`
**Title:** "One Last Sign"
**Description:** Back in 1980. The mentor reveals the real reason for the journal: the three benders left instructions for a final, perfect neon sign to be created in 1980—one that combines Times Square boldness, Fremont Street scale, and Kabukichō poetry. It must be bent within 48 hours before the mentor leaves town. It must be *perfect*.

**Choices:**
- A) "I'm ready to build it" → **Branch to Scene 10**
- B) "This is too much pressure" → **Branch to Scene 11**
- C) "Who are you, really?" → **[REVEAL: Mentor is the fourth bender]** → Branch to Scene 10

**Component mapping:** `.hero-title` for "One Last Sign," `.scale-bar` for 48-hour countdown, `.badge.alt[DEADLINE ACTIVATED]`, `.card` for mentor's revelation.

---

### Scene 10: Building the Masterpiece (1980 Las Vegas)
**ID:** `scene_010_masterpiece`
**Title:** "The Pulse"
**Description:** The player, guided by the mentor, bends the final neon sign. This scene contains multiple skill checks (heat control, angle precision, tube welding). Success means the sign will glow perfectly. Failure means a shattering loss.

**Choices at checkpoints:**
- Heat checkpoint: "Trust your instinct" vs. "Follow the measurement" → **Both lead to success if you've learned from all three benders**
- Weld checkpoint: "Use the Times Square technique" vs. "Use the Tokyo technique" → **Both succeed, affecting the sign's final aesthetic**
- Seal checkpoint: "Rush to completion" vs. "Take time for perfection" → **Affects the ending**

**Component mapping:** `.scale-bar` for precision meter, `.btn.primary` for "Execute technique," `.badge` for skill checks, `.memory-orb` as the glowing tube in progress.

---

### Scene 11: The Resistance (1980 Las Vegas)
**ID:** `scene_011_resistance`
**Title:** "Fight the Fade"
**Description:** The player chooses to sabotage LED installations across Fremont Street and Times Square, leaving neon in their place. This is ethically murky but visually defiant.

**Choices:**
- A) "Target corporate casinos only" → **Branch to Scene 12A** (morally justified)
- B) "Target everything with LEDs" → **Branch to Scene 12B** (chaos path)
- C) "No—I can't do this" → **Branch to Scene 10** (return to building)

**Component mapping:** `.badge.alt[REBELLION]`, `.btn ghost` for uncertain actions, `.card` for internal conflict dialogue.

---

### Scene 12A: The Museum (1980s–Present Day)
**ID:** `scene_012a_museum`
**Title:** "The Neon Boneyard"
**Description:** The final sign the player created has caught the attention of a museum curator. Flash-forward to the present day. The sign is preserved in the Neon Museum in Las Vegas. Thousands of visitors see it each year. The craft of neon bending is being taught to new generations.

**Ending card:** `.badge.soft[ACHIEVEMENT: LEGACY PRESERVED]`

**Component mapping:** `.hero-title` for "The Neon Boneyard," `.type-sample` for museum placard text, `.memory-orb` as the glowing sign in the museum dark.

---

### Scene 12B: The Journal Survives (2020s)
**ID:** `scene_012b_journal`
**Title:** "The Hidden Craft"
**Description:** Neon didn't survive as mainstream. LEDs won. But the journal—passed through underground networks of neon enthusiasts—resurfaces in 2020. A young artist in Tokyo finds it. The craft is being revived in small studios across the world. Neon is no longer ubiquitous, but it's no longer forgotten.

**Ending card:** `.badge.alt[ACHIEVEMENT: KNOWLEDGE SURVIVED]`

**Component mapping:** `.card` for journal passages, `.hero-sub` for modern-day narrative, `.scanlines` for time-jump distortion.

---

### Scene 12C: Acceptance (1980–Present)
**ID:** `scene_012c_acceptance`
**Title:** "The Glow Fades"
**Description:** The player chooses not to fight. Neon gradually disappears. But in small towns and forgotten corners—a vintage diner in New Mexico, a pachinko parlor in Osaka, a gay bar in New York—neon persists. It's not the golden age, but it's enough. The mentor smiles and gives the journal to the player: "Now you keep it. For when someone asks why lights used to dance."

**Ending card:** `.badge.soft[BITTERSWEET CONCLUSION]`

**Component mapping:** `.hero-sub` for quiet, meditative scenes, `.memory-orb` as fading neon lights, `.card` for mentor's final words.

---

## Visual Notes

### Color Palette (From Neon Brutal Style Guide)

- **Cyan accent** (`#28F3FF`): Primary neon blue-green, evokes Times Square cold light
- **Magenta accent** (`#FF3B8D`): Neon pink, evokes Tokyo and Las Vegas warmth
- **Gold accent** (`#FFD84F`): Neon yellow, represents the warm vintage glow
- **Deep black background** (`#0A0C18`): The night sky backdrop
- **Light blue text** (`#EEF7FF`): Readable against dark, mimics neon phosphorescence

### Typography

- **Display (Monoton)**: Scene titles and major headings—chunky, retro arcade feel
- **Body (Chakra Petch)**: Dialogue and exposition—geometric, tech-forward but readable
- **Mono (Share Tech Mono)**: Journal entries, technical flavor text, skill checks—mimics typewriter history

### Key CSS Effects to Leverage

1. **Scanlines (`::before` pseudo-element)**: Transition between time periods. Flicker on time-jumps.
2. **Glow effect (`var(--glow)` box-shadow)**: Applied to buttons, cards, and memory-orb when player makes critical choices or discovers key facts.
3. **Pulse animation (3.8s cycle)**: The neon sign in progress pulses as the player works. Faster pulse = high tension.
4. **Orbit animation (10s cycle)**: Memory-orb orbits subtly during flashback scenes, emphasizing "you are outside normal time."
5. **Grid background**: Fixed in place, creates depth. Slightly tilted (`rotateX(8deg)`) to suggest dimensionality—the night city receding into distance.
6. **Radial gradients**: Apply cyan and magenta radials to `.hero` sections during Times Square and Tokyo scenes respectively. Adapts the scene's emotional color.

### Special Scene-Specific Styling

- **Scene 1 (Workshop)**: Muted colors, warm amber neon glow on mentor's face
- **Scene 5 (1924 Times Square)**: Cyan-heavy, sharp contrasts, black-and-white vignette
- **Scene 6 (1951 Fremont)**: Magenta-pink dominance, dusty, construction chaos
- **Scene 7 (1964 Tokyo)**: Multicolor neon chaos, gold and cyan competing, fast-paced
- **Scene 10 (Final bending)**: Glow intensifies as player succeeds. Each successful checkpoint makes the `.memory-orb` brighter and pulsing faster.
- **Ending scenes**: Slow, meditative animations. Glow dims or persists depending on player path.

---

**Final Note:**
This story uses the Neon Brutal design system's theatrical nature to immerse the player in the history of neon as both technology and human expression. The scanlines and glow effects aren't decoration—they're time machines. Every color choice echoes a real geographic location. The three-city structure mirrors the three master benders. The player becomes the fourth, completing a legacy that spans from Edison's electric revolution to the digital age.
