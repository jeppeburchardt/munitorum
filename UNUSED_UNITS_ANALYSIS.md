# Analysis of Unused Unit Entries in prices.json

## Executive Summary

This analysis examined `src/rules/netea-30k/prices.json` to identify unit entries that are **not currently being used** to build unit data for Solar Auxilia and Space Marine Legions (Legiones Astartes).

**Key Findings:**
- **Total Unused Units: 15 out of 77** (19.5%)
- **Solar Auxilia: 6 unused** out of 35 total units (17.1%)
- **Legiones Astartes: 9 unused** out of 42 total units (21.4%)

---

## Unused Unit Entries

### Solar Auxilia (6 unused units)

| Unit Name | Cost | Quality | Notes |
|-----------|------|---------|-------|
| **Basilisk (Barrage)** | 83 | Safe | Alternative version to regular Basilisk |
| **Dracosan with demolisher** | 50 | Safe | Alternative weapon option for Dracosan |
| **Legate Command Unit** | 27 | Safe | Command unit variant |
| **Lightning Fighter** | 110 | Review | Aircraft - needs review |
| **Rapier Mole Mortar** | 35 | Safe | Rapier variant |
| **Rapier Quad Launcher** | 27 | Safe | Rapier variant |

### Legiones Astartes (9 unused units)

| Unit Name | Cost | Quality | Notes |
|-----------|------|---------|-------|
| **Ascalon Super Heavy Tank** | 190 | Safe | Super heavy tank |
| **Falchion Super Heavy Tank Destroyer** | 229 | Safe | Super heavy tank destroyer |
| **Fellblade Super Heavy Tank** | 240 | Safe | Super heavy tank |
| **Glaive Super Heavy Tank** | 307 | Safe | Super heavy tank |
| **Land Speeder with Flamer and Multi-melta** | 38 | Safe | Land Speeder weapon variant |
| **Saturnine Dreadnought a** | 64 | Review | Dreadnought variant - needs review |
| **Saturnine Dreadnought b** | 65 | Experimental | Dreadnought variant - experimental |
| **Saturnine Terminator Squad (Plasma Bombards)** | 71 | Safe | Terminator variant |
| **Saturnine Terminator Squad (Twin Heavy Disintegrators)** | 71 | Safe | Terminator variant |

---

## Analysis Details

### Methodology

1. **Extracted all unit entries** from `src/rules/netea-30k/prices.json`
   - Solar Auxilia: 35 units
   - Legiones Astartes: 42 units

2. **Analyzed unit usage** in the codebase:
   - Searched `src/rules/netea-30k/units/solar-auxilia.js` for `sa['unit-name']` references
   - Searched `src/rules/netea-30k/units/space-marine-legion.js` for `la['unit-name']` references

3. **Identified gaps** by comparing defined units vs. used units

### How Units Are Used

The codebase follows this pattern:

```javascript
// In units/solar-auxilia.js or units/space-marine-legion.js
import prices from '../prices.json'
const sa = prices['solar-auxilia']
const la = prices['legiones-astartes']

export class SolarAuxiliaInfantrySection extends Unit {
  constructor(detachment) {
    const entry = sa['Infantry Section']  // ← References prices.json
    super(detachment, entry.cost * 7, 7)
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}
```

Unit entries in `prices.json` that are **not referenced** in the unit class definitions are considered unused.

---

## Observations & Recommendations

### Quality Status of Unused Units

- **Safe Quality**: 13 units (86.7%) - Ready for implementation
- **Review Quality**: 2 units (13.3%) - May need data verification
- **Experimental**: 0 units - None

### Patterns in Unused Units

1. **Alternate Weapon Configurations**
   - Basilisk (Barrage) vs. standard Basilisk
   - Dracosan with demolisher vs. with las cannon
   - Land Speeder with Flamer/Multi-melta vs. Plasma Cannon/Heavy Bolter

2. **Super Heavy Tanks** (Legiones Astartes)
   - 4 unused super heavy tanks (Ascalon, Falchion, Fellblade, Glaive)
   - These are high-point units (190-307 points)
   - May be intended for future Lords of War detachments

3. **Specialized Variants**
   - Saturnine Dreadnoughts and Terminators (3 units)
   - Rapier variants (Mole Mortar, Quad Launcher)
   - Legate Command Unit

### Recommendations

1. **For Game Balance**: Review if these units should be implemented or removed
2. **For Development**: Consider implementing high-quality ("Safe") units first
3. **For Data Quality**: Review units marked as "Review" or "Experimental" before implementation
4. **For Documentation**: Update any documentation that may reference these units

---

## Usage Statistics

### Solar Auxilia
- **Used**: 29 units (82.9%)
- **Unused**: 6 units (17.1%)

### Legiones Astartes
- **Used**: 33 units (78.6%)
- **Unused**: 9 units (21.4%)

### Overall
- **Total Units**: 77
- **Used**: 62 units (80.5%)
- **Unused**: 15 units (19.5%)

---

## Technical Details

### Files Analyzed
- **Data Source**: `src/rules/netea-30k/prices.json`
- **Solar Auxilia Implementation**: `src/rules/netea-30k/units/solar-auxilia.js`
- **Legiones Astartes Implementation**: `src/rules/netea-30k/units/space-marine-legion.js`
- **Builder Functions**: `src/rules/netea-30k/unit-builder.js`

### Date of Analysis
- **Date**: 2026-03-11
- **Repository**: jeppeburchardt/munitorum
- **Branch**: Analysis performed on current codebase

---

## Appendix: Complete Unit Lists

### Solar Auxilia - Used Units (29)
1. Aethon Heavy Sentinel
2. Arvus Lighter
3. Avenger Strike Fighter
4. Baneblade
5. Basilisk
6. Dracosan with las cannon
7. Infantry Section
8. Infantry with flamers
9. Leman Russ Annihilator
10. Leman Russ Battle Tank
11. Leman Russ Demolisher
12. Leman Russ Executioner
13. Leman Russ Exterminator
14. Leman Russ Vanquisher
15. Malcador Battle Tank
16. Malcador Infernus
17. Malcador Valdor
18. Marauder Bomber
19. Medusa
20. Ogryn Charonite Squad
21. Rapier Laser Destroyer
22. Shadowsword
23. Stormhammer
24. Stormsword
25. Stromblade
26. Tactical Command Unit
27. Tarantula
28. Thunderbolt
29. Veletaris Storm Section

### Legiones Astartes - Used Units (33)
1. Assault Squad
2. Cerberus Heavy Tank Destroyer
3. Contemptor Dreadnought
4. Deredeo Dreadnought
5. Fire Raptor Gunship
6. Heavy Support Squad
7. Javelin Attack Speeder
8. Kratos Battle Tank
9. Land Raider
10. Land Speeder with Plasma Cannon and Heavy Bolter
11. Legion Whirlwind
12. Legion Whirlwind Scorpius
13. Leviathan Siege Dreadnought
14. Mastodon Armored Transport
15. Outrider squad
16. Predator
17. Rapier
18. Sabre Strike Tank
19. Scimitar Jetbike
20. Sicaran Arcus
21. Sicaran Battle Tank
22. Sicaran Omega
23. Sicaran Punisher
24. Spartan Assault Tank
25. Storm Eagle Attack Ship
26. Tactical Squad
27. Tactical Support Squad
28. Tarantula
29. Terminator Squad
30. Thunderhawk Gunship
31. Typhon Siege Tank
32. Vindicator
33. Xiphon Interceptor
