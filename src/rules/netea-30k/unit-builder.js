'use strict'

import {
    PricingQuality,
    ReinforcedArmour,
    ThickRearArmour,
    JumpPacks,
    Scout,
    Skimmer,
    Mounted,
    Walker,
    Planetfall,
    Commander,
    SupremeCommander,
    InvulnerableSave,
    Teleport,
    DamageCapacity,
    VoidShields
} from './special-rules'
import {
    Weapon,
    MultipleChoiceWeapon,
    RangedWeapon,
    AssaultWeapon,
    SmallArms,
    AntiPersonnel,
    AntiTank,
    AntiAircraft,
    BarragePoints,
    MultipleShot,
    MacroWeapon,
    ExtraAttacks,
    IgnoreCover,
    IndirectFire,
    Disrupt,
    SlowFiring,
    TitanKiller,
    FixedForwardFireArc,
    RearFireArc,
    LeftFireArc,
    RightFireArc,
    PointsModifier,
    StatsModifier
} from './weapons'

const UNIT_TRAIT_MAP = {
    'Commander': () => new Commander(),
    'Supreme Commander': () => new SupremeCommander(),
    'Walker': () => new Walker(),
    'Scout': () => new Scout(),
    'Skimmer': () => new Skimmer(),
    'Mounted': () => new Mounted(),
    'Reinforced Armour': () => new ReinforcedArmour(),
    'Thick Rear Armour': () => new ThickRearArmour(),
    'Jump Packs': () => new JumpPacks(),
    'Teleport': () => new Teleport(),
    'PLANET_FALL': () => new Planetfall(),
    'Invulnerable Save': () => new InvulnerableSave()
}

const WEAPON_TRAIT_MAP = {
    'Ignore Cover': () => new IgnoreCover(),
    'Macro-Weapon': () => new MacroWeapon(),
    'Extra Attack +1': () => new ExtraAttacks('+1'),
    'Indirect': () => new IndirectFire(),
    'Disrupt': () => new Disrupt(),
    'Slow Firing': () => new SlowFiring(),
    'Titan Killer (D3)': () => new TitanKiller('D3'),
    'Traits.TITAN_KILLER_1': () => new TitanKiller(1),
    'Fixed Forward': () => new FixedForwardFireArc(),
    'FxF': () => new FixedForwardFireArc(),
    'Rear': () => new RearFireArc(),
    'Traits.LEFT': () => new LeftFireArc(),
    'Traits.RIGHT': () => new RightFireArc()
}

/**
 * Returns a stats object derived from a prices.json unit entry.
 * Returns null if the entry has no unit_profile data.
 *
 * Note: aircraft entries with speed "fighter-bomber", "fighter", or "bomber"
 * will produce NaN for speed — callers must override this.stats.speed manually.
 */
export function statsFromEntry(entry) {
    const p = entry.unit_profile
    if (!p || Object.keys(p).length === 0) return null

    return {
        type: p.type,
        speed: parseInt(p.speed),
        armour: p.armour,
        cc: p.cc,
        ff: p.ff
    }
}

/**
 * Returns a rules array derived from a prices.json unit entry.
 * Always starts with PricingQuality when a quality value is present.
 * "Know no fear" is skipped — it has no matching class.
 * Unrecognised trait strings are skipped with a console.warn.
 */
export function rulesFromEntry(entry) {
    const rules = []

    if (entry.quality) {
        rules.push(new PricingQuality(entry.quality))
    }

    for (const trait of (entry.unit_profile?.traits ?? [])) {
        if (trait === 'Know no fear') continue

        const factory = UNIT_TRAIT_MAP[trait]
        if (factory) {
            rules.push(factory())
        } else {
            console.warn(`[unit-builder] Unknown unit trait: "${trait}"`)
        }
    }

    const p = entry.unit_profile ?? {}
    if (p.damage_capacity) rules.push(new DamageCapacity(p.damage_capacity))
    if (p.void_shields) rules.push(new VoidShields(p.void_shields))

    return rules
}

/**
 * Returns a weapons array derived from a prices.json unit entry.
 * Entries with options[] become MultipleChoiceWeapon.
 * Ranged weapons with a count field become MultipleShot.
 * Option entries with a non-zero cost_delta get a PointsModifier.
 */
export function weaponsFromEntry(entry) {
    return (entry.weapons ?? []).map(w => {
        if (w.options) {
            return new MultipleChoiceWeapon(...w.options.map(buildWeapon))
        }
        return buildWeapon(w)
    })
}

function buildFirepower(w) {
    const fp = w.firepower ?? {}
    const parts = []

    if (fp.bp) parts.push(new BarragePoints(fp.bp))
    if (fp.ap) parts.push(new AntiPersonnel(fp.ap))
    if (fp.at) parts.push(new AntiTank(fp.at))
    if (fp.aa) parts.push(new AntiAircraft(fp.aa))

    if (w.count) {
        return [new MultipleShot(`${w.count}x`, ...parts)]
    }

    return parts
}

function mapWeaponTraits(traits = []) {
    const result = []
    for (const trait of traits) {
        const factory = WEAPON_TRAIT_MAP[trait]
        if (factory) {
            result.push(factory())
        } else {
            console.warn(`[unit-builder] Unknown weapon trait: "${trait}"`)
        }
    }
    return result
}

function buildWeapon(w) {
    const pointsModifier = w.cost_delta ? new PointsModifier(w.cost_delta) : null
    const statsModifier = w.unit_stat_modifiers ? new StatsModifier(w.unit_stat_modifiers) : null
    let profile

    if (w.type === 'Small Arms') {
        profile = new SmallArms(w.range)
    } else if (w.type === 'Assault Weapons') {
        profile = new AssaultWeapon(...mapWeaponTraits(w.traits))
    } else {
        profile = new RangedWeapon(
            `${w.range}cm`,
            ...buildFirepower(w),
            ...mapWeaponTraits(w.traits)
        )
    }

    return new Weapon(w.name, ...[pointsModifier, statsModifier, profile].filter(Boolean))
}
