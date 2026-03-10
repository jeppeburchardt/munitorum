import {
  Weapon,
  AssaultWeapon,
  MacroWeapon,
  ExtraAttacks,
  SmallArms,
  RangedWeapon,
  MultipleShot,
  AntiPersonnel,
  AntiTank,
  MultipleChoiceWeapon,
  TitanKiller,
  IgnoreCover,
  StatsModifier,
  AntiAircraft,
  BarragePoints,
  IndirectFire,
  SingleShot,
  Or,
  FixedForwardFireArc,
  Disrupt
} from '../weapons'
import {
  ReinforcedArmour,
  ThickRearArmour,
  InvulnerableSave,
  Scout,
  DamageCapacity,
  CriticalHit,
  SupremeCommander,
  SlowAndSteady,
  Teleport,
  PricingQuality
} from '../special-rules'
import MultipleChoiceUnit from './multiple-choice-unit'
import Unit, { InfantryTransportUnit } from './unit'
import SpacecraftUnit from './spacecraft-unit'
import withType from '../with-type'
import prices from '../prices.json'
import { statsFromEntry, rulesFromEntry, weaponsFromEntry } from '../unit-builder'


const sa = prices['solar-auxilia']

export class SolarAuxiliaLordMarshall extends Unit {
  constructor(detachment) {
    super(detachment, 150, 1)

    this.transportCost = 1
    this.rules = [
      new PricingQuality('Legacy'),
      new SupremeCommander(),
      new InvulnerableSave()
    ]
    this.stats = {
      type: 'INF',
      speed: 15,
      armour: 5,
      cc: 5,
      ff: 4
    }
    this.weapons = [
      new Weapon('archaeotech-pistol', new SmallArms('15cm', new MacroWeapon(), new ExtraAttacks('+1'))),
      new Weapon('volkite-chargers', new SmallArms('15cm', new AntiPersonnel('5+'), new AntiTank('6+')))
    ]
  }
}

export class SolarAuxiliaTacticalCommandSection extends Unit {
  constructor(detachment) {
    const entry = sa['Tactical Command Unit']
    super(detachment, entry.cost, 1)

    this.transportCost = 1
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaVeletarisStormSection extends Unit {
  constructor(detachment) {
    const entry = sa['Veletaris Storm Section']
    super(detachment, entry.cost * 7, 7)

    this.transportCost = 1
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaVeletarisSupportSquad extends SolarAuxiliaVeletarisStormSection {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Veletaris Storm Section'].cost * 4
    this.min = 4
    this.quantity = 4
  }
}

export class SolarAuxiliaCloseSupportSection extends Unit {
  constructor(detachment) {
    const entry = sa['Infantry with flamers']
    super(detachment, entry.cost * 4, 4)

    this.transportCost = 1
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaInfantrySection extends Unit {
  constructor(detachment) {
    const entry = sa['Infantry Section']
    super(detachment, entry.cost * 7, 7)

    this.transportCost = 1
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaLemanRuss extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Battle Tank']
    super(detachment, entry.cost, 6, 8)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaLemanRussVanquisher extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Vanquisher']
    super(detachment, entry.cost, 6, 8)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaLemanRussDemolisher extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Demolisher']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaCloseSupportLemanRussDemolisher extends SolarAuxiliaLemanRussDemolisher {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Leman Russ Demolisher'].cost * 4
    this.min = 4
    this.quantity = 4
  }
}

class SolarAuxiliaLemanRussExterminator extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Exterminator']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaCloseSupportLemanRussExterminator extends SolarAuxiliaLemanRussExterminator {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Leman Russ Exterminator'].cost * 4
    this.min = 4
    this.quantity = 4
  }
}

class SolarAuxiliaLemanRussAnnihilator extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Annihilator']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaCloseSupportLemanRussAnnihilator extends SolarAuxiliaLemanRussAnnihilator {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Leman Russ Annihilator'].cost * 4
    this.min = 4
    this.quantity = 4
  }
}

class SolarAuxiliaLemanRussExecutioner extends Unit {
  constructor(detachment) {
    const entry = sa['Leman Russ Executioner']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaCloseSupportLemanRussExecutioner extends SolarAuxiliaLemanRussExecutioner {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Leman Russ Executioner'].cost * 4
    this.min = 4
    this.quantity = 4
  }
}

export class SolarAuxiliaCloseSupportTankUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaCloseSupportLemanRussDemolisher(detachment),
      new SolarAuxiliaCloseSupportLemanRussExterminator(detachment),
      new SolarAuxiliaCloseSupportLemanRussAnnihilator(detachment),
      new SolarAuxiliaCloseSupportLemanRussExecutioner(detachment),
    )
  }
}

export class SolarAuxiliaStrikeSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaLemanRuss(detachment),
      new SolarAuxiliaLemanRussVanquisher(detachment)
    )
  }
}

export class SolarAuxiliaInfantrySupportTankUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaLemanRussDemolisher(detachment),
      new SolarAuxiliaMalcadorInfernus(detachment)
    )
  }
}

export class SolarAuxiliaValdor extends Unit {
  constructor(detachment) {
    const entry = sa['Malcador Valdor']
    super(detachment, entry.cost * 3, 3)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaOgrynCharoniteSquad extends Unit {
  constructor(detachment) {
    const entry = sa['Ogryn Charonite Squad']
    super(detachment, entry.cost * 2, 2)

    this.transportCost = 2
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaArvusLighter extends InfantryTransportUnit {
  constructor(detachment) {
    const entry = sa['Arvus Lighter']
    super(detachment, entry.cost)

    this.transportCapacity = 2
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaDracosan extends InfantryTransportUnit {
  constructor(detachment) {
    const entry = sa['Dracosan with las cannon']
    super(detachment, entry.cost)

    this.transportCapacity = 5
    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaStormlordTransport extends InfantryTransportUnit {
  constructor(detachment) {
    super(detachment, 200)

    this.transportCapacity = 8
    this.rules = [
      new PricingQuality('Legacy'),
      new DamageCapacity(2),
      new ReinforcedArmour(),
      new CriticalHit('solar-auxilia-stormlord-critical-hit')
    ]
    this.stats = {
      type: 'WE',
      speed: 15,
      armour: 4,
      cc: 6,
      ff: 3
    }
    this.weapons = [
      new Weapon('vulcan-mega-bolter', new RangedWeapon('45cm', new MultipleShot('3x', new AntiPersonnel('3+'), new AntiTank('5+')), new FixedForwardFireArc())),
      new Weapon('3-twin-linked-heavy-bolters', new RangedWeapon('30cm', new AntiPersonnel('4+'))),
      new Weapon('2-heavy-flamers',
        new RangedWeapon('15cm', new AntiPersonnel('4+'), new IgnoreCover()),
        new SmallArms('15cm', new IgnoreCover())
      )
    ]
  }
}

export class SolarAuxiliaRapier extends Unit {
  constructor(detachment) {
    super(detachment, sa['Rapier Laser Destroyer'].cost * 4, 4)

    this.transportCost = 2
    this.rules = [
      new PricingQuality(sa['Rapier Laser Destroyer'].quality)
    ]
    this.stats = {
      type: 'INF',
      speed: 10,
      armour: 6,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new MultipleChoiceWeapon(
        new Weapon('laser-destroyer', new RangedWeapon('45cm', new AntiPersonnel('6+'), new AntiTank('4+'))),
        new Weapon('quad-mortar', new RangedWeapon('45cm', new AntiPersonnel('5+'), new AntiTank('6+'), new IndirectFire(), new Disrupt())),
        new Weapon('quad-heavy-bolters', new RangedWeapon('30cm', new MultipleShot('2x', new AntiPersonnel('4+'))))
      )
    ]
  }
}

class SolarAuxiliaEmperorClassBattleship extends SpacecraftUnit {
  constructor(detachment) {
    super(detachment, 300, 1)

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
      new Weapon('orbital-bombardment', new RangedWeapon('-', new BarragePoints(8), new MacroWeapon()))
    ]
  }
}

class SolarAuxiliaDauntlessClassLightCruiser extends SpacecraftUnit {
  constructor(detachment) {
    super(detachment, 150, 1)

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
      new Weapon('orbital-bombardment', new RangedWeapon('-', new BarragePoints(3), new MacroWeapon())),
      new Weapon('lance-battery', new RangedWeapon('-', new MacroWeapon('2+'), new TitanKiller('D3')))
    ]
  }
}

export class SolarAuxiliaOrbitalSupportUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaEmperorClassBattleship(detachment),
      new SolarAuxiliaDauntlessClassLightCruiser(detachment)
    )
  }
}

export class SolarAuxiliaMedusa extends Unit {
  constructor(detachment) {
    const entry = sa['Medusa']
    super(detachment, entry.cost * 3, 3)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaBasilisk extends Unit {
  constructor(detachment) {
    super(detachment, sa['Basilisk'].cost * 3, 3)

    this.rules = [
      new PricingQuality(sa['Basilisk'].quality)
    ]
    this.stats = {
      type: 'AV',
      speed: 20,
      armour: 5,
      cc: 6,
      ff: 6
    }
    this.weapons = [
      new Weapon('earthshaker-cannon', new RangedWeapon('120cm', new AntiPersonnel('4+'), new AntiTank('4+'), new Or(), new BarragePoints(1), new IndirectFire())),
      new Weapon('heavy-bolter', new RangedWeapon('30cm', new AntiPersonnel('5+')))
    ]
  }
}

class SolarAuxiliaBombard extends Unit {
  constructor(detachment) {
    super(detachment, 250, 3)

    this.rules = []
    this.stats = {
      type: 'AV',
      speed: 15,
      armour: 5,
      cc: 6,
      ff: 6
    }
    this.weapons = [
      new Weapon('siege-mortar', new RangedWeapon('45cm', new BarragePoints(1), new IndirectFire(), new IgnoreCover())),
      new Weapon('heavy-bolter', new RangedWeapon('30cm', new AntiPersonnel('5+')))
    ]
  }
}

export class SolarAuxiliaArtilleryTankBatteryUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaBasilisk(detachment),
      new SolarAuxiliaBombard(detachment),
      new SolarAuxiliaMedusa(detachment)
    )
  }
}

export class SolarAuxiliaMalcador extends Unit {
  constructor(detachment) {
    const entry = sa['Malcador Battle Tank']
    super(detachment, entry.cost * 4, 4)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaMalcadorInfernus extends Unit {
  constructor(detachment) {
    const entry = sa['Malcador Infernus']
    super(detachment, entry.cost, 1)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaBaneblade extends Unit {
  constructor(detachment) {
    const entry = sa['Baneblade']
    super(detachment, entry.cost, 1)

    this.rules = [...rulesFromEntry(entry), new CriticalHit('solar-auxilia-baneblade-critical-hit')]
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaShadowsword extends Unit {
  constructor(detachment) {
    const entry = sa['Shadowsword']
    super(detachment, entry.cost, 1)

    this.rules = [...rulesFromEntry(entry), new CriticalHit('solar-auxilia-shadowsword-critical-hit')]
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaStormblade extends Unit {
  constructor(detachment) {
    const entry = sa['Stromblade']
    super(detachment, entry.cost, 1)

    this.rules = [...rulesFromEntry(entry), new CriticalHit('solar-auxilia-stormblade-critical-hit')]
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaStormhammer extends Unit {
  constructor(detachment) {
    const entry = sa['Stormhammer']
    super(detachment, entry.cost, 1)

    this.rules = [...rulesFromEntry(entry), new CriticalHit('solar-auxilia-stormhammer-critical-hit')]
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

class SolarAuxiliaStormsword extends Unit {
  constructor(detachment) {
    const entry = sa['Stormsword']
    super(detachment, entry.cost, 1)

    this.rules = [...rulesFromEntry(entry), new CriticalHit('solar-auxilia-stormsword-critical-hit')]
    this.stats = statsFromEntry(entry)
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaSuperHeavyTankUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaBaneblade(detachment),
      new SolarAuxiliaShadowsword(detachment),
      new SolarAuxiliaStormblade(detachment),
      new SolarAuxiliaStormhammer(detachment),
      new SolarAuxiliaStormsword(detachment)
    )
  }
}

class SolarAuxiliaBanebladeSquadronUnit extends SolarAuxiliaBaneblade {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Baneblade'].cost * 2
    this.min = 2
    this.quantity = 2
  }
}

class SolarAuxiliaShadowswordSquadronUnit extends SolarAuxiliaShadowsword {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Shadowsword'].cost * 2
    this.min = 2
    this.quantity = 2
  }
}

class SolarAuxiliaStormbladeSquadronUnit extends SolarAuxiliaStormblade {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Stromblade'].cost * 2
    this.min = 2
    this.quantity = 2
  }
}

class SolarAuxiliaStormhammerSquadronUnit extends SolarAuxiliaStormhammer {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Stormhammer'].cost * 2
    this.min = 2
    this.quantity = 2
  }
}

class SolarAuxiliaStormswordSquadronUnit extends SolarAuxiliaStormsword {
  constructor(detachment) {
    super(detachment)

    this.cost = sa['Stormsword'].cost * 2
    this.min = 2
    this.quantity = 2
  }
}

export class SolarAuxiliaSuperHeavyTankSquadronUnit extends MultipleChoiceUnit {
  constructor(detachment) {
    super(detachment,
      new SolarAuxiliaBanebladeSquadronUnit(detachment),
      new SolarAuxiliaShadowswordSquadronUnit(detachment),
      new SolarAuxiliaStormbladeSquadronUnit(detachment),
      new SolarAuxiliaStormhammerSquadronUnit(detachment),
      new SolarAuxiliaStormswordSquadronUnit(detachment)
    )
  }
}

export class SolarAuxiliaTarantula extends Unit {
  constructor(detachment) {
    super(detachment, sa['Tarantula'].cost * 4, 4)

    this.rules = [
      new PricingQuality(sa['Tarantula'].quality),
      new Scout(),
      new Teleport()
    ]
    this.stats = {
      type: 'LV',
      speed: 0,
      armour: 6,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('twin-linked-heavy-bolters', new RangedWeapon('30cm', new AntiPersonnel('4+')))
    ]
  }
}

export class SolarAuxiliaTarantulaHyperios extends Unit {
  constructor(detachment) {
    super(detachment, sa['Tarantula'].cost * 4, 4)

    this.rules = [
      new PricingQuality(sa['Tarantula'].quality),
      new Scout(),
      new Teleport()
    ]
    this.stats = {
      type: 'LV',
      speed: 0,
      armour: 6,
      cc: 6,
      ff: 5
    }
    this.weapons = [
      new Weapon('hyperios-launcher', new RangedWeapon('30cm', new AntiAircraft('4+')))
    ]
  }
}

export class SolarAuxiliaAvengerStrikeFighter extends Unit {
  constructor(detachment) {
    const entry = sa['Avenger Strike Fighter']
    super(detachment, entry.cost * 2, 2)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'fighter-bomber'
    this.stats.cc = 7
    this.stats.ff = 7
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaPrimarisStrikeFighter extends Unit {
  constructor(detachment) {
    super(detachment, 225, 2)

    this.rules = [
      new PricingQuality('Legacy')
    ]
    this.stats = {
      type: 'AC',
      speed: 'fighter',
      armour: 6,
      cc: 7,
      ff: 7
    }
    this.weapons = [
      new Weapon('kraken-heavy-missiles', new RangedWeapon('30cm', new AntiTank('4+'), new SingleShot(), new FixedForwardFireArc())),
      new Weapon('sponson-lascannons', new RangedWeapon('30cm', new AntiTank('5+'), new AntiAircraft('5+'), new FixedForwardFireArc())),
      new Weapon('sponson-autocannons', new RangedWeapon('30cm', new AntiPersonnel('5+'), new AntiTank('6+'), new AntiAircraft('5+'), new FixedForwardFireArc()))
    ]
  }
}

export class SolarAuxiliaThunderboltFighter extends Unit {
  constructor(detachment) {
    const entry = sa['Thunderbolt']
    super(detachment, entry.cost * 2, 2)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'fighter'
    this.stats.cc = 7
    this.stats.ff = 7
    this.weapons = weaponsFromEntry(entry)
  }
}

export class SolarAuxiliaMarauderBomber extends Unit {
  constructor(detachment) {
    const entry = sa['Marauder Bomber']
    super(detachment, entry.cost * 2, 2)

    this.rules = rulesFromEntry(entry)
    this.stats = statsFromEntry(entry)
    this.stats.speed = 'bomber'
    this.stats.cc = 7
    this.stats.ff = 7
    this.weapons = weaponsFromEntry(entry)
  }
}

withType(SolarAuxiliaLordMarshall)
withType(SolarAuxiliaTacticalCommandSection)
withType(SolarAuxiliaVeletarisStormSection)
withType(SolarAuxiliaInfantrySection)
withType(SolarAuxiliaInfantrySupportTankUnit)
withType(SolarAuxiliaLemanRuss)
withType(SolarAuxiliaLemanRussVanquisher)
withType(SolarAuxiliaLemanRussDemolisher)
withType(SolarAuxiliaLemanRussExterminator)
withType(SolarAuxiliaLemanRussExecutioner)
withType(SolarAuxiliaLemanRussAnnihilator)
withType(SolarAuxiliaCloseSupportTankUnit)
withType(SolarAuxiliaStrikeSquadronUnit)
withType(SolarAuxiliaMalcador)
withType(SolarAuxiliaMalcadorInfernus)
withType(SolarAuxiliaOgrynCharoniteSquad)
withType(SolarAuxiliaVeletarisSupportSquad)
withType(SolarAuxiliaCloseSupportSection)
withType(SolarAuxiliaArvusLighter)
withType(SolarAuxiliaDracosan)
withType(SolarAuxiliaStormlordTransport)
withType(SolarAuxiliaRapier)
withType(SolarAuxiliaEmperorClassBattleship)
withType(SolarAuxiliaDauntlessClassLightCruiser)
withType(SolarAuxiliaOrbitalSupportUnit)
withType(SolarAuxiliaMedusa)
withType(SolarAuxiliaBasilisk)
withType(SolarAuxiliaBombard)
withType(SolarAuxiliaArtilleryTankBatteryUnit)
withType(SolarAuxiliaSuperHeavyTankUnit)
withType(SolarAuxiliaBaneblade)
withType(SolarAuxiliaShadowsword)
withType(SolarAuxiliaStormblade)
withType(SolarAuxiliaStormhammer)
withType(SolarAuxiliaStormsword)
withType(SolarAuxiliaSuperHeavyTankSquadronUnit)
withType(SolarAuxiliaBanebladeSquadronUnit)
withType(SolarAuxiliaShadowswordSquadronUnit)
withType(SolarAuxiliaStormbladeSquadronUnit)
withType(SolarAuxiliaStormhammerSquadronUnit)
withType(SolarAuxiliaStormswordSquadronUnit)
withType(SolarAuxiliaValdor)
withType(SolarAuxiliaTarantula)
withType(SolarAuxiliaTarantulaHyperios)
withType(SolarAuxiliaAvengerStrikeFighter)
withType(SolarAuxiliaPrimarisStrikeFighter)
withType(SolarAuxiliaThunderboltFighter)
withType(SolarAuxiliaMarauderBomber)