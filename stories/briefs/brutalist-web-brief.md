# Brutalist Web Research Brief: Interactive Story

## Style: Brutalist Web
## Period: 1950s-1970s / Post-War Europe and North America
## Story Concept: A conflicted architect navigates the rise and fall of brutalism, from idealistic social housing dreams to public backlash and demolition, discovering that raw honesty in design sometimes comes with a price. Through their journey, players explore whether function can truly triumph over human sentiment.

---

## Key Historical Facts

1. **Term Coined (1950)**: Swedish architect Hans Asplund first used the term "brutalism" in 1950 to describe a brick home in Uppsala, Sweden, establishing the vocabulary for the movement.

2. **Reyner Banham Essay (1955)**: British architectural critic Reyner Banham popularized the term in his 1955 essay "The New Brutalism," associating the movement with the French term "béton brut" (raw concrete), connecting design philosophy to material honesty.

3. **Le Corbusier's Unité d'Habitation (1952)**: French-Swiss architect Le Corbusier completed the landmark Unité d'Habitation residential complex in Marseille, a proto-brutalist building that became the model for social housing and raw concrete construction.

4. **Chandigarh Capitol Complex (1951-1961)**: Le Corbusier designed India's government buildings in Chandigarh over a 10-year period, influencing brutalism globally and establishing concrete as the material of modernist governance.

5. **Notre Dame du Haut (1955)**: Le Corbusier's modernist chapel in Ronchamp, France, featured raw concrete and sculptural forms, demonstrating brutalism's spiritual and artistic potential beyond utilitarian housing.

6. **Housing Subsidies Act (1956)**: The UK government's Housing Subsidies Act provided larger subsidies for high-rise council housing, directly incentivizing brutalist tower construction to solve post-war housing shortages.

7. **Smithsons Embrace New Brutalism (1954)**: English architects Alison and Peter Smithson first used the term "New Brutalism" to describe post-1930 works, establishing themselves as key theorists of the movement in Britain.

8. **Barbican Estate Construction (1965-1976)**: The Barbican Estate in London, designed by Chamberlin, Powell and Bon, began construction in 1965 and took 11 years to complete. The 40-acre complex eventually housed 4,000 residents in over 2,060 flats with distinctive bush-hammered concrete.

9. **High-Rise Housing Boom (1953-1966)**: In Britain, high-rise flats jumped from just 3% of public-sector approvals in 1953 to 26% of all homes started by 1966, demonstrating the rapid embrace of brutalist tower construction.

10. **Boston City Hall (1962-1968)**: An international design competition in 1962 attracted 256 entries, with the winning design by Kallmann, McKinnell, and Knowles producing one of America's most controversial brutalist landmarks, completed in 1968 and featuring massive exposed concrete forms.

11. **Paul Rudolph's Peak (1950s-1960s)**: American architect Paul Rudolph served as chair of Yale's Department of Architecture during the 1950s-1960s, designing influential brutalist buildings including the School of Art and Architecture at Yale (1958-1963) before falling from favor with postmodernism's rise in the 1970s.

12. **Council Housing Peak (Mid-1970s)**: At its height in the mid-1970s, British council housing provided homes for over one-third of the population, representing the apex of brutalism's social mission before the movement's decline and subsequent demolitions.

---

## Dramatic Arc

**Setup (Scenes 1-3)**: 1950 post-war London. The city is shattered; housing is desperate. A young idealistic architect discovers Le Corbusier's Unité d'Habitation in magazines and dreams of building communities with honesty and concrete. They receive their first opportunity: design a new council estate.

**Rising Tension (Scenes 4-7)**: 1960-1966. The architect designs a brutalist tower block. Early residents love it—clean lines, affordable, community spaces. But the government incentivizes "bigger faster cheaper" (Housing Subsidies Act). More towers go up. The architect sees their vision multiplied but also diluted. First critical voices emerge: "ugly concrete monstrosity."

**Climax (Scenes 8-10)**: 1970-1975. The brutalist dream peaks, then cracks. Council housing reaches one-third of Britain. But maintenance issues surface. Public opinion shifts. The architect attends a city council meeting where residents (people they built FOR) demand the buildings be torn down. They realize beauty and function aren't enough—emotion, identity, and belonging matter too.

**Resolution (Scenes 11-12)**: 1976-1980. Some estates are demolished. Others are preserved and celebrated. The architect, now older, walks through the Barbican—still standing, still elegant. They reflect: was brutalism a failure or just misunderstood? They begin a new project: renovation, not demolition, asking "can we redesign how society values honesty?"

---

## Component Mapping

**CSS Classes → Narrative Functions**

| Style Guide Class | Narrative Function | Purpose |
|-------------------|-------------------|---------|
| `.card` | Scene Container | Each scene is a brutalist card with visible borders |
| `.card-header` | Scene Title & Date | Bold black header with location/year |
| `.card-body` | Main Narration | Dense serif text (Times New Roman), body copy |
| `.card-inverted` | Architect's Internal Monologue | White text on black—intimate thoughts |
| `.btn btn-primary` | Major Choices | Black button for consequential decisions |
| `.btn btn-outline` | Secondary Choices | Dashed outline for exploratory options |
| `.badge badge-red` | Historical Fact Markers | Red badges highlight real dates/numbers from research |
| `.badge badge-yellow` | Warning/Tension | Yellow for mounting public criticism |
| `.warning-box` | Exposition/Context | Dense historical background in yellow boxes |
| `.info-box` | Key Decision Points | Cyan boxes for branching moments |
| `.data-table` | Timeline/Statistics | Tables showing housing data, construction dates |
| `.section` | Act Breaks | Thick borders separate narrative acts |
| `.blockquote` | Period Quotes | Italicized quotes from architects/critics |
| `.text-mono` | Technical Details | Courier font for architectural specs/measurements |
| `.principle` | Thematic Reflection | Numbered principles appear at act endings |
| `hr.brutal` | Transition Markers | Thick black lines between major shifts |
| `.flex-grid` | Choice Branching | Grids present multiple narrative paths |
| `.error-box` | Moral Dilemmas | Red boxes for character's ethical conflicts |

---

## Scene Outline

### Scene 1: "Discovery" (1950, Marseille)
**Location**: Magazine spread, London flat
- Young architect, age 24, reads about Le Corbusier's Unité d'Habitation
- Sees raw concrete, modular design, social housing ideal
- **Branching Choice**:
  - PATH A: "Pursue brutalism as pure philosophy" → leads to Scenes 3, 5, 8
  - PATH B: "Practical: learn the economics first" → leads to Scenes 2, 6, 9

### Scene 2: "Economics" (1952-1954, London)
**Location**: Architecture firm, drawing boards
- Mentor explains Housing Subsidies Act and profit incentives
- Architect realizes concrete = cost-effective at scale
- Historical fact badge: "1956 Subsidies Act accelerates high-rise by 300%"
- **Branching Choice**:
  - PATH A: "Design for profit margins" → Scene 6
  - PATH B: "Design only what's needed" → Scene 5

### Scene 3: "First Commission" (1954, East London)
**Location**: Council office, community meeting
- Architect presents boldly minimalist brutalist design
- Community excited: "Affordable housing for working families"
- Architect's internal monologue (inverted card): proud, idealistic
- **Straight to Scene 4**

### Scene 4: "The Build" (1958-1962, Construction Site)
**Location**: Concrete pour, weathering the elements
- Watching tower rise month by month
- Workers understand the structure in real-time
- Chart shows high-rise approvals rising from 3% (1953) to 26% (1966)
- **Branching Choice**:
  - PATH A: "Inspect daily; maintain ideals" → Scene 7 (quality)
  - PATH B: "Trust contractors; speed up completion" → Scene 6 (problems emerge)

### Scene 5: "The Smithsons" (1962, London Architectural Scene)
**Location**: Lecture hall, listening to Alison Smithson
- The Smithsons formalize "New Brutalism" as movement
- Architect feels validated: it's not just them, it's a philosophy
- Historical fact: "Alison & Peter Smithson, 1954, codify New Brutalism"
- **Branching Choice**:
  - PATH A: "Join the movement; build more" → Scene 8
  - PATH B: "Question if philosophy matches reality" → Scene 9

### Scene 6: "Growing Pains" (1966-1969, The Estate Maturing)
**Location**: Brutalist towers, first complaints
- Tenants report: dampness, isolation, maintenance ignored
- Local press: "Concrete jungle" (first negative coverage)
- Architect defends design but senses the gap
- **Straight to Scene 10**

### Scene 7: "Recognition" (1965-1968, Barbican Emerges)
**Location**: Watching Barbican Estate rise in London
- Parallel project, same era, Chamberlin Powell & Bon
- Architect inspired: "If we execute flawlessly, people understand"
- Historical fact: "Barbican Estate, 1965-1976, 4,000 residents, 2,060 flats"
- **Straight to Scene 9**

### Scene 8: "The Peak" (1972-1975, Tide at Zenith)
**Location**: Council housing offices, graphs on wall
- Historical fact: "Mid-1970s: Council housing homes 1/3 of British population"
- Architect at career height; multiple projects approved
- But cracks in morale: residents report depression, vandalism
- **Branching Choice**:
  - PATH A: "Blame maintenance budgets, not design" → Scene 11 (denial)
  - PATH B: "Something about towers isolates people" → Scene 12 (redemption)

### Scene 9: "Boston's Bold Statement" (1968, International News)
**Location**: Reading about Kallmann McKinnell Knowles
- Boston City Hall completed: 256-entry competition, massive concrete form
- American brutalism reaches apex
- Architect inspired but also sees the first cracks: public calls it ugly
- Historical fact: "Boston City Hall, 1962 competition, 256 entries, 1968 opening"
- **Straight to Scene 10**

### Scene 10: "The Turning" (1970-1975, Public Opinion Shifts)
**Location**: Council meeting, resident hearing
- Residents demand demolition (ironic: people the architect built for)
- First major estate slated for teardown
- Architect's moral crisis: "I built honestly, but they feel imprisoned"
- **Straight to Scene 11 or 12 based on earlier choices**

### Scene 11: "Demolition" (1976-1978, Falling Apart)
**Location**: Watching tower cranes tear down their work
- Public backlash reaches fever pitch
- Architect becomes symbol of "failed modernism"
- Inverted card: internal despair, wondering if honesty matters
- **Ending A**: "Maybe I was wrong about everything"

### Scene 12: "Preservation" (1980s, Reconsideration)
**Location**: Walking through Barbican, now listed and celebrated
- Some estates survive, listed as heritage
- Historical fact: "Barbican Estate Grade II-listed, September 2001"
- Younger architects are studying brutalism again
- Architect begins mentoring the next generation, teaches: "honesty first, understanding second"
- **Ending B**: "Brutalism wasn't wrong—society just had to grow into it"

---

## Visual Notes

### Color Palette (from style guide)
- **Primary**: Black (#000000) and White (#FFFFFF)—stark, honest contrast
- **Accent Red** (#FF0000): Used for historical fact badges and critical moments
- **Accent Yellow** (#FFFF00): Public criticism, pressure points, warnings
- **Accent Cyan** (#00FFFF): Decision points, architect's agency
- **Accent Green** (#00FF00): Achievement, completed buildings
- **Accent Magenta** (#FF00FF): Nostalgia, reflection, looking back

### Fonts
- **Times New Roman (serif)**: Narration, body text—readable, classical, grounded like concrete
- **Arial (sans-serif)**: Scene titles, bold declarations—functional, modern, no nonsense
- **Courier (monospace)**: Technical specs, architectural measurements, data tables—precise, honest

### Special CSS Effects
- **`.card-highlight`**: Red borders for moral dilemmas and climactic moments
- **`.data-table`**: Dense information for historical timelines and housing statistics
- **`hr` (thick black lines)**: Major transitions between acts and decades
- **`.warning-box`**: Dense historical exposition in yellow
- **`.u-bg-black` + white text**: Architect's introspective moments
- **`.section:nth-child(even)` repeating gradient**: Subtle texture evoking concrete seams and formwork patterns

### Layout Strategy
- Wide left borders (echoing Barbican's monumental pillars)
- Dense text blocks (honoring information-dense aesthetic)
- Exposed grid structure (visible `.grid-cell` borders throughout)
- Numbered sections matching style guide's numbered design principles
- Tables with monospace data (census, housing approvals, demolition dates)
- Cards that stand like buildings—borders visible, no shadows, no rounded corners

---

## References & Sources
- [Brutalist Architecture - Wikipedia](https://en.wikipedia.org/wiki/Brutalist_architecture)
- [Béton Brut - Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9ton_brut)
- [Council Housing in the UK - Wikipedia](https://en.wikipedia.org/wiki/Council_house)
- [Barbican Estate - City of London](https://www.cityoflondon.gov.uk/services/barbican-estate/barbican-estate-history)
- [Boston City Hall - Wikipedia](https://en.wikipedia.org/wiki/Boston_City_Hall)
- [Paul Rudolph - Wikipedia](https://en.wikipedia.org/wiki/Paul_Rudolph_(architect))
- [A History of Council Housing in 10 Buildings - Verso Books](https://www.versobooks.com/blogs/news/4328-a-history-of-council-housing-in-10-buildings)
- [Dezeen: Le Corbusier Unité d'Habitation](https://www.dezeen.com/2014/09/15/le-corbusier-unite-d-habitation-cite-radieuse-marseille-brutalist-architecture/)
- [99% Invisible: Unité d'Habitation](https://99percentinvisible.org/article/unite-dhabitation-le-corbusiers-proto-brutalist-urban-sky-villages/)
