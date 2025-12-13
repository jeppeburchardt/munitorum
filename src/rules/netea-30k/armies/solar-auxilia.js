'use strict'

import Army from './army'
import {
  SolarAuxiliaCommandDetachment,
  SolarAuxiliaVeletarisStormCohort,
  SolarAuxiliaInfantryTercio,
  SolarAuxiliaStrikeCompany,
  SolarAuxiliaOrbitalSupport,
  SolarAuxiliaArtilleryTankBattery,
  SolarAuxiliaMalcadorSquadron,
  SolarAuxiliaSuperHeavyTank,
  SolarAuxiliaSuperHeavyTankSquadron,
  SolarAuxiliaCloseSupportSquadron,
  SolarAuxiliaTankHunterSquadron,
  SolarAuxiliaTarantulaBattery,
  SolarAuxiliaAvengerWing,
  SolarAuxiliaPrimarisWing,
  SolarAuxiliaThunderboltSquadron,
  SolarAuxiliaMarauderSquadron
} from '../detachments/solar-auxilia'
import LegioTitanicus from './legio-titanicus'
import MechanicumTaghmata from './mechanicum-taghmata'
import KnightHousehold from './knight-household'
import withType from '../with-type'
import {
  LordsOfWarLimit,
  SupportDetachmentsLimit
} from '../validations'

export default class SolarAuxilia extends Army {
  constructor (game) {
    super(game, 'solar-auxilia')

    this.lineDetachments = [
      SolarAuxiliaCommandDetachment,
      SolarAuxiliaVeletarisStormCohort,
      SolarAuxiliaInfantryTercio,
      SolarAuxiliaStrikeCompany
    ]
    this.supportDetachments = [
      SolarAuxiliaOrbitalSupport,
      SolarAuxiliaArtilleryTankBattery,
      SolarAuxiliaMalcadorSquadron,
      SolarAuxiliaSuperHeavyTank,
      SolarAuxiliaSuperHeavyTankSquadron,
      SolarAuxiliaCloseSupportSquadron,
      SolarAuxiliaTankHunterSquadron,
      SolarAuxiliaTarantulaBattery
    ]
    this.lordsOfWar = [
      SolarAuxiliaAvengerWing,
      SolarAuxiliaPrimarisWing,
      SolarAuxiliaThunderboltSquadron,
      SolarAuxiliaMarauderSquadron
    ]
    this.allies.push(
      LegioTitanicus,
      MechanicumTaghmata,
      KnightHousehold,
    )
    this.validations.push(
      new LordsOfWarLimit(1 / 3),
      new SupportDetachmentsLimit(2)
    )
  }

  getStrategyRating (list) {
    const rating = 3

    if (list.allies.find(item =>
      item.army.type === MechanicumTaghmata.type ||
      item.army.type === DaemonicHordes.type
    )) {
      return rating - 1
    }

    return rating
  }
}

withType(SolarAuxilia)
