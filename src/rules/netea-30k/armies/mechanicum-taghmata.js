'use strict'

import Army from './army'
import {
  MechanicumTaghmataAdsecularisCovenent,
  MechanicumTaghmataThallaxCohort,
  MechanicumTaghmataUrsaraxCohort,
  MechanicumTaghmataVoraxManiple,
  MechanicumTaghmataCastellaxManiple,
  MechanicumTaghmataThanatarManiple,
  MechanicumTaghmataKriosSquadron,
  MechanicumTaghmataKaracnosSquadron,
  MechanicumTaghmataMyrmidonSect,
  MechanicumTaghmataTarantulaBattery,
  MechanicumTaghmataMinotaurBattery,
  MechanicumTaghmataOrdinatusMinorisTormenta,
  MechanicumTaghmataAvengerWing,
  MechanicumTaghmataPrimarisWing,
  MechanicumTaghmataSuperHeavyTankDestroyer,
  MechanicumTaghmataOrdinatusMajorisDetachment,
  MechanicumTaghmataVultaraxStratosAutomataDetachment
} from '../detachments/mechanicum-taghmata'
import SolarAuxilia from './solar-auxilia'
import KnightHousehold from './knight-household'
import LegioTitanicus from './legio-titanicus'
import withType from '../with-type'
import {
  LordsOfWarLimit,
  SupportDetachmentsLimit
} from '../validations'

export default class MechanicumTaghmata extends Army {
  constructor (game) {
    super(game, 'mechanicum-taghmata')

    this.lineDetachments = [
      MechanicumTaghmataAdsecularisCovenent,
      MechanicumTaghmataThallaxCohort,
      MechanicumTaghmataUrsaraxCohort,
      MechanicumTaghmataVoraxManiple,
      MechanicumTaghmataCastellaxManiple
    ]
    this.supportDetachments = [
      MechanicumTaghmataThanatarManiple,
      MechanicumTaghmataKriosSquadron,
      MechanicumTaghmataKaracnosSquadron,
      MechanicumTaghmataMyrmidonSect,
      MechanicumTaghmataTarantulaBattery,
      MechanicumTaghmataMinotaurBattery,
      MechanicumTaghmataOrdinatusMinorisTormenta,
      MechanicumTaghmataVultaraxStratosAutomataDetachment
    ]
    this.lordsOfWar = [
      MechanicumTaghmataAvengerWing,
      MechanicumTaghmataPrimarisWing,
      MechanicumTaghmataSuperHeavyTankDestroyer,
      MechanicumTaghmataOrdinatusMajorisDetachment
    ]
    this.allies.push(
      SolarAuxilia,
      KnightHousehold,
      LegioTitanicus
    )
    this.validations.push(
      new LordsOfWarLimit(1 / 3),
      new SupportDetachmentsLimit(3)
    )

    this.colour = '#4c0404'
  }

  getStrategyRating (list) {
    const rating = 3

    if (list.allies.find(item =>
      item.army.type === ImperialMilitia.type ||
      item.army.type === SolarAuxilia.type
    )) {
      return rating - 1
    }

    return rating
  }
}

withType(MechanicumTaghmata)
