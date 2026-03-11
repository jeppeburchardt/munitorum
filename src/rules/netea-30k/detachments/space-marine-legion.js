import {
  LegionArtilleryUnit,
  LegionAssaultSquad,
  LegionAssaultSupportSquad,
  LegionContemptorDreadnoughtTalonUnit,
  LegionContemptorDreadnought,
  LegionTacticalSupportSquad,
  LegionHeavySupportSquad,
  LegionGunship,
  LegionXiphonInterceptor,
  LegionJavelinAttackSpeeder,
  LegionLandRaiderProteusSquadronUnit,
  LegionLandRaiderProteus,
  LegionLandSpeeder,
  LegionLeviathanSupportDreadnought,
  LegionOutriderUnit,
  LegionPredator,
  LegionRapierSupport,
  LegionSicaranBattleTankSquadronUnit,
  LegionScimitarJetbike,
  LegionSpacecraftUnit,
  LegionStormEagleAttackShip,
  LegionSuperHeavyTankBatteryUnit,
  LegionTacticalSquad,
  LegionTerminatorSquad,
  LegionThunderhawkGunship,
  LegionVindicatorSquadronUnit,
  LegionVindicatorSquadronVindicator,
  LegionSabreStrikeTank,
  LgeionKratosTank,
  LegionTarantula,
  LegionSuperHeavySupportTankUnit
} from '../units/space-marine-legion'
import {
  Upgrade,
  MultipleChoiceOption,
  RapierBattery,
  Hyperios,
  CommanderOption,
  Centurion,
  Praetor,
  TransportOption,
  Rhinos,
  DropAssault,
  AssaultRam,
  HeavyTransport,
  Teleport,
  Dreadnought,
  Tank,
  ArmouryAssets
} from '../upgrades'
import {
  LimitedPerPoints
} from '../constraints'
import SpaceMarineLegionDetachment from './space-marine-legion-detachment'
import withType from '../with-type'

export class LegionArtilleryBattery extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionArtilleryUnit(this)
    )
    this.setUpgrades(
      new Hyperios()
    )
    this.setConstraints(
      new LimitedPerPoints(1, 2000)
    )
  }
}

export class LegionAssaultDetachment extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionAssaultSquad(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Praetor(),
        new Centurion()
      ),
      new TransportOption(
        new DropAssault()
      )
    )
  }
}

export class LegionAssaultSupportDetachment extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionAssaultSupportSquad(this)
    )
    this.setUpgrades(
      new TransportOption(
        new DropAssault()
      ),
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

class ContemptorDreadnoughtUpgrade extends Upgrade {
  getAvailableUpgrades (detachment) {
    if (detachment.units.filter(item => item.type === LegionContemptorDreadnought.type || item.type === LegionContemptorDreadnoughtTalonUnit.type).length === 6) {
      return []
    }

    return [
      new LegionContemptorDreadnought(detachment)
    ]
  }
}

export class LegionContemptorDreadnoughtTalon extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionContemptorDreadnoughtTalonUnit(this),
      new LegionContemptorDreadnoughtTalonUnit(this),
      new LegionContemptorDreadnought(this),
      new LegionContemptorDreadnought(this)
    )
    this.setUpgrades(
      new TransportOption(
        new DropAssault()
      ),
      new ContemptorDreadnoughtUpgrade(),
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionGunshipWing extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionGunship(this)
    )
  }
}

export class LegionInterceptorAttackWing extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionXiphonInterceptor(this)
    )
  }
}

export class LegionJavelinAttackSpeederSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionJavelinAttackSpeeder(this),
      new LegionJavelinAttackSpeeder(this),
      new LegionJavelinAttackSpeeder(this),
      new LegionJavelinAttackSpeeder(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

class LegionLandRaiderProteusSquadronUpgrade extends Upgrade {
  getAvailableUpgrades (detachment) {
    if (detachment.units.filter(item => item.type === LegionLandRaiderProteusSquadronUnit.type || item.type === LegionLandRaiderProteus.type).length === 6) {
      return []
    }

    return [
      new LegionLandRaiderProteus(detachment)
    ]
  }
}

export class LegionLandRaiderProteusSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionLandRaiderProteusSquadronUnit(this),
      new LegionLandRaiderProteusSquadronUnit(this),
      new LegionLandRaiderProteus(this),
      new LegionLandRaiderProteus(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      ),
      new Hyperios(),
      new LegionLandRaiderProteusSquadronUpgrade()
    )
  }
}

export class LegionLandSpeederSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionLandSpeeder(this),
      new LegionLandSpeeder(this),
      new LegionLandSpeeder(this),
      new LegionLandSpeeder(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionLeviathanDreadnoughtTalon extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionLeviathanSupportDreadnought(this),
      new LegionLeviathanSupportDreadnought(this),
      new LegionLeviathanSupportDreadnought(this),
      new LegionLeviathanSupportDreadnought(this)
    )
    this.setUpgrades(
      new TransportOption(
        new DropAssault()
      ),
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionOutriderSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionOutriderUnit(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

class PredatorUpgrade extends Upgrade {
  getAvailableUpgrades (detachment) {
    if (detachment.units.length === 6) {
      return []
    }

    return [
      new LegionPredator(detachment)
    ]
  }
}

export class LegionPredatorStrikeSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionPredator(this),
      new LegionPredator(this),
      new LegionPredator(this),
      new LegionPredator(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      ),
      new Hyperios(),
      new PredatorUpgrade()
    )
  }
}

export class LegionRapierWeaponsBattery extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionRapierSupport(this),
      new LegionRapierSupport(this),
      new LegionRapierSupport(this),
      new LegionRapierSupport(this),
      new LegionRapierSupport(this),
      new LegionRapierSupport(this)
    )
    this.setUpgrades(
      new TransportOption(
        new DropAssault()
      )
    )
  }
}

class LegionSicaranBattleTankSquadronUnitUpgrade extends Upgrade {
  getAvailableUpgrades (detachment) {
    if (detachment.units.filter(item => item.type === LegionSicaranBattleTankSquadronUnit.type).length === 6) {
      return []
    }

    return [
      new LegionSicaranBattleTankSquadronUnit(detachment)
    ]
  }
}

export class LegionSicaranBattleTankSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionSicaranBattleTankSquadronUnit(this),
      new LegionSicaranBattleTankSquadronUnit(this),
      new LegionSicaranBattleTankSquadronUnit(this),
      new LegionSicaranBattleTankSquadronUnit(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      ),
      new Hyperios(),
      new LegionSicaranBattleTankSquadronUnitUpgrade()
    )
  }
}

export class LegionSkyHunterAttackSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionScimitarJetbike(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionSpacecraft extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionSpacecraftUnit(this)
    )
  }
}

export class LegionStormEagleAttackWing extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionStormEagleAttackShip(this)
    )
  }
}

export class LegionSuperHeavyTankBattery extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionSuperHeavyTankBatteryUnit(this)
    )
  }
}

export class LegionTacticalDetachment extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionTacticalSquad(this)
    )
    this.setUpgrades(
      new TransportOption(
        new Rhinos(),
        new DropAssault(),
        new HeavyTransport()
      ),
      new CommanderOption(
        new Praetor(),
        new Centurion()
      ),
      new Hyperios(),
      new Dreadnought(),
      new Tank(),
      new ArmouryAssets(),
      new MultipleChoiceOption(
        LegionTacticalSupportSquad,
        LegionHeavySupportSquad
      ),
      new RapierBattery()
    )
  }
}

export class LegionTerminatorDetachment extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionTerminatorSquad(this)
    )
    this.setUpgrades(
      new TransportOption(
        new DropAssault(),
        new AssaultRam(),
        new HeavyTransport(),
        new Teleport()
      ),
      new CommanderOption(
        new Praetor(),
        new Centurion()
      ),
      new Hyperios(),
      new Dreadnought(),
      new Tank(),
      new ArmouryAssets()
    )
  }
}

export class LegionThunderhawkGunshipWing extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionThunderhawkGunship(this)
    )
  }
}

export class LegionVindicatorSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionVindicatorSquadronUnit(this),
      new LegionVindicatorSquadronUnit(this),
      new LegionVindicatorSquadronVindicator(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      ),
      new Hyperios()
    )

    this.units[2].min = 2
    this.units[2].max = 4
  }
}

export class LegionSabreStrikeSquadron extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionSabreStrikeTank(this)
    )
    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionKratosDetachment extends SpaceMarineLegionDetachment {
  constructor(list) {
    super(list)

    this.setMandatoryUnits(
      new LgeionKratosTank(this)
    )

    this.setUpgrades(
      new CommanderOption(
        new Centurion()
      )
    )
  }
}

export class LegionTarantulaBattery extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionTarantula(this),
      new LegionTarantula(this),
      new LegionTarantula(this),
      new LegionTarantula(this),
    )
  }
}

export class LegionSuperHeavySupportTank extends SpaceMarineLegionDetachment {
  constructor (list) {
    super(list)

    this.setMandatoryUnits(
      new LegionSuperHeavySupportTankUnit(this)
    )
  }
}


withType(LegionArtilleryBattery)
withType(LegionAssaultDetachment)
withType(LegionAssaultSupportDetachment)
withType(LegionContemptorDreadnoughtTalon)
withType(LegionGunshipWing)
withType(LegionInterceptorAttackWing)
withType(LegionJavelinAttackSpeederSquadron)
withType(LegionLandRaiderProteusSquadron)
withType(LegionLandSpeederSquadron)
withType(LegionLeviathanDreadnoughtTalon)
withType(LegionOutriderSquadron)
withType(LegionPredatorStrikeSquadron)
withType(LegionRapierWeaponsBattery)
withType(LegionSicaranBattleTankSquadron)
withType(LegionSkyHunterAttackSquadron)
withType(LegionSpacecraft)
withType(LegionStormEagleAttackWing)
withType(LegionSuperHeavyTankBattery)
withType(LegionTacticalDetachment)
withType(LegionTerminatorDetachment)
withType(LegionThunderhawkGunshipWing)
withType(LegionVindicatorSquadron)
withType(LegionSabreStrikeSquadron)
withType(LegionKratosDetachment)
withType(LegionTarantulaBattery)
withType(LegionSuperHeavySupportTank)