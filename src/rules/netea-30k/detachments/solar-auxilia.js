import {
  MultipleChoiceOption,
  OgrynCharoniteSquad,
  InfantrySupportTank,
  SolarAuxiliaRapierBattery
} from '../upgrades'
import {
  SolarAuxiliaLordMarshall,
  SolarAuxiliaTacticalCommandSection,
  SolarAuxiliaVeletarisStormSection,
  SolarAuxiliaInfantrySection,
  SolarAuxiliaLemanRuss,
  SolarAuxiliaVeletarisSupportSquad,
  SolarAuxiliaCloseSupportSection,
  SolarAuxiliaDracosan,
  SolarAuxiliaStormlordTransport,
  SolarAuxiliaArvusLighter,
  SolarAuxiliaOrbitalSupportUnit,
  SolarAuxiliaArtilleryTankBatteryUnit,
  SolarAuxiliaMalcador,
  SolarAuxiliaSuperHeavyTankUnit,
  SolarAuxiliaSuperHeavyTankSquadronUnit,
  SolarAuxiliaCloseSupportTankUnit,
  SolarAuxiliaStrikeSquadronUnit,
  SolarAuxiliaValdor,
  SolarAuxiliaTarantula,
  SolarAuxiliaTarantulaHyperios,
  SolarAuxiliaAvengerStrikeFighter,
  SolarAuxiliaPrimarisStrikeFighter,
  SolarAuxiliaThunderboltFighter,
  SolarAuxiliaMarauderBomber,
} from '../units/solar-auxilia'
import SolarAuxiliaDetachment from './solar-auxilia-detachment'
import {
  Unique
} from '../constraints'
import withType from '../with-type'

export class SolarAuxiliaCommandDetachment extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaLordMarshall(this),
      new SolarAuxiliaVeletarisStormSection(this)
    )
    this.setUpgrades(
      new InfantrySupportTank(),
      new OgrynCharoniteSquad(),
      new MultipleChoiceOption(
        SolarAuxiliaVeletarisSupportSquad,
        SolarAuxiliaCloseSupportSection
      ),
      new MultipleChoiceOption(
        SolarAuxiliaDracosan,
        SolarAuxiliaStormlordTransport,
        SolarAuxiliaArvusLighter
      )
    )
    this.setConstraints(
      new Unique()
    )
  }
}

export class SolarAuxiliaVeletarisStormCohort extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaTacticalCommandSection(this),
      new SolarAuxiliaVeletarisStormSection(this)
    )
    this.setUpgrades(
      new InfantrySupportTank(),
      new OgrynCharoniteSquad(),
      new MultipleChoiceOption(
        SolarAuxiliaDracosan,
        SolarAuxiliaStormlordTransport,
        SolarAuxiliaArvusLighter
      )
    )
  }
}

export class SolarAuxiliaInfantryTercio extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaTacticalCommandSection(this),
      new SolarAuxiliaInfantrySection(this)
    )
    this.setUpgrades(
      new InfantrySupportTank(),
      new OgrynCharoniteSquad(),
      new MultipleChoiceOption(
        SolarAuxiliaVeletarisSupportSquad,
        SolarAuxiliaCloseSupportSection
      ),
      new SolarAuxiliaRapierBattery(),
      new MultipleChoiceOption(
        SolarAuxiliaDracosan,
        SolarAuxiliaStormlordTransport,
        SolarAuxiliaArvusLighter
      )
    )
  }
}

export class SolarAuxiliaStrikeCompany extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaStrikeSquadronUnit(this)
    )
  }
}

export class SolarAuxiliaOrbitalSupport extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaOrbitalSupportUnit(this)
    )
    this.setConstraints(
      new Unique()
    )
  }
}

export class SolarAuxiliaArtilleryTankBattery extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaArtilleryTankBatteryUnit(this)
    )
  }
}

export class SolarAuxiliaMalcadorSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaMalcador(this)
    )
  }
}

export class SolarAuxiliaSuperHeavyTank extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaSuperHeavyTankUnit(this)
    )
  }
}

export class SolarAuxiliaSuperHeavyTankSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaSuperHeavyTankSquadronUnit(this)
    )
  }
}

export class SolarAuxiliaCloseSupportSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaCloseSupportTankUnit(this)
    )
  }
}

export class SolarAuxiliaTankHunterSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaValdor(this)
    )
  }
}

export class SolarAuxiliaTarantulaBattery extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaTarantula(this),
      new SolarAuxiliaTarantulaHyperios(this)
    )
  }
}

export class SolarAuxiliaAvengerWing extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaAvengerStrikeFighter(this)
    )
  }
}

export class SolarAuxiliaPrimarisWing extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaPrimarisStrikeFighter(this)
    )
  }
}

export class SolarAuxiliaThunderboltSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaThunderboltFighter(this)
    )
  }
}

export class SolarAuxiliaMarauderSquadron extends SolarAuxiliaDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new SolarAuxiliaMarauderBomber(this)
    )
  }
}

withType(SolarAuxiliaCommandDetachment)
withType(SolarAuxiliaVeletarisStormCohort)
withType(SolarAuxiliaInfantryTercio)
withType(SolarAuxiliaStrikeCompany)
withType(SolarAuxiliaOrbitalSupport)
withType(SolarAuxiliaArtilleryTankBattery)
withType(SolarAuxiliaMalcadorSquadron)
withType(SolarAuxiliaSuperHeavyTank)
withType(SolarAuxiliaSuperHeavyTankSquadron)
withType(SolarAuxiliaCloseSupportSquadron)
withType(SolarAuxiliaTankHunterSquadron)
withType(SolarAuxiliaTarantulaBattery)
withType(SolarAuxiliaAvengerWing)
withType(SolarAuxiliaPrimarisWing)
withType(SolarAuxiliaThunderboltSquadron)
withType(SolarAuxiliaMarauderSquadron)