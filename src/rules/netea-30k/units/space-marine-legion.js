'use strict'

import {
  ReinforcedArmour,
  ThickRearArmour,
  JumpPacks,
  Scout,
  Skimmer,
  ExploratoryAuguryWeb,
  Mounted,
  Infiltrator,
  Inspiring,
  SupremeCommander,
  InvulnerableSave,
  Walker,
  Planetfall,
  Commander,
  Leader,
  DamageCapacity,
  CriticalHit,
  SlowAndSteady,
  Teleport,
  VoidShields,
  PricingQuality
} from '../special-rules'
import {
  MultipleChoiceWeapon,
  Weapon,
  WeaponSet,
  StatsModifier,
  OptionalWeapons,
  MultipleShot,
  MacroWeapon,
  TitanKiller,
  ExtraAttacks,
  AntiPersonnel,
  AntiTank,
  AntiAircraft,
  RangedWeapon,
  AssaultWeapon,
  SmallArms,
  Disrupt,
  Sniper,
  IgnoreCover,
  IndirectFire,
  BarragePoints,
  FixedForwardFireArc,
  SingleShot,
  Feedback,
  ForwardFireArc,
  LeftFireArc,
  RightFireArc,
  PointsModifier,
  Fleshbane,
  Armourbane,
  Siege,
  Lance
} from '../weapons'
import MultipleChoiceUnit from './multiple-choice-unit'
import Unit, { TransportUnit } from './unit'
import ModifierUnit from './modifier-unit'
import SpacecraftUnit from './spacecraft-unit'
import withType from '../with-type'
import prices from '../prices.json'
import { statsFromEntry, rulesFromEntry, weaponsFromEntry } from '../unit-builder'

const la = prices['legiones-astartes']

export class LegionUnit extends Unit {
  getRules() {
    const rules = super.getRules()
    const teleport = this.detachment.units.find(item => item instanceof LegionTeleport)

    if (teleport && (this.stats.type === 'INF' || this.stats.type === 'CH')) {
      return rules.concat(new Teleport())
    }

    return rules
  }
}

export class LegionCharacterUnit extends LegionUnit {
  constructor(detachment, cost) {
    super(detachment, cost, 1)
  }
}

export class LegionPrimarchUnit extends LegionCharacterUnit {
  constructor(detachment, cost) {
    super(detachment, cost, 1)
  }
}

export class LegionArtilleryUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionWhirlwind(detachment),
      new LegionWhirlwindScorpius(detachment),
    )
  }
}

export class LegionAssaultSquad extends LegionUnit {
  constructor(detachment) {
    const entry = la['Assault Squad']
    super(detachment, entry.cost * 8, 8)

    this.transportType = 'assault'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionAssaultSupportSquad extends LegionAssaultSquad {
  constructor(detachment) {
    super(detachment, 175, 4)

    this.cost = 175
    this.min = 4
    this.quantity = 4
  }
}


export class LegionBasilisk extends LegionUnit {
  constructor(detachment) {
    super(detachment, 325, 4)

    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'AV',
      speed: 35,
      armour: 5,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('earthshaker-cannon', new RangedWeapon('120cm', new AntiPersonnel('4+'), new AntiTank('4+'), new BarragePoints(1), new IndirectFire())),
      new Weapon('heavy-bolter', new RangedWeapon('30cm', new AntiPersonnel('5+')))
    ]
  }
}

export class LegionBattleBarge extends SpacecraftUnit {
  constructor(detachment) {
    super(detachment, 300, 1)

    this.transportTypes = {
      tactical: 60,
      assault: 60,
      terminator: 60,
      rapier: 60,
      dreadnought: 60,
      bike: 60,
      rhino: 60,
      landRaider: 60,
      thunderhawk: 9,
      assaultRam: Infinity,
      dropPod: Infinity,
      stormEagle: Infinity
    }
    this.rules = [
      new PricingQuality('Legacy'),
      new SlowAndSteady()
    ]
    this.stats = {
      type: 'SC',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('orbital-bombardment', new RangedWeapon('-', new BarragePoints(14), new MacroWeapon()))
    ]
  }
}

export class LegionOutriderUnit extends LegionUnit {
  constructor(detachment) {
    const entry = la['Outrider squad']
    super(detachment, entry.cost * 4, 4)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionCaestus extends TransportUnit {
  constructor(detachment) {
    super(detachment, 50)

    this.transportTypes = {
      terminator: 2
    }
    this.rules = [
      new PricingQuality('Legacy'),
      new Planetfall(),
      new ReinforcedArmour(),
      new Skimmer()
    ]
    this.stats = {
      type: 'AV',
      speed: 35,
      armour: 5,
      cc: 6,
      ff: 4
    }
    this.weapons = [
      new Weapon('firefury-missile', new RangedWeapon('30cm', new BarragePoints(1), new SingleShot())),
      new Weapon('magna-melta',
        new RangedWeapon('15cm', new AntiPersonnel('3+'), new AntiTank('3+'), new MacroWeapon()),
        new SmallArms('15cm', new MacroWeapon())
      )
    ]
  }
}

export class LegionCerberus extends LegionUnit {
  constructor(detachment) {
    const entry = la['Cerberus Heavy Tank Destroyer']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionChampion extends LegionCharacterUnit {
  constructor(detachment) {
    super(detachment, 50, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new InvulnerableSave(),
      new Leader()
    ]
    this.stats = {
      type: 'CH',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('charnabal-sabre', new AssaultWeapon(new Fleshbane(), new Sniper(), new ExtraAttacks('+1')))
    ]
  }
}

export class LegionChaplain extends LegionCharacterUnit {
  constructor(detachment) {
    super(detachment, 50, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new InvulnerableSave(),
      new Leader(),
      new Inspiring()
    ]
    this.stats = {
      type: 'CH',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('crozius-arcanum', new AssaultWeapon(new Fleshbane(), new ExtraAttacks('+1')))
    ]
  }
}

export class LegionContemptorDreadnoughtTalonUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionContemptorDreadnought(detachment),
      new LegionDeredeoDreadnought(detachment)
    )

    this.transportType = 'dreadnought'
  }
}

export class LegionContemptorDreadnought extends LegionUnit {
  constructor(detachment) {
    const entry = la['Contemptor Dreadnought']
    super(detachment, entry.cost, 1)

    this.transportType = 'dreadnought'
    this.rules = rulesFromEntry(entry).concat([new InvulnerableSave()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionDamoclesCommandRhino extends LegionUnit {
  constructor(detachment, cost, min, max) {
    super(detachment, cost, min, max)

    this.transportTypes = {
      tactical: 2
    }
    this.rules = [
      new PricingQuality('Legacy'),
      new Commander()
    ]
    this.stats = {
      type: 'AV',
      speed: 15,
      armour: 6,
      cc: 6,
      ff: 6
    }
    this.weapons = [
      new Weapon('combi-bolter', new SmallArms('15cm'))
    ]
  }
}

export class LegionDeredeoDreadnought extends LegionUnit {
  constructor(detachment) {
    const entry = la['Deredeo Dreadnought']
    super(detachment, entry.cost, 1)

    this.transportType = 'dreadnought'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionDropPod extends TransportUnit {
  constructor(detachment) {
    super(detachment, 0)

    this.transportTypes = {
      tactical: 2,
      assault: 2,
      rapier: 1,
      dreadnought: 1
    }
    this.rules = [
      new PricingQuality('Legacy'),
      new Planetfall()
    ]
    this.stats = {
      type: 'Special',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('deathstorm-bombardment', new RangedWeapon('15cm', new AntiPersonnel('5+'), new AntiTank('5+')))
    ]
  }
}

export class LegionGunship extends LegionUnit {
  constructor(detachment) {
    const entry = la['Fire Raptor Gunship']
    super(detachment, entry.cost * 2, 2)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'fighter-bomber'
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionHeavySupportSquad extends LegionUnit {
  constructor(detachment) {
    const entry = la['Heavy Support Squad']
    super(detachment, entry.cost, 1, 4)

    this.transportType = 'tactical'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionJavelinAttackSpeeder extends LegionUnit {
  constructor(detachment) {
    const entry = la['Javelin Attack Speeder']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionLandRaiderAchillesTransport extends LegionUnit {
  constructor(detachment) {
    super(detachment, 100, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new ReinforcedArmour(),
      new ThickRearArmour()
    ]
    this.transportTypes = {
      tactical: 2,
      terminator: 1
    }
    this.stats = {
      type: 'AV',
      speed: 25,
      armour: 3,
      cc: 6,
      ff: 4
    }
    this.weapons = [
      new Weapon('achilles-quad-mortar', new RangedWeapon('45cm', new AntiPersonnel('4+'), new AntiTank('4+'))),
      new MultipleChoiceWeapon(
        new Weapon('sponson-twin-linked-multi-meltas',
          new RangedWeapon('15cm', new AntiPersonnel('4+'), new AntiTank('4+'), new MacroWeapon()),
          new SmallArms('15cm', new MacroWeapon())
        ),
        new Weapon('sponson-twin-linked-volkite-culverins', new RangedWeapon('45cm', new AntiPersonnel('4+'), new Disrupt()))
      )
    ]
  }
}

export class LegionLandRaiderAchilles extends LegionUnit {
  constructor(detachment) {
    super(detachment, 105, 1)

    this.rules = [
      new ReinforcedArmour(),
      new ThickRearArmour()
    ]
    this.stats = {
      type: 'AV',
      speed: 25,
      armour: 3,
      cc: 6,
      ff: 4
    }
    this.weapons = [
      new Weapon('achilles-quad-mortar', new RangedWeapon('45cm', new AntiPersonnel('4+'), new AntiTank('4+'))),
      new MultipleChoiceWeapon(
        new Weapon('sponson-twin-linked-multi-meltas',
          new RangedWeapon('15cm', new MacroWeapon('4+')),
          new SmallArms('15cm', new MacroWeapon())
        ),
        new Weapon('sponson-twin-linked-volkite-culverins', new RangedWeapon('45cm', new AntiPersonnel('4+'), new Disrupt()))
      )
    ]
  }
}

export class LegionLandRaiderProteusSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionLandRaiderProteus(detachment),
      new LegionLandRaiderAchilles(detachment)
    )

    this.transportType = 'landRaider'
  }
}

export class LegionLandRaiderProteusTransport extends TransportUnit {
  constructor(detachment) {
    const entry = la['Land Raider']
    super(detachment, entry.cost, 1)

    this.achilles = []
    this.maxAchilles = 2
    this.transportTypes = {
      tactical: 2,
      terminator: 1
    }
    this.rules = rulesFromEntry(entry).concat([new ExploratoryAuguryWeb()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }

  getQuantity() {
    return super.getQuantity() - this.detachment.units
      .filter(item => item.type === LegionLandRaiderAchillesTransport.type)
      .length
  }
}

export class LegionLandRaiderProteus extends LegionUnit {
  constructor(detachment) {
    const entry = la['Land Raider']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry).concat([new ExploratoryAuguryWeb()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionLandSpeeder extends LegionUnit {
  constructor(detachment) {
    const entry = la['Land Speeder with Plasma Cannon and Heavy Bolter']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionLeviathanDreadnought extends LegionUnit {
  constructor(detachment) {
    const entry = la['Leviathan Siege Dreadnought']
    super(detachment, entry.cost, 1)

    this.transportType = 'dreadnought'
    this.rules = rulesFromEntry(entry).concat([new InvulnerableSave('6+')])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}
export class LegionLeviathanSupportDreadnought extends LegionLeviathanDreadnought {
  constructor(detachment) {
    super(detachment)

    this.cost = 75
  }
}

export class LegionLibrarian extends LegionCharacterUnit {
  constructor(detachment) {
    super(detachment, 50, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new InvulnerableSave(),
      new Leader()
    ]
    this.stats = {
      type: 'CH',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('force-weapon', new AssaultWeapon(new MacroWeapon(), new ExtraAttacks('+1'))),
      new Weapon('smite', new SmallArms('15cm', new MacroWeapon(), new ExtraAttacks('+1')))
    ]
  }
}

export class LegionLieutenantCommander extends LegionCharacterUnit {
  constructor(detachment) {
    super(detachment, 50, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new InvulnerableSave(),
      new Commander()
    ]
    this.stats = {
      type: 'CH',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('paragon-blade', new AssaultWeapon(new Fleshbane(), new ExtraAttacks('+1')))
    ]
  }
}

export class LegionLordCommander extends LegionCharacterUnit {
  constructor(detachment) {
    super(detachment, 100, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new InvulnerableSave(),
      new SupremeCommander()
    ]
    this.stats = {
      type: 'CH',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('paragon-blade', new AssaultWeapon(new Fleshbane(), new ExtraAttacks('+1')))
    ]
  }
}

export class LegionMastodon extends TransportUnit {
  constructor(detachment) {
    const entry = la['Mastodon Armored Transport']
    super(detachment, entry.cost)

    this.transportTypes = {
      tactical: 8,
      terminator: 4,
      dreadnought: 2
    }
    this.rules = rulesFromEntry(entry).concat([new ThickRearArmour()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionMedusa extends LegionUnit {
  constructor(detachment) {
    super(detachment, 250, 4)

    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'AV',
      speed: 20,
      armour: 5,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('medusa-siege-cannon',
        new RangedWeapon('30cm', new MacroWeapon(), new AntiPersonnel('4+'), new AntiTank('4+'), new IndirectFire()),
        new SmallArms('15cm', new MacroWeapon())
      ),
      new Weapon('heavy-bolter',
        new RangedWeapon('30cm', new AntiPersonnel('5+'))
      )
    ]
  }
}

export class LegionPredator extends LegionUnit {
  constructor(detachment) {
    const entry = la['Predator Annihilator']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionRapier extends LegionUnit {
  constructor(detachment) {
    const entry = la['Rapier']
    super(detachment, entry.cost, 1)

    this.transportType = 'rapier'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionRapierSupport extends LegionRapier {
  constructor(detachment) {
    super(detachment)

    this.cost = 40
  }
}

export class LegionRhino extends TransportUnit {
  constructor(detachment) {
    super(detachment, 0)

    this.transportTypes = {
      tactical: 2
    }
    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'AV',
      speed: 30,
      armour: 5,
      cc: 6,
      ff: 6
    }
    this.weapons = [
      new Weapon('combi-bolter', new SmallArms('15cm'))
    ]
  }
}

export class LegionScimitarJetbike extends LegionUnit {
  constructor(detachment) {
    const entry = la['Scimitar Jetbike']
    super(detachment, entry.cost * 6, 6)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionSicaranBattleTankSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionSicaran(detachment),
      new LegionSicaranOmega(detachment)
    )

    this.types[0].cost = 75
  }
}

export class LegionSicaranPunisherUnit extends LegionUnit {
  constructor(detachment) {
    const entry = la['Sicaran Punisher']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionSicaranArcusUnit extends LegionUnit {
  constructor(detachment) {
    const entry = la['Sicaran Arcus']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionSicaranStrikeTankSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionSicaranPunisherUnit(detachment),
      new LegionSicaranArcusUnit(detachment)
    )
  }
}

export class LegionSicaranOmega extends LegionUnit {
  constructor(detachment) {
    const entry = la['Sicaran Omega']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionSicaran extends LegionUnit {
  constructor(detachment) {
    const entry = la['Sicaran Battle Tank']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionSpacecraftUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionStrikeCruiser(detachment),
      new LegionBattleBarge(detachment)
    )
  }
}

export class LegionSpartan extends TransportUnit {
  constructor(detachment) {
    const entry = la['Spartan Assault Tank']
    super(detachment, entry.cost)

    this.transportTypes = {
      tactical: 4,
      terminator: 2
    }
    this.rules = rulesFromEntry(entry).concat([new CriticalHit('legion-spartan-critical-hit')])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionStormEagleAttackShip extends LegionUnit {
  constructor(detachment) {
    const entry = la['Storm Eagle Attack Ship']
    super(detachment, entry.cost, 1, 3)

    this.transportTypes = {
      tactical: 4,
      assault: 4,
      terminator: 2
    }
    this.rules = rulesFromEntry(entry).concat([new DamageCapacity(1)])
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'fighter-bomber'
    this.weapons = [
      new Weapon('hellstrike-missile-pod', new RangedWeapon('45cm', new MultipleShot('2x', new AntiTank('4+')))),
      new Weapon('vengeance-launcher', new RangedWeapon('45cm', new BarragePoints(1), new FixedForwardFireArc())),
      new Weapon('twin-linked-heavy-bolters', new RangedWeapon('30cm', new AntiPersonnel('4+'), new AntiAircraft('5+')))
    ]
  }
}

export class LegionStrikeCruiser extends SpacecraftUnit {
  constructor(detachment) {
    super(detachment, 200, 1)

    this.transportTypes = {
      tactical: 20,
      assault: 20,
      terminator: 20,
      rapier: 20,
      dreadnought: 20,
      bike: 20,
      rhino: 20,
      landRaider: 20,
      thunderhawk: 6,
      assaultRam: Infinity,
      dropPod: Infinity,
      stormEagle: Infinity
    }
    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'SC',
      speed: 0,
      armour: 7,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('orbital-bombardment', new RangedWeapon('-', new BarragePoints(5), new MacroWeapon()))
    ]
  }
}

export class LegionSuperHeavyTankBatteryUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionTyphon(detachment),
      new LegionCerberus(detachment)
    )

    this.types[0].min = 2
    this.types[0].max = 4
    this.types[0].quantity = 2

    this.types[1].min = 2
    this.types[1].max = 4
    this.types[1].quantity = 2
  }
}

export class LegionTacticalSquad extends LegionUnit {
  constructor(detachment) {
    const entry = la['Tactical Squad']
    super(detachment, entry.cost * 8, 8)

    this.transportType = 'tactical'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionTacticalSupportSquad extends LegionUnit {
  constructor(detachment) {
    const entry = la['Tactical Support Squad']
    super(detachment, entry.cost, 1, 4)

    this.transportType = 'tactical'
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionTeleport extends ModifierUnit {
  constructor(detachment) {
    super(detachment, 50)
  }
}

export class LegionTerminatorSquad extends LegionUnit {
  constructor(detachment) {
    const entry = la['Terminator Squad']
    super(detachment, entry.cost, 4, 6)

    this.transportType = 'terminator'
    this.rules = rulesFromEntry(entry).concat([new ThickRearArmour()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionThunderhawkGunship extends LegionUnit {
  constructor(detachment) {
    const entry = la['Thunderhawk Gunship']
    super(detachment, entry.cost, 1)

    this.transportTypes = {
      tactical: 8,
      assault: 8,
      terminator: 4,
      outrider: 5
    }
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'bomber'
    this.weapons = weaponsFromEntry(entry)
  }
}


export class LegionTyphon extends LegionUnit {
  constructor(detachment) {
    const entry = la['Typhon Siege Tank']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionVindicatorLaserDestroyer extends LegionUnit {
  constructor(detachment) {
    super(detachment, 70, 1)

    this.rules = [
      new PricingQuality('Legacy'),
      new Walker()
    ]
    this.stats = {
      type: 'AV',
      speed: 25,
      armour: 4,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('laser-destroyer-array', new RangedWeapon('60cm', new AntiPersonnel('6+'), new AntiTank('3+'), new Armourbane()))
    ]
  }
}

export class LegionVindicatorSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new LegionVindicator(detachment),
      new LegionVindicatorLaserDestroyer(detachment)
    )
  }
}

export class LegionVindicator extends LegionUnit {
  constructor(detachment) {
    const entry = la['Vindicator']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionVindicatorSquadronVindicator extends LegionVindicator {
  constructor(detachment) {
    super(detachment)

    this.quantity = 2
    this.min = 2
    this.max = 4
  }
}

export class LegionWhirlwindHyperios extends LegionUnit {
  constructor(detachment) {
    super(detachment, 75, 1)

    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'AV',
      speed: 30,
      armour: 5,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('hyperios-launcher', new RangedWeapon('60cm', new AntiTank('4+'), new AntiAircraft('4+')))
    ]
  }
}

export class LegionWhirlwindScorpius extends LegionUnit {
  constructor(detachment) {
    const entry = la['Legion Whirlwind Scorpius']
    super(detachment, entry.cost * 4, 4)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionWhirlwind extends LegionUnit {
  constructor(detachment) {
    const entry = la['Legion Whirlwind']
    super(detachment, entry.cost * 4, 4)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionXiphonInterceptor extends LegionUnit {
  constructor(detachment) {
    const entry = la['Xiphon Interceptor']
    super(detachment, entry.cost * 2, 2)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'fighter'
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionArquitorBombard extends LegionUnit {
  constructor(detachment) {
    super(detachment, 250, 2)

    this.rules = [
      new PricingQuality('Legacy'),
      new ReinforcedArmour()
    ]
    this.stats = {
      type: 'AV',
      speed: 35,
      armour: 6,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('spicular-rocket-system', new RangedWeapon('30cm', new MultipleShot('D3', new AntiPersonnel('5+'), new AntiTank('5+')))),
      new Weapon('heavy-bolter', new RangedWeapon('30cm', new AntiPersonnel('5+')))
    ]
  }
}

export class LegionSabreStrikeTank extends LegionUnit {
  constructor(detachment) {
    const entry = la['Sabre Strike Tank']
    super(detachment, entry.cost * 4, 4)

    this.rules = rulesFromEntry(entry).concat([new ReinforcedArmour()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LgeionKratosTank extends LegionUnit {
  constructor(detachment) {
    const entry = la['Kratos Battle Tank']
    super(detachment, entry.cost, 2, 4)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class LegionTarantula extends Unit {
  constructor(detachment) {
    const entry = la['Tarantula']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry).concat([new Teleport()])
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

withType(LegionArtilleryUnit)
withType(LegionAssaultSquad)
withType(LegionAssaultSupportSquad)
withType(LegionBasilisk)
withType(LegionBattleBarge)
withType(LegionCaestus)
withType(LegionCerberus)
withType(LegionChampion)
withType(LegionChaplain)
withType(LegionContemptorDreadnoughtTalonUnit)
withType(LegionContemptorDreadnought)
withType(LegionDamoclesCommandRhino)
withType(LegionDeredeoDreadnought)
withType(LegionDropPod)
withType(LegionGunship)
withType(LegionHeavySupportSquad)
withType(LegionJavelinAttackSpeeder)
withType(LegionLandRaiderAchillesTransport)
withType(LegionLandRaiderAchilles)
withType(LegionLandRaiderProteusSquadronUnit)
withType(LegionLandRaiderProteusTransport)
withType(LegionLandRaiderProteus)
withType(LegionLandSpeeder)
withType(LegionLeviathanDreadnought)
withType(LegionLeviathanSupportDreadnought)
withType(LegionLibrarian)
withType(LegionLieutenantCommander)
withType(LegionLordCommander)
withType(LegionMastodon)
withType(LegionMedusa)
withType(LegionOutriderUnit)
withType(LegionPredator)
withType(LegionRapierSupport)
withType(LegionRapier)
withType(LegionRhino)
withType(LegionScimitarJetbike)
withType(LegionSicaranBattleTankSquadronUnit)
withType(LegionSicaranPunisherUnit)
withType(LegionSicaranArcusUnit)
withType(LegionSicaranOmega)
withType(LegionSicaran)
withType(LegionSpacecraftUnit)
withType(LegionSpartan)
withType(LegionStormEagleAttackShip)
withType(LegionStrikeCruiser)
withType(LegionSuperHeavyTankBatteryUnit)
withType(LegionTacticalSquad)
withType(LegionTacticalSupportSquad)
withType(LegionTeleport)
withType(LegionTerminatorSquad)
withType(LegionThunderhawkGunship)
withType(LegionTyphon)
withType(LegionVindicatorLaserDestroyer)
withType(LegionVindicatorSquadronUnit)
withType(LegionVindicatorSquadronVindicator)
withType(LegionVindicator)
withType(LegionWhirlwindHyperios)
withType(LegionWhirlwindScorpius)
withType(LegionWhirlwind)
withType(LegionXiphonInterceptor)
withType(LegionArquitorBombard)
withType(LegionSabreStrikeTank)
withType(LgeionKratosTank)
withType(LegionTarantula)