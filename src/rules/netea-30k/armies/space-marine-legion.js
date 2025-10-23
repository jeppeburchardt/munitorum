'use strict'

import Army from './army'
import {
  LegionTacticalDetachment,
  LegionTerminatorDetachment,
  LegionAssaultDetachment,
  LegionArtilleryBattery,
  LegionAssaultSupportDetachment,
  LegionLeviathanDreadnoughtTalon,
  LegionContemptorDreadnoughtTalon,
  LegionJavelinAttackSpeederSquadron,
  LegionLandSpeederSquadron,
  LegionLandRaiderPhobosSquadron,
  LegionLandRaiderProteusSquadron,
  LegionOutriderSquadron,
  LegionPredatorStrikeSquadron,
  LegionRapierWeaponsBattery,
  LegionSicaranBattleTankSquadron,
  LegionSicaranStrikeTankSquadron,
  LegionSkyHunterAttackSquadron,
  LegionStormEagleAttackWing,
  LegionSpacecraft,
  LegionThunderhawkGunshipWing,
  LegionThunderhawkTransporterWing,
  LegionVindicatorSquadron,
  LegionGunshipWing,
  LegionInterceptorAttackWing,
  LegionSuperHeavyTankBattery,
  LegionSabreStrikeSquadron,
  LegionKratosDetachment,
  LegionTarantulaBattery
} from '../detachments/space-marine-legion'
import LegioTitanicus from './legio-titanicus'
import MechanicumTaghmata from './mechanicum-taghmata'
import KnightHousehold from './knight-household'
import {
  LordsOfWarLimit,
  SupportDetachmentsLimit,
  PrimarchsOrLordCommanders,
  RequireSpacecraftForDropPods,
  AllUnitsMustHaveTeleportAbility
} from '../validations'
import withType from '../with-type'

export default class SpaceMarineLegion extends Army {
  constructor (game) {
    super(game, 'space-marine-legion')

    this.lineDetachments = [
      LegionTacticalDetachment,
      LegionTerminatorDetachment,
      LegionAssaultDetachment
    ]
    this.supportDetachments = [
      LegionArtilleryBattery,
      LegionAssaultSupportDetachment,
      LegionLeviathanDreadnoughtTalon,
      LegionContemptorDreadnoughtTalon,
      LegionJavelinAttackSpeederSquadron,
      LegionLandSpeederSquadron,
      LegionLandRaiderPhobosSquadron,
      LegionLandRaiderProteusSquadron,
      LegionOutriderSquadron,
      LegionPredatorStrikeSquadron,
      LegionRapierWeaponsBattery,
      LegionSicaranBattleTankSquadron,
      LegionSicaranStrikeTankSquadron,
      LegionSkyHunterAttackSquadron,
      LegionStormEagleAttackWing,
      LegionSpacecraft,
      LegionThunderhawkGunshipWing,
      LegionThunderhawkTransporterWing,
      LegionVindicatorSquadron,
      LegionSabreStrikeSquadron,
      LegionKratosDetachment,
      LegionTarantulaBattery
    ]
    this.lordsOfWar = [
      LegionGunshipWing,
      LegionInterceptorAttackWing,
      LegionSuperHeavyTankBattery
    ]
    this.allies = [
      LegioTitanicus,
      MechanicumTaghmata,
      KnightHousehold,
    ]
    this.validations.push(
      new LordsOfWarLimit(1 / 3),
      new SupportDetachmentsLimit(3),
      new PrimarchsOrLordCommanders(),
      new RequireSpacecraftForDropPods(),
      new AllUnitsMustHaveTeleportAbility()
    )
  }

  getStrategyRating (list) {
    return 5
  }
}

withType(SpaceMarineLegion)