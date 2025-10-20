'use strict'

import Army from './army'
import {
  KnightHouseholdQuestorisPaladinKnights,
  KnightHouseholdQuestorisErrantKnights,
  KnightHouseholdCerastusLancerKnights,
  KnightHouseholdCerastusCastigatorKnights,
  KnightHouseholdAcastusKnightPorphyrions,
  KnightHouseholdArmigerKnights
} from '../detachments/knight-household'
import SolarAuxilia from './solar-auxilia'
import MechanicumTaghmata from './mechanicum-taghmata'
import LegioTitanicus from './legio-titanicus'
import withType from '../with-type'
import {
  LordsOfWarLimit,
  SupportDetachmentsLimit
} from '../validations'

export default class KnightHousehold extends Army {
  constructor (game) {
    super(game, 'knight-household')

    this.lineDetachments = [
      KnightHouseholdQuestorisPaladinKnights,
      KnightHouseholdQuestorisErrantKnights
    ]
    this.supportDetachments = [
      KnightHouseholdCerastusLancerKnights,
      KnightHouseholdCerastusCastigatorKnights,
      KnightHouseholdArmigerKnights
    ]
    this.lordsOfWar = [
      KnightHouseholdAcastusKnightPorphyrions
    ]
    this.validations.push(
      new LordsOfWarLimit(1 / 3),
      new SupportDetachmentsLimit(2)
    )
    this.allies.push(
      SolarAuxilia,
      MechanicumTaghmata,
      LegioTitanicus
    )
  }

  getStrategyRating (list) {
    return 3
  }
}

withType(KnightHousehold)
